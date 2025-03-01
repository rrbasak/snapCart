import React, { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "../styles/ProductDetails.module.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import LockIcon from "@mui/icons-material/Lock";
import { useParams } from "react-router-dom";
import { ExchangeModal } from "../components/Modals/ExchangeModal";
import { useAuth } from "../context/auth";
import formatDate from "./dateUtilfoAccordion";
import { useDispatch, useSelector } from "react-redux";
import { setRemainingTime } from "../features/remainingTime/remainingTimeSlice";
import axios from "axios";
import { addItemToCart, addItemToCartAsync } from "../features/cart/cartSlice";
import store from "../app/store.js";

const formatRemainingTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours} hr ${minutes} mins ${seconds} secs`;
};

export default function AccordionUtil({ product, selectedspec }) {
  const [auth] = useAuth();
  const params = useParams();
  const [cart, setCart] = useCart();
  const [expanded, setExpanded] = useState(false);
  const [defaultExpanded, setDefaultExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [exchangeApplied, setExchangeApplied] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [exchangeValue, setExchangeValue] = useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  // const [remainingTime, setRemainingTime] = useState("");
  const [exchangeProductId, setExchangeProductId] = useState("");

  const dispatch = useDispatch();
  const remainingTime = useSelector((state) => state.remainingTime.time);
  // ////console.log(remainingTime);

  useEffect(() => {
    if (!product?.fastestdelivery?.closetime) return;

    const [hours, minutes, seconds] = product.fastestdelivery.closetime
      .split(":")
      .map(Number);
    let totalSeconds = hours * 3600 + minutes * 60 + seconds;

    const interval = setInterval(() => {
      if (totalSeconds > 0) {
        totalSeconds -= 1;
        const formattedTime = formatRemainingTime(totalSeconds);
        dispatch(setRemainingTime(formattedTime));
      } else {
        clearInterval(interval);
        dispatch(setRemainingTime("Time's up"));
      }
    }, 1000);

    // Initialize the timer with the full time
    dispatch(setRemainingTime(formatRemainingTime(totalSeconds)));

    return () => clearInterval(interval);
  }, [product?.fastestdelivery?.closetime, dispatch]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    if (panel === "panel1") setDefaultExpanded(false);
    if (panel === "panel2") setDefaultExpanded(true);
  };
  const handleChange2 = (panel) => () => {
    ////console.log(panel);
    // if (panel === "panel1") setDefaultExpanded(true);
    if (panel === "panel2") setDefaultExpanded(true);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setExchangeApplied(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelExchange = async (panel) => {
    try {
      const userId = auth?.user?._id;
      const url = userId
        ? `${process.env.REACT_APP_API}/api/v1/exchange/remove-exchange/${userId}/${exchangeProductId}`
        : `${process.env.REACT_APP_API}/api/v1/exchange/remove-exchange/${exchangeProductId}`;
      // const { data } = await axios.delete(
      //   `/api/v1/exchange/remove-exchange/${auth.user._id}/${exchangeProductId}`
      // );
      const { data } = await axios.delete(url);
      if (data?.success) {
        ////console.log(data?.cart);
        // dispatch(addItemToCart(data?.cart));
        // dispatch(setCart(data?.cart));
        toast.success(data.message);
        setExchangeApplied(false);
        setSelectedBrand(null);
        setSelectedModel(null);
        setExchangeValue(0);
        handleChange2("panel2");
      }
    } catch (error) {
      ////console.log(error);
      toast.error(error.message);
    }
  };

  const extractCityAndPincode = (address) => {
    const addressParts = address.split(" ");
    const pincode = addressParts[addressParts.length - 1];
    const city = addressParts[addressParts.length - 2];
    return { city, pincode };
  };

  const { city, pincode } = auth?.user?.address
    ? extractCityAndPincode(auth.user.address)
    : { city: "San Francisco", pincode: "94301" };

  const userName = auth?.user?.name || "Guest";
  const displayName = userName.split(" ")[0];

  const totalPrice = selectedspec?.price - exchangeValue;
  // ////console.log(product.price);
  // ////console.log(exchangeValue);
  const currentDate = new Date();
  const primeStartDate = new Date(product.primestartDate);
  const primeEndDate = new Date(product.primeendDate);
  const isPrimeDayDeal =
    //  product.specialDayTag === "true" &&
    currentDate >= primeStartDate && currentDate <= primeEndDate;

  const cartHandlerWithExchange = async () => {
    ////console.log(totalPrice);

    const orgprice =
      product?.specialDayTag === "true" && isPrimeDayDeal
        ? (
            ((100 - product?.specialDayOffer) / 100) * selectedspec.price -
            exchangeValue
          ).toFixed(2)
        : totalPrice;
    const payload = {
      user: auth?.user?._id,
      name: product?.name,
      product,
      orgprice: orgprice,
      quantity: 1,
      isprime: product?.specialDayTag === "true" && isPrimeDayDeal,
      isexchangeapplied: true,
    };

    try {
      ////console.log("payload", payload);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/exchange/get-exchange/${auth?.user?._id}/${exchangeProductId}`
      );

      if (data?.success) {
        ////console.log(data);
        payload.exchangeProduct = data.existingExchangeProduct;
        const action = await dispatch(addItemToCartAsync(payload));
        ////console.log(action);
        if (addItemToCartAsync.fulfilled.match(action)) {
          toast.success(action.payload.message);
          resetExchangeData();
          handleChange("panel2")(null, true);
        } else {
          throw new Error(action.error.message);
        }
      } else {
        ////console.log("Failed to get existing exchange product");
      }
    } catch (error) {
      ////console.log(error);
      toast("Please login to add items", {
        icon: "⚠️",
        style: {
          background: "#fff9c4",
          color: "#000",
        },
      });
    }
  };

  const cartHandlerWithOutExchange = async () => {
    const orgprice =
      product?.specialDayTag === "true" && isPrimeDayDeal
        ? ((100 - product?.specialDayOffer) / 100) * selectedspec?.price
        : product?.price;
    const payload = {
      user: auth?.user?._id,
      name: product?.name,
      product,
      orgprice: orgprice,
      quantity: selectedQuantity,
      totalquantity: Math.min(product?.quantity, 3),
      isprime: product?.specialDayTag === "true" && isPrimeDayDeal,
      selectedspecPrice: selectedspec?.price,
    };

    try {
      const action = await dispatch(addItemToCartAsync(payload));
      ////console.log(action);

      if (addItemToCartAsync.fulfilled.match(action)) {
        toast.success(action.payload.message);
      } else {
        throw new Error(action.error.message);
      }
    } catch (error) {
      ////console.log(error);
      toast("Please login to add items", {
        icon: "⚠️",
        style: {
          background: "#fff9c4",
          color: "#000",
        },
      });
    }
  };

  const handleQuantityChange = (event) => {
    setSelectedQuantity(event.target.value);
  };

  useEffect(() => {}, [exchangeValue]);

  const resetExchangeData = () => {
    setExchangeApplied(false);
    setSelectedBrand(null);
    setSelectedModel(null);
    setExchangeValue(0);
    setExchangeProductId("");
  };
  return (
    <div>
      <ExchangeModal
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        handleCancel={handleCancel}
        modalValue={product?.subcategory?.subcategory?.metadata.map(
          (allBrand) => {
            return {
              brand: allBrand.brand,
              _id: allBrand._id,
            };
          }
        )}
        selectedBrand={selectedBrand}
        setSelectedBrand={setSelectedBrand}
        selectedModel={selectedModel}
        setSelectedModel={setSelectedModel}
        setExchangeValue={setExchangeValue}
        subcategoryId={product?.subcategory?._id}
        product={product}
        setExchangeProductId={setExchangeProductId}
      />
      {product?.availableInStock === "In Stock" &&
        product?.exchangeavailable === "true" && (
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <p className={styles.FirstPara}>With Exchange</p>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {!exchangeApplied ? (
                  <>
                    {/* <p className={styles.SecondPara}>Up to ₹1400.00 off</p> */}
                    <button className={styles.exchangeBtn} onClick={showModal}>
                      Choose phone to exchange
                    </button>
                  </>
                ) : (
                  <>
                    <p className={styles.exchangeAppliedText}>
                      Exchange Applied
                    </p>
                    <p className={styles.exchangeDetails}>
                      {/* Total price is ₹{totalPrice} */}
                      Total price is ₹{""}
                      {product?.specialDayTag === "true" && isPrimeDayDeal
                        ? (
                            ((100 - product?.specialDayOffer) / 100) *
                              selectedspec.price -
                            exchangeValue
                          ).toFixed(2)
                        : totalPrice}
                    </p>
                    <p className={styles.exchangeDetails}>
                      {/* You save ₹{exchangeValue} */}
                      You save ₹{""}
                      {product?.specialDayTag === "true" && isPrimeDayDeal
                        ? (
                            selectedspec.price -
                            ((100 - product?.specialDayOffer) / 100) *
                              selectedspec.price +
                            exchangeValue
                          ).toFixed(2)
                        : exchangeValue}
                    </p>

                    <div>
                      {/* <p className={styles.SecondPara}>
                    ₹ {product.price}{" "}
                    <span className={styles.optionOriginalPrice}>
                      {" "}
                      ₹ 11,999.00
                    </span>
                  </p> */}
                      <div className={styles.deliveryDetails}>
                        <p>
                          FREE delivery{" "}
                          <strong>
                            {formatDate(product?.freedeliveryDate)},
                          </strong>
                        </p>
                        {/* <p>
                        Or fastest delivery{" "}
                        <strong>
                          {formatDate(product?.fastestdelivery?.date)},
                        </strong>{" "}
                        Order within {remainingTime}
                      </p> */}
                        {remainingTime !== "Time's up" && (
                          <p>
                            Or fastest delivery{" "}
                            <strong>
                              {formatDate(product?.fastestdelivery?.date)}
                            </strong>{" "}
                            Order within {remainingTime}
                          </p>
                        )}
                        <p className={styles.delivary}>
                          <LocationOnOutlinedIcon /> Deliver to {displayName} -{" "}
                          {city} {pincode}
                        </p>
                      </div>
                      <p
                        className={
                          product.availableInStock === "Out Of Stock"
                            ? styles.outOfStock
                            : styles.inStock
                        }
                      >
                        {product.availableInStock}
                      </p>
                      <div>
                        <p className={styles.shipFrom}>
                          Ships from <strong>SnapCart</strong>
                        </p>
                      </div>
                      <button
                        className={styles.addToCartBtn}
                        onClick={() => {
                          cartHandlerWithExchange();
                        }}
                      >
                        Add to Cart
                      </button>
                      <LockIcon style={{ fontSize: "small" }} />{" "}
                      <span
                        style={{ fontSize: "small" }}
                        className={styles.secureTransaction}
                      >
                        Secure transaction
                      </span>
                    </div>

                    <button
                      className={styles.buyNowBtn}
                      onClick={handleCancelExchange}
                    >
                      Cancel Exchange
                    </button>
                  </>
                )}
              </div>
            </AccordionDetails>
          </Accordion>
        )}

      <Accordion
        expanded={expanded === "panel2" || defaultExpanded}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <p style={{ fontWeight: "bold" }}>
            {product?.exchangeavailable === "true"
              ? "Without Exchange"
              : "Buy Now"}
          </p>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <p className={styles.SecondPara}>
              ₹{" "}
              {product?.specialDayTag === "true" && isPrimeDayDeal
                ? (
                    ((100 - product?.specialDayOffer) / 100) *
                    selectedspec?.price
                  ).toFixed(2)
                : // : product?.price}{" "}
                  selectedspec?.price}{" "}
              {product?.specialDayTag === "true" && isPrimeDayDeal && (
                <span className={styles.optionOriginalPrice}>
                  {" "}
                  ₹ {selectedspec?.price}
                </span>
              )}
            </p>
            <div className={styles.deliveryDetails}>
              {product?.availableInStock === "In Stock" && (
                <p>
                  FREE delivery{" "}
                  <strong>{formatDate(product?.freedeliveryDate)},</strong>
                </p>
              )}
              {/* <p>
                Or fastest delivery{" "}
                <strong>{formatDate(product?.fastestdelivery?.date)},</strong>{" "}
                Order within {remainingTime}
              </p> */}
              {product?.availableInStock === "In Stock" &&
                remainingTime !== "Time's up" && (
                  <p>
                    Or fastest delivery{" "}
                    <strong>
                      {formatDate(product?.fastestdelivery?.date)}
                    </strong>{" "}
                    Order within {remainingTime}
                  </p>
                )}
              {product?.availableInStock === "In Stock" && (
                <p className={styles.delivary}>
                  <LocationOnOutlinedIcon /> Deliver to {displayName} - {city}{" "}
                  {pincode}
                </p>
              )}
            </div>
            <p
              className={
                product.availableInStock === "Out Of Stock"
                  ? styles.outOfStock
                  : styles.inStock
              }
            >
              {product.availableInStock}
            </p>
            <div>
              <p className={styles.shipFrom}>
                Ships from <strong>SnapCart</strong>
              </p>
            </div>
            {product?.availableInStock === "In Stock" &&
              (product?.exchangeavailable === "false" || !exchangeApplied) && (
                <>
                  <div className={styles.quantity}>
                    <label>Quantity:</label>
                    <select
                      value={selectedQuantity}
                      onChange={handleQuantityChange}
                    >
                      {Array.from(
                        { length: Math.min(product.quantity, 3) },
                        (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  <button
                    className={styles.addToCartBtn}
                    onClick={() => {
                      cartHandlerWithOutExchange();
                    }}
                  >
                    Add to Cart
                  </button>
                </>
              )}
            <LockIcon style={{ fontSize: "small" }} />{" "}
            <span
              style={{ fontSize: "small" }}
              className={styles.secureTransaction}
            >
              Secure transaction
            </span>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
