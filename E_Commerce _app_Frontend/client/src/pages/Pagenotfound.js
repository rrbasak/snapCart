import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useAuth } from "../context/auth";

const Pagenotfound = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useAuth();
  //console.log("Back", location.state?.from);
  const goBack = () => {
    if (location.state?.from) {
      navigate(location.state.from);
    } else {
      // if (auth?.user?.role === 0) navigate("/");
      // else if (auth?.user?.role === 1) navigate("/dashboard/admin");
      navigate("/");
    }
  };

  return (
    <Layout title="Go Back - Page not found">
      <div className="pnf">
        <h1 className="pnf-title">404</h1>
        <h2 className="pnf-heading">Oops ! Page Not Found</h2>
        <button onClick={goBack} className="pnf-btn">
          Go Back
        </button>
      </div>
    </Layout>
  );
};

export default Pagenotfound;
