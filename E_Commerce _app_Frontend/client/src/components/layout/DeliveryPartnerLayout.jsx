import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const DeliveryPartnerLayout = ({
  children,
  title,
  description,
  keywords,
  author,
}) => {
  return (
    <div className="layout">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <main className="content">
        <Toaster />
        {children}
      </main>
    </div>
  );
};

DeliveryPartnerLayout.defaultProps = {
  title: "Ecommerce App",
  description: "mern stack project",
  keywords: "mern,react,node,express",
  author: "Rajdeep",
};

export default DeliveryPartnerLayout;
