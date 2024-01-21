import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout/layout";
import toast from "react-hot-toast";

const Categorylist = () => {
  const [CatProducts, SetCatProducts] = useState([]);
  const [Category, SetCategory] = useState([]);
  const Params = useParams();
  const Navigate = useNavigate();

  async function GetCatProduct() {
    try {
      const response = await fetch(
        `https://ecomwebapp.onrender.com/product-CategoryWise/${Params.id}`
      );
      const data = await response.json();
      if (data) {
        SetCatProducts(data.product);
        SetCategory(data.category);
       
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Retriving Products");
    }
  }

  useEffect(()=>{
    GetCatProduct();
  },[Params])
  return (
    <Layout>
      <div className="d-flex flex-column align-items-center">
        <h2 className="mt-3">Category :   {Category.name}</h2>
        <div
          className="d-flex justify-content-around flex-wrap "
          style={{ height: "100%", gap: "0.5rem",width:"100%" }}
        >
          {CatProducts.map((p) => (
            <div
              className="card d-flex border border-3"
              style={{ width: "22%", height: "100%" }}
            >
              <img
                src={`https://ecomwebapp.onrender.com/get-productPhoto/${p._id}`}
                className="card-img-top productimage"
                style={{ height: "15rem", width: "100%" }}
            />

              <div className="card-body text-start">
                <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                <p className="card-text">{p.description.substring(0, 20)}...</p>
                <p className="card-text">Price: <span className="priceSpan">$ {p.price}</span> </p>
                <div className="d-flex justify-content-around">
                  <button
                    className="btn btn-primary ButtonBorder"
                    onClick={() => {
                      Navigate(`/ProductDetails/${p.slug}`);
                    }}
                  >
                    More details
                  </button>
                  <button className="btn btn-light  border-dark border-2">
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categorylist;
