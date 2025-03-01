import React from "react";
import { MenuItem, Skeleton, Box, Grid } from "@mui/material";
import styles from "../styles/NotificationMenu.module.css";

const NotificationMenuSkeleton = () => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <MenuItem key={index} className={styles.menuItem}>
          <Grid container className={styles.notificationContainer}>
            <Grid
              container
              alignItems="center"
              wrap="nowrap"
              className={styles.notificationHeader}
            >
              {/* Icon Skeleton */}
              <Box className={styles.notificationIcon}>
                <Skeleton variant="circular" width={24} height={24} />
              </Box>

              {/* Title Skeleton */}
              <Skeleton
                variant="text"
                width="161.81px"
                height={24}
                className={styles.notificationTitle}
              />

              {/* Timestamp Skeleton */}
              <Skeleton variant="text" width={37.39} height={18} />
            </Grid>

            {/* Message Skeleton */}
            <Skeleton variant="text" width="233.2px" height={50.4} />
          </Grid>
        </MenuItem>
      ))}
    </>
  );
};

export default NotificationMenuSkeleton;
