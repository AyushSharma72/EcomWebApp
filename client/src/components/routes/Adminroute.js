import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import Spinner from "./spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const AuthCheck = async () => {
      try {
        const res = await fetch("https://ecomwebapp.onrender.com/AdminAuth", {
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        } else {
          setOk(false);
          console.log("no ok from server");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setOk(false);
      }
    };
    if (auth?.token) AuthCheck();
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path="/" />; // redirect to home page if user try to access the admin page path="/" is a prop here
}
