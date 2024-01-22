  import React from "react";
import { NavLink } from "react-router-dom";
import "./../../App.css";
import { useAuth } from "../../context/auth";
import SearchBar from "../../pages/form/searchBar";
import toast from "react-hot-toast";
import Usecategory from "../hooks/usecategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import { IoCartSharp } from "react-icons/io5";
function Header() {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const category = Usecategory();
  function HandleLogout() {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    setTimeout(() => {
      toast.success("logout Successfull");
    }, 500);
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary "
        style={{ zIndex: "3" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink to="/" className="navbar-brand" href="#">
              {" "}
              ECommerce App
            </NavLink>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" href="#">
                  Home
                </NavLink>
              </li>

              <li class="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </NavLink>
                <ul className="dropdown-menu">
                  {category?.map((c) => (
                    <li>
                      <NavLink
                        to={`/categories/${c._id}`}
                        className="dropdown-item"
                        style={{ backgroundColor: "white", color: "black" }}
                      >
                        {c.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link" href="#">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link" href="#">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth.user.Name}
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.Role === 1 ? `Admin` : `user`
                          }`}
                          className="dropdown-item"
                          href="#"
                        >
                          Dashboard
                        </NavLink>
                      </li>

                      <li>
                        <NavLink
                          className="dropdown-item nav-item"
                          to="/login"
                          onClick={HandleLogout}
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item">
                <NavLink to="/UserCart" className="nav-link">
                <IoCartSharp />
                <sup><Badge count={cart?.length} showZero></Badge></sup>
                </NavLink>
               
              </li>
            </ul>
          </div>
          <SearchBar />
        </div>
      </nav>
    </>
  );
}

export default Header;
