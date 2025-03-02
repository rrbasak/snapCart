import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.accessToken) authCheck();
  }, [auth?.accessToken]);
  // return ok ? <Outlet /> : <Spinner path="dashboard/user" />;
  return ok ? <Outlet /> : <Spinner />;
}
