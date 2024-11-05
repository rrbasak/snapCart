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

// export default function LeftSideBar({ open, onClose }) {
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
// import HomeIcon from "@mui/icons-material/Home";
// import CategoryIcon from "@mui/icons-material/Category";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
// import CloseIcon from "@mui/icons-material/Close"; 

// import styles from "../../styles/LeftSideBar.module.css"; 
// import { Navigate , useNavigate} from "react-router-dom";

// export default function LeftSideBar({ open, onClose }) {
//   const navigate = useNavigate();
//   const handleHomeClickHandler = ()=>{
//     navigate("/");
//   }
//   const handleCateGoryHandler = () => {
//     navigate("/categories");
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
//           onClick={handleHomeClickHandler}
//         >
//           <ListItemText primary="Browse SnapCart" />
//         </ListItem>

//         <Divider />

//         <ListItem>
//           <ListItemText primary="SnapCart Home" />
//           <ListItemIcon>
//             <HomeIcon />
//           </ListItemIcon>
//         </ListItem>

//         <Divider />

//         <ListItem button onClick={handleCateGoryHandler}>
//           <ListItemText primary="Shop By Category" />
//           <ListItemIcon>
//             <CategoryIcon />
//           </ListItemIcon>
//         </ListItem>

//         <Divider />

//         <ListItem>
//           <ListItemText primary="Trending" />
//         </ListItem>


//         <Divider />


//         <ListItem>
//           <ListItemText primary="Best sellers" />
//           <ListItemIcon>
//             <TrendingUpIcon />
//           </ListItemIcon>
//         </ListItem>


//         <ListItem>
//           <ListItemText primary="New Releases" />
//           <ListItemIcon>
//             <TrendingUpIcon />
//           </ListItemIcon>
//         </ListItem>


//       </List>
//     </Box>
//   );

//   return (
//     <Drawer open={open} onClose={onClose}>
//       {DrawerList}
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
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CloseIcon from "@mui/icons-material/Close";

import styles from "../../styles/LeftSideBar.module.css";
import { useNavigate } from "react-router-dom";

export default function LeftSideBar({ open, onClose }) {
  const navigate = useNavigate();

  const handleHomeClickHandler = () => {
    navigate("/");
  };

  const handleCateGoryHandler = () => {
    navigate("/categories");
  };

  const DrawerList = (
    <Box role="presentation" onClick={onClose}>
      <Box className={styles.drawerHeader}>
        <Box className={styles.browseTitle}>
          <ListItemText primary="Browse SnapCart" className={styles.boldText} />
        </Box>
        <IconButton onClick={onClose} className={styles.closeButton}>
          <CloseIcon />
        </IconButton>
      </Box>

      <List>
        <ListItem
          button
          className={styles.drawer}
          onClick={handleHomeClickHandler}
        >
          <ListItemText primary="SnapCart Home" style={{fontWeight:"bold"}} />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <HomeIcon />
          </ListItemIcon>
        </ListItem>

        <Divider />

        <ListItem button onClick={handleCateGoryHandler}>
          <ListItemText
            primary="Shop By Category"
            className={styles.boldText}
          />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <CategoryIcon />
          </ListItemIcon>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Trending" className={styles.boldText} />
          <ListItemIcon style={{ minWidth: "23px" }}>
            <TrendingUpIcon />
          </ListItemIcon>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemText primary="Best sellers" />
          {/* <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon> */}
        </ListItem>

        <ListItem>
          <ListItemText primary="New Releases" />
          {/* <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon> */}
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer open={open} onClose={onClose}>
      {DrawerList}
    </Drawer>
  );
}
