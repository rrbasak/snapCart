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
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  Polyline,
} from "@react-google-maps/api";
import { Button } from "antd";
import LocationFetcher from "../../frontendUtil/LocationFetcherUtil.jsx";
import MapWithDirections from "../../components/commonComponents/MapWithDirections.jsx";

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

  // maps
  const [center, setCenter] = useState(null);
  const [directions, setDirections] = useState(null);
  const [adminLocation, setAdminLocation] = useState({
    lat: 22.575514, // Example initial admin latitude
    lng: 88.363354, // Example initial admin longitude
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  //new
  const [userLocation, setUserLocation] = useState(null); // User's location (lat/lng)
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState(null);

  // Get the user's current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userLocation);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const getDeliveryPartnerLocation = () => {
    // setDeliveryPartnerLocation({
    //   lat: 22.576,
    //   lng: 88.365,
    // });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const deliveryPartnerLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setDeliveryPartnerLocation(deliveryPartnerLocation);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    // Get the user's location and simulate delivery partner location
    getUserLocation();
    getDeliveryPartnerLocation(); // Replace with real-time location data from the delivery partner

    // // Fetch order details after authentication
    // if (auth?.accessToken) {
    //   fetchOneOrder();
    // }
  }, [auth]);

  //new end
  // // This function will get the user's current location
  // const getUserLocation = () => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       const userLocation = {
  //         lat: position.coords.latitude,
  //         lng: position.coords.longitude,
  //       };
  //       setCenter(userLocation); // Update the map center with the user's location
  //     });
  //   } else {
  //     console.log("Geolocation is not supported by this browser.");
  //   }
  // };

  // const moveAdminLocation = (newLocation) => {
  //   setAdminLocation(newLocation);
  // };
  // useEffect(() => {
  //   console.log("Updated directions:", directions);
  // }, [directions]);
  // // Run getUserLocation when the component mounts
  // useEffect(() => {
  //   getUserLocation();

  //   // Simulate admin location moving every 5 seconds for demonstration
  //   const moveInterval = setInterval(() => {
  //     const newAdminLocation = {
  //       lat: adminLocation.lat + 0.0001, // Example movement of admin
  //       lng: adminLocation.lng + 0.0001,
  //     };
  //     moveAdminLocation(newAdminLocation);
  //   }, 5000); // Move admin location every 5 seconds

  //   // Clear the interval on component unmount
  //   return () => clearInterval(moveInterval);
  // }, []);

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
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-one-order/${orderId}`
      );
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
  // console.log(
  //   "process.env.GO_MAPS_API_KEYS",
  //   process.env.REACT_APP_GO_MAPS_API_KEYS
  // );
  const containerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  };

  // const center = {
  //   lat: 22.6018475,
  //   lng: 88.4306604,
  // };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // googleMapsApiKey: "AIzaSyDrdGO4WZZUva2vHxOAP4VF7sArwO5-IP0",
    // googleMapsApiKey: process.env.REACT_APP_GO_MAPS_API_KEYS,
    googleMapsApiKey: process.env.REACT_APP_GO_MAPS_SEC_API_KEYS,
    // libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  //maps functions

  const fetchDirections = async (origin, destination) => {
    try {
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?destination=${destination}&origin=${origin}&key=YOUR_API_KEY`
      );
      const data = await response.json();

      console.log("Directions Data:", data); // Debugging

      if (data.routes.length > 0) {
        setDirections(data.routes[0]); // Store the first route
      } else {
        console.error("No route found.");
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  const polylinePath = directions?.legs?.flatMap((leg) =>
    leg.steps.map((step) => ({
      lat: step.end_location.lat,
      lng: step.end_location.lng,
    }))
  );

  return (
    <Layout title={"Your Order"}>
      {/* <LocationFetcher onLocationFetched={handleLocationFetched} /> */}
      {order[0]?.status === "Out For Delivery" && (
        <MDBContainer
          className="d-flex justify-content-center align-items-center"
          // style={{ minHeight: "100vh" }}
        >
          <MDBCardBody
            style={{
              width: isSmallScreen ? "90%" : "70%",
              maxWidth: "800px",
            }}
          >
            <MDBRow className="mb-1">
              <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
                <MDBCardBody>
                  <MDBRow>
                    <div>
                      <div style={{ width: "100%", height: "400px" }}>
                        {/* {center && (
                          <GoogleMap
                            center={center}
                            zoom={15}
                            mapContainerStyle={{
                              width: "100%",
                              height: "100%",
                            }}
                            // options={{
                            //   streetViewControl: true,
                            //   fullscreenControl: true,
                            //   mapTypeControl: true,
                            // }}
                            onLoad={(map) => setMap(map)}
                          >
                            <Marker position={center} />
                            <Marker position={adminLocation} />
                            <DirectionsService
                              options={{
                                origin: adminLocation,
                                destination: center,
                                // travelMode: "DRIVING",
                                travelMode:
                                  window.google.maps.TravelMode.DRIVING,
                              }}
                              // callback={(response) => {
                              //   if (response?.status === "OK") {
                              //     setDirections(response);
                              //   }
                              // }}
                              callback={(response, status) => {
                                console.log(
                                  "Directions Response:",
                                  response,
                                  "Status:",
                                  status
                                );
                                if (
                                  status ===
                                  window.google.maps.DirectionsStatus.OK
                                ) {
                                  console.log("Directions response:", response);
                                  setDirections(response);
                                } else {
                                  console.error(
                                    "Error fetching directions:",
                                    status
                                  );
                                }
                              }}
                            />
                            {directions && (
                              <DirectionsRenderer options={{ directions }} />
                            )}
                          </GoogleMap>
                        )} */}

                        {userLocation && deliveryPartnerLocation && (
                          <MapWithDirections
                            userLocation={userLocation}
                            deliveryPartnerLocation={deliveryPartnerLocation}
                            setMapRef={setMap}
                            UserLabel="User"
                            deliveryPartnerLabel="Delivery Partner"
                          />
                        )}
                      </div>
                      <div className="d-flex justify-content-center mt-2">
                        <Button onClick={() => map.panTo(userLocation)}>
                          Center
                        </Button>
                      </div>
                    </div>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCardBody>
        </MDBContainer>
      )}
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
