import React from "react";
import Layout from "../components/layout/layout";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  const parsedAuth = JSON.parse(localStorage.getItem("auth"));
  return (
    <Layout>
      <div
        className="d-flex align-items-center flex-column mt-3"
        style={{ gap: "2rem" }}
      >
        <div>
          <h1>User Dashboard</h1>
        </div>

        <div className="card w-75 p-3 ">
          <h3>Name: {parsedAuth?.user?.Name}</h3>
          <h3>Email: {parsedAuth?.user?.Email}</h3>
          <h3>Address: {parsedAuth?.user?.Address}</h3>
        </div>
        <div className="d-flex justify-content-around w-25">
          <button
            className="btn btn-info ButtonBorder"
            style={{ fontWeight: "700", width: "10rem" }}
          >
            <NavLink
              to="/dashboard/user/Profile"
              className="list-group-item list-group-item-action"
            >
              Edit Profile
            </NavLink>
          </button>
          <button
            className="btn btn-info ButtonBorder"
            style={{ fontWeight: "700", width: "10rem" }}
          >
            <NavLink
              to="/dashboard/User/Orders"
              className="list-group-item list-group-item-action"
            >
              Your Orders
            </NavLink>
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
