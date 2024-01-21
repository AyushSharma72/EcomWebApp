import React, { useState, useEffect } from "react";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import cartimage from "../assests/cartimage.png";
import emptycart from "../assests/emptycart.png";
import DropIn from "braintree-web-drop-in-react";
import ".././App.css"
const CartPage = () => {
  const [Cart, setCart] = useCart();
  const [auth, SetAuth] = useAuth();
  const Navigate = useNavigate();
  const [ClientToken, SetClientToken] = useState("");
  const [instance, Setinstance] = useState("");
  const [loading, SetLoading] = useState(false);

  function RemoveCartItems(id) {
    try {
      let MyCart = [...Cart];
      let index = MyCart.findIndex((Item) => Item._id == id);
      MyCart.splice(index, 1);
      setCart(MyCart);
      localStorage.setItem("Cart", JSON.stringify(MyCart));
      toast("Item removed from cart!", {
        icon: "🫡",
      });
    } catch (error) {
      console.log(error);
      toast.error("Error Removing item");
    }
  }
  function TotalPrice() {
    try {
      let total = 0;
      Cart?.map((item) => {
        total = total + item.price;
      });
      return total;
    } catch (error) {
      console.log(error);
    }
  }

  //get payment token

  async function GetToken() {
    try {
      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/product/braintree/token"
      );
      const data = await response.json();
      if (data) {
        SetClientToken(data.clientToken);
      }
    } catch (error) {
      console.log(error);
    }
  }
  //handle payment

  async function HandlePayment() {
    try {
      SetLoading(true);

      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/product/braintree/payment",
        {
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Authorization: auth?.token,
          },
          method: "POST",
          body: JSON.stringify(Cart),
        }
      );
      console.log(response);
      SetLoading(false);
      localStorage.removeItem("Cart");
      setCart([]);
      toast.success("Payment Succesfull");
      setTimeout(() => {
        Navigate("/dashboard/user/orders");
      }, 2000);
    } catch (error) {
      console.log(error);
      SetLoading(false);
    }
  }

  useEffect(() => {
    GetToken();
  }, [auth?.token]); //call the function only if the user is logged in
  //keep it to get drop in rendered

  return (
    <Layout>
      <div style={{ width: "100%" }} className="mt-3">
        <h4 className="text-center">
          You have{" "}
          {Cart.length < 2 ? Cart.length + " item" : Cart.length + " items"} in
          your cart.{" "}
        </h4>
        {auth?.token ? (
          //cart page items

          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            {Cart.length > 0 ? (
              <div
                className="d-flex justify-content-start"
                style={{ width: "90%" }}
              >
                <div
                  className="d-flex flex-column"
                  style={{ gap: "1rem", width: "50%" }}
                >
                  {Cart?.map((p) => (
                    <div className="d-flex justify-content-between border border-2 p-2">
                      <div style={{ width: "50%" }}>
                        <img
                          src={`https://ecomwebapp.onrender.com/api/v1/product/get-productPhoto/${p._id}`}
                          className="card-img-top"
                          style={{ height: "100%", width: "10rem" }}
                        />
                      </div>

                      <div
                        className="d-flex flex-column align-items-start justify-content-start ProductDetailsCard p-2"
                        style={{ width: "100%" }}
                      >
                        <h5 className="card-title">{p.name}</h5>
                        <p
                          className="card-text"
                          style={{ marginBottom: "0rem" }}
                        >
                          {p.description.substring(0, 20)}...
                        </p>
                        <p className="card-text">Price: $ {p.price} </p>

                        <div
                          className="d-flex flex-column"
                          style={{ width: "55%" }}
                        >
                          <button
                            className="btn btn-primary ButtonBorder"
                            onClick={() => {
                              Navigate(`/ProductDetails/${p.slug}`);
                            }}
                          >
                            More details
                          </button>
                          <button
                            className="btn btn-danger mt-2 ButtonBorder"
                            onClick={() => {
                              RemoveCartItems(p._id);
                            }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="d-flex flex-column CartFixed" style={{ width: "40%" }}>
                  <h2 className="text-center " style={{margin:"0"}}>Cart Summary</h2>
                
                  <hr />
                  <div className="card p-2">
                    <h5>
                      <b>Total Payable Amount:</b> ${TotalPrice()}.00 (This is only for demo purpose you can pay)
                    </h5>
                    <h5>
                      <b>Shipping Address:</b> {auth.user.Address}{" "}
                      <button
                        className="btn btn-dark"
                        onClick={() => {
                          Navigate("/dashboard/user/profile");
                        }}
                      >
                        Change Address
                      </button>
                    </h5>
                    <div className="d-flex flex-column align-items-center">
                      {!ClientToken || !Cart.length ? null : (
                        <>
                          <DropIn
                            options={{
                              authorization: ClientToken,
                            }}
                            onInstance={(instance) => Setinstance(instance)}
                          />
                          <button
                          
                            className="btn btn-primary ButtonBorder"
                            onClick={() => {
                              HandlePayment();
                            }}
                            disabled={!instance}
                          >
                            {loading ? "Processing.." : "Make Payment"}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-column">
                <img src={emptycart} style={{ width: "20rem" }}></img>
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    Navigate("/");
                  }}
                >
                  Add Items to cart
                </button>
              </div>
            )}
          </div>
        ) : (
          //message if not login
          <div className="text-center d-flex flex-column align-items-center">
            <h4>Please login to access your cart</h4>
            <button
              className="btn btn-primary"
              onClick={() => {
                Navigate("/login");
              }}
            >
              Login
            </button>
            <img src={cartimage}></img>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
