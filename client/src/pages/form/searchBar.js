import React, { useState } from "react";
import { useSearch } from "../../context/Searchcontext";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  async function HandleSubmit(e, Keyword) {
    e.preventDefault();
    try {
      if (Keyword) {
        const response = await fetch(
          `https://ecomwebapp.onrender.com/api/v1/product/product-search/${Keyword}`
        );
        const data = await response.json();
        if (response.status === 210) {
          toast.error(data.message);
        }
        setValues({ ...values, Products: data.Products });
      } else {
        const response = await fetch(
          "https://ecomwebapp.onrender.com/api/v1/product/get-product"
        );
        const data = await response.json();
        if (response.status === 210) {
          toast.error(data.message);
        }
        setValues({ ...values, Products: data.products });
        navigate("/search");
      }
    } catch (error) {
      toast.error("Error Searching products");
    }
  }
  return (
    <form className="d-flex" role="search" onSubmit={HandleSubmit}>
      <Toaster />
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        onChange={(e) => {
          // setValues({ ...values, Keyword: e.target.value });
          HandleSubmit(e, e.target.value);
        }}
        onFocus={() => {
          navigate("/search");
        }}
      />
    </form>
  );
};

export default SearchBar;
