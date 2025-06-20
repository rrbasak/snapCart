import React from "react";
import { Card, Tooltip } from "antd";
import { Row, Col } from "antd";
import { Skeleton } from "@mui/material";

const CartsSkeleton = () => {
  return (
    <>
      <Card bordered={false}>
        <Skeleton variant="rectangular" width={790} height={350} />
      </Card>
    </>
  );
};

export default CartsSkeleton;
