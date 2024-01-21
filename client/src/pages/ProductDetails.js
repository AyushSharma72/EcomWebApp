import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/layout/layout";
import { useCart } from "../context/cart";
const ProductDetails = () => {
  const Navigate = useNavigate();
  const params = useParams();
  const [Detail, SetDetails] = useState([]);
  const [similarProducts, SetsimilarProducts] = useState([]);
  const [Cart, SetCart] = useCart();

  async function GetProduct() {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/getSingle-product/${params.slug}`
      );

      const data = await response.json();
      SetDetails(data.product);
      SimilarProducts(data?.product[0]._id, data?.product[0].category._id);
    } catch (error) {
      toast.error("Error Showing details");
      console.log(error);
      setTimeout(() => {
        Navigate("/");
      }, 2000);
    }
  }

  async function SimilarProducts(pid, cid) {
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/product/product-similar/${pid}/${cid}`
      );
      const data = await response.json();
      console.log(data);
      SetsimilarProducts(data.similarproducts);
    } catch (error) {
      toast.error("Error Getting Similar Products");
    }
  }
  useEffect(() => {
    GetProduct();
  }, []);
  return (
    <Layout>
      <div className="d-flex  mt-3 flex-column align-items-center">
        {Detail.map((p) => (
          <div
            className="d-flex  justify-content-around mb-3"
            style={{ width: "70%" }}
          >
            <div style={{ width: "40%" }} className="d-flex ">
              <img
                src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                className="card-img-top"
                style={{ height: "25rem" }}
              />
            </div>

            <div
              className="d-flex flex-column align-items-start"
              style={{ width: "40%" }}
            >
              <h3 className="text-center">ProductDetails</h3>
              <p className="card-title">
                <b>Name:</b> {p.name}
              </p>
              <p className="mb-0">
                <b>Description :</b> {p.description}
              </p>
              <p className="card-text mb-0">
                <b>Price:</b> ${p.price}{" "}
              </p>
              <p className="mb-0">
                <b>Category :</b> {p.category.name}
              </p>
              <div className="d-flex justify-content-around mt-3">
                <button
                  className="btn btn-light  border-dark border-2"
                  onClick={() => {
                    SetCart([...Cart, p]);
                    localStorage.setItem("Cart", JSON.stringify([...Cart, p]));
                    toast("Item Added to cart!", {
                      icon: "👍",
                    });
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
        <div style={{ width: "100%" }}>
          {similarProducts.length > 0 ? (
            <div className="d-flex flex-column align-items-center mt-3">
              <h2
                style={{
                  marginBottom: "3rem",
                  textAlign: "center",
                  width: "100%",
                  fontWeight: "700",
                }}
              >
                Similar Products
              </h2>
              <div
                className="d-flex  justify-content-around flex-wrap "
                style={{ width: "100%" }}
              >
                {similarProducts.map((p) => (
                  <div
                    className="d-flex  justify-content-around"
                    style={{ width: "70%" }}
                  >
                    <div style={{ width: "40%" }}>
                      <img
                        src={`http://localhost:8000/api/v1/product/get-productPhoto/${p._id}`}
                        className="card-img-top"
                        style={{ height: "80%" }}
                      />
                    </div>

                    <div
                      className="d-flex flex-column align-items-start"
                      style={{ width: "40%" }}
                    >
                      <h3 className="text-center">ProductDetails</h3>
                      <p className="card-title">
                        <b>Name:</b> {p.name}
                      </p>
                      <p className="mb-0">
                        <b>Description :</b> {p.description}
                      </p>
                      <p className="card-text mb-0">
                        <b>Price:</b> ${p.price}{" "}
                      </p>
                      <p className="mb-0">
                        <b>Category :</b> {p.category.name}
                      </p>
                      <div className="d-flex justify-content-around mt-3">
                        <button
                          className="btn btn-light  border-dark border-2"
                          onClick={() => {
                            SetCart([...Cart, p]);
                            localStorage.setItem(
                              "Cart",
                              JSON.stringify([...Cart, p])
                            );
                            toast("Item Added to cart!", {
                              icon: "👍",
                            });
                          }}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h2
              style={{
                marginBottom: "3rem",
                textAlign: "center",
                width: "100%",
                fontWeight: "700",
              }}
            >
              No similar products found
            </h2>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
