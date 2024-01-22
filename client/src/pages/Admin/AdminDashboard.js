import React from "react";
import Layout from "../../components/layout/layout";
import { NavLink } from "react-router-dom";
const AdminDashboard = () => {
  return (
    <Layout>
      <div className="d-flex flex-column mt-3 align-items-center">
        <div className="text-center">
          <h1>Admin Panel</h1>
        </div>
        <div className="d-flex justify-content-between mt-3 flex-column " style={{gap:"2rem",width:"50%"}}>
          <button className="btn btn-info btn-lg ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/admin/create-Category"
              className="list-group-item list-group-item-action"
            >
              Create New Category
            </NavLink>
          </button>
          <button className="btn btn-info  btn-lg  ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/admin/create-product"
              className="list-group-item list-group-item-action"
            >
              Create New Product
            </NavLink>
          </button>
          <button className="btn btn-info  btn-lg ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/admin/Product"
              className="list-group-item list-group-item-action"
            >
              Edit a Product
            </NavLink>
          </button>

          <button className="btn btn-info  btn-lg ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/admin/Orders"
              className="list-group-item list-group-item-action"
            >
             Edit Orders
            </NavLink>
          </button>

          <button className="btn btn-info  btn-lg ButtonBorder" style={{fontWeight:"700"}}>
            <NavLink
              to="/dashboard/Admin/Profile"
              className="list-group-item list-group-item-action"
            >
             Edit Your Profile
            </NavLink>
          </button>
        </div>
        {/* <AdminMenu></AdminMenu> */}
      </div>
    </Layout>
  );
};

export default AdminDashboard;
