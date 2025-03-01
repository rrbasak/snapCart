// import React, { useState, useRef, useEffect } from "react";
// import Chip from "@mui/material/Chip";
// import Box from "@mui/material/Box";
// import {
//   Popover,
//   RadioGroup,
//   FormControl,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { styled } from "@mui/material/styles";

// // Styled component for the list items
// const ListItem = styled("li")(({ theme, isDull }) => ({
//   margin: theme.spacing(0.5),
//   scrollSnapAlign: "start",
//   "& .MuiChip-root": {
//     borderRadius: "8px",
//     border: "1px solid",
//     borderColor: theme.palette.grey[400],
//     width: 150, // Adjust width as needed
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//     whiteSpace: "nowrap",
//     opacity: isDull ? 0.5 : 1, // Make other chips dull
//     pointerEvents: isDull ? "none" : "auto", // Disable pointer events for dull chips
//   },
// }));

// // Styled component for the scroller container
// const Scroller = styled(Box)(({ theme, popoverOpen }) => ({
//   display: "flex",
//   alignItems: "center",
//   listStyle: "none",
//   p: 0,
//   m: 0,
//   scrollSnapType: "x mandatory",
//   overflowX: popoverOpen ? "hidden" : "auto", // Hide scrollbar when popover is open
//   overflowY: "hidden",
//   "-webkit-overflow-scrolling": "touch", // Enable smooth scrolling on iOS
//   "&::-webkit-scrollbar": {
//     display: "none", // Hide the scrollbar
//   },
//   scrollbarWidth: "none", // Hide scrollbar for Firefox
//   msOverflowStyle: "none", // Hide scrollbar for IE and Edge
// }));

// const ScrollableFilterChips = () => {
//   const [visibleChip, setVisibleChip] = useState(null);
//   const [selectedPrice, setSelectedPrice] = useState("");
//   const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
//   const scroller = useRef(null);
//   const popoverTriggerRef = useRef(null);

//   const handleChipClick = (event, chipName) => {
//     setVisibleChip(chipName);
//     setPopoverAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setPopoverAnchorEl(null);
//     setVisibleChip(null);
//   };

//   const handlePriceChange = (event) => {
//     setSelectedPrice(event.target.value);
//   };

//   const handleClickOutside = (event) => {
//     if (
//       popoverTriggerRef.current &&
//       !popoverTriggerRef.current.contains(event.target) &&
//       !event.target.closest(".MuiPopover-paper")
//     ) {
//       handleClose();
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const chipLabels = ["Name", "Price", "Brand", "Color", "RAM"];
//   const priceOptions = [
//     "$0 - $50",
//     "$51 - $100",
//     "$101 - $200",
//     "$201 - $500",
//     "$501+",
//   ];

//   const getContent = () => {
//     switch (visibleChip) {
//       case "Price":
//         return (
//           <Box sx={{ p: 2, display: "flex", flexDirection: "column" }}>
//             <FormControl component="fieldset">
//               <RadioGroup
//                 value={selectedPrice}
//                 onChange={handlePriceChange}
//                 aria-label="price"
//                 name="price"
//               >
//                 {priceOptions.map((price, index) => (
//                   <FormControlLabel
//                     key={index}
//                     value={price}
//                     control={<Radio />}
//                     label={price}
//                   />
//                 ))}
//               </RadioGroup>
//             </FormControl>
//           </Box>
//         );
//       case "Brand":
//         return <div>Brand options here</div>;
//       case "Color":
//         return <div>Color options here</div>;
//       case "RAM":
//         return <div>RAM options here</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <Box sx={{ position: "relative" }}>
//       <Scroller
//         component="ul"
//         ref={scroller} // Pass scroller to the ref
//         popoverOpen={!!popoverAnchorEl} // Pass popoverOpen to Scroller
//       >
//         {chipLabels.map((label, index) => (
//           <ListItem key={index} isDull={visibleChip && visibleChip !== label}>
//             <Chip
//               label={label}
//               onClick={(event) => handleChipClick(event, label)}
//               ref={label === visibleChip ? popoverTriggerRef : null} // Set ref only for visible chip
//             />
//           </ListItem>
//         ))}
//       </Scroller>
//       <Popover
//         open={!!popoverAnchorEl}
//         anchorEl={popoverAnchorEl}
//         onClose={handleClose}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Center horizontally
//         transformOrigin={{ vertical: "top", horizontal: "center" }} // Center horizontally
//         PaperProps={{
//           style: {
//             width: 200,
//             borderRadius: "8px", // Set border radius
//             marginTop: 8, // Add space between chip and popover
//           },
//         }} // Apply styles to Paper element of Popover
//       >
//         {getContent()}
//       </Popover>
//     </Box>
//   );
// };

