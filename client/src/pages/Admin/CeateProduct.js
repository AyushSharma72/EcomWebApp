import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { useAuth } from "../../context/auth";

const CreateProduct = () => {
  const [categories, SetCategories] = useState([]);
  const [photo, SetPhoto] = useState("");
  const [name, Setname] = useState("");
  const [description, Setdescription] = useState("");
  const [price, Setprice] = useState("");
  const [quantity, Setquantity] = useState("");
  const [shipping, Setshipping] = useState(false);
  const [category, Setcategory] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const { Option } = Select;

  //get all categories
  async function GetCategories() {
    try {
      const response = await fetch(
        "https://ecomwebapp.onrender.com/GetAll-category",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data?.success) {
        SetCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetCategories();
  }, []);

  async function HandleCreateProduct(e) {
    
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("shipping", shipping);
    formData.append("category", category);
    formData.append("photo", photo);
    try {
      const response = await fetch(
        "https://ecomwebapp.onrender.com/create-product",
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
          },
          body: formData,
        }
      );
      console.log("hi");
      const data = await response.json();
      if (data?.success) {
        toast.success("Product Created Succesfully");
        setTimeout(() => {
          navigate("/dashboard/admin/Product");
        }, 2000);
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong try Again");
    }
  }
  return (
    <Layout>
      
      <div
        className="d-flex justify-content-around mt-3 overflow-auto"
        style={{ height: "100%" }}
      >
        <div className="w-25">
          <AdminMenu />
        </div>
        <div className="w-50 d-flex flex-column" style={{ height: "100%" }}>
          <h1>Create Product</h1>
          <div className="w-75">
            <form onSubmit={HandleCreateProduct}>
              <Select
                border={true}
                placeholder="Select a category"
                size="large"
                showSearch
                className="w-100 "
                required
                onChange={(value) => {
                  Setcategory(value);
                }}
              >
                {categories.map((c, index) => (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                ))}
              </Select>

              <div className="mt-4">
                <label className="btn border border-3 w-100 btn-outline-primary ">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      SetPhoto(e.target.files[0]);
                    }}
                    hidden
                    required
                  ></input>
                </label>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Name the product"
                  className="form-control mt-3"
                  value={name}
                  onChange={(e) => {
                    Setname(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <div style={{ height: "25%" }}>
                <input
                  type="text"
                  placeholder="Description"
                  className="form-control mt-3 h-100"
                  value={description}
                  onChange={(e) => {
                    Setdescription(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <div>
                <input
                  type="Number"
                  placeholder="Price"
                  className="form-control mt-3"
                  value={price}
                  onChange={(e) => {
                    Setprice(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <div>
                <input
                  type="String"
                  placeholder="quantity"
                  className="form-control mt-3"
                  value={quantity}
                  onChange={(e) => {
                    Setquantity(e.target.value);
                  }}
                  required
                ></input>
              </div>

              <Select
                border={true}
                placeholder="Select Shipping"
                size="large"
                showSearch
                className="w-100 mt-2"
                required
                onChange={(value) => {
                  Setshipping(value);
                }}
              >
                <Option value="1">Yes</Option>
                <Option value="0">No</Option>
              </Select>

              <button type="submit" className="mt-2 btn btn-primary">
                Create Product
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
