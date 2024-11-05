// import * as React from "react";
// import Badge from "@mui/material/Badge";
// import { styled } from "@mui/material/styles";
// import IconButton from "@mui/material/IconButton";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import { NavLink } from "react-router-dom";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     right: -3,
//     top: 13,
    
//     padding: "0 4px",
//   },
// }));

// export default function Badges({ count }) {
//   return (
//     <NavLink to="/cart">
//       <IconButton aria-label="cart">
//         <StyledBadge badgeContent={count} color="secondary">
//           <ShoppingCartOutlinedIcon />
//         </StyledBadge>
//       </IconButton>
//     </NavLink>
//   );
// }



import React, { memo } from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { NavLink } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    padding: "0 4px",
  },
}));

const Badges = memo(({ count }) => {
  return (
    <NavLink to="/cart">
      <IconButton aria-label="cart">
        <StyledBadge badgeContent={count} color="secondary">
          <ShoppingCartOutlinedIcon />
        </StyledBadge>
      </IconButton>
    </NavLink>
  );
});

export default Badges;
