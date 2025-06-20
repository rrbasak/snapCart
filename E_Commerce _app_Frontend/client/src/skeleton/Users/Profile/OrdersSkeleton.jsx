import React from "react";
import { Skeleton } from "@mui/material";

const OrdersSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangle"
        width={734.4}
        height={737.15}
        sx={{ borderRadius: 5 }}
      />
      <Skeleton
        variant="rectangle"
        width={734.4}
        height={737.15}
        sx={{ borderRadius: 5, marginTop: 6 }}
      />
    </>
  );
};

export default OrdersSkeleton;
