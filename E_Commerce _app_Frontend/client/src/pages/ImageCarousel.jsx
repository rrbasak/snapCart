// import React from "react";
// import { Carousel } from "antd";

// const ImageCarousel = ({ images }) => {
//   return (
//     <Carousel autoplay arrows infinite={false}>
//       {images.map((image, index) => (
//         <div
//           key={index}
//           style={{
//             width: "100%", 
//             display: "flex",
//             justifyContent: "center", 
//             alignItems: "center",
//           }}
//         >
//           <img
//             src={image.src}
//             alt={image.alt || `Slide ${index + 1}`}
//             style={{
//               width: "100%", 
//               height: "400px",
//               objectFit: "contain", 
//             }}
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default ImageCarousel;


// import React from "react";
// import { Carousel } from "antd";

// const ImageCarousel = ({ images }) => {
//   return (
//     <Carousel autoplay arrows infinite={false}>
//       {images.map((image, index) => (
//         <div
//           key={index}
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "400px",
//           }}
//         >
//           <img
//             src={image.src}
//             alt={image.alt || `Slide ${index + 1}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: "30%",
//               background:
//                 "linear-gradient(transparent, rgba(213, 217, 217, 0.5))",
//             }}
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default ImageCarousel;





// import React from "react";
// import { Carousel } from "antd";
// import styles from "../styles/ImageCarousel.module.css"; 

// const ImageCarousel = ({ images }) => {
//   return (
//     <Carousel
//       autoplay
//       arrows
//       infinite={true}
//       autoplaySpeed={10000}
//        className={styles.customCarousel}
//     >
//       {images.map((image, index) => (
//         <div
//           key={index}
//           style={{
//             position: "relative",
//             width: "100%",
//             height: "400px",
//           }}
//         >
//           <img
//             src={image.src}
//             alt={image.alt || `Slide ${index + 1}`}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//             }}
//           />

//           <div
//             style={{
//               position: "absolute",
//               bottom: 0,
//               left: 0,
//               right: 0,
//               height: "30%",
//               background:
//                 "linear-gradient(transparent, rgba(213, 217, 217, 0.5))",
//             }}
//           />
//         </div>
//       ))}
//     </Carousel>
//   );
// };

// export default ImageCarousel;


import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import "../styles/ImageCarousel.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";


const ImageCarousel = ({ images }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Carousel
      autoplay
      arrows
      infinite={true}
      autoplaySpeed={20000}
      // className={styles.customCarousel}
      draggable={true}
      // className="ant-carousel"
      // prevArrow={<LeftOutlined className={styles.customArrow} />}
      // nextArrow={<RightOutlined className={styles.customArrow} />}
    >
      {images.map((image, index) => (
        <div
          key={index}
          style={{
            position: "relative",
            width: "100%",
            height: isMobile ? "auto" : "400px", // Adjust height for mobile
          }}
        >
          <img
            src={image.src}
            alt={image.alt || `Slide ${index + 1}`}
            style={{
              width: isMobile ? "106%" : "100%",
              height: isMobile ? "300px" : "100%",
              objectFit: "cover",
            }}
          />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "30%",
              background:
                !isMobile &&
                "linear-gradient(transparent, rgba(213, 217, 217, 0.5))",
            }}
          />
        </div>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;



// import React from "react";
// import { Carousel } from "antd";
// import { LeftOutlined, RightOutlined } from "@ant-design/icons";
// // import "antd/dist/antd.css";
// import "../styles/ImageCarousel.css";

// const styleDefaults = {
//   height: 300,
//   color: "white",
//   fontSize: 100,
//   textAlign: "center",
// };

// const ImageCarousel = ({ slides }) => {
//   return (
//     <div style={{ margin: 24 }}>
//       <Carousel
//         arrows
//         prevArrow={<LeftOutlined />}
//         nextArrow={<RightOutlined />}
//       >
//         <div>
//           <h3 style={{ backgroundColor: "red", ...styleDefaults }}>1</h3>
//         </div>
//         <div>
//           <h3 style={{ backgroundColor: "teal", ...styleDefaults }}>2</h3>
//         </div>
//         <div>
//           <h3 style={{ backgroundColor: "yellow", ...styleDefaults }}>3</h3>
//         </div>
//         <div>
//           <h3 style={{ backgroundColor: "blue", ...styleDefaults }}>4</h3>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

// export default ImageCarousel;
