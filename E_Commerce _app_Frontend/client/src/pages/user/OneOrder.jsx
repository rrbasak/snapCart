/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import Layout from "../../components/layout/Layout";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBBreadcrumb,
//   MDBBreadcrumbItem,
//   MDBListGroup,
//   MDBListGroupItem,
//   MDBIcon,
//   MDBProgressBar,
//   MDBProgress,
//   button,
// } from "mdb-react-ui-kit";
// import { useAuth } from "../../context/auth";
// import axios from "axios";
// import formatTimestamp from "../../frontendUtil/dateUtil.js";
// import HorizontalLinearStepper from "../../frontendUtil/stepperUtil.jsx";
// import useWindowDimensions from "../../Custome Hooks/useWindowDimensions.jsx";
// import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
// import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
// import styles from "../../styles/OrderAnother.module.css";
// import { useLocation } from "react-router-dom";

// export default function OneOrder() {
//   const { width } = useWindowDimensions();
//   const isSmallScreen = width <= 800;
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const orderId = queryParams.get("orderId");
//   const [auth, setAuth] = useAuth();

//   const [order, setOrder] = useState([]);
//   const [address, setAddress] = useState();

//   const fetchOneOrder = async (req, res) => {
//     try {
//       const { data } = await axios.get(`/api/v1/auth/get-one-order/${orderId}`);
//       setOrder(data);
//       //console.log(data);
//       //console.log("HI");
//     } catch (error) {
//       //console.log(error);
//     }
//   };
//   useEffect(() => {
//     if (auth?.accessToken) {
//       const { address } = auth?.user;
//       setAddress(address);
//       fetchOneOrder();
//     }
//   }, [auth?.accessToken]);

//   const totalPrice = order[0]?.products?.reduce(
//     (total, product) => total + product.orgprice * product.quantity,
//     0
//   );
//   return (
//     <Layout title={"Your Order"}>
//       <MDBCardBody>
//         <MDBRow className="mb-4">
//           <MDBCol lg="12">
//             <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
//               <MDBCardBody>
//                 <MDBRow>
//                   <MDBCol sm="12">
//                     <MDBCardText
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexDirection: isSmallScreen ? "column" : "row",
//                       }}
//                     >
//                       <span style={{ fontWeight: "Bold" }}>
//                         Order Date : {formatTimestamp(order[0]?.createdAt)}
//                       </span>
//                       <span
//                         style={{
//                           fontWeight: "Bold",
//                           flex: 1,
//                           marginLeft: isSmallScreen ? "0" : "38px",
//                           textAlign: isSmallScreen ? "left" : "right",
//                           marginTop: isSmallScreen ? "10px" : "0",
//                         }}
//                       >
//                         Shipping address : {address}
//                       </span>
//                     </MDBCardText>

//                     <MDBCardText>
//                       <span style={{ fontWeight: "bold" }}>
//                         Estimated Delivery Date :{" "}
//                         {formatTimestamp(
//                           order[0]?.products[0]?.product?.freedeliveryDate
//                         )}
//                       </span>
//                     </MDBCardText>
//                     <MDBCardText
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         flexDirection: isSmallScreen ? "column" : "row",
//                       }}
//                     >
//                       <span style={{ fontWeight: "bold" }}>
//                         Quantity: {order[0]?.products?.length}
//                       </span>
//                       {!isSmallScreen && (
//                         <div
//                           style={{
//                             display: "flex",
//                             width: "73%",
//                           }}
//                         >
//                           <div
//                             style={{
//                               width: "145px",
//                               height: "20px",
//                             }}
//                           />
//                           <HorizontalLinearStepper status={order[0]?.status} />
//                         </div>
//                       )}
//                     </MDBCardText>
//                     {isSmallScreen && (
//                       <div
//                         style={{
//                           marginTop: "10px",
//                           margin: "9px -10px",
//                         }}
//                       >
//                         <HorizontalLinearStepper status={order[0]?.status} />
//                       </div>
//                     )}

//                     <MDBCardText
//                       style={{
//                         marginTop: isSmallScreen ? "30px" : "0",
//                       }}
//                     >
//                       <span
//                         style={{
//                           fontWeight: "bold",
//                         }}
//                       >
//                         Sub Total : ₹{totalPrice?.toFixed(2)}
//                       </span>
//                     </MDBCardText>

