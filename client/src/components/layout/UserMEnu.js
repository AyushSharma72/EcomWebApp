import React from "react";
import { NavLink } from "react-router-dom";
const UserMEnu = () => {
  return (
    <>
      <div className="text-center" >
        <div className="list-group">
          <h1>User Dashboard</h1>
         
          <NavLink
            to="/dashboard/user/Profile"
            className="list-group-item list-group-item-action"
          >
           Edit Profile
          </NavLink>
          <NavLink
            to="/dashboard/User/Orders"
            className="list-group-item list-group-item-action"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMEnu;
