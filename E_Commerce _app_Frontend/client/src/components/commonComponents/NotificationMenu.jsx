import React, { useState } from "react";
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";
import styles from "../../styles/NotificationMenu.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SellIcon from "@mui/icons-material/Sell";
import ChatIcon from "@mui/icons-material/Chat";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationMenuSkeleton from "../../skeleton/NotificationMenuSkeleton";

const NotificationMenu = ({
  anchorEl,
  isOpen,
  handleClose,
  notifications,
  loading,
  skeletonloader,
  fetchMoreNotifications,
  hasMore,
}) => {
  dayjs.extend(relativeTime);
  let timeout;
  const handleScroll = (e) => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => {
      const bottom =
        e.target.scrollHeight - e.target.scrollTop <=
        e.target.clientHeight + 10;

      if (bottom && hasMore && !loading) {
        fetchMoreNotifications();
      }
    }, 300);
  };
  const formatTime = (date) => {
    const diff = Math.floor((new Date() - new Date(date)) / 1000);
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };
  const getNotificationIcon = (type) => {
    switch (type) {
      case "order_update":
        return <ShoppingCartIcon />;
      case "delivery_update":
        return <LocalShippingIcon />;
      case "new_offer":
        return <SellIcon />;
      case "user_message":
        return <ChatIcon />;
      case "system":
        return <SettingsIcon />;
      default:
        return <NotificationsIcon />;
    }
  };
  //console.log("skeletonloader", skeletonloader);
  return (
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={handleClose}
      PaperProps={{
        className: styles.menuPaper,
      }}
    >
      <Box className={styles.scrollContainer} onScroll={handleScroll}>
        {skeletonloader ? (
          <NotificationMenuSkeleton />
        ) : (
          <>
            {notifications.length === 0 && !loading ? (
              <MenuItem className={styles.menuItem}>
                <Typography variant="body2">No notifications</Typography>
              </MenuItem>
            ) : (
              <>
                {notifications.map((notification) => (
                  <MenuItem key={notification._id} className={styles.menuItem}>
                    <Grid container className={styles.notificationContainer}>
                      <Grid
                        container
                        alignItems="center"
                        wrap="nowrap"
                        className={styles.notificationHeader}
                      >
                        <Box className={styles.notificationIcon}>
                          {getNotificationIcon(notification.type)}
                        </Box>

                        <Typography
                          variant="h6"
                          className={styles.notificationTitle}
                        >
                          {notification.title}
                        </Typography>

                        <Typography className={styles.timestamp}>
                          {formatTime(notification.createdAt)}
                        </Typography>
                      </Grid>

                      <Typography
                        variant="body2"
                        className={styles.notificationMessage}
                      >
                        {notification.message}
                      </Typography>
                    </Grid>
                  </MenuItem>
                ))}

                {loading && (
                  <Box className={styles.loader}>
                    <CircularProgress size={24} />
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Box>
    </Menu>
  );
};

export default NotificationMenu;
