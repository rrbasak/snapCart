import { Routes, Route } from "react-router-dom";
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
// import ScrollToTop from "./components/commonComponents/ScrollToTop";

function App() {
  return (
    <>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<SubCategories />} />
        {/* <Route path="/category/:subcategories" element={<SubCategories />} /> */}
        <Route path="/category/:cname/:subname" element={<CategoryProduct />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/order" element={<OneOrder />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          {/* <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} /> */}

          {/* <Route path="orders" element={<Orders />} /> */}
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route
            path="admin/create-subcategory"
            element={<CreateSubCategory />}
          />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route
            path="admin/create-product-ram"
            element={<CreateProductRAM />}
          />
          <Route
            path="admin/create-product-size"
            element={<CreateProductSize />}
          />
          <Route
            path="admin/create-product-color"
            element={<CreateProductColor />}
          />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path="admin/prime-day" element={<AdminPrimeDay />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasssword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
      </Routes>
    </>
  );
}

export default App;
