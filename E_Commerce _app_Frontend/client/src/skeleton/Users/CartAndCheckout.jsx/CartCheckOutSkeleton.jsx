import React from "react";
import { Card, Tooltip } from "antd";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const CartCheckOutSkeleton = () => {
  return (
    <>
      <Card bordered={false}>
        <Skeleton variant="rectangular" width={379.46} height={138.8} />
      </Card>
    </>
  );
};

export default CartCheckOutSkeleton;
