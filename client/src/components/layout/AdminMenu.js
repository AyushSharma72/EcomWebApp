import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <div className="text-center AdminMenu w-25" >
        <div className="list-group ">
            <h1>Admin Panel</h1>
          <NavLink to="/dashboard/admin/create-Category" className="list-group-item list-group-item-action">
            Create Category
          </NavLink>
          <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">
            Create Product
          </NavLink>
          <NavLink to="/dashboard/admin/Product" className="list-group-item list-group-item-action">
            Edit Products
          </NavLink>
          <NavLink to="/dashboard/admin/Orders" className="list-group-item list-group-item-action">
           Orders
          </NavLink>
          <NavLink to="/dashboard/admin/profile" className="list-group-item list-group-item-action">
           Edit Your Profile
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
