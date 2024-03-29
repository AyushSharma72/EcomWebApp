import { useState } from "react";
import React from "react";
import Layout from "../components/layout/layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [Name, SetName] = useState("");
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Answer, SetAnswer] = useState("");
  const [Address, SetAddress] = useState("");
  const navigate = useNavigate();
  const [Loading, SetLoading] = useState(false);
  async function handleSubmit(e) {
    try {
      e.preventDefault();
      SetLoading(true);

      if (Password.length < 6) {
        toast.error("Password length must be more than 6");
        SetLoading(false);
        return;
      }
      const response = await fetch(
        "https://ecomwebapp.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Name,
            Email,
            Password,
            Answer,
            Address,
          }),
        }
      );

      if (response.status === 201) {
        SetLoading(false);

        toast.success("Registration Successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (response.status === 409) {
        // User already exists
        SetLoading(false);
        const data = await response.json();
        toast.error(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      SetLoading(false);
      toast.error(error);
    }
  }
  return (
    <Layout>
      <form
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onSubmit={(e) => {
          handleSubmit(e);
        }}
        className="FormBackgound"
      >
        <div className="registerform  ">
          <h1 style={{ margin: "0%" }}>Register</h1>
          <div className="mb-3 wi">
            <label htmlFor="exampleInputName" className="form-label">
              Name
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
              required
            />
          </div>

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

          <div className="mb-3 wi">
            <label className="form-label">What is the name of your pet animal ?</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Security Question"
              value={Answer}
              onChange={(e) => {
                SetAnswer(e.target.value);
              }}
              required
            />
          </div>

          <button type="submit" className="btn btn-dark" disabled={Loading}>
            {Loading ? "Loading..." : " Register"}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default Register;
