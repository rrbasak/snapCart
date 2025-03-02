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



import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { DatePicker, Button } from "antd";
import styles from "../../styles/AdminPrimeDay.module.css";
import moment from "moment";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrimeDates,
  clearPrimeDates,
} from "../../features/primeDayDeal/primeDaySlice";
import AdminLayout from "../../components/layout/AdminLayout";
import ManagePrimeDaySkeleton from "../../skeleton/ManagePrimeDaySkeleton";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function AdminPrimeDay() {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const primestartDate = useSelector((state) => state.primeDay.primestartDate);
  const primeendDate = useSelector((state) => state.primeDay.primeendDate);
  const [startLoading, setStartLoading] = useState(false);
  const [endLoading, setEndLoading] = useState(false);
  const onPrimeTimeChange = (dates, dateStrings) => {
    if (dates && dates.length === 2) {
      dispatch(
        setPrimeDates({
          primestartDate: dayjs(dateStrings[0]).toISOString(),
          primeendDate: dayjs(dateStrings[1]).toISOString(),
        })
      );
    }
  };

  // const handleStartClick = async () => {
  //   if (primestartDate && primeendDate) {
  //     try {
  //       const response = await axios.put("/api/v1/product/prime-start", {
  //         primestartDate,
  //         primeendDate,
  //       });
  //       toast.success("Prime Day started successfully!");
  //     } catch (error) {
  //       toast.error("Failed to start Prime Day.");
  //     }
  //   } else {
  //     toast.error("Please select a time range.");
  //   }
  // };

  // const handleEndClick = async () => {
  //   try {
  //     const response = await axios.put("/api/v1/product/prime-end");
  //     toast.success("Prime Day ended successfully!");
  //     dispatch(clearPrimeDates());
  //   } catch (error) {
  //     toast.error("Failed to end Prime Day.");
  //   }
  // };

  const getEventDetails = (date) => {
    const offerEvents = [
      {
        name: "Diwali",
        month: 11,
        day: 12,
        title: "Diwali Dhamaka Sale 🪔",
        message:
          "Celebrate Diwali with huge discounts on all products! Don't miss out.",
      },
      {
        name: "Halloween",
        month: 10,
        day: 31,
        title: "Spooky Halloween Deals 🎃",
        message:
          "Scary good discounts await you this Halloween! Shop now before the deals vanish!",
      },
      {
        name: "Christmas",
        month: 12,
        day: 25,
        title: "Merry Christmas Sale 🎄",
        message:
          "Ho Ho Ho! Christmas offers are live with up to 70% off on top brands!",
      },
      {
        name: "New Year",
        month: 1,
        day: 1,
        title: "New Year Mega Sale 🎊",
        message:
          "Start the New Year with amazing discounts on your favorite items!",
      },
    ];

    const startDate = new Date(date);
    const month = startDate.getMonth() + 1;
    const day = startDate.getDate();

    const event = offerEvents.find(
      (event) => event.month === month && event.day === day
    );

    if (event) {
      return { title: event.title, message: event.message };
    }

    return {
      title: "Limited-Time Offer 🔥",
      message:
        "Exclusive discounts are now live! Grab your favorite products before the sale ends.",
    };
  };

  const handleStartClick = async () => {
    if (primestartDate && primeendDate) {
      setStartLoading(true);
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/product/prime-start`,
          {
            primestartDate,
            primeendDate,
          }
        );
        const eventDetails = getEventDetails(primestartDate);

        await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/prime-day-start-notification`, {
          title: eventDetails.title,
          message: eventDetails.message,
          recipient: "users",
          status: "unread",
          type: "new_offer",
        });
        toast.success(response.data.message);
      } catch (error) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Failed to start Prime Day.");
        }
      } finally {
        setStartLoading(false);
      }
    } else {
      toast.error("Please select a time range.");
    }
  };

  const handleEndClick = async () => {
    setEndLoading(true);
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product/prime-end`
      );
      toast.success("Prime Day ended successfully!");
      dispatch(clearPrimeDates());
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to end Prime Day.");
      }
    } finally {
      setEndLoading(false);
    }
  };

  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  return (
    <AdminLayout title={"Dashboard - Manage Prime Day"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Prime Day</h1>
            <div className="table-responsive">
              <RangePicker
                disabledDate={disabledDate}
                size="large"
                className={styles.datePickerWrapper}
                style={{ width: "100%" }}
                onChange={onPrimeTimeChange}
                value={
                  primestartDate && primeendDate
                    ? [dayjs(primestartDate), dayjs(primeendDate)]
                    : []
                }
                placeholder={["Prime Start Time", "Prime End Time"]}
              />

              <div className={styles.buttonContainer}>
                <Button type="primary" onClick={handleStartClick}>
                  {startLoading ? (
                    <>
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ color: "white" }} spin />
                        }
                        size="small"
                      />{" "}
                      Start
                    </>
                  ) : (
                    "Start"
                  )}
                </Button>
                <Button type="primary" danger onClick={handleEndClick}>
                  {endLoading ? (
                    <>
                      <Spin
                        indicator={
                          <LoadingOutlined style={{ color: "white" }} spin />
                        }
                        size="small"
                      />{" "}
                      End
                    </>
                  ) : (
                    "End"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
