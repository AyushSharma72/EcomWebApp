import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";
// import toast from "react-hot-toast";

import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [Loading, SetLoading] = useState(false);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
    
      SetLoading(true);
      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Email,
            Password,
          }),
        }
      );
      const data = await response.json();

      if (response.status === 404) {
        //user not registered
        SetLoading(false);
        toast.error(data.message);
      } else {
        if (response.status === 210) {
          // Invalid Password
          SetLoading(false);
          toast.error(data.message);
        } else {
          if (response.status === 200) {
            SetLoading(false);
            //login successful
            toast.success("Login Succesful");
            setAuth({
              ...auth, //spread auth to keep previous values as it is
              user: data.user,
              token: data.token,
            });
            localStorage.setItem("auth", JSON.stringify(data));
            setTimeout(() => {
              navigate("/");
            }, 2500);
          }
        }
      }
    } catch (error) {
      SetLoading(false);
      toast.error("Something went wrong try again");
    }
  }
  return (
    <Layout>
      <ToastContainer />
      <form
        style={{ display: "flex", justifyContent: "center" }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="FormBackgound"
      >
        {/* <Toaster /> */}
        <div className="registerform mt-3">
          <h1 style={{ fontWeight: "600" }}>LOGIN</h1>

          <div className="mb-3 wi">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
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
              required
            />
          </div>

          <div className="mb-3 wi">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={Password}
              onChange={(e) => {
                SetPassword(e.target.value);
              }}
              required
            />
          </div>

          <div
            className="mt-3"
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
            }}
          >
            <button type="submit" className="btn btn-dark" disabled={Loading}>
              {Loading ? "Loading..." : "Login"}
            </button>
            <button
              type="submit"
              className="btn btn-dark"
              onClick={() => {
                navigate("/ForgotPassword");
              }}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
};

export default Login;