// export default ScrollableFilterChips;

// import React from "react";
// import Chip from "@mui/material/Chip";
// import Stack from "@mui/material/Stack";

// const ScrollableFilterChips = ({ filters, onChipClick, onResetFilters }) => {
//   return (
//     <div>
//       <h4 className="text-center mt-4">Filters</h4>
//       <Stack
//         direction="row"
//         spacing={1}
//         flexWrap="wrap"
//         sx={{ overflowX: "auto" }}
//       >
//         {filters.map((filter) => (
//           <Chip
//             key={filter.id}
//             label={filter.name}
//             onClick={() => onChipClick(filter)}
//             variant="outlined"
//             sx={{ margin: "0.5rem" }}
//           />
//         ))}
//       </Stack>
//       <button className="btn btn-danger mt-2" onClick={onResetFilters}>
//         RESET FILTERS
//       </button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

// import React, { useState } from "react";
// import Chip from "@mui/material/Chip";
// import Popover from "@mui/material/Popover";
// import MenuItem from "@mui/material/MenuItem";
// import Stack from "@mui/material/Stack";

// const ScrollableFilterChips = ({
//   filters,
//   filterOptions,
//   onChipClick,
//   onResetFilters,
// }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [currentFilterType, setCurrentFilterType] = useState("");

//   const handleClick = (event, type) => {
//     setAnchorEl(event.currentTarget);
//     setCurrentFilterType(type);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       <h4 className="text-center mt-4">Filters</h4>
//       <Stack
//         direction="row"
//         spacing={1}
//         flexWrap="wrap"
//         sx={{ overflowX: "auto" }}
//       >
//         {filters.map((filter) => (
//           <Chip
//             key={filter.id}
//             label={filter.name}
//             onClick={(event) => handleClick(event, filter.type)}
//             variant="outlined"
//             sx={{ margin: "0.5rem" }}
//           />
//         ))}
//       </Stack>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//       >
//         <div style={{ padding: "1rem" }}>
//           {filterOptions[currentFilterType]?.map((option) => (
//             <MenuItem key={option.id} onClick={() => onChipClick(option)}>
//               {option.name}
//             </MenuItem>
//           ))}
//         </div>
//       </Popover>
//       <button className="btn btn-danger mt-2" onClick={onResetFilters}>
//         RESET FILTERS
//       </button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

// yesss

// import React, { useState } from "react";
// import { Popover, Button, Chip } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   chip: {
//     margin: "0.5rem",
//   },
//   popoverContent: {
//     padding: "1rem",
//     width: "200px",
//   },
// });

// const ScrollableFilterChips = ({
//   filters,
//   filterOptions,
//   onChipClick,
//   onResetFilters,
// }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeFilter, setActiveFilter] = useState(null);

//   const handleClick = (event, filter) => {
//     setAnchorEl(event.currentTarget);
//     setActiveFilter(filter);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setActiveFilter(null);
//   };

