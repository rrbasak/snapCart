/* eslint-disable no-use-before-define */
import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart } from "../features/cart/cartSlice";
import styles from "../styles/CartPage.module.css";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CelebrationOutlinedIcon from "@mui/icons-material/CelebrationOutlined";
import Tooltip from "@mui/material/Tooltip";
import CustomTooltip from "../components/Tooltip/CustomTooltip";
import { Modal, Button, Collapse } from "antd";
import { EditOutlined } from "@ant-design/icons";
import NumberInputWithReset from "../components/Butons/NumberInputWithReset ";
import CartsSkeleton from "../skeleton/Users/CartAndCheckout.jsx/CartsSkeleton";
import CartCheckOutSkeleton from "../skeleton/Users/CartAndCheckout.jsx/CartCheckOutSkeleton";
const { Panel } = Collapse;

export default function CartPage() {
  const [updatedPrice, setUpdatedPrice] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [exchangeDetails, setExchangeDetails] = useState(null);
  const cartLength = useSelector((state) => state.cartOnUser.length);
  const dispatch = useDispatch();
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [allcarts, setAllCarts] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [isPaymentSectionExpanded, setIsPaymentSectionExpanded] =
    useState(false);

  //loader
  const [cartloader, setCartLoader] = useState(false);
  const [checkoutloader, setCheckoutloader] = useState(false);
  const navigate = useNavigate();
  //console.log(instance);
  // const totalPrice = () => {
  //   try {
  //     let total = 0;
  //     selectedItems?.map((item) => {
  //       //console.log(item);
  //       total = total + item.orgprice * (quantities[item._id] || item.quantity);

  //     });
  //     setUpdatedPrice(total);
  //     return total.toLocaleString("en-US", {
  //       style: "currency",
  //       currency: "INR",
  //     });
  //   } catch (error) {
  //     ////console.log(error);
  //   }
  // };

  const finalPrice = (item) => {
    let discount = 0;
    if (item.isprime === "true") {
      discount = item.orgprice * 0.1; // Assuming a 10% Prime Day discount
    }
    return (item.orgprice - discount).toLocaleString("en-US", {
      style: "currency",
      currency: "INR",
    });
  };
  const [subtotal, setSubTotal] = useState();
  const removeCartItem = async (pid) => {
    //console.log("pid", pid);
    //console.log("selectedItems", selectedItems);
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/cart/remove-cart/${auth.user._id}/${pid}`
      );
      if (data?.success) {
        dispatch(removeItemFromCart({ id: pid }));
        setSelectedItems(selectedItems.filter((item) => item._id !== pid));
        toast.success("Item removed from cart");
      } else {
        //console.log("Failed to delete cart");
      }
    } catch (error) {
      console.error("Error deleting cart data:", error);
    }
  };

  const handleSelectItem = (item) => {
    if (selectedItems.some((selectedItem) => selectedItem._id === item._id)) {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem._id !== item._id)
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const deselectAllItems = () => {
    setSelectedItems([]);
  };

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/accessToken`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      ////console.log(error);
    }
  };
  // // payment method function
  // const handlePayment = async () => {
  //   try {
  //     setLoading(true);
  //     const { nonce } = await instance.requestPaymentMethod();
  //     const { data } = await axios.post("/api/v1/product/braintree/payment", {
  //       nonce,
  //       cart: selectedItems,
  //       updatedPrice,
  //       isQuantityUpdated,
  //       quantity,
  //     });
  //     //console.log(selectedItems);
  //     setLoading(false);
  //     localStorage.removeItem("cart");
  //     setCart([]);
  //     setSelectedItems([]);
  //     selectedItems.forEach((item) => removeCartItem(item?._id));
  //     navigate("/dashboard/profile", { state: { activeTab: "orders" } });
  //     toast.success("Payment Completed Successfully");
  //   } catch (error) {
  //     //console.log(error);
  //     setLoading(false);
  //   }
  // };

  // payment method function
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
        nonce,
        cart: selectedItems,
        updatedPrice,
        isQuantityUpdated,
        quantity,
      });

      setLoading(false);

      if (data.success) {
        // Payment successful
        const productNames = data?.cart
          ?.map((product) => product.name)
          .join(", ");
        // console.log(productNames);
        // console.log(data?.cart);
        const statusMessages = {
          NewOrder: `A new order has been placed for: ${productNames}.`,
        };

        const notificationTitles = {
          NewOrder: "New Order Received 📦",
          Canceled: "Order Canceled ❌",
        };

        await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/create-purchased-order-notification`, {
          title: notificationTitles["NewOrder"] || "Order Update",
          message: statusMessages["NewOrder"],
          recipient: "admin",
          status: "unread",
          type: "order_update",
        });
        for (const product of data?.cart || []) {
          console.log("product", product);
          console.log(
            "product?.product?.quantity - product?.quantity",
            product?.product?.quantity - product?.quantity
          );
          if (
            product?.product?.quantity - product?.quantity < 5 &&
            product?.product?.quantity - product?.quantity > 0
          ) {
            // Low stock warning
            await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/low-stock-notification`, {
              title: "Low Stock Alert ⚠️",
              message: `${product.product.name} stock is running low. Only ${
                product?.product?.quantity - product?.quantity
              } items left!`,
              recipient: "admin",
              status: "unread",
              type: "system",
            });
          } else if (product?.product?.quantity - product?.quantity === 0) {
            // Out of stock notification
            await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/out-of-stock-notification`, {
              title: "Out of Stock Alert ❌",
              message: `${product.product.name} is out of stock. Please restock soon.`,
              recipient: "admin",
              status: "unread",
              type: "system",
            });
          }
        }
        localStorage.removeItem("cart");
        setCart([]);
        setSelectedItems([]);
        selectedItems.forEach((item) => removeCartItem(item?._id));
        navigate("/dashboard/profile", { state: { activeTab: "orders" } });
        toast.success(data.message || "Payment Completed Successfully.");
      } else {
        // Payment failed
        toast.error(data.error || "Payment failed, please try again.", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      //console.log("Payment error:", error);
      setLoading(false);
      toast.error(
        error.response?.data?.error ||
          "An unexpected error occurred. Please try again.",
        {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        }
      );
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.accessToken]);

  const fetchCartData = async () => {
    if (!auth?.user?._id) return;
    try {
      setCartLoader(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/cart/get-cart/${auth.user._id}`
      );
      if (data?.success) {
        //console.log(data?.cartOnUser);
        setAllCarts(data?.cartOnUser);
        return data?.cartOnUser;
      } else {
        //console.log("Failed to fetch cart data");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    } finally {
      setCartLoader(false);
      setTimeout(() => {}, 100000);
    }
  };

  // useEffect(() => {
  //   fetchCartData().then(()=>{
  //     return allcarts?.map((cart)=>{
  //       if(cart.availableInStock==="Out Of Stock"){
  //         toast.error(`Out Of Stock for ${cart.name}`,
  //           {
  //             icon: "⚠️",
  //             style: {
  //               background: "#fff9c4",
  //               color: "#000",
  //             },
  //           }
  //         );
  //       }
  //     })

  //   });
  // }, [cartLength]);

  useEffect(() => {
    const checkStock = async () => {
      try {
        const cartData = await fetchCartData();
        //console.log("cartData", cartData);
        cartData?.forEach((cart) => {
          if (cart?.product?.availableInStock === "Out Of Stock") {
            toast.error(`Out Of Stock for ${cart.name}`, {
              icon: "⚠️",
              style: {
                background: "#fff9c4",
                color: "#000",
              },
            });
          }
        });
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    checkStock();
  }, [cartLength]);

  useEffect(() => {
    setSelectedItems(allcarts);
  }, [allcarts]);

  //console.log(allcarts);

  useEffect(() => {
    if (selectedItems.length > 0) {
      setIsPaymentSectionExpanded(true);
    } else {
      setIsPaymentSectionExpanded(false);
    }
  }, [selectedItems]);
  const handleProceedToBuy = () => {
    if (selectedItems.length === 0) {
      toast("Please select at least one item to checkout", {
        icon: "⚠️",
        style: {
          // background: "#fff9c4",
          color: "#000",
        },
      });
    } else {
      setIsPaymentSectionExpanded(true);
    }
  };

  const showModal = (details) => {
    setExchangeDetails(details);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setExchangeDetails(null);
  };
  //console.log("exchangeDetails", exchangeDetails);

  const [quantity, setQuantity] = useState(
    allcarts.reduce((acc, product) => {
      acc[product._id] = product.quantity;
      return acc;
    }, {})
  );
  const [isQuantityUpdated, setIsQuantityUpdated] = useState(
    allcarts.reduce((acc, product) => {
      acc[product._id] = false;
      return acc;
    }, {})
  );
  const [quantities, setQuantities] = useState(
    allcarts.reduce((acc, product) => {
      acc[product._id] = product.quantity;
      return acc;
    }, {})
  );

  // Handle quantities change
  const handleQuantitiesChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };
  // Handle quantity change
  const handleQuantityChange = (productId, newQuantity) => {
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity,
    }));
  };

  const handleIsQuentityUpdated = (productId) => {
    setIsQuantityUpdated((prevQuantity) => ({
      ...prevQuantity,
      [productId]: true,
    }));
  };
  // Handle reset
  const handleReset = (productId, initialQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: initialQuantity,
    }));
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: initialQuantity,
    }));
    setIsQuantityUpdated((prevQuantity) => ({
      ...prevQuantity,
      [productId]: false,
    }));
  };

  // Function to calculate total price
  const totalPrice = useCallback(() => {
    let total = 0;
    selectedItems?.forEach((item) => {
      total += item.orgprice * (quantities[item._id] || item.quantity);
    });
    return total.toFixed(2);
  }, [selectedItems, quantities]);

  useEffect(() => {
    const total = totalPrice();
    setUpdatedPrice(total);
  }, [totalPrice]);
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <h1>{`Hello ${auth?.accessToken && auth?.user?.name}`}</h1> */}
          <h4>
            {cartLength > 0
              ? `You Have ${cartLength} item(s) in your cart ${
                  auth?.accessToken ? "" : "please login to checkout"
                }`
              : " Your Cart Is Empty"}
          </h4>
          {allcarts?.length > 0 && selectedItems.length > 0 ? (
            <button
              className={styles.deselectButton}
              onClick={deselectAllItems}
            >
              Deselect all items
            </button>
          ) : (
            <button
              className={styles.deselectButton}
              onClick={() => handleProceedToBuy()}
            >
              Proceed to Buy
            </button>
          )}
        </div>
        <div className={styles.content}>
          <div className={styles.cartItems}>
            {cartloader ? (
              <div>
                <CartsSkeleton />
              </div>
            ) : (
              <>
                {" "}
                {allcarts?.map((p) => {
                  const totalUpdatedPrice = (
                    p.orgprice * (quantities[p._id] || p.quantity)
                  ).toFixed(2);
                  return (
                    <div className={styles.cartItem} key={p._id}>
                      {p?.product?.availableInStock === "In Stock" && (
                        <input
                          type="checkbox"
                          checked={selectedItems.some(
                            (item) => item._id === p._id
                          )}
                          onChange={() => handleSelectItem(p)}
                          className={styles.checkbox}
                        />
                      )}
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product._id}`}
                        alt={p.name}
                        className={styles.productImage}
                      />
                      <div className={styles.productDetails}>
                        <p className={styles.description}>
                          {p.product.description}
                        </p>
                        <p
                          className={
                            p?.product?.availableInStock === "Out Of Stock"
                              ? styles.outOfStock
                              : styles.inStock
                          }
                        >
                          {p?.product?.availableInStock}
                        </p>
                        <p className={styles.offer}>
                          {p?.isprime === "true" && (
                            <span className={styles.primeDayTag}>
                              <CelebrationOutlinedIcon /> Prime Day Deal
                            </span>
                          )}

                          {p?.isexchangeapplied && (
                            <span
                              className={styles.exchangeAppliedTag}
                              onClick={() =>
                                showModal({
                                  brand: p?.exchangeProduct?.brand,
                                  model: p?.exchangeProduct?.model,
                                  damage: p?.exchangeProduct?.damage || [],
                                })
                              }
                            >
                              <VerifiedOutlinedIcon /> Exchange Applied
                            </span>
                          )}

                          <Collapse
                            bordered={false}
                            className={styles.priceBreakdownAccordion}
                          >
                            <Panel
                              header={
                                <span style={{ color: "blue" }}>
                                  Show Price Breakdown
                                </span>
                              }
                              key="1"
                              className={styles.customPanelHeader}
                            >
                              <div className={styles.priceBreakdownBox}>
                                <div className={styles.priceItem}>
                                  <span className={styles.priceLabel}>
                                    Original Price:
                                  </span>
                                  <span className={styles.priceValue}>
                                    ₹
                                    {p?.selectedspecPrice?.toFixed(2) ||
                                      p.product?.price.toFixed(2)}
                                  </span>
                                </div>

                                {p?.isprime === "true" && (
                                  <div className={styles.priceItem}>
                                    <span className={styles.priceLabel}>
                                      Offer Discount:
                                    </span>
                                    <span className={styles.priceValue}>
                                      - ₹
                                      {(
                                        (p?.selectedspecPrice ||
                                          p.product?.price) - p.orgprice
                                      ).toFixed(2)}
                                    </span>
                                  </div>
                                )}

                                {p?.isexchangeapplied && (
                                  <div className={styles.priceItem}>
                                    <span className={styles.priceLabel}>
                                      Exchange Discount:
                                    </span>
                                    <span className={styles.priceValue}>
                                      - ₹
                                      {p?.exchangeProduct?.damage?.length > 0
                                        ? p?.exchangeProduct?.damage
                                            .reduce((acc, item) => {
                                              if (
                                                item.damage_type === "no_damage"
                                              ) {
                                                return (
                                                  acc +
                                                  Number(item.exchange_price)
                                                );
                                              } else if (
                                                item.damage_type ===
                                                "body_damage"
                                              ) {
                                                return (
                                                  acc +
                                                  Number(item.exchange_price)
                                                );
                                              } else if (
                                                item.damage_type ===
                                                "screen_damage"
                                              ) {
                                                return (
                                                  acc -
                                                  Number(item.exchange_price)
                                                );
                                              }
                                              return acc;
                                            }, 0)
                                            .toFixed(2)
                                        : "₹0.00"}
                                    </span>
                                  </div>
                                )}
                                <hr className={styles.dashedLine} />
                                <div className={styles.priceItem}>
                                  <span className={styles.priceLabel}>
                                    Price:
                                  </span>
                                  <span className={styles.priceValue}>
                                    ₹{p.orgprice.toFixed(2)}
                                  </span>
                                </div>
                                <div className={styles.priceItem}>
                                  <span className={styles.priceLabel}>
                                    Quantity:
                                  </span>
                                  <span className={styles.priceValue}>
                                    {/* x {p.quantity} */}x{" "}
                                    {isQuantityUpdated[p._id]
                                      ? quantity[p._id]
                                      : p?.quantity}
                                  </span>
                                </div>
                                <hr className={styles.dashedLine} />
                                <div className={styles.priceItem}>
                                  <span className={styles.priceLabel}>
                                    Total Price:
                                  </span>
                                  <span className={styles.priceValue}>
                                    {/* ₹{(p.orgprice * p.quantity).toFixed(2)} */}
                                    {/* setUpdatedPrice(isQuantityUpdated ? quantity
                              :p?.quantity) */}
                                    {/* {(p.orgprice * {isQuantityUpdated ? quantity :p?.quantity}).toFixed(2)} */}
                                    ₹{totalUpdatedPrice}
                                  </span>
                                </div>
                              </div>
                            </Panel>
                          </Collapse>
                        </p>
                        <p>
                          <span className={styles.priceLabel}>Quantity:</span>
                          {/* <span> {p?.quantity}</span> */}
                          <span>
                            {" "}
                            {p?.isexchangeapplied ? (
                              <span> {p?.quantity}</span>
                            ) : (
                              <NumberInputWithReset
                                initialValue={p?.quantity}
                                max={p?.totalquantity}
                                onQuantityChange={(newQuantity) => {
                                  handleQuantityChange(p._id, newQuantity);
                                  handleIsQuentityUpdated(p._id);
                                  handleQuantitiesChange(p._id, newQuantity);
                                }}
                                onReset={(initialValue) =>
                                  handleReset(p?._id, initialValue)
                                }
                              />
                            )}
                          </span>
                        </p>
                        <p className={styles.currentPriceTag}>
                          <span className={styles.currentDollar}>₹</span>
                          <span className={styles.currentPrice}>
                            {/* {(p.orgprice * p.quantity).toFixed(2)} */}
                            {(
                              p.orgprice * (quantities[p._id] || p.quantity)
                            ).toFixed(2)}
                          </span>
                        </p>

                        <button
                          className={`${styles.button} ${styles.removeButton}`}
                          onClick={() => removeCartItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {selectedItems.length === 0 ? (
            <div className={styles.notcartSummary}>
              {/* <button
                className={styles.deselectButton}
                onClick={() => handleProceedToBuy()}
              >
                Proceed to Buy
              </button> */}
            </div>
          ) : (
            // isPaymentSectionExpanded && (
            //   <div className={styles.cartSummary}>
            //     <h2>Cart Summary</h2>
            //     <p>Total | Checkout | Payment</p>
            //     <hr />
            //     <h4>Total: {totalPrice()}</h4>
            //     {auth?.user?.address ? (
            //       <div className={styles.addressAndTotal}>
            //         <h4>Current Address: {auth?.user?.address}</h4>
            //         <button
            //           className={`${styles.button} ${styles.updateAddressButton}`}
            //           onClick={() => navigate("/dashboard/profile")}
            //         >
            //           Update Address
            //         </button>
            //       </div>
            //     ) : (
            //       <div className={styles.addressSection}>
            //         {auth?.accessToken ? (
            //           <button
            //             className={`${styles.button} ${styles.updateAddressButton}`}
            //             onClick={() => navigate("/dashboard/profile")}
            //           >
            //             Update Address
            //           </button>
            //         ) : (
            //           <button
            //             className={`${styles.button} ${styles.loginButton}`}
            //             onClick={() =>
            //               navigate("/login", {
            //                 state: "/cart",
            //               })
            //             }
            //           >
            //             Please Login to checkout
            //           </button>
            //         )}
            //       </div>
            //     )}
            //     <div className={styles.paymentSection}>
            //       {!clientToken || cartLength === 0 ? (
            //         ""
            //       ) : (
            //         <>
            //           <DropIn
            //             options={{
            //               authorization: clientToken,
            //               paypal: {
            //                 flow: "vault",
            //               },
            //             }}
            //             onInstance={(instance) => setInstance(instance)}
            //           />
            //           <button
            //             className={`${styles.button} ${styles.paymentButton}`}
            //             onClick={handlePayment}
            //             disabled={loading || !instance || !auth?.user?.address}
            //           >
            //             {loading ? "Processing ...." : "Make Payment"}
            //           </button>
            //         </>
            //       )}
            //     </div>
            //   </div>
            // )
            isPaymentSectionExpanded && (
              <div className={styles.cartSummary}>
                <h2>Cart Summary</h2>
                <p>Total | Checkout | Payment</p>
                <hr />
                <div className={styles.totalAndPrice}>
                  <h4 className={styles.smallFont}>Total:</h4>
                  <h4 className={styles.smallFont}>{totalPrice()}</h4>
                </div>
                {auth?.user?.address ? (
                  <div className={styles.addressAndTotal}>
                    <div className={styles.currentAddress}>
                      <h4 className={styles.smallFont}>Address:</h4>
                      <h4 className={styles.smallFont}>
                        {auth?.user?.address}
                      </h4>
                      <EditOutlined
                        className={styles.updateIcon}
                        onClick={() =>
                          navigate("/dashboard/profile", {
                            state: { activeTab: "contactReferences" },
                          })
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.addressSection}>
                    {auth?.accessToken ? (
                      <button
                        className={`${styles.button} ${styles.updateAddressButton}`}
                        onClick={() =>
                          navigate("/dashboard/profile", {
                            state: { activeTab: "contactReferences" },
                          })
                        }
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className={`${styles.button} ${styles.loginButton}`}
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to checkout
                      </button>
                    )}
                  </div>
                )}
                <div className={styles.paymentSection}>
                  {!clientToken || cartLength === 0 ? (
                    <>
                      <CartCheckOutSkeleton />
                    </>
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                      <button
                        className={`${styles.button} ${styles.paymentButton}`}
                        onClick={handlePayment}
                        disabled={loading || !instance || !auth?.user?.address}
                      >
                        {loading ? "Processing ...." : "Make Payment"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            )
          )}
        </div>
        {allcarts?.length > 0 && (
          <div className={styles.subtotal}>
            <h4>
              Subtotal (
              {selectedItems?.reduce(
                (acc, item) => acc + (quantities[item._id] || item.quantity),
                0
              )}{" "}
              {/* {selectedItems?.reduce((acc, item) => acc +  item.quantity, 0)}{" "} */}
              items): ₹{totalPrice()}
            </h4>
          </div>
        )}
      </div>
      <Modal
        title="Exchange Details"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
      >
        {exchangeDetails && (
          <div>
            <p>
              <strong>Brand:</strong> {exchangeDetails.brand}
            </p>
            <p>
              <strong>Model:</strong> {exchangeDetails.model}
            </p>
            <p>
              <strong>Damage:</strong>
              <ul>
                {exchangeDetails.damage.length > 0 ? (
                  exchangeDetails.damage.map((d, index) => (
                    <li key={index}>
                      Damage Type:{" "}
                      {d.damage_type === "body_damage"
                        ? "Body Damage"
                        : d.damage_type === "screen_damage"
                        ? "Screen Damage"
                        : d.damage_type === "no_damage"
                        ? "No Damage"
                        : d.damage_type}{" "}
                      - Exchange Price:₹{d.exchange_price}
                    </li>
                  ))
                ) : (
                  <li>No damages</li>
                )}
              </ul>
            </p>
            <p>
              <strong>Total Exchange Price:</strong>{" "}
              {exchangeDetails?.damage?.length > 0
                ? exchangeDetails.damage
                    .reduce((acc, item) => {
                      if (item.damage_type === "no_damage") {
                        return acc + Number(item.exchange_price);
                      } else if (item.damage_type === "body_damage") {
                        return acc + Number(item.exchange_price);
                      } else if (item.damage_type === "screen_damage") {
                        return acc - Number(item.exchange_price);
                      }
                      return acc;
                    }, 0)
                    .toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                    })
                : "₹0.00"}
            </p>
          </div>
        )}
      </Modal>
    </Layout>
  );
}
