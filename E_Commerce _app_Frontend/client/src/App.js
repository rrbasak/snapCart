import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPassword";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateSubCategory from "./pages/Admin/CreateSubCategory";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import CartPage from "./pages/CartPage";
import AdminOrders from "./pages/Admin/AdminOrders";
import AdminPrimeDay from "./pages/Admin/AdminPrimeDay";
import CreateProductRAM from "./pages/Admin/CreateProductRAM";
import CreateProductSize from "./pages/Admin/CreateProductSize";
import CreateProductColor from "./pages/Admin/CreateProductColor";
import OneOrder from "./pages/user/OneOrder";
import SubCategories from "./pages/SubCategories";
import AdminHome from "./pages/Admin/AdminDashboard/pages/Home";
import DeliveryPartnerHome from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/Home";

import Billing from "./pages/Admin/AdminDashboard/pages/Billing";
import AdminProfile from "./pages/Admin/AdminDashboard/pages/Profile";
import DeliveryPartnerOrders from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/DeliveryPartnerOrders";
import TrackShipments from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/Billing";
import DeliveryPartnerPayment from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/Billing";
import DeliveryPartnerProfile from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/Profile";
import { useAuth } from "./context/auth";
import DeliveryPartnerDashboard from "./pages/DeliveryPartner/DeliveryPartnerDashboard";
import DeliveryPartners from "./pages/Admin/AdminDashboard/pages/DeliveryPartners";
import PendinApprovals from "./pages/Admin/AdminDashboard/pages/PendinApprovals";
import DeliverypartnerDeliveryHistory from "./pages/DeliveryPartner/DeliveryPartnerDashboard/pages/DeliverypartnerDeliveryHistory";
import VehicleDetailsForm from "./pages/DeliveryPartner/VehicleDetailsForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import OrdersAnother from "./pages/user/OrdersAnother";
// import ScrollToTop from "./components/commonComponents/ScrollToTop";

function App() {
  const [auth, setAuth] = useAuth();
  const location = useLocation();
  // const authenticate = useSelector((state) => state.auth.auth);

  // useEffect(() => {
  //   console.log("Auth state from Redux:", authenticate);
  // }, [authenticate]);

  // if (authenticate === null) {
  //   return <div>Loading...</div>;
  // }
  // Role-Based Route Guards
  const USER_ROUTE = ({ children }) => {
    return auth?.user?.role === 0 ? (
      children
    ) : (
      <Pagenotfound state={{ from: location.pathname }} />
    );
  };

  const ADMIN_ROUTE = ({ children }) => {
    return auth?.user?.role === 1 ? (
      children
    ) : (
      <Pagenotfound state={{ from: location.pathname }} />
    );
  };
  const DELIVERY_PARTNER_ROUTE = ({ children }) => {
    return auth?.user?.role === 2 ? (
      children
    ) : (
      <Pagenotfound state={{ from: location.pathname }} />
    );
  };
  // if (auth?.user === null) {
  //   return <div>Loading...</div>;
  // }

  return (
    <>
      <Routes>
        {/* 404 Route */}
        <Route path="*" element={<Pagenotfound />} />
        {/* Home Route for Both User and Admin and Delivery Partner*/}
        <Route
          path="/"
          element={
            auth?.user ? (
              auth.user.role === 1 ? ( // Admin Dashboard hain
                <AdminDashboard>
                  <AdminHome />
                </AdminDashboard>
              ) : auth.user.role === 2 ? ( // Delivery Partner Dashboard hain
                <DeliveryPartnerDashboard>
                  <DeliveryPartnerHome />
                </DeliveryPartnerDashboard>
              ) : (
                // If not admin or delivery partner, render HomePage yeah
                <HomePage />
              )
            ) : (
              // If no user is logged in, render HomePage yeah
              <HomePage />
            )
          }
        />
        {/* Common Routes */}
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="categories" element={<Categories />} />
        <Route path="category/:slug" element={<SubCategories />} />
        <Route path="category/:cname/:subname" element={<CategoryProduct />} />
        <Route path="product/:slug" element={<ProductDetails />} />
        <Route path="search" element={<Search />} />
        <Route path="dashboard/profile" element={<Profile />} />
        <Route path="dashboard/order" element={<OneOrder />} />
        {/* User Routes */}
        <Route
          path="/*"
          element={
            !auth?.user ? (
              <Navigate to="/login" />
            ) : (
              <USER_ROUTE>
                <PrivateRoute />
              </USER_ROUTE>
            )
          }
        >
          <Route path="cart" element={<CartPage />} />
        </Route>

        {/* User Dashboard Routes */}
        <Route
          path="/dashboard/*"
          element={
            !auth?.user ? (
              <Navigate to="/login" />
            ) : (
              <USER_ROUTE>
                <PrivateRoute />
              </USER_ROUTE>
            )
          }
        >
          <Route path="*" element={<Pagenotfound />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order" element={<OneOrder />} />
          <Route path="profile/*" element={<Profile />}>
            <Route path="*" element={<Pagenotfound />} />
          </Route>
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/dashboard/admin/*"
          element={
            !auth?.user ? (
              <Navigate to="/login" />
            ) : auth?.user?.role === 1 ? (
              <ADMIN_ROUTE>
                <AdminDashboard />
              </ADMIN_ROUTE>
            ) : (
              <Pagenotfound state={{ from: location.pathname }} />
            )
          }
        >
          <Route path="*" element={<Pagenotfound />} />
          <Route path="" element={<AdminHome />} />
          <Route path="tables" element={<DeliveryPartners />} />
          <Route path="order-table" element={<AdminOrders />} />
          <Route path="order-pending-approvals" element={<PendinApprovals />} />
          <Route path="create-sub-category" element={<CreateSubCategory />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product-ram" element={<CreateProductRAM />} />
          <Route path="create-product-size" element={<CreateProductSize />} />
          <Route path="create-product-color" element={<CreateProductColor />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="create-subcategory" element={<CreateSubCategory />} />
          <Route path="products" element={<Products />} />
          <Route path="billing" element={<Billing />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="products/:slug" element={<UpdateProduct />} />
          <Route path="prime-day" element={<AdminPrimeDay />} />
          <Route path="users" element={<Users />} />
        </Route>
        {/* Delivery Partner Dashboard Routes */}
        <Route
          path="/dashboard/delivery/*"
          element={
            !auth?.user ? (
              <Navigate to="/login" />
            ) : auth?.user?.role === 2 ? (
              <DELIVERY_PARTNER_ROUTE>
                <DeliveryPartnerDashboard />
              </DELIVERY_PARTNER_ROUTE>
            ) : (
              <Pagenotfound state={{ from: location.pathname }} />
            )
          }
        >
          <Route path="*" element={<Pagenotfound />} />
          <Route path="" element={<DeliveryPartnerHome />} />
          <Route path="otable" element={<DeliveryPartnerOrders />} />
          <Route path="track-shipments" element={<TrackShipments />} />
          <Route path="ohistory" element={<DeliverypartnerDeliveryHistory />} />
          <Route path="payment" element={<DeliveryPartnerPayment />} />
          <Route path="profile" element={<DeliveryPartnerProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