//   const handleOptionClick = (option) => {
//     if (activeFilter) {
//       onChipClick({ ...activeFilter, name: option });
//       handleClose();
//     }
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       {filters.map((filter) => (
//         <Chip
//           key={filter.id}
//           label={filter.name}
//           className={classes.chip}
//           onClick={(event) => handleClick(event, filter)}
//         />
//       ))}
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}

//       >
//         <div className={classes.popoverContent}>
//           {filterOptions[activeFilter?.type]?.map((option) => (
//             <Button
//               key={option.id}
//               onClick={() => handleOptionClick(option.name)}
//             >
//               {option.name}
//             </Button>
//           ))}
//         </div>
//       </Popover>
//       <Button onClick={onResetFilters}>Reset Filters</Button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

// import React, { useState } from "react";
// import {
//   Popover,
//   Button,
//   Chip,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   chipContainer: {
//     display: "flex",
//     overflowX: "auto", // Enables horizontal scrolling
//     whiteSpace: "nowrap", // Prevents chips from wrapping to the next line
//     padding: "0.5rem 0", // Optional: Adds vertical padding for aesthetics
//   },
//   chip: {
//     margin: "0.5rem",
//     borderRadius: "8px",
//     width: "150px", // Adjust the width as needed
//     textAlign: "center",
//   },
//   popoverContent: {
//     padding: "1rem",
//     width: "250px", // Adjust the width as needed
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem",
//   },
//   popoverButton: {
//     borderRadius: "8px",
//     marginBottom: "0.5rem",
//   },
//   popoverRadio: {
//     display: "flex",
//     flexDirection: "row",
//     gap: "1rem",
//     alignItems: "center",
//   },
// });

// const ScrollableFilterChips = ({
//   filters,
//   filterOptions,
//   onChipClick,
//   onResetFilters,
// }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeFilter, setActiveFilter] = useState(null);

//   const handleClick = (event, filter) => {
//     setAnchorEl(event.currentTarget);
//     setActiveFilter(filter);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setActiveFilter(null);
//   };

//   const handleOptionClick = (option) => {
//     if (activeFilter) {
//       onChipClick({ ...activeFilter, name: option });
//       handleClose();
//     }
//   };

//   const handleRadioChange = (event) => {
//     handleOptionClick(event.target.value);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       <div className={classes.chipContainer}>
//         {filters
//           .filter(
//             (filter) => filter.type !== "ram" || filterOptions.ram.length > 0
//           ) // Exclude RAM if empty
//           .filter(
//             (filter) => filter.type !== "size" || filterOptions.size.length > 0
//           ) // Exclude Size if empty
//           .map((filter) => (
//             <Chip
//               key={filter.id}
//               label={filter.name}
//               className={classes.chip}
//               onClick={(event) => handleClick(event, filter)}
//             />
//           ))}
//       </div>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         sx={{ mt: 1 }} // Add gap between chip and popover
//       >
//         <div className={classes.popoverContent}>
//           {activeFilter?.type === "price" ? (
//             <RadioGroup onChange={handleRadioChange}>
//               {filterOptions.price.map((option) => (
//                 <FormControlLabel
//                   key={option.id}
//                   value={option.name}
//                   control={<Radio />}
//                   label={option.name}
//                 />
//               ))}
//             </RadioGroup>
//           ) : (
//             filterOptions[activeFilter?.type]?.map((option) => (
//               <FormControlLabel
//                 key={option.id}
//                 control={
//                   <Checkbox
//                     checked={false} // Implement state management for checked status
//                     onChange={() => handleOptionClick(option.name)}
//                     className={classes.popoverButton}
//                   />
//                 }
//                 label={option.name}
//               />
//             ))
//           )}
//         </div>
//       </Popover>
//       <Button onClick={onResetFilters} className={classes.popoverButton}>
//         Reset Filters
//       </Button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

// import React, { useState } from "react";
// import {
//   Popover,
//   Button,
//   Chip,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   chipContainer: {
//     display: "flex",
//     overflowX: "auto", // Enables horizontal scrolling
//     whiteSpace: "nowrap", // Prevents chips from wrapping to the next line
//     padding: "0.5rem 0", // Optional: Adds vertical padding for aesthetics
//   },
//   chip: {
//     margin: "0.5rem",
//     borderRadius: "8px",
//     width: "150px", // Adjust the width as needed
//     textAlign: "center",
//   },
//   popoverContent: {
//     padding: "1rem",
//     width: "250px", // Adjust the width as needed
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem",
//   },
//   popoverButton: {
//     borderRadius: "8px",
//     marginBottom: "0.5rem",
//   },
//   popoverRadio: {
//     display: "flex",
//     flexDirection: "row",
//     gap: "1rem",
//     alignItems: "center",
//   },
// });

// const ScrollableFilterChips = ({
//   filters,
//   filterOptions,
//   onChipClick,
//   onResetFilters,
// }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [checkedOptions, setCheckedOptions] = useState({}); // To track checked options for checkboxes
//   const [selectedRadio, setSelectedRadio] = useState(""); // To track selected radio button

//   const handleClick = (event, filter) => {
//     setAnchorEl(event.currentTarget);
//     setActiveFilter(filter);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setActiveFilter(null);
//   };

//   const handleOptionClick = (option) => {
//     if (activeFilter) {
//       onChipClick({ ...activeFilter, name: option });
//       handleClose();
//     }
//   };

//   const handleCheckboxChange = (option) => {
//     setCheckedOptions((prev) => ({
//       ...prev,
//       [option.name]: !prev[option.name], // Toggle the checked state
//     }));
//   };

//   const handleRadioChange = (event) => {
//     setSelectedRadio(event.target.value);
//     handleOptionClick(event.target.value);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       <div className={classes.chipContainer}>
//         {filters
//           .filter(
//             (filter) => filter.type !== "ram" || filterOptions.ram.length > 0
//           ) // Exclude RAM if empty
//           .filter(
//             (filter) => filter.type !== "size" || filterOptions.size.length > 0
//           ) // Exclude Size if empty
//           .map((filter) => (
//             <Chip
//               key={filter.id}
//               label={filter.name}
//               className={classes.chip}
//               onClick={(event) => handleClick(event, filter)}
//             />
//           ))}
//       </div>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         sx={{ mt: 1 }} // Add gap between chip and popover
//       >
//         <div className={classes.popoverContent}>
//           {activeFilter?.type === "price" ? (
//             <RadioGroup value={selectedRadio} onChange={handleRadioChange}>
//               {filterOptions.price.map((option) => (
//                 <FormControlLabel
//                   key={option.id}
//                   value={option.name}
//                   control={<Radio />}
//                   label={option.name}
//                 />
//               ))}
//             </RadioGroup>
//           ) : (
//             filterOptions[activeFilter?.type]?.map((option) => (
//               <FormControlLabel
//                 key={option.id}
//                 control={
//                   <Checkbox
//                     checked={!!checkedOptions[option.name]}
//                     onChange={() => handleCheckboxChange(option)}
//                     className={classes.popoverButton}
//                   />
//                 }
//                 label={option.name}
//               />
//             ))
//           )}
//         </div>
//       </Popover>
//       <Button onClick={onResetFilters} className={classes.popoverButton}>
//         Reset Filters
//       </Button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

// import React, { useState } from "react";
// import {
//   Popover,
//   Button,
//   Chip,
//   Checkbox,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { makeStyles } from "@mui/styles";

// const useStyles = makeStyles({
//   chipContainer: {
//     display: "flex",
//     overflowX: "auto",
//     whiteSpace: "nowrap",
//     padding: "0.5rem 0",
//   },
//   chip: {
//     margin: "0.5rem",
//     borderRadius: "8px",
//     width: "150px", // Adjust the width as needed
//     textAlign: "center",
//   },
//   popoverContent: {
//     padding: "1rem",
//     // width: "250px",
//     borderRadius: "8px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "0.5rem",
//   },
//   popoverButton: {
//     borderRadius: "8px",
//     marginBottom: "0.5rem",
//   },
//   popoverRadio: {
//     display: "flex",
//     flexDirection: "row",
//     gap: "1rem",
//     alignItems: "center",
//   },
// });

// const ScrollableFilterChips = ({
//   filters,
//   filterOptions,
//   onChipClick,
//   onResetFilters,
// }) => {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [activeFilter, setActiveFilter] = useState(null);
//   const [checkedOptions, setCheckedOptions] = useState({}); // To track checked options for checkboxes
//   const [selectedRadio, setSelectedRadio] = useState(""); // To track selected radio button

//   const handleClick = (event, filter) => {
//     setAnchorEl(event.currentTarget);
//     setActiveFilter(filter);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setActiveFilter(null);
//   };

//   const handleCheckboxChange = (option) => {
//     setCheckedOptions((prev) => ({
//       ...prev,
//       [option.name]: !prev[option.name], // Toggle the checked state
//     }));
//     onChipClick({
//       ...activeFilter,
//       name: option.name,
//       checked: !checkedOptions[option.name],
//     });
//   };

//   const handleRadioChange = (event) => {
//     const { value } = event.target;
//     setSelectedRadio(value);
//     onChipClick({ ...activeFilter, name: value });
//     handleClose();
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <div>
//       <div className={classes.chipContainer}>
//         {filters
//           .filter(
//             (filter) => filter.type !== "ram" || filterOptions.ram.length > 0
//           ) // Exclude RAM if empty
//           .filter(
//             (filter) => filter.type !== "size" || filterOptions.size.length > 0
//           ) // Exclude Size if empty
//           .map((filter) => (
//             <Chip
//               key={filter.id}
//               label={filter.name}
//               className={classes.chip}
//               onClick={(event) => handleClick(event, filter)}
//             />
//           ))}
//       </div>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "center",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "center",
//         }}
//         sx={{ mt: 1 }}
//       >
//         <div className={classes.popoverContent}>
//           {activeFilter?.type === "price" ? (
//             <RadioGroup value={selectedRadio} onChange={handleRadioChange}>
//               {filterOptions.price.map((option) => (
//                 <FormControlLabel
//                   key={option.id}
//                   value={option.name}
//                   control={<Radio />}
//                   label={option.name}
//                 />
//               ))}
//             </RadioGroup>
//           ) : (
//             filterOptions[activeFilter?.type]?.map((option) => (
//               <FormControlLabel
//                 key={option.id}
//                 control={
//                   <Checkbox
//                     checked={!!checkedOptions[option.name]} // Persist checked state
//                     onChange={() => handleCheckboxChange(option)}
//                     className={classes.popoverButton}
//                   />
//                 }
//                 label={option.name}
//               />
//             ))
//           )}
//         </div>
//       </Popover>
//       <Button onClick={onResetFilters} className={classes.popoverButton}>
//         Reset Filters
//       </Button>
//     </div>
//   );
// };

// export default ScrollableFilterChips;

import React, { useState } from "react";
import {
  Popover,
  Button,
  Chip,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  chipContainer: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    padding: "0.5rem 0",
    gap: "5px",
  },
  chip: {
    margin: "0.5rem",
    borderRadius: "8px",
    width: "150px", // Adjust the width as needed
    textAlign: "center",
  },
  popoverContent: {
    padding: "1rem",
    // width: "250px",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    // gap: "0.5rem",
  },
  popoverButton: {
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },
  popoverRadio: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "center",
  },
});

