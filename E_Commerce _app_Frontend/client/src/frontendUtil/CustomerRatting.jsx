// import React, { useEffect, useState } from "react";
// import Rating from "@mui/material/Rating";
// import Box from "@mui/material/Box";
// import StarIcon from "@mui/icons-material/Star";
// import { Popover, Typography } from "antd";
// import LinearProgress from "@mui/material/LinearProgress";
// import { styled } from "@mui/system";

// const labels = {
//   0.5: "Useless",
//   1: "Useless+",
//   1.5: "Poor",
//   2: "Poor",
//   2.5: "Ok",
//   3: "Ok",
//   3.5: "Good",
//   4: "Good",
//   4.5: "Excellent",
//   5: "Excellent+",
// };

// const progressData = {
//   "5 stars": 55,
//   "4 stars": 25,
//   "3 stars": 8,
//   "2 stars": 3,
//   "1 star": 10,
// };

// const getLabelText = (value) => {
//   return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
// };

// const StyledLinearProgress = styled(LinearProgress)({
//   height: 10,
//   border: "1px solid black",
//   borderRadius: 2,
//   backgroundColor: "white",
//   // transform: "scale(2.05)",
//   "& .MuiLinearProgress-bar": {
//     borderRadius: 2,
//     backgroundColor: "#ffb400",

//   },
// });

// // const StyledLinearProgress = styled(LinearProgress)(({ value }) => ({
// //   height: 10,
// //   border: "1px solid black",
// //   borderRadius: 2,
// //   backgroundColor: "white",
// //   overflow: "hidden",
// //   "& .MuiLinearProgress-bar": {
// //     borderRadius: 2,
// //     backgroundColor: "#ffb400",
// //     width: `${value}%`,
// //     transition: "width 2s ease-in-out",
// //   },
// // }));
// const CustomerRatting = ({ ratings }) => {
//   ////console.log(ratings);
//   const [value, setValue] = useState(3.5);
//   const [hover, setHover] = useState(-1);
//   const [visible, setVisible] = useState(false);
//   const [averageRating, setAverageRating] = useState(0);
//   const [progressData, setProgressData] = useState({
//     "5 stars": 0,
//     "4.5 stars": 0,
//     "4 stars": 0,
//     "3.5 stars": 0,
//     "3 stars": 0,
//     "2.5 stars": 0,
//     "2 stars": 0,
//     "1.5 stars": 0,
//     "1 star": 0,
//     "0.5 stars": 0,
//   });
//   const handlePopoverOpen = () => {
//     setVisible(true);
//   };

//   const handlePopoverClose = () => {
//     setVisible(false);
//   };

//   useEffect(() => {
//     if (ratings?.length > 0) {
//       const totalRating = ratings.reduce(
//         (acc, rating) => acc + rating.rating,
//         0
//       );
//       const avgRating = totalRating / ratings.length;
//       setAverageRating(avgRating);

//       const ratingCounts = ratings.reduce((acc, rating) => {
//         acc[rating.rating] = (acc[rating.rating] || 0) + 1;
//         return acc;
//       }, {});

//       setProgressData({
//         "5 stars": ((ratingCounts[5] || 0) / ratings.length) * 100,
//         "4.5 stars": ((ratingCounts[4.5] || 0) / ratings.length) * 100,
//         "4 stars": ((ratingCounts[4] || 0) / ratings.length) * 100,
//         "3.5 stars": ((ratingCounts[3.5] || 0) / ratings.length) * 100,
//         "3 stars": ((ratingCounts[3] || 0) / ratings.length) * 100,
//         "2.5 stars": ((ratingCounts[2.5] || 0) / ratings.length) * 100,
//         "2 stars": ((ratingCounts[2] || 0) / ratings.length) * 100,
//         "1.5 star": ((ratingCounts[1.5] || 0) / ratings.length) * 100,
//         "1 star": ((ratingCounts[1] || 0) / ratings.length) * 100,
//         "0.5 star": ((ratingCounts[0.5] || 0) / ratings.length) * 100,
//       });
//     }
//   }, [ratings]);
//   const content = (
//     <div>
//       <Typography variant="subtitle1">
//         {averageRating.toFixed(1)} out of 5 stars
//       </Typography>
//       {Object.entries(progressData).map(([key, val]) => (
//         <Box key={key} display="flex" alignItems="center" mb={1}>
//           <Box width="100px">
//             <Typography variant="body2">{key}</Typography>
//           </Box>
//           <Box width="150px" mr={1}>
//             <StyledLinearProgress variant="determinate" value={val} />
//           </Box>
//           <Box minWidth={35}>
//             <Typography variant="body2">{`${val.toFixed(1)}%`}</Typography>
//           </Box>
//         </Box>
//       ))}
//     </div>
//   );

