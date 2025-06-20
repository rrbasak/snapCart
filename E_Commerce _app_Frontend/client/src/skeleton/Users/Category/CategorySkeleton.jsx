// import React from "react";
// import { Skeleton, Grid, useMediaQuery } from "@mui/material";

// const CategorySkeleton = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       {Array.from({ length: 3 }).map((_, index) => (
//         <Grid item xs={isMobile ? 12 : 4} key={`upper-${index}`}>
//           <Skeleton
//             variant="rectangle"
//             width={isMobile ? "100%" : 298.4}
//             height={isMobile ? 200 : 238.71}
//             sx={{ borderRadius: 5 }}
//           />
//         </Grid>
//       ))}

//       {Array.from({ length: 3 }).map((_, index) => (
//         <Grid item xs={isMobile ? 12 : 4} key={`lower-${index}`}>
//           <Skeleton
//             variant="rectangle"
//             width={isMobile ? "100%" : 298.4}
//             height={isMobile ? 200 : 238.71}
//             sx={{ borderRadius: 5 }}
//           />
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default CategorySkeleton;

// import React from "react";
// import { Skeleton, Grid, useMediaQuery } from "@mui/material";

// const CategorySkeleton = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       {Array.from({ length: 6 }).map((_, rowIndex) => (
//         <Grid
//           container
//           item
//           spacing={2}
//           key={`row-${rowIndex}`}
//           justifyContent="center"
//         >
//           {Array.from({ length: 2 }).map((_, colIndex) => (
//             <Grid item xs={6} key={`col-${rowIndex}-${colIndex}`}>
//               <Skeleton
//                 variant="rectangle"
//                 width={isMobile ? 185.2 : 298.4}
//                 height={isMobile ? 200 : 238.71}
//                 sx={{ borderRadius: 5 }}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default CategorySkeleton;

// import React from "react";
// import { Skeleton, Grid, useMediaQuery } from "@mui/material";

// const CategorySkeleton = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const skeletonsPerRow = isMobile ? 2 : 3; // Mobile: 2 per row, Desktop: 3 per row
//   const totalSkeletons = 6;

//   return (
//     <Grid container spacing={2} justifyContent="center">
//       {Array.from({ length: totalSkeletons / skeletonsPerRow }).map(
//         (_, rowIndex) => (
//           <Grid
//             container
//             item
//             spacing={2}
//             key={`row-${rowIndex}`}
//             justifyContent="center"
//           >
//             {Array.from({ length: skeletonsPerRow }).map((_, colIndex) => (
//               <Grid item xs={6} md={4} key={`col-${rowIndex}-${colIndex}`}>
//                 <Skeleton
//                   variant="rectangle"
//                   width={isMobile ? 185.2 : 298.4}
//                   height={isMobile ? 200 : 238.71}
//                   sx={{ borderRadius: 5 }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         )
//       )}
//     </Grid>
//   );
// };

// export default CategorySkeleton;

// import React from "react";
// import { Skeleton, Grid, useMediaQuery } from "@mui/material";

// const CategorySkeleton = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const skeletonsPerRow = isMobile ? 20 : 3; // Mobile: 2 per row, Desktop: 3 per row
//   const totalSkeletons = 6;

//   return (
//     <Grid container spacing={isMobile ? 2 : 3} justifyContent="center">
//       {Array.from({ length: totalSkeletons / skeletonsPerRow }).map(
//         (_, rowIndex) => (
//           <Grid
//             container
//             item
//             spacing={isMobile ? 20 : 3}
//             key={`row-${rowIndex}`}
//             justifyContent={isMobile ? "space-between" : "center"} // Adjusts spacing
//           >
//             {Array.from({ length: skeletonsPerRow }).map((_, colIndex) => (
//               <Grid
//                 item
//                 xs={5.5} // Ensures spacing between two skeletons in mobile
//                 md={4}
//                 key={`col-${rowIndex}-${colIndex}`}
//               >
//                 <Skeleton
//                   variant="rectangle"
//                   width={isMobile ? 165.2 : 298.4}
//                   height={isMobile ? 200 : 238.71}
//                   sx={{ borderRadius: 5 }}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         )
//       )}
//     </Grid>
//   );
// };

// export default CategorySkeleton;

import React from "react";
import { Skeleton, Grid, useMediaQuery } from "@mui/material";

const CategorySkeleton = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const skeletonsPerRow = isMobile ? 22 : 3; 
  const totalSkeletons = 6;

  return (
    <Grid container spacing={2}>
      {Array.from({ length: totalSkeletons }).map((_, index) => (
        <Grid item xs={6} md={4} key={index}>
          <Skeleton
            variant="rectangle"
            width={isMobile ? 185.2 : 298.4}
            height={isMobile ? 200 : 238.71}
            sx={{ borderRadius: 5 }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CategorySkeleton;

// import React from "react";
// import { Skeleton, useMediaQuery } from "@mui/material";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardBody,
//   MDBCardImage,
//   MDBCardText,
// } from "mdb-react-ui-kit";
// import styles from "../../../styles/Categories.module.css";
// const CategorySkeleton = () => {
//   const isMobile = useMediaQuery("(max-width: 768px)");
//   const skeletons = Array.from({ length: 6 });

//   return (
//     <div
//     //   style={{
//     //     display: "flex",
//     //     flexWrap: "wrap",
//     //     gap: isMobile ? 12 : 16,
//     //     justifyContent: "center",
//     //   }}
//     >
//       {skeletons.map((_, index) => (
//         <MDBCol
//           md="4"
//           className={`mb-4 d-flex justify-content-center ${styles.cardCol}`}
//         >
//           <MDBCard className={styles.card}>
//             <Skeleton
//             //   variant="rectangle"
//             //   width="100%"
//             //   height={isMobile ? 200 : 238.71}
//             //   sx={{ borderRadius: 5 }}
//             />
//           </MDBCard>
//         </MDBCol>
//       ))}
//     </div>
//   );
// };

// export default CategorySkeleton;