//                     <MDBRow className="g-2">
//                       {order[0]?.products.map((product, j) => (
//                         <MDBCol lg="6" key={j}>
//                           <MDBCard
//                             className={`mb-3 ${styles.customCard}`}
//                             style={{
//                               borderRadius: "22px",
//                               cursor: "pointer",
//                             }}
//                           >
//                             <MDBCardBody
//                               className={`d-flex flex-column align-items-start ${styles.cardBody}`}
//                               style={{
//                                 borderRadius: "15px",
//                                 paddingTop: "0.5rem",
//                               }}
//                             >

//                               <div className="d-flex justify-content-start mb-2">
//                                 {product?.isprime && (
//                                   <span
//                                     className={`${styles.tag} ${styles.primeDayTag}`}
//                                   >
//                                     <CelebrationOutlinedIcon fontSize="small" />{" "}
//                                     Prime Day Deal
//                                   </span>
//                                 )}
//                                 {product?.isexchangeapplied && (
//                                   <span
//                                     className={`${styles.tag} ${styles.exchangeAppliedTag}`}
//                                   >
//                                     <VerifiedOutlinedIcon fontSize="small" />{" "}
//                                     Exchange Applied
//                                   </span>
//                                 )}
//                               </div>

//                               <div className="d-flex align-items-center">
//                                 <div className={styles.imageContainer}>
//                                   <MDBCardImage
//                                     src={`/api/v1/product/product-photo/${product?.product._id}`}
//                                     alt={product?.product.name}
//                                     fluid
//                                   />
//                                 </div>
//                                 <div className={styles.detailsContainer}>
//                                   <p className={styles.productDetail}>
//                                     <strong>Name:</strong>{" "}
//                                     {product?.product.name}
//                                   </p>
//                                   <p className={styles.productDetail}>
//                                     <strong>Price:</strong> ₹
//                                     {product?.orgprice.toFixed(2)}
//                                   </p>
//                                   <p className={styles.productDetail}>
//                                     <strong>Quantity:</strong>{" "}
//                                     {product?.quantity}
//                                   </p>
//                                 </div>
//                               </div>
//                             </MDBCardBody>
//                           </MDBCard>
//                         </MDBCol>
//                       ))}
//                     </MDBRow>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCardBody>
//             </MDBCard>
//           </MDBCol>
//         </MDBRow>
//       </MDBCardBody>
//     </Layout>
//   );
// }

import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBProgressBar,
  MDBProgress,
  button,
} from "mdb-react-ui-kit";
import { useAuth } from "../../context/auth";
import axios from "axios";
import formatTimestamp from "../../frontendUtil/dateUtil.js";
import HorizontalLinearStepper from "../../frontendUtil/stepperUtil.jsx";
import useWindowDimensions from "../../Custome Hooks/useWindowDimensions.jsx";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import styles from "../../styles/OrderAnother.module.css";
import { useLocation } from "react-router-dom";
import ReviewSection from "../../components/commonComponents/ReviewSection.jsx";
import toast from "react-hot-toast";

