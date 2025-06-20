import React from "react";
import { Skeleton, Grid, useMediaQuery } from "@mui/material";

const SubCategorySkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const skeletonsPerRow = isMobile ? 22 : 3;
  const totalSkeletons = 6;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: totalSkeletons }).map((_, index) => (
        <Grid item xs={6} md={4} key={index}>
          <Skeleton
            variant="rectangle"
            width={isMobile ? 185.2 : 300}
            height={isMobile ? 200 : 500}
            sx={{ borderRadius: 5 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default SubCategorySkeleton;