const ScrollableFilterChips = ({
  filters,
  filterOptions,
  onChipClick,
  onResetFilters,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [activeFilter, setActiveFilter] = useState(null);
  const [checkedOptions, setCheckedOptions] = useState({}); // To track checked options for checkboxes
  const [selectedRadio, setSelectedRadio] = useState(""); // To track selected radio button

  const handleClick = (event, filter) => {
    setAnchorEl(event.currentTarget);
    setActiveFilter(filter);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveFilter(null);
  };

  const handleCheckboxChange = (option) => {
    setCheckedOptions((prev) => ({
      ...prev,
      [option.name]: !prev[option.name], // Toggle the checked state
    }));
    onChipClick({
      ...activeFilter,
      name: option.name,
      checked: !checkedOptions[option.name],
    });
  };

  const handleRadioChange = (event) => {
    const { value } = event.target;
    ////console.log("value here",value)
    setSelectedRadio(value);
    onChipClick({ ...activeFilter, name: value });
    handleClose();
  };

  const handleResetFilters = () => {
    setCheckedOptions({}); // Reset all checkbox selections
    setSelectedRadio(""); // Reset radio button selection
    onResetFilters(); // Call the parent's reset filters function
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div className={classes.chipContainer}>
        {filters
          .filter(
            (filter) => filter.type !== "ram" || filterOptions.ram.length > 0
          ) // Exclude RAM if empty
          .filter(
            (filter) => filter.type !== "size" || filterOptions.size.length > 0
          ) // Exclude Size if empty
          .map((filter) => (
            <Chip
              key={filter.id}
              label={filter.name}
              className={classes.chip}
              onClick={(event) => handleClick(event, filter)}
            />
          ))}
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: {
            width: 200,
            borderRadius: "8px", // Set border radius
            // marginTop: 8, // Add space between chip and popover
          },
        }}
        sx={{ mt: 1 }} // Add gap between chip and popover
      >
        <div className={classes.popoverContent}>
          {activeFilter?.type === "price" ? (
            <RadioGroup value={selectedRadio} onChange={handleRadioChange}>
              {filterOptions.price.map((option) => (
                <FormControlLabel
                  key={option.id}
                  value={option.name}
                  control={<Radio />}
                  label={option.name}
                />
              ))}
            </RadioGroup>
          ) : (
            filterOptions[activeFilter?.type]?.map((option) => (
              <FormControlLabel
                key={option.id}
                control={
                  <Checkbox
                    checked={!!checkedOptions[option.name]} // Persist checked state
                    onChange={() => handleCheckboxChange(option)}
                    className={classes.popoverButton}
                  />
                }
                label={option.name}
              />
            ))
          )}
        </div>
      </Popover>
      <hr />
      <Button onClick={handleResetFilters} className={classes.popoverButton}>
        Reset Filters
      </Button>
    </div>
  );
};

export default ScrollableFilterChips;
