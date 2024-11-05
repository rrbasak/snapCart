import React from "react";
import { Breadcrumb } from "antd";

// Common Breadcrumb Component
const CustomBreadcrumb = ({ items, separator }) => {
  return (
    <Breadcrumb separator={separator}>
      {items.map((item, index) => (
        <Breadcrumb.Item key={index} href={item.href || undefined}>
          {item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