//   return (
//     <Popover
//       content={content}
//       visible={visible}
//       onMouseEnter={handlePopoverOpen}
//       onMouseLeave={handlePopoverClose}
//       placement="bottom"
//     >
//       <Box
//         sx={{
//           width: 200,
//           display: "flex",
//           alignItems: "center",
//         }}
//         onMouseEnter={handlePopoverOpen}
//         onMouseLeave={handlePopoverClose}
//       >
//         <Box sx={{ mr: 1 }}>{averageRating.toFixed(1)}</Box>
//         <Rating
//           name="hover-feedback"
//           value={averageRating}
//           precision={0.5}
//           getLabelText={getLabelText}
//           onChange={(event, newValue) => {
//             setValue(newValue);
//           }}
//           onChangeActive={(event, newHover) => {
//             setHover(newHover);
//           }}
//           emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//           readOnly
//           size="small"
//         />
//       </Box>
//     </Popover>
//   );
// };

// export default CustomerRatting;

import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { Popover, Typography } from "antd";
import LinearProgress from "@mui/material/LinearProgress";
import { styled, keyframes, useMediaQuery } from "@mui/system";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor",
  2.5: "Ok",
  3: "Ok",
  3.5: "Good",
  4: "Good",
  4.5: "Excellent",
  5: "Excellent+",
};

const getLabelText = (value) => {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
};

const grow = (value) => keyframes`
  from { width: 0%; }
  to { width: ${value}%; }
`;

const StyledLinearProgress = styled(LinearProgress)(({ value }) => ({
  height: 10,
  border: "1px solid black",
  borderRadius: 2,
  backgroundColor: "white",
  "& .MuiLinearProgress-bar": {
    borderRadius: 2,
    backgroundColor: "#ffb400",
    animation: `${grow(value)} 2s ease-in-out`,
  },
}));

const CustomerRating = ({ ratings }) => {
  ////console.log(ratings);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [visible, setVisible] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [progressData, setProgressData] = useState({
    "5 stars": 0,
    "4.5 stars": 0,
    "4 stars": 0,
    "3.5 stars": 0,
    "3 stars": 0,
    "2.5 stars": 0,
    "2 stars": 0,
    "1.5 stars": 0,
    "1 star": 0,
    "0.5 stars": 0,
  });

  const handlePopoverOpen = () => {
    setVisible(true);
  };

  const handlePopoverClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (ratings?.length > 0) {
      const totalRating = ratings.reduce(
        (acc, rating) => acc + rating.rating,
        0
      );
      const avgRating = totalRating / ratings.length;
      setAverageRating(avgRating);

      const ratingCounts = ratings.reduce((acc, rating) => {
        acc[rating.rating] = (acc[rating.rating] || 0) + 1;
        return acc;
      }, {});

      ////console.log("ratings", ratings);
      ////console.log("avgRating", avgRating);
      ////console.log("totalRating", totalRating);
      setProgressData({
        "5 stars": ((ratingCounts[5] || 0) / ratings.length) * 100,
        "4.5 stars": ((ratingCounts[4.5] || 0) / ratings.length) * 100,
        "4 stars": ((ratingCounts[4] || 0) / ratings.length) * 100,
        "3.5 stars": ((ratingCounts[3.5] || 0) / ratings.length) * 100,
        "3 stars": ((ratingCounts[3] || 0) / ratings.length) * 100,
        "2.5 stars": ((ratingCounts[2.5] || 0) / ratings.length) * 100,
        "2 stars": ((ratingCounts[2] || 0) / ratings.length) * 100,
        "1.5 stars": ((ratingCounts[1.5] || 0) / ratings.length) * 100,
        "1 star": ((ratingCounts[1] || 0) / ratings.length) * 100,
        "0.5 stars": ((ratingCounts[0.5] || 0) / ratings.length) * 100,
      });
    } else {
      setAverageRating(4);
      setProgressData({
        "5 stars": 54,
        "4.5 stars": 45,
        "4 stars": 40,
        "3.5 stars": 35,
        "3 stars": 30,
        "2.5 stars": 25,
        "2 stars": 20,
        "1.5 stars": 15,
        "1 star": 10,
        "0.5 stars": 0,
      });
    }
  }, [ratings]);

  const content = (
    <div>
      <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
        {averageRating.toFixed(1)} out of 5 stars
      </Typography>
      <Typography
        variant="subtitle1"
        style={{ fontSize: "small", color: "grey" }}
      >
        {ratings?.length} global ratings
      </Typography>
      {Object.entries(progressData).map(([key, val]) => (
        <Box key={key} display="flex" alignItems="center" mb={1}>
          <Box width="100px">
            <Typography variant="body2">{key}</Typography>
          </Box>
          <Box width="150px" mr={1}>
            <StyledLinearProgress variant="determinate" value={val} />
          </Box>
          <Box minWidth={35}>
            <Typography variant="body2">{`${val.toFixed(1)}%`}</Typography>
          </Box>
        </Box>
      ))}
    </div>
  );

  return (
    <Popover
      content={content}
      visible={visible}
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
      placement="bottom"
    >
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <Box sx={{ mr: 1 }}>{averageRating.toFixed(1)}</Box>
        <Rating
          name="hover-feedback"
          value={averageRating}
          precision={0.5}
          getLabelText={getLabelText}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          readOnly
          size="small"
          sx={{ fontSize: isMobile ? "12px" : "20px" }}
        />
        <Box sx={{ mx: 1, fontSize: "small", color: "blue" }}>
          {ratings?.length} ratings
        </Box>
      </Box>
    </Popover>
  );
};

export default CustomerRating;
