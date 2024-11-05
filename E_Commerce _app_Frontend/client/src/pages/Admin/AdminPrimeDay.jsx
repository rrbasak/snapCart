// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import AdminMenu from "../../components/layout/AdminMenu";
// import Layout from "../../components/layout/Layout";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { DatePicker, } from "antd";
// import styles from "../../styles/AdminPrimeDay.module.css";

// export default function AdminPrimeDay() {
//   const { RangePicker } = DatePicker;
//   const [primestarttime, setPrimeStartTime] = useState("");
//   const [primeendtime, setPrimeEndTime] = useState("");

//   const onPrimeTimeChange = (time, timeString) => {
//     setPrimeStartTime(timeString[0]);
//     setPrimeEndTime(timeString[1]);
//   };
//   return (
//     <Layout title={"Dashboard - Create Category"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Manage Prime Day</h1>
//             <div className="p-3 w-75">
//               {/* Prime Delivery */}
//               <RangePicker
//                 size="large"
//                 // className={styles.datePickerWrapper}
//                 style={{width:"100%"}}
//                 onChange={onPrimeTimeChange}
//                 placeholder={["Prime Start Time", "Prime End Time"]}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }

// /* eslint-disable no-unused-vars */
// import React, { useState } from "react";
// import AdminMenu from "../../components/layout/AdminMenu";
// import Layout from "../../components/layout/Layout";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { DatePicker, Button } from "antd";
// import styles from "../../styles/AdminPrimeDay.module.css";
// import moment from "moment";

// import { useDispatch, useSelector } from "react-redux";
// import {
//   setPrimeDates,
//   clearPrimeDates,
// } from "../../features/primeDayDeal/primeDaySlice";

// export default function AdminPrimeDay() {
//   const { RangePicker } = DatePicker;
//   const dispatch = useDispatch();
//   const prime_startDate = useSelector((state) => state.primeDay.primestartDate);
//   const prime_endDate = useSelector((state) => state.primeDay.primeendDate);
//   const [primestartDate, setPrimestartDate] = useState("");
//   const [primeendDate, setPrimeendDate] = useState("");

//   const onPrimeTimeChange = (time, timeString) => {
//     setPrimestartDate(timeString[0]);
//     setPrimeendDate(timeString[1]);
//     dispatch(
//       setPrimeDates({
//         primestartDate: timeString[0],
//         primeendDate: timeString[1],
//       })
//     );
//   };

//   const handleStartClick = async () => {
//     if (primestartDate && primeendDate) {
//       try {
//         const response = await axios.put("/api/v1/product/prime-start", {
//           primestartDate,
//           primeendDate,
//         });
//         toast.success("Prime Day started successfully!");
//       } catch (error) {
//         toast.error("Failed to start Prime Day.");
//       }
//     } else {
//       toast.error("Please select a time range.");
//     }
//   };

//   const handleEndClick = async () => {
//     setPrimestartDate("");
//     setPrimeendDate("");
//     try {
//       const response = await axios.put("/api/v1/product/prime-end");
//       toast.success("Prime Day ended successfully!");
//       dispatch(clearPrimeDates());
//     } catch (error) {
//       toast.error("Failed to end Prime Day.");
//     }
//   };

//   return (
//     <Layout title={"Dashboard - Manage Prime Day"}>
//       <div className="container-fluid m-3 p-3">
//         <div className="row">
//           <div className="col-md-3">
//             <AdminMenu />
//           </div>
//           <div className="col-md-9">
//             <h1>Manage Prime Day</h1>
//             <div className="p-3 w-75">
//               <RangePicker
//                 size="large"
//                 className={styles.datePickerWrapper}
//                 style={{ width: "100%" }}
//                 onChange={onPrimeTimeChange}
//                 value={
//                   primestartDate && primeendDate
//                     ? [moment(primestartDate), moment(primeendDate)]
//                     : []
//                 }
//                 placeholder={["Prime Start Time", "Prime End Time"]}
//               />
//               <div className={styles.buttonContainer}>
//                 <Button type="primary" onClick={handleStartClick}>
//                   Start
//                 </Button>
//                 <Button type="danger" onClick={handleEndClick}>
//                   End
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// }



/* eslint-disable no-unused-vars */
import React from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { DatePicker, Button } from "antd";
import styles from "../../styles/AdminPrimeDay.module.css";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";
import {
  setPrimeDates,
  clearPrimeDates,
} from "../../features/primeDayDeal/primeDaySlice";

export default function AdminPrimeDay() {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const primestartDate = useSelector((state) => state.primeDay.primestartDate);
  const primeendDate = useSelector((state) => state.primeDay.primeendDate);

  const onPrimeTimeChange = (time, timeString) => {
    dispatch(
      setPrimeDates({
        primestartDate: timeString[0],
        primeendDate: timeString[1],
      })
    );
  };

  const handleStartClick = async () => {
    if (primestartDate && primeendDate) {
      try {
        const response = await axios.put("/api/v1/product/prime-start", {
          primestartDate,
          primeendDate,
        });
        toast.success("Prime Day started successfully!");
      } catch (error) {
        toast.error("Failed to start Prime Day.");
      }
    } else {
      toast.error("Please select a time range.");
    }
  };

  const handleEndClick = async () => {
    try {
      const response = await axios.put("/api/v1/product/prime-end");
      toast.success("Prime Day ended successfully!");
      dispatch(clearPrimeDates());
    } catch (error) {
      toast.error("Failed to end Prime Day.");
    }
  };

  return (
    <Layout title={"Dashboard - Manage Prime Day"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Prime Day</h1>
            <div className="p-3 w-75">
              <RangePicker
                size="large"
                className={styles.datePickerWrapper}
                style={{ width: "100%" }}
                onChange={onPrimeTimeChange}
                value={
                  primestartDate && primeendDate
                    ? [moment(primestartDate), moment(primeendDate)]
                    : []
                }
                placeholder={["Prime Start Time", "Prime End Time"]}
              />
              <div className={styles.buttonContainer}>
                <Button type="primary" onClick={handleStartClick}>
                  Start
                </Button>
                <Button type="danger" onClick={handleEndClick}>
                  End
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
