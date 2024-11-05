// import * as React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";

// export default function LeftSideBar({ open, onClose }) {
//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Drawer open={open} onClose={onClose}>
//       {DrawerList}
//     </Drawer>
//   );
// }

// import React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import CloseIcon from "@mui/icons-material/Close"; // Import CloseIcon

// export default function RightSideBar({ open, onClose }) {
//   const DrawerList = (
//     <Box sx={{ width: 250 }} role="presentation" onClick={onClose}>
//       <IconButton onClick={onClose} sx={{ ml: "auto", display: "block" }}>
//         <CloseIcon />
//       </IconButton>
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       {DrawerList}
//     </Drawer>
//   );
// }

// import React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import CategoryIcon from "@mui/icons-material/Category";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import CloseIcon from "@mui/icons-material/Close";

// import styles from "../../styles/RightSideBar.module.css";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import { Navigate, useNavigate } from "react-router-dom";

// export default function LeftSideBar({ open, onClose }) {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();
//   const handleLogOut = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       accessToken: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//     navigate("/login");
//   };

//   const handleDashboardClick = () => {
//     const role = auth?.user?.role === 1 ? "admin" : "user";
//     navigate(`/dashboard/${role}`); // Navigate to dashboard based on role
//   };
//   const handleLoginClick = () => {
//     navigate("/login");
//   };
//   const DrawerList = (
//     <Box role="presentation" onClick={onClose}>
//       <IconButton onClick={onClose} className={styles.closeButton}>
//         <CloseIcon />
//       </IconButton>
//       <List>
//         <ListItem
//           button
//           className={styles.drawer}
//           onClick={handleDashboardClick}
//         >
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <Divider />
//         <ListItem button onClick={handleLogOut}>
//           <ListItemText primary="Logout" />
//         </ListItem>
//         <Divider />
//       </List>
//     </Box>
//   );
//   const PreDrawerList = (
//     <Box role="presentation" onClick={onClose}>
//       <IconButton onClick={onClose} className={styles.closeButton}>
//         <CloseIcon />
//       </IconButton>
//       <List>
//         <ListItem
//           button
//           className={styles.drawer}
//           onClick={handleLoginClick}
//         >
//           <ListItemText primary="Login" />
//         </ListItem>
//         <Divider />
//       </List>
//     </Box>
//   );
//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       {auth?.user ? DrawerList : PreDrawerList}
//     </Drawer>
//   );
// }



// import React from "react";
// import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import IconButton from "@mui/material/IconButton";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import CloseIcon from "@mui/icons-material/Close";

// import styles from "../../styles/RightSideBar.module.css";
// import { useAuth } from "../../context/auth";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// export default function LeftSideBar({ open, onClose }) {
//   const [auth, setAuth] = useAuth();
//   const navigate = useNavigate();

//   const handleLogOut = () => {
//     setAuth({
//       ...auth,
//       user: null,
//       accessToken: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//     navigate("/login");
//   };

//   const handleDashboardClick = () => {
//     const role = auth?.user?.role === 1 ? "admin" : "user";
//     navigate(`/dashboard/${role}`); // Navigate to dashboard based on role
//   };

//   const handleLoginClick = () => {
//     navigate("/login");
//   };

//   const Header = () => (
//     <Box className={styles.header}>
//       <ListItemText
//         primary={`Hello ${auth?.user?.name || "Guest"}`}
//         className={styles.greeting}
//       />
//     </Box>
//   );

//   const DrawerList = (
//     <Box role="presentation" onClick={onClose}>
//       <IconButton onClick={onClose} className={styles.closeButton}>
//         <CloseIcon />
//       </IconButton>
//       <Header />
//       <List>
//         <ListItem
//           button
//           className={styles.drawer}
//           onClick={handleDashboardClick}
//         >
//           <ListItemText primary="Dashboard" />
//         </ListItem>
//         <Divider />
//         <ListItem button onClick={handleLogOut}>
//           <ListItemText primary="Logout" />
//         </ListItem>
//         <Divider />
//       </List>
//     </Box>
//   );

//   const PreDrawerList = (
//     <Box role="presentation" onClick={onClose}>
//       <IconButton onClick={onClose} className={styles.closeButton}>
//         <CloseIcon />
//       </IconButton>
//       <Header />
//       <List>
//         <ListItem button className={styles.drawer} onClick={handleLoginClick}>
//           <ListItemText primary="Login" />
//         </ListItem>
//         <Divider />
//       </List>
//     </Box>
//   );

//   return (
//     <Drawer anchor="right" open={open} onClose={onClose}>
//       {auth?.user ? DrawerList : PreDrawerList}
//     </Drawer>
//   );
// }



import React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";

import styles from "../../styles/RightSideBar.module.css";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ListItemIcon } from "@mui/material";

export default function RightSideBar({ open, onClose }) {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      accessToken: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };
  const handleOrders = () => {
    navigate("/dashboard/profile", { state: { activeTab: "orders" } });
  };
  const handleDashboardClick = () => {
    // const role = auth?.user?.role === 1 ? "admin" : "profile";
    // navigate(`/dashboard/${role}`); 
    navigate(`/dashboard/${auth?.user?.role === 1 ? "admin" : "profile"}`, {
      state: { activeTab: "personalAndAddress" },
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  // const Header = () => (
  //   <Box className={styles.header}>
  //     <ListItemText
  //       primary={`Hello ${auth?.user?.name || "Guest"}`}
  //       className={styles.greeting}
  //     />
  //     <IconButton onClick={onClose} className={styles.closeButton}>
  //       <CloseIcon />
  //     </IconButton>
  //   </Box>
  // );

  const Header = () => {
    const userName = auth?.user?.name || "Guest";
    const displayName = userName.split(" ")[0]; // Only display the first name or a truncated name
    return (
      <Box className={styles.header}>
        <ListItemText
          primary={`Hello ${displayName}`}
          className={styles.greeting}
        />
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>
    );
  };
  const DrawerList = (
    <Box role="presentation" onClick={onClose}>
      <Header />
      <List>
        <ListItem
          button
          className={styles.drawer}
          onClick={handleDashboardClick}
        >
          <ListItemText primary="Dashboard" />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <DashboardIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button onClick={handleOrders}>
          <ListItemText primary="Orders" />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <ShoppingCartCheckoutOutlinedIcon />
          </ListItemIcon>
        </ListItem>
        <Divider />
        <ListItem button onClick={handleLogOut}>
          <ListItemText primary="Logout" />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <LogoutIcon />
          </ListItemIcon>
        </ListItem>

        <Divider />
      </List>
    </Box>
  );

  const PreDrawerList = (
    <Box role="presentation" onClick={onClose}>
      <Header />
      <List>
        <ListItem button className={styles.drawer} onClick={handleLoginClick}>
          <ListItemText primary="Login" />
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      {auth?.user ? DrawerList : PreDrawerList}
    </Drawer>
  );
}

