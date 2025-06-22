import { Menu, Collapse } from "antd";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

function Sidenav({ color }) {
  const { pathname } = useLocation();
  const page = pathname.split("/")[3];

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





  // Delivery Track Icon
  const deliveryTrack = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={1}
    >
      <path
        d="M16 3H4C3.44772 3 3 3.44772 3 4V16C3 16.5523 3.44772 17 4 17H16C16.5523 17 17 16.5523 17 16V4C17 3.44772 16.5523 3 16 3ZM8 14C7.44772 14 7 13.5523 7 13C7 12.4477 7.44772 12 8 12C8.55228 12 9 12.4477 9 13C9 13.5523 8.55228 14 8 14ZM11 14C10.4477 14 10 13.5523 10 13C10 12.4477 10.4477 12 11 12C11.5523 12 12 12.4477 12 13C12 13.5523 11.5523 14 11 14ZM14 14C13.4477 14 13 13.5523 13 13C13 12.4477 13.4477 12 14 12C14.5523 12 15 12.4477 15 13C15 13.5523 14.5523 14 14 14Z"
        fill={color}
      ></path>
    </svg>,
  ];

  // History Icon
  const historyIcon = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={2}
    >
      <path
        d="M10 3C5.02944 3 1 7.02944 1 12C1 16.9706 5.02944 21 10 21C14.9706 21 19 16.9706 19 12C19 7.02944 14.9706 3 10 3ZM10 18C6.13401 18 3 14.866 3 12C3 9.13401 6.13401 6 10 6C13.866 6 17 9.13401 17 12C17 14.866 13.866 18 10 18ZM9 6H11V10L12 11L9 13V10H7V6H9Z"
        fill={color}
      ></path>
    </svg>,
  ];



  return (
    <>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="" style={{ textDecoration: "none" }}>
            <span
              className="icon"
              style={{ background: page === "dashboard" ? color : "" }}
            >
              {dashboard}
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink
            to="/dashboard/delivery/otable"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "otable" ? color : "",
              }}
            >
              {otables}
            </span>
            <span className="label">Deliveries</span>
          </NavLink>
        </Menu.Item>

        {/* <Menu.Item key="3">
          <NavLink
            to="/dashboard/delivery/track-shipments"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "track" ? color : "",
              }}
            >
              {deliveryTrack}
            </span>
            <span className="label">Track</span>
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="4">
          <NavLink
            to="/dashboard/delivery/ohistory"
            style={{ textDecoration: "none" }}
          >
            <span
              className="icon"
              style={{
                background: page === "history" ? color : "",
              }}
            >
              {historyIcon}
            </span>
            <span className="label">History</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="7">
          <NavLink
            to="/dashboard/delivery/payment"
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
            <span className="label">Earn</span>
          </NavLink>
        </Menu.Item> */}
      </Menu>
    </>
  );
}

export default Sidenav;
