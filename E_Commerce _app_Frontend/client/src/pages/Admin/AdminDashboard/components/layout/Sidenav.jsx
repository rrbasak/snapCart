import { Menu, Collapse } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  // const page = pathname.replace("/", "");
  const page = pathname.split("/").pop();
  //console.log("page", page);
  //console.log("pathname", pathname);
  const { Panel } = Collapse;
  const dashboard = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6V4Z"
        fill={color}
      ></path>
      <path
        d="M3 10C3 9.44771 3.44772 9 4 9H10C10.5523 9 11 9.44771 11 10V16C11 16.5523 10.5523 17 10 17H4C3.44772 17 3 16.5523 3 16V10Z"
        fill={color}
      ></path>
      <path
        d="M14 9C13.4477 9 13 9.44771 13 10V16C13 16.5523 13.4477 17 14 17H16C16.5523 17 17 16.5523 17 16V10C17 9.44771 16.5523 9 16 9H14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const tables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M9 2C8.44772 2 8 2.44772 8 3C8 3.55228 8.44772 4 9 4H11C11.5523 4 12 3.55228 12 3C12 2.44772 11.5523 2 11 2H9Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4 5C4 3.89543 4.89543 3 6 3C6 4.65685 7.34315 6 9 6H11C12.6569 6 14 4.65685 14 3C15.1046 3 16 3.89543 16 5V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V5ZM7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H7.01C7.56228 11 8.01 10.5523 8.01 10C8.01 9.44772 7.56228 9 7.01 9H7ZM10 9C9.44772 9 9 9.44772 9 10C9 10.5523 9.44772 11 10 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H10ZM7 13C6.44772 13 6 13.4477 6 14C6 14.5523 6.44772 15 7 15H7.01C7.56228 15 8.01 14.5523 8.01 14C8.01 13.4477 7.56228 13 7.01 13H7ZM10 13C9.44772 13 9 13.4477 9 14C9 14.5523 9.44772 15 10 15H13C13.5523 15 14 14.5523 14 14C14 13.4477 13.5523 13 13 13H10Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const otables = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 2C9.44772 2 9 2.44772 9 3C9 3.55228 9.44772 4 10 4C10.5523 4 11 3.55228 11 3C11 2.44772 10.5523 2 10 2Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 5C5 3.89543 5.89543 3 7 3C7 4.65685 8.34315 6 10 6H12C13.6569 6 15 4.65685 15 3C16.1046 3 17 3.89543 17 5V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V5ZM6 9C5.44772 9 5 9.44772 5 10C5 10.5523 5.44772 11 6 11H6.01C6.56228 11 7.01 10.5523 7.01 10C7.01 9.44772 6.56228 9 6.01 9H6ZM9 9C8.44772 9 8 9.44772 8 10C8 10.5523 8.44772 11 9 11H12C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9H9ZM6 13C5.44772 13 5 13.4477 5 14C5 14.5523 5.44772 15 6 15H6.01C6.56228 15 7.01 14.5523 7.01 14C7.01 13.4477 6.56228 13 6.01 13H6ZM9 13C8.44772 13 8 13.4477 8 14C8 14.5523 8.44772 15 9 15H12C12.5523 15 13 14.5523 13 14C13 13.4477 12.5523 13 12 13H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const billing = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4C2.89543 4 2 4.89543 2 6V7H18V6C18 4.89543 17.1046 4 16 4H4Z"
        fill={color}
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 9H2V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V9ZM4 13C4 12.4477 4.44772 12 5 12H6C6.55228 12 7 12.4477 7 13C7 13.5523 6.55228 14 6 14H5C4.44772 14 4 13.5523 4 13ZM9 12C8.44772 12 8 12.4477 8 13C8 13.5523 8.44772 14 9 14H10C10.5523 14 11 13.5523 11 13C11 12.4477 10.5523 12 10 12H9Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const profile = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const createCategoryIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z"
        fill={color}
      ></path>
      <path
        d="M7 9C6.44772 9 6 9.44772 6 10C6 10.5523 6.44772 11 7 11H13C13.5523 11 14 10.5523 14 10C14 9.44772 13.5523 9 13 9H7Z"
        fill={color}
      ></path>
    </svg>
  );

  const createSubcategoryIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0ZM10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18Z"
        fill={color}
      ></path>
      <path
        d="M7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9H13C13.5523 9 14 8.55228 14 8C14 7.44772 13.5523 7 13 7H7Z"
        fill={color}
      ></path>
      <path
        d="M7 11C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H13C13.5523 13 14 12.5523 14 12C14 11.4477 13.5523 11 13 11H7Z"
        fill={color}
      ></path>
    </svg>
  );

  const createProduct = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M10 2C9.44772 2 9 2.44772 9 3V7H5C4.44772 7 4 7.44772 4 8C4 8.55228 4.44772 9 5 9H9V13C9 13.5523 9.44772 14 10 14C10.5523 14 11 13.5523 11 13V9H15C15.5523 9 16 8.55228 16 8C16 7.44772 15.5523 7 15 7H11V3C11 2.44772 10.5523 2 10 2Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const createProductRam = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M3 5H17C17.5523 5 18 5.44772 18 6V14C18 14.5523 17.5523 15 17 15H3C2.44772 15 2 14.5523 2 14V6C2 5.44772 2.44772 5 3 5ZM4 6V14H16V6H4ZM7 8H9V10H7V8ZM11 8H13V10H11V8ZM7 12H9V14H7V12ZM11 12H13V14H11V12Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const createProductSize = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 4H16C16.5523 4 17 4.44772 17 5V15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15V5C3 4.44772 3.44772 4 4 4ZM5 5V15H15V5H5Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const createProductColor = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <circle
        cx="10"
        cy="10"
        r="8"
        stroke={color}
        strokeWidth="2"
        fill="none"
      ></circle>
      <path
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM10 16C6.68629 16 4 13.3137 4 10C4 6.68629 6.68629 4 10 4C13.3137 4 16 6.68629 16 10C16 13.3137 13.3137 16 10 16Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const productlist = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5ZM4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9ZM4 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H4C3.44772 15 3 14.5523 3 14C3 13.4477 3.44772 13 4 13Z"
        fill={color}
      ></path>
    </svg>,
  ];
  const primeday = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M4 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H4C3.44772 7 3 6.55228 3 6C3 5.44772 3.44772 5 4 5ZM4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10C3 9.44772 3.44772 9 4 9ZM4 13H16C16.5523 13 17 13.4477 17 14C17 14.5523 16.5523 15 16 15H4C3.44772 15 3 14.5523 3 14C3 13.4477 3.44772 13 4 13Z"
        fill={color}
      ></path>
    </svg>,
  ];

  const pendingApprovals = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="#f0f0f0"
        stroke={color}
        strokeWidth="2"
      />
      <line
        x1="32"
        y1="32"
        x2="32"
        y2="16"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="32"
        y1="32"
        x2="45"
        y2="32"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <rect
        x="22"
        y="38"
        width="20"
        height="26"
        fill="#fff"
        stroke={color}
        strokeWidth="2"
        rx="2"
      />
      <line
        x1="26"
        y1="43"
        x2="38"
        y2="43"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="49"
        x2="38"
        y2="49"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="26"
        y1="55"
        x2="38"
        y2="55"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />

      <path
        d="M16 38 L25 48 L44 29"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>,
  ];

  const onChange = (key) => {
    //console.log(key);
  };
  // const itemsNest = [
  //   {
  //     key: "1",
  //     label: "Category",
  //     children: <p>{text}</p>,
  //   },
  //   {
  //     key: "2",
  //     label: "Subcategory",
  //     children: <p>{text}</p>,
  //   },
  // ];
  const cat_itemsNest = [
    <Menu.Item key="1-1">
      <NavLink
        to="/dashboard/admin/create-category"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "createCategory" ? color : "",
          }}
        >
          {createCategoryIcon}
        </span>
        <span className="label">Category</span>
      </NavLink>
    </Menu.Item>,
    <Menu.Item key="1-2">
      <NavLink
        to="/dashboard/admin/create-sub-category"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "create-subcategory" ? color : "",
          }}
        >
          {createSubcategoryIcon}
        </span>
        <span className="label">Subcategory</span>
      </NavLink>
    </Menu.Item>,
  ];
  const sub_itemsNest = [
    <Menu.Item key="1-1">
      <NavLink
        to="/dashboard/admin/create-product-ram"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "create-product-ram" ? color : "",
          }}
        >
          {createProductRam}
        </span>
        <span className="label">Product RAM</span>
      </NavLink>
    </Menu.Item>,
    <Menu.Item key="1-2">
      <NavLink
        to="/dashboard/admin/create-product-size"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "create-product-ram" ? color : "",
          }}
        >
          {createProductSize}
        </span>
        <span className="label">Product Size</span>
      </NavLink>
    </Menu.Item>,
    <Menu.Item key="1-3">
      <NavLink
        to="/dashboard/admin/create-product-color"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "create-product-color" ? color : "",
          }}
        >
          {createProductColor}
        </span>
        <span className="label">Product Color</span>
      </NavLink>
    </Menu.Item>,
    <Menu.Item key="1-4">
      <NavLink
        to="/dashboard/admin/create-product"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "create-product" ? color : "",
          }}
        >
          {createProduct}
        </span>
        <span className="label">Create Product</span>
      </NavLink>
    </Menu.Item>,
    <Menu.Item key="1-5">
      <NavLink
        to="/dashboard/admin/products"
        style={{ textDecoration: "none" }}
      >
        <span
          className="icon"
          style={{
            background: page === "products" ? color : "",
          }}
        >
          {productlist}
        </span>
        <span className="label">Products</span>
      </NavLink>
    </Menu.Item>,
  ];
  const categoryitems = [
    {
      key: "1",
      label: "Manage Category",
      children: cat_itemsNest,
    },
  ];
  const subcategoryitems = [
    {
      key: "2",
      label: "Manage Products",
      children: sub_itemsNest,
    },
  ];

  return (
    <>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="" style={{ textDecoration: "none" }}>
            <span
              className="icon"
              style={{ background: page === "admin" ? color : "" }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="2">
          <NavLink
            to="/dashboard/admin/order-table"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "order-table" ? color : "",
              }}
            >
              {otables}
            </span>
            <span className="label">Orders</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink
            to="/dashboard/admin/order-pending-approvals"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "order-pending-approvals" ? color : "",
              }}
            >
              {pendingApprovals}
            </span>
            <span className="label">Pending Approval(s)</span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="4">
          <NavLink
            to="/dashboard/admin/prime-day"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "prime-day" ? color : "",
              }}
            >
              {primeday}
            </span>
            <span className="label">Prime Day</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink
            to="/dashboard/admin/tables"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "tables" ? color : "",
              }}
            >
              {tables}
            </span>
            <span className="label">Partner(s)</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="6">
          <NavLink
            to="/dashboard/admin/billing"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "billing" ? color : "",
              }}
            >
              {billing}
            </span>
            <span className="label">Billing</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="7">
          <Collapse onChange={onChange} items={categoryitems} />
        </Menu.Item>
        <Menu.Item key="8">
          <Collapse onChange={onChange} items={subcategoryitems} />
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
