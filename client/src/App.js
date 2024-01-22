import { Routes, Route } from "react-router-dom";
import Home from "./pages/homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/register";
import Login from "./pages/login";
import Dashboard from "./user/dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import PrivateRoute from "./components/routes/privateroute";
import Forgotpassword from "./pages/forgotpassword";
import AdminRoute from "./components/routes/Adminroute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CeateProduct";
import Orders from "./user/orders";
import Profile from "./user/Profile";
import Products from "./pages/Admin/products";
import UpdateProduct from "./pages/Admin/updateproduct";
import Search from "./Search";
import ProductDetails from "./pages/ProductDetails";
import Categorylist from "./pages/categorylist";
import CartPage from "./pages/CartPage";
import Adminorder from "./pages/Admin/Adminorder";
import AdminProfile from "./pages/Admin/AdminProfile";
function App() {
  return (
    <>
      <Routes>
        <Route
          path="/ProductDetails/:slug"
          element={<ProductDetails></ProductDetails>}
        ></Route>
        <Route path="/UserCart" element={<CartPage></CartPage>}></Route>
        <Route path="/search" element={<Search></Search>}></Route>
        <Route path="/categories/:id" element={<Categorylist />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/About" element={<About />}></Route>
        <Route path="/ContactUs" element={<Contact />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/ForgotPassword" element={<Forgotpassword />}></Route>

        <Route path="/Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />}></Route>
          <Route path="user/orders" element={<Orders />}></Route>
          <Route path="user/Profile" element={<Profile />}></Route>
        </Route>

        <Route path="/Dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />}></Route>
          <Route
            path="admin/Create-Category"
            element={<CreateCategory />}
          ></Route>
          <Route
            path="admin/Create-Product"
            element={<CreateProduct></CreateProduct>}
          ></Route>

          <Route path="admin/Product" element={<Products></Products>}></Route>
          <Route
            path="admin/Update-Product/:slug"
            element={<UpdateProduct />}
          ></Route>
          <Route
            path="Admin/Orders"
            element={<Adminorder></Adminorder>}
          ></Route>
             <Route path="Admin/Profile" element={<AdminProfile/>}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
