import React from "react";
import Layout from "../components/layout/layout";
import UserMEnu from "../components/layout/UserMEnu";
import { useState, useEffect } from "react";

import toast from "react-hot-toast";
import { useAuth } from "../context/auth";
const Profile = () => {
  const [auth, Setauth] = useAuth();
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Address, SetAddress] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();
      const response = await fetch(
        "http://localhost:8000/api/v1/auth/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth.token,
          },
          body: JSON.stringify({
            Name,
            Email,
            Password,
            Address,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 200) {
        Setauth({
          ...auth, //spread auth to keep previous values as it is
          user: data.UpdatedUser,
        });

        localStorage.setItem("auth", JSON.stringify(auth));
        toast.success(data.message);
      } else {
        toast(data.message, {
          icon: "❌",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Updating Profile");
    }
  }

  useEffect(() => {
    const { Email, Name, Address } = auth.user;
    SetName(Name);
    SetEmail(Email);
    SetAddress(Address);
  }, [auth?.user]);
  return (
    <Layout>
      <div
        className="d-flex justify-content-around"
        style={{ width: "100%", height: "100%" }}
      >
        <div className="d-flex mt-3">
          <UserMEnu />
        </div>
        <form
          style={{ display: "flex", justifyContent: "center", width: "70%" }}
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="FormBackgound"
        >
          <div className="registerform mt-3" style={{ width: "50%" }}>
            <h1>Update Profile</h1>

            <div className="mb-3 wi">
              <label htmlFor="exampleInputName" className="form-label">
                New Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Name}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3 wi">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Your Email address (Cannot be Changed)
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={Email}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
                disabled
              />
            </div>

            <div className="mb-3 wi">
              <label htmlFor="exampleInputPassword1" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={Password}
                onChange={(e) => {
                  SetPassword(e.target.value);
                }}
              />
            </div>
            <div className="mb-3 wi">
              <label className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                value={Address}
                onChange={(e) => {
                  SetAddress(e.target.value);
                }}
                required
              />
            </div>

            <button type="submit" className="btn btn-dark ">
              Update
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Profile;
