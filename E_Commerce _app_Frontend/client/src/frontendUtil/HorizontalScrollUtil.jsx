// // components/HorizontalScroll.js
// import React from "react";
// import styles from "../styles/HorizontalScroll.module.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faTruck,
//   faCheckCircle,
//   faUndoAlt,
//   faCreditCard,
// } from "@fortawesome/free-solid-svg-icons";
// import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
// import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
// import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
// import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
// import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
// import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
// import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
// const HorizontalScroll = () => {
//   const icons = [
//     {
//       component: LocalShippingOutlinedIcon,
//       label: "Free Delivery",
//       isMuiIcon: true,
//     },
//     {
//       component: EmojiEventsOutlinedIcon,
//       label: "Top Brand",
//       isMuiIcon: true,
//     },
//     { component: CheckCircleOutlinedIcon, label: "Certified", isMuiIcon: true },
//     {
//       component: ReplayOutlinedIcon,
//       label: "Easy Returns",
//       isMuiIcon: true,
//     },
//     {
//       component: CreditScoreOutlinedIcon,
//       label: "Secure Payments",
//       isMuiIcon: true,
//     },
//     {
//       component: VerifiedUserOutlinedIcon,
//       label: "one year Warranty",
//       isMuiIcon: true,
//     },
//     {
//       component: HandymanOutlinedIcon,
//       label: "Instalation available",
//       isMuiIcon: true,
//     },
//   ];

//   return (
//     <div className={styles.scrollContainer}>
//       {icons.map((item, index) => (
//         <div key={index} className={styles.iconContainer}>
//           {item.isMuiIcon ? (
//             <item.component style={{ fontSize: "2rem" }} />
//           ) : (
//             <FontAwesomeIcon icon={item.icon} size="2x" />
//           )}
//           <p className={styles.iconLabel}>{item.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default HorizontalScroll;

// components/HorizontalScroll.js
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/HorizontalScroll.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTruck,
  faCheckCircle,
  faUndoAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import CreditScoreOutlinedIcon from "@mui/icons-material/CreditScoreOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
const HorizontalScroll = () => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -100 : 100;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };
  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);
  const icons = [
    {
      component: LocalShippingOutlinedIcon,
      label: "Free Delivery",
      isMuiIcon: true,
    },
    {
      component: EmojiEventsOutlinedIcon,
      label: "Top Brand",
      isMuiIcon: true,
    },
    { component: CheckCircleOutlinedIcon, label: "Certified", isMuiIcon: true },
    {
      component: ReplayOutlinedIcon,
      label: "Easy Returns",
      isMuiIcon: true,
    },
    {
      component: CreditScoreOutlinedIcon,
      label: "Secure Payments",
      isMuiIcon: true,
    },
    {
      component: VerifiedUserOutlinedIcon,
      label: "One Year Warranty",
      isMuiIcon: true,
    },
    {
      component: HandymanOutlinedIcon,
      label: "Installation Available",
      isMuiIcon: true,
    },
  ];

  return (
    <div className={styles.container}>
      {showLeftArrow && (
        <KeyboardArrowLeftOutlinedIcon
          className={`${styles.arrow} ${styles.leftArrow}`}
          onClick={() => scroll("left")}
          sx={{ fontSize: 45 }}
          color="primary"
        />
      )}
      <div className={styles.scrollContainer} ref={scrollRef}>
        {icons.map((item, index) => (
          <div key={index} className={styles.iconContainer}>
            {item.isMuiIcon ? (
              <item.component style={{ fontSize: "2rem" }} />
            ) : (
              <FontAwesomeIcon icon={item.icon} size="2x" />
            )}
            <p className={styles.iconLabel}>{item.label}</p>
          </div>
        ))}
      </div>

      {showRightArrow && (
        <ChevronRightOutlinedIcon
          className={`${styles.arrow} ${styles.rightArrow}`}
          onClick={() => scroll("right")}
          sx={{
            fontSize: 45,
            // border: "1px solid black",
            // borderRadius: "5px",
          }}
          color="primary"
        />
      )}
    </div>
  );
};

export default HorizontalScroll;
