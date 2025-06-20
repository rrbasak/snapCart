import React from "react";
import { Drawer, Menu } from "antd";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { AppstoreOutlined } from "@ant-design/icons";
import styles from "../../styles/RightSideBar.module.css";
import toast from "react-hot-toast";
import Icon from "../commonComponents/Icon";

export default function RightSideBar({ open, onClose }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Derive the current active tab from the route
  const currentPath = location.pathname;
  console.log("location", location);
  console.log("currentPath", currentPath);
  console.log("activeTab", location.state?.activeTab);
  // Map paths to keys for active tab tracking
  const menuKeyMap = {
    "/dashboard/admin": "dashboard",
    // "/dashboard/admin/tables": "users",
    "/dashboard/admin/order-table": "orders",
    "/dashboard/admin/order-pending-approvals": "ordpendingApprovalsers",
    "/dashboard/admin/tables": "partners",
    "/dashboard/admin/create-category": "manage-category",
    "/dashboard/admin/create-sub-category": "manage-sub-category",
    "/dashboard/admin/create-product-ram": "manage-ram",
    "/dashboard/admin/create-product-size": "manage-size",
    "/dashboard/admin/create-product-color": "manage-color",
    "/dashboard/admin/create-product": "create-product",
    "/dashboard/admin/products": "products",
    "/dashboard/admin/prime-day": "prime-day",
    "/dashboard/admin/billing": "billing",
    "/dashboard/admin/profile": "profile",
    "/dashboard/profile": "userprofile",
    "/dashboard/delivery/otable": "otable",
    "/dashboard/delivery/track-shipments": "track",
    "/dashboard/delivery/ohistory": "ohistory",
    "/dashboard/delivery/payment": "payment",
  };

  // const activeKey = menuKeyMap[currentPath] || "dashboard";
  const activeKey =
    auth?.user?.role === 0
      ? "userprofile"
      : menuKeyMap[currentPath] || "dashboard";

  // const handleNavigation = (path) => {
  //   navigate(path);
  // };
  const handleNavigation = (path, state = {}) => {
    navigate(path, state);
  };

  const Header = () => {
    const userName = auth?.user?.name || "Guest";
    const displayName = userName.split(" ")[0];
    return <div className={styles.header}>Hello, {displayName}</div>;
  };
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      accessToken: "",
    });
    localStorage.removeItem("auth");
    // toast.success("Logout Successfully");
    navigate("/login");
  };
  console.log("activeKey", activeKey);
  return (
    <Drawer
      title={<Header />}
      placement="right"
      open={open}
      onClose={onClose}
      width={250}
      bodyStyle={{
        padding: 0,
        backgroundColor: "#f9f9f9",
      }}
      className={styles.drawer}
    >
      <Menu
        mode="inline"
        selectedKeys={[activeKey]}
        className={styles.menu}
        style={{ borderRight: 0 }}
      >
        {auth?.user?.role === 0 && (
          <>
            <Menu.Item
              key="orders"
              icon={<Icon type="ordertable" color="#1890ff" />}
              onClick={() =>
                handleNavigation("/dashboard/profile", {
                  state: { activeTab: "orders" },
                })
              }
              style={{ paddingLeft: "17px" }}
              className={
                activeKey === "userprofile" &&
                location.state?.activeTab === "orders"
                  ? styles.selected
                  : ""
              }
            >
              Orders
            </Menu.Item>
            <Menu.ItemGroup key="account" title="Account Pages">
              <Menu.Item
                key="profile"
                icon={<Icon type="profile" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/profile", {
                    state: { activeTab: "personalAndAddress" },
                  })
                }
                style={{ paddingLeft: "17px" }}
                className={
                  activeKey === "userprofile" &&
                  location.state?.activeTab === "personalAndAddress"
                    ? styles.selected
                    : ""
                }
              >
                Profile
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<Icon type="logout" color="#1890ff" />}
                onClick={handleLogOut}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "logout" ? styles.selected : ""}
              >
                Logout
              </Menu.Item>
            </Menu.ItemGroup>
          </>
        )}
        {auth?.user?.role === 1 && (
          <>
            <Menu.Item
              key="dashboard"
              icon={<Icon type="dashboard" color="#1890ff" />}
              onClick={() => {
                const role = auth?.user?.role === 1 ? "admin" : "user";
                navigate(`/dashboard/${role}`);
              }}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "dashboard" ? styles.selected : ""}
            >
              Dashboard
            </Menu.Item>
            {/* <Menu.Item
              key="users"
              icon={<Icon type="usertable" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/admin/tables")}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "users" ? styles.selected : ""}
            >
              Users
            </Menu.Item> */}
            <Menu.Item
              key="orders"
              icon={<Icon type="ordertable" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/admin/order-table")}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "orders" ? styles.selected : ""}
            >
              Orders
            </Menu.Item>
            <Menu.Item
              key="ordpendingApprovalsers"
              icon={<Icon type="pendingApprovals" color="#1890ff" />}
              onClick={() =>
                handleNavigation("/dashboard/admin/order-pending-approvals")
              }
              style={{
                paddingLeft: "17px",
              }}
              className={
                activeKey === "ordpendingApprovalsers" ? styles.selected : ""
              }
            >
              Pending Approval(s)
            </Menu.Item>
            <Menu.Item
              key="prime-day"
              icon={<Icon type="primeday" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/admin/prime-day")}
              style={{ paddingLeft: "17px" }}
              className={activeKey === "prime-day" ? styles.selected : ""}
            >
              Prime Day
            </Menu.Item>
            <Menu.Item
              key="partners"
              icon={<Icon type="partners" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/admin/tables")}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "partners" ? styles.selected : ""}
            >
              Partner(s)
            </Menu.Item>
            {/* <Menu.Item
              key="billing"
              icon={<Icon type="billing" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/admin/billing")}
              style={{ paddingLeft: "17px" }}
              className={activeKey === "billing" ? styles.selected : ""}
            >
              Billing
            </Menu.Item> */}
            <Menu.SubMenu
              key="manage-category"
              title="Manage Category"
              icon={<AppstoreOutlined />}
            >
              <Menu.Item
                key="manage-category"
                icon={<Icon type="createCategoryIcon" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-category")
                }
                style={{ paddingLeft: "17px" }}
                className={
                  activeKey === "manage-category" ? styles.selected : ""
                }
              >
                Category
              </Menu.Item>
              <Menu.Item
                key="manage-sub-category"
                icon={<Icon type="createSubcategoryIcon" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-sub-category")
                }
                style={{ paddingLeft: "17px" }}
                className={
                  activeKey === "manage-sub-category" ? styles.selected : ""
                }
              >
                Subcategory
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu
              key="manage-product"
              title="Manage Products"
              icon={<AppstoreOutlined />}
            >
              <Menu.Item
                key="manage-ram"
                icon={<Icon type="createProductRam" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-product-ram")
                }
                style={{ paddingLeft: "17px" }}
                className={activeKey === "manage-ram" ? styles.selected : ""}
              >
                Product RAM
              </Menu.Item>
              <Menu.Item
                key="manage-size"
                icon={<Icon type="createProductSize" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-product-size")
                }
                style={{ paddingLeft: "17px" }}
                className={activeKey === "manage-size" ? styles.selected : ""}
              >
                Product Size
              </Menu.Item>
              <Menu.Item
                key="manage-color"
                icon={<Icon type="createProductColor" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-product-color")
                }
                style={{ paddingLeft: "17px" }}
                className={activeKey === "manage-color" ? styles.selected : ""}
              >
                Product Color
              </Menu.Item>
              <Menu.Item
                key="create-product"
                icon={<Icon type="createProduct" color="#1890ff" />}
                onClick={() =>
                  handleNavigation("/dashboard/admin/create-product")
                }
                style={{ paddingLeft: "17px" }}
                className={
                  activeKey === "create-product" ? styles.selected : ""
                }
              >
                Create Product
              </Menu.Item>
              <Menu.Item
                key="products"
                icon={<Icon type="productlist" color="#1890ff" />}
                onClick={() => handleNavigation("/dashboard/admin/products")}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "products" ? styles.selected : ""}
              >
                Products
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.ItemGroup key="account" title="Account Pages">
              <Menu.Item
                key="profile"
                icon={<Icon type="profile" color="#1890ff" />}
                onClick={() => handleNavigation("/dashboard/admin/profile")}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "profile" ? styles.selected : ""}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<Icon type="logout" color="#1890ff" />}
                onClick={handleLogOut}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "logout" ? styles.selected : ""}
              >
                Logout
              </Menu.Item>
            </Menu.ItemGroup>
          </>
        )}
        {auth?.user?.role === 2 && (
          <>
            <Menu.Item
              key="dashboard"
              icon={<Icon type="dashboard" color="#1890ff" />}
              onClick={() => {
                const role = auth?.user?.role === 1 ? "admin" : "delivery";
                navigate(`/dashboard/${role}`);
              }}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "dashboard" ? styles.selected : ""}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="orders"
              icon={<Icon type="ordertable" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/delivery/otable")}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "otable" ? styles.selected : ""}
            >
              Orders
            </Menu.Item>
            <Menu.Item
              key="orders"
              icon={<Icon type="track" color="#1890ff" />}
              onClick={() =>
                handleNavigation("/dashboard/delivery/track-shipments")
              }
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "track" ? styles.selected : ""}
            >
              Track
            </Menu.Item>
            <Menu.Item
              key="orders"
              icon={<Icon type="ohistory" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/delivery/ohistory")}
              style={{
                paddingLeft: "17px",
              }}
              className={activeKey === "ohistory" ? styles.selected : ""}
            >
              History
            </Menu.Item>
            {/* <Menu.Item
              key="billing"
              icon={<Icon type="billing" color="#1890ff" />}
              onClick={() => handleNavigation("/dashboard/delivery/payment")}
              style={{ paddingLeft: "17px" }}
              className={activeKey === "payment" ? styles.selected : ""}
            >
              Earn
            </Menu.Item> */}
            <Menu.ItemGroup key="account" title="Account Pages">
              <Menu.Item
                key="profile"
                icon={<Icon type="profile" color="#1890ff" />}
                onClick={() => handleNavigation("/dashboard/delivery/profile")}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "profile" ? styles.selected : ""}
              >
                Profile
              </Menu.Item>
              <Menu.Item
                key="logout"
                icon={<Icon type="logout" color="#1890ff" />}
                onClick={handleLogOut}
                style={{ paddingLeft: "17px" }}
                className={activeKey === "logout" ? styles.selected : ""}
              >
                Logout
              </Menu.Item>
            </Menu.ItemGroup>
          </>
        )}
      </Menu>
    </Drawer>
  );
}
