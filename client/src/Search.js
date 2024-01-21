import React from "react";
import Layout from "./components/layout/layout";
import { useSearch } from "./context/Searchcontext";
import { useNavigate } from "react-router-dom";
const Search = () => {
  const Navigate = useNavigate();
  const [values, SetValues] = useSearch();
  return (
    <Layout>
      <div className="d-flex flex-column text-center mt-3">
        <div>Search Results</div>
        <div>
          {values.Products.length < 1
            ? "No Products found"
            : `Found ${values.Products.length} Produts`}

          <div
            className="d-flex justify-content-around flex-wrap "
            style={{ height: "100%", gap: "0.5rem" }}
          >
            {values.Products.map((p) => (
              <div
                className="card d-flex border border-3"
                style={{ width: "25%", height: "100%" }}
              >
                <img
                  src={`https://ecomwebapp.onrender.com/get-productPhoto/${p._id}`}
                  className="card-img-top"
                  style={{ height: "15rem", width: "100%" }}
                />

                <div className="card-body text-start">
                  <h5 className="card-title">{p.name.substring(0, 15)}...</h5>
                  <p className="card-text">
                    {p.description.substring(0, 20)}...
                  </p>
                  <p className="card-text">Price: $ {p.price} </p>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-primary"
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
      </div>
    </Layout>
  );
};

export default Search;