export default function OneOrder() {
  const { width } = useWindowDimensions();
  const isSmallScreen = width <= 800;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderId");
  const productId = queryParams.get("productId");
  const [auth, setAuth] = useAuth();
  const [productDetails, setProductDetails] = useState();
  const [order, setOrder] = useState([]);
  const [address, setAddress] = useState();

  //console.log("productDetails", productDetails);

  // review
  //console.log("auth", auth?.user?._id);
  const [canReview, setCanReview] = useState(false);
  const [reviewLength, setReviewsLength] = useState(0);
  const getNumberOfReviewFunc = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/review/get-review-length/${productId}`
      );
      if (response.data.success) {
        setReviewsLength(response.data.reviewLength);
      }
    } catch (error) {
      toast.error("Failed to get reviews");
    }
  };
  const getonereview = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/review/get-one-review/${productId}/${auth?.user?._id}/${orderId}`
      );
      if (response.data.success) {
        setReviewsList(response.data.reviews);
      }
    } catch (error) {
      //console.log("error",error)
      // toast.error("Failed to get reviews");
    }
  };
  const getLength = () => {
    //console.log("cacll in ");
    if (productId) {
      getNumberOfReviewFunc();
    }
  };
  const [reviewsList, setReviewsList] = useState([]);
  const addReview = (newReview) => {
    setReviewsList((prevReviews) => [...prevReviews, newReview]);
    getNumberOfReviewFunc();
    setCanReview(false);
  };
  const deleteReview = (newReview) => {
    setReviewsList(newReview);
  };

  const checkEligibility = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/review/can-review/${productId}/${auth?.user?._id}/${orderId}`
      );
      if (data.success) {
        setCanReview(true);
        setProductDetails(data?.productDetails);
      }
    } catch (error) {
      console.error("Error checking review eligibility:", error);
    }
  };
  useEffect(() => {
    if (productId && auth?.user?._id) {
      checkEligibility();
      getonereview();
    }
  }, [productId, auth?.user?._id]);
  useEffect(() => {
    //console.log("Updated reviewsList:", reviewsList);
  }, [reviewsList]);
  //end
  const fetchOneOrder = async (req, res) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/get-one-order/${orderId}`);
      setOrder(data);
      //console.log(data);
      //console.log("HI");
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.accessToken) {
      const { address } = auth?.user;
      setAddress(address);
      fetchOneOrder();
    }
  }, [auth?.accessToken]);

  const totalPrice = order[0]?.products?.reduce(
    (total, product) => total + product.orgprice * product.quantity,
    0
  );

  const particularproduct = order[0]?.products?.find(
    (prod) => prod.product?._id.toString() === productId
  );
  //console.log("particularproduct", particularproduct);
  return (
    <Layout title={"Your Order"}>
      <MDBContainer
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <MDBCardBody
          style={{
            width: isSmallScreen ? "90%" : "70%",
            maxWidth: "800px",
          }}
        >
          <MDBRow className="mb-4">
            <MDBCol lg="12">
              <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="12">
                      <MDBCardText
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: isSmallScreen ? "column" : "row",
                        }}
                      >
                        <span style={{ fontWeight: "Bold" }}>
                          Order Date : {formatTimestamp(order[0]?.createdAt)}
                        </span>
                        {/* <span
                          style={{
                            fontWeight: "Bold",
                            flex: 1,
                            marginLeft: isSmallScreen ? "0" : "38px",
                            textAlign: isSmallScreen ? "left" : "right",
                            marginTop: isSmallScreen ? "10px" : "0",
                          }}
                        >
                          Shipping address : {address}
                        </span> */}
                      </MDBCardText>
                      <MDBCardText>
                        <span
                          style={{
                            fontWeight: "Bold",
                            // flex: 1,
                            // marginLeft: isSmallScreen ? "0" : "38px",
                            // textAlign: isSmallScreen ? "left" : "right",
                            // marginTop: isSmallScreen ? "10px" : "0",
                          }}
                        >
                          Shipping address : {address}
                        </span>
                      </MDBCardText>
                      <MDBCardText>
                        <span style={{ fontWeight: "bold" }}>
                          Estimated Delivery Date :{" "}
                          {formatTimestamp(
                            order[0]?.products[0]?.product?.freedeliveryDate
                          )}
                        </span>
                      </MDBCardText>
                      <MDBCardText
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: isSmallScreen ? "column" : "row",
                        }}
                      >
                        {order[0]?.status !== "Delivered" && (
                          <span style={{ fontWeight: "bold" }}>
                            Total Order(s): {order[0]?.products?.length}
                          </span>
                        )}
                        {order[0]?.status === "Delivered" && (
                          <span style={{ fontWeight: "bold" }}>
                            Quantity: {particularproduct?.quantity}
                          </span>
                        )}
                        {/* {!isSmallScreen && (
                          <div
                            style={{
                              display: "flex",
                              width: "73%",
                            }}
                          >
                            <div
                              style={{
                                width: "145px",
                                height: "20px",
                              }}
                            />
                            <HorizontalLinearStepper
                              status={order[0]?.status}
                            />
                          </div>
                        )} */}
                      </MDBCardText>
                      <MDBCardText
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          flexDirection: isSmallScreen ? "column" : "row",
                        }}
                      >
                        {!isSmallScreen && (
                          <HorizontalLinearStepper
                            status={order[0]?.status}
                            orderDate={order[0]?.createdAt}
                            updateDate={order[0]?.updatedAt}
                          />
                          // <Stepper />
                        )}
                      </MDBCardText>
                      {isSmallScreen && (
                        <div
                          style={{
                            marginTop: "10px",
                            margin: "9px -10px",
                          }}
                        >
                          <HorizontalLinearStepper
                            status={order[0]?.status}
                            orderDate={order[0]?.createdAt}
                            updateDate={order[0]?.updatedAt}
                          />
                        </div>
                      )}

                      {order[0]?.status !== "Delivered" && (
                        <MDBRow className="g-2">
                          {order[0]?.products.map((product, j) => (
                            <MDBCol lg="6" key={j}>
                              <MDBCard
                                className={`mb-3 ${styles.customCard}`}
                                style={{
                                  borderRadius: "22px",
                                  cursor: "pointer",
                                }}
                              >
                                <MDBCardBody
                                  className={`d-flex flex-column align-items-start ${styles.cardBody}`}
                                  style={{
                                    borderRadius: "15px",
                                    paddingTop: "0.5rem",
                                  }}
                                >
                                  <div className="d-flex justify-content-start mb-2">
                                    {product?.isprime && (
                                      <span
                                        className={`${styles.tag} ${styles.primeDayTag}`}
                                      >
                                        <CelebrationOutlinedIcon fontSize="small" />{" "}
                                        Prime Day Deal
                                      </span>
                                    )}
                                    {product?.isexchangeapplied && (
                                      <span
                                        className={`${styles.tag} ${styles.exchangeAppliedTag}`}
                                      >
                                        <VerifiedOutlinedIcon fontSize="small" />{" "}
                                        Exchange Applied
                                      </span>
                                    )}
                                  </div>

                                  <div className="d-flex align-items-center">
                                    <div className={styles.imageContainer}>
                                      <MDBCardImage
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product?.product._id}`}
                                        alt={product?.product.name}
                                        fluid
                                      />
                                    </div>
                                    <div className={styles.detailsContainer}>
                                      <p className={styles.productDetail}>
                                        <strong>Name:</strong>{" "}
                                        {product?.product.name}
                                      </p>
                                      <p className={styles.productDetail}>
                                        <strong>Price:</strong> ₹
                                        {product?.orgprice.toFixed(2)}
                                      </p>
                                      <p className={styles.productDetail}>
                                        <strong>Quantity:</strong>{" "}
                                        {product?.quantity}
                                      </p>
                                    </div>
                                  </div>
                                </MDBCardBody>
                              </MDBCard>
                            </MDBCol>
                          ))}
                        </MDBRow>
                      )}
                      {order[0]?.status === "Delivered" && (
                        <MDBRow className="g-2">
                          <MDBCol lg="6">
                            <MDBCard
                              className={`mb-3 ${styles.customCard}`}
                              style={{
                                borderRadius: "22px",
                                cursor: "pointer",
                              }}
                            >
                              <MDBCardBody
                                className={`d-flex flex-column align-items-start ${styles.cardBody}`}
                                style={{
                                  borderRadius: "15px",
                                  paddingTop: "0.5rem",
                                }}
                              >
                                <div className="d-flex justify-content-start mb-2">
                                  {particularproduct?.isprime && (
                                    <span
                                      className={`${styles.tag} ${styles.primeDayTag}`}
                                    >
                                      <CelebrationOutlinedIcon fontSize="small" />{" "}
                                      Prime Day Deal
                                    </span>
                                  )}
                                  {particularproduct?.isexchangeapplied && (
                                    <span
                                      className={`${styles.tag} ${styles.exchangeAppliedTag}`}
                                    >
                                      <VerifiedOutlinedIcon fontSize="small" />{" "}
                                      Exchange Applied
                                    </span>
                                  )}
                                </div>

                                <div className="d-flex align-items-center">
                                  <div className={styles.imageContainer}>
                                    <MDBCardImage
                                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${particularproduct?.product?._id}`}
                                      alt={particularproduct?.name}
                                      fluid
                                    />
                                  </div>
                                  <div className={styles.detailsContainer}>
                                    <p className={styles.productDetail}>
                                      <strong>Name:</strong>{" "}
                                      {particularproduct?.product.name}
                                    </p>
                                    <p className={styles.productDetail}>
                                      <strong>Price:</strong> ₹
                                      {particularproduct?.orgprice.toFixed(2)}
                                    </p>
                                    <p className={styles.productDetail}>
                                      <strong>Quantity:</strong>{" "}
                                      {particularproduct?.quantity}
                                    </p>
                                  </div>
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      )}
                      {order[0]?.status !== "Delivered" && (
                        <MDBCardText
                          style={{
                            marginTop: isSmallScreen ? "30px" : "10px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Sub Total : ₹{totalPrice?.toFixed(2)}
                          </span>
                        </MDBCardText>
                      )}
                      {/* {order[0]?.status === "Delivered" && (
                        <MDBCardText
                          style={{
                            marginTop: isSmallScreen ? "30px" : "10px",
                          }}
                        >
                          <span
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            Price : ₹{totalPrice?.toFixed(2)}
                          </span>
                        </MDBCardText>
                      )} */}
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBContainer>
      {order[0]?.status === "Delivered" && (
        <MDBContainer>
          <MDBCardBody>
            <MDBRow>
              <ReviewSection
                pid={productId}
                getLength={getLength}
                reviewsList={reviewsList}
                addReview={addReview}
                deleteReview={deleteReview}
                canReview={canReview}
                orderId={orderId}
              />
            </MDBRow>
          </MDBCardBody>
        </MDBContainer>
      )}
    </Layout>
  );
}
