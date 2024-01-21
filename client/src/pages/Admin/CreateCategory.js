import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/layout";
import AdminMenu from "./../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";

import toast from "react-hot-toast";
const CreateCategory = () => {
  const [categories, SetCategories] = useState([]);
  const [name, SetName] = useState("");
  const [auth, setAuth] = useAuth();

  const [visible, Setvisible] = useState(false);
  const [selected, Setselected] = useState(null);
  const [UpdateName, SetUpdateName] = useState("");

  async function GetCategories() {
    try {
      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/category/api/v1/category/GetAll-category",

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data) {
        SetCategories(data.category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    GetCategories();
  }, []);

  async function HandleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/category/api/v1/category/create-category",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
          body: JSON.stringify({
            name,
          }),
        }
      );
      SetName("");
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        GetCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong ");
    }
  }

  //update category
  async function HandleUpdate(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://ecomwebapp.onrender.com/api/v1/category/update-category/${selected._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
          body: JSON.stringify({
            name: UpdateName,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        Setselected(null);
        Setvisible(false);
        GetCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong ");
    }
  }

  //delete category
  async function HandleDelete(id) {
    try {
      const response = await fetch(
        `https://ecomwebapp.onrender.com/api/v1/category/Delete-category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        GetCategories();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong ");
    }
  }
  return (
    <Layout>
      <div
        className="d-flex justify-content-around mt-3 overflow-auto"
        style={{ height: "100%" }}
      >
        <div className="w-50">
          <AdminMenu />
        </div>
        <div
          className="w-75 d-flex flex-column "
          style={{ gap: "2rem", height: "100%" }}
        >
          <h1 className=" mt-2">Manage Category</h1>
          <div>
            <div className="w-75">
           
              <form onSubmit={HandleSubmit}>
                <div className="mb-3 ">
                  <input
                    type="text"
                    placeholder="Add New Category"
                    value={name}
                    onChange={(e) => {
                      SetName(e.target.value);
                    }}
                    className="w-100"
                  ></input>
                </div>

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <table className="table table-striped table-hover table-bordered  ">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((c, index) => (
                  <tr key={c.id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn  btn-primary"
                        onClick={() => {
                          Setvisible(true);
                          SetUpdateName(c.name);
                          Setselected(c);
                        }}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className="btn  btn-danger"
                        onClick={() => {
                          HandleDelete(c._id);
                        }}
                      >
                        delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <>
            <Modal
              visible={visible}
              onCancel={() => {
                Setvisible(false);
              }}
              footer={null}
            >
              <div className="w-75">
            
                <form onSubmit={HandleUpdate}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Edit Name"
                      value={UpdateName}
                      onChange={(e) => {
                        SetUpdateName(e.target.value);
                      }}
                      className="w-100"
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </Modal>
          </>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
