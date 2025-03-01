import React, { useEffect, useState } from "react";
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
import StepperUtilAnother from "../../frontendUtil/stepperUtilAnother.jsx";
import { ShareModal } from "../../components/Modals/ShareModal";
import styles from "../../styles/OrderAnother.module.css";
//svg icons import
import ShareIcon from "../../SrcImages/shareIcon.svg";
import NextIcon from "../../SrcImages/nextIcon.svg";
import PreviousIcon from "../../SrcImages/previousIcon.svg";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Button, Flex } from "antd";
import DeleteModal from "../../components/Modals/DeleteModal.jsx";
import Stepper from "../../frontendUtil/Stepper.jsx";

export default function OrdersAnother() {
  const { width } = useWindowDimensions();
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState();
  const [auth, setAuth] = useAuth();

  // modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalField, setModalField] = useState("");
  const [modalValue, setModalValue] = useState("");
  const [Index, setIndex] = useState();
  const [orderid, setOrderId] = useState("");
  const [userid, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [email, setEmail] = useState("");

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  const isSmallScreen = width <= 800;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [reason, setReason] = useState("");

  const openDeleteModal = (id, user, status, name, email) => {
    setOrderId(id);
    setUserId(user);
    setStatus(status);
    setBuyerName(name);
    setEmail(email);
    setIsModalVisible(true);
  };

  const handleDeleteOk = async () => {
    setIsModalVisible(false);
    getOrders();
  };

  const handleDeleteCancel = () => {
    setIsModalVisible(false);
  };

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
      ////console.log(data);
    } catch (error) {
      //////console.log(error);
    }
  };

  useEffect(() => {
    const { address } = auth?.user;
    setAddress(address);
    if (auth?.accessToken) getOrders();
  }, [auth?.accessToken]);

  const showModal = (field, value, index) => {
    setModalField(field);
    setModalValue(value);
    setIsModalOpen(true);
    setIndex(index);
    ////console.log(index);
    ////console.log(value);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
  };

  // Pagination controls
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;

  // Sort orders by createdAt in descending order
  const sortedOrders = orders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  // Slice sorted orders for pagination
  const currentOrders = sortedOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {}, [orders]);
  return (
    <>
      {currentOrders.length === 0 ? (
        "No orders found"
      ) : (
        <>
          <ShareModal
            isModalOpen={isModalOpen}
            handleOk={handleOk}
            handleCancel={handleCancel}
            modalValue={modalValue}
            setModalValue={setModalValue}
            modalField={modalField}
            index={Index}
          />
          <DeleteModal
            isVisible={isModalVisible}
            handleOk={handleDeleteOk}
            handleCancel={handleDeleteCancel}
            reason={reason}
            setReason={setReason}
            oid={orderid}
            userId={userid}
            status={status}
            buyerName={buyerName}
            email={email}
          />
          {currentOrders.map((o, i) => {
            //console.log("Order Index:", i);
            const orderDate = new Date(o?.createdAt);
            const currentDate = new Date();
            const diffInMinutes = Math.floor((currentDate - orderDate) / 60000);
            const totalPrice = o?.payment?.transaction?.amount;
            const totalPriceNumber = parseFloat(totalPrice);
            const formattedPrice = isNaN(totalPriceNumber)
              ? "0.00"
              : totalPriceNumber.toFixed(2);
            const globalIndex = indexOfFirstOrder + i;
            return (
              <MDBCardBody key={globalIndex}>
                <MDBRow className="mb-4">
                  <MDBCol lg="12">
                    <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
                      <MDBCardBody>
                        <MDBRow>
                          <MDBCol sm="12">
                            {diffInMinutes <= 10 ? (
                              <MDBCardText
                                className="text-muted"
                                style={{
                                  fontWeight: "bold",
                                  borderBottom: "1px dashed",
                                  paddingBottom: "4px",
                                }}
                              >
                                Just placed
                              </MDBCardText>
                            ) : (
                              <MDBCardText
                                className="text-muted"
                                style={{
                                  fontWeight: "bold",
                                  borderBottom: "1px dashed",
                                  paddingBottom: "4px",
                                }}
                              >
                                Order placed
                              </MDBCardText>
                            )}
                            <MDBCardText
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                flexDirection: isSmallScreen ? "column" : "row",
                              }}
                            >
                              <span style={{ fontWeight: "Bold" }}>
                                Order Date : {formatTimestamp(o?.createdAt)}
                              </span>
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
                                  o?.products[0]?.product?.freedeliveryDate
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
                              <span style={{ fontWeight: "bold" }}>
                                Total Order(s): {o?.products?.length}
                              </span>
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
                                  <HorizontalLinearStepper status={o.status} />
          
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
                                  status={o.status}
                                  orderDate={o?.createdAt}
                                  updateDate={o?.updatedAt}
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
                                  status={o.status}
                                  orderDate={o?.createdAt}
                                  updateDate={o?.updatedAt}
                                />
                                {/* <Stepper /> */}
                              </div>
                            )}

                            <MDBRow className="g-2">
                              {o?.products.map((product, j) => (
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
                                      {/* Tags Section */}
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

                                      {/* Main Content */}
                                      <div className="d-flex align-items-center">
                                        <div className={styles.imageContainer}>
                                          <MDBCardImage
                                            src={`/api/v1/product/product-photo/${product?.product._id}`}
                                            alt={product?.product.name}
                                            fluid
                                          />
                                        </div>
                                        <div
                                          className={styles.detailsContainer}
                                        >
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
                                Sub Total : ₹{formattedPrice}
                              </span>
                            </MDBCardText>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "10px",
                                marginTop: "10px",
                              }}
                            >
                              {o.status !== "Delivered" &&
                                o.status !== "Out For Delivery" &&
                                o.status !== "Canceled" && (
                                  <Button
                                    onClick={() =>
                                      openDeleteModal(
                                        o?._id,
                                        o?.buyer,
                                        o?.status,
                                        o?.buyer?.name,
                                        o?.email
                                      )
                                    }
                                    type="primary"
                                    danger
                                  >
                                    Cancel
                                  </Button>
                                )}
                              <Button
                                onClick={() =>
                                  showModal("orders", orders, globalIndex)
                                }
                                type="primary"
                              >
                                Share
                              </Button>
                            </div>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    </MDBCard>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            );
          })}
          <MDBRow className="mt-4">
            <MDBCol>
              <img
                src={PreviousIcon}
                alt="Previous Icon"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                  opacity: currentPage === 1 ? 0.5 : 1,
                }}
                onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </MDBCol>
            <MDBCol className="d-flex justify-content-center align-items-center">
              Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
            </MDBCol>
            <MDBCol className="d-flex justify-content-end">
              <img
                src={NextIcon}
                alt="Next Icon"
                style={{
                  width: "24px",
                  height: "24px",
                  cursor:
                    currentPage === Math.ceil(orders.length / ordersPerPage)
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    currentPage === Math.ceil(orders.length / ordersPerPage)
                      ? 0.5
                      : 1,
                }}
                onClick={() =>
                  currentPage < Math.ceil(orders.length / ordersPerPage) &&
                  paginate(currentPage + 1)
                }
                disabled={
                  currentPage === Math.ceil(orders.length / ordersPerPage)
                }
              />
            </MDBCol>
          </MDBRow>
        </>
      )}
    </>
  );
}
