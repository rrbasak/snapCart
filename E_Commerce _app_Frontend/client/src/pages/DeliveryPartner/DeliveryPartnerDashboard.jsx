import React from "react";
import { Outlet } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Main from "../DeliveryPartner/DeliveryPartnerDashboard/components/layout/Main";
import "antd/dist/reset.css";
import "./DeliveryPartnerDashboard/assets/styles/main.css";
import "./DeliveryPartnerDashboard/assets/styles/responsive.css";

const DeliveryPartnerDashboard = ({ children }) => {
  return (
    <Layout>
      <Main>{children || <Outlet />}</Main>
    </Layout>
  );
};

export default DeliveryPartnerDashboard;
