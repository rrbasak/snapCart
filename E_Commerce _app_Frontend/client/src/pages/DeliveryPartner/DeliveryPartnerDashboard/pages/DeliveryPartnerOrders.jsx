import React, { useState, useEffect } from "react";
import {
  Select,
  Modal,
  Button,
  Input,
  Table,
  Card,
  Row,
  Col,
  Radio,
} from "antd";
import axios from "axios";
import { useAuth } from "../../../../context/auth";
import DeliveryPartnerLayout from "../../../../components/layout/DeliveryPartnerLayout";
import { createStyles } from "antd-style";
import toast from "react-hot-toast";
import OtpInput from "react-otp-input";
import AssignedDeliveriesSkeleton from "../../../../skeleton/DeliveryPartner/AssignedDeliveriesSkeleton";
import MapWithDirections from "../../../../components/commonComponents/MapWithDirections";
import { useJsApiLoader } from "@react-google-maps/api";

const { Option } = Select;

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const DeliveryPartnerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const { styles } = useStyle();
  const [auth, setAuth] = useAuth();
  const pageSize = 5;
  const [isMobileView, setIsMobileView] = useState(false);
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAddress, setUserAddress] = useState("");
  //maps
  const [userLocation, setUserLocation] = useState(null);
  const [deliveryPartnerLocation, setDeliveryPartnerLocation] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  // const getLatLongFromAddress = async (address) => {
  //   try {
  //     const apiKey = process.env.REACT_APP_GO_MAPS_SEC_API_KEYS;

  //     // Construct the URL for the Geocoding API request
  //     const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
  //       address
  //     )}&key=${apiKey}`;

  //     // Make the API call to the Geocoding API
  //     const response = await axios.get(geocodeUrl);

  //     if (response.data.status === "OK") {
  //       // Extract latitude and longitude from the response
  //       const lat = response.data.results[0].geometry.location.lat;
  //       const lng = response.data.results[0].geometry.location.lng;
  //       const deliveryPartnerLocation = {lat,lng};
  //       setUserLocation(deliveryPartnerLocation);
  //       return { lat, lng };
  //     } else {
  //       console.error("Geocoding failed: ", response.data.status);
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocode data:", error);
  //     return null;
  //   }
  // };

  // const getLatLongFromAddress = async (address) => {
  //   try {
  //     const geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
  //       address
  //     )}&limit=1`;

  //     const response = await axios.get(geocodeUrl);

  //     if (response.data.length > 0) {
  //       const lat = response.data[0].lat;
  //       const lng = response.data[0].lon;

  //       const deliveryPartnerLocation = {
  //         lat: parseFloat(lat),
  //         lng: parseFloat(lng),
  //       };
  //       setUserLocation(deliveryPartnerLocation);
  //     } else {
  //       console.error("No results found for the given address.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocode data:", error);
  //     return null;
  //   }
  // };

  // const getLatLongFromAddress = async (address) => {
  //   try {
  //     const apiKey = "YOUR_LOCATIONIQ_API_KEY"; // Replace with your LocationIQ API Key
  //     const geocodeUrl = `https://us1.locationiq.com/v1/search?key=pk.d059f309fba9296fce8f5566c8bb11c3&q=${encodeURIComponent(
  //       address
  //     )}&format=json`;

  //     const response = await axios.get(geocodeUrl);

  //     if (response.data.length > 0) {
  //       const lat = response.data[0].lat;
  //       const lng = response.data[0].lon;
  //       const deliveryPartnerLocation = {
  //         lat: parseFloat(lat),
  //         lng: parseFloat(lng),
  //       };
  //       setUserLocation(deliveryPartnerLocation);
  //     } else {
  //       console.error("No results found for the given address.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocode data:", error);
  //     return null;
  //   }
  // };

  // const getLatLongFromAddress = async (address) => {
  //   try {
  //     const apiKey = "pk.d059f309fba9296fce8f5566c8bb11c3";
  //     const geocodeUrl = `https://us1.locationiq.com/v1/search?key=${apiKey}&q=${encodeURIComponent(
  //       address
  //     )}&format=json`;

  //     console.log("Requesting geocode for:", address); // Debugging line to check what address is being passed

  //     const response = await axios.get(geocodeUrl);

  //     // Check if the response contains any data
  //     if (response.data && response.data.length > 0) {
  //       const lat = response.data[0].lat;
  //       const lon = response.data[0].lon;

  //       console.log("Coordinates:", lat, lon); // Debugging line to check coordinates

  //       // Return the coordinates in a proper object
  //       return { lat: parseFloat(lat), lon: parseFloat(lon) };
  //     } else {
  //       console.error("No results found for the given address.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocode data:", error);
  //     // Provide a more specific error message if possible
  //     if (error.response) {
  //       console.error("Error Response from LocationIQ:", error.response.data);
  //     } else if (error.request) {
  //       console.error("Error Request to LocationIQ:", error.request);
  //     } else {
  //       console.error("General Error:", error.message);
  //     }
  //     return null;
  //   }
  // };

  // const getLatLongFromAddress = async (address) => {
  //   try {
  //     const apiKey = "pk.d059f309fba9296fce8f5566c8bb11c3";
  //     const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // Using the CORS proxy
  //     const geocodeUrl = `https://us1.locationiq.com/v1/search?key=pk.d059f309fba9296fce8f5566c8bb11c3&q=BF-15 Krishnapur Hanapara kolkata 700101&format=json&`;

  //     const response = await axios.get(proxyUrl + geocodeUrl);

  //     if (response.data.length > 0) {
  //       const lat = response.data[0].lat;
  //       const lon = response.data[0].lon;
  //       const deliveryPartnerLocation = {lat: parseFloat(lat), lon: parseFloat(lon) };
  //       setUserLocation(deliveryPartnerLocation);
  //     } else {
  //       console.error("No results found for the given address.");
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error("Error fetching geocode data:", error);
  //     return null;
  //   }
  // };

  const getLatLongFromAddress = async (address) => {
    try {
      console.log("address", address);
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/map/geocode/${address}`
      );

      if (response.data) {
        console.log("Coordinates:", response.data);
        setUserLocation(response.data);
        // setUserLocation({
        //   lat: 22.575514, // Example initial admin latitude
        //   lng: 88.363354, // Example initial admin longitude
        // });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setDeliveryPartnerLocation(userLocation);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  useEffect(() => {
    if (userAddress) {
      getLatLongFromAddress(userAddress);
      getUserLocation();
    }
  }, [userAddress]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get orders from API
  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/delivery/get-pending-orders/${auth?.user?._id}`
      );
      setOrders(data);
    } catch (error) {
      console.log("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };
  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "pendings")
      return order.deliverystatus === "Pending Approval";
    return false;
  });

  const handleTakeOrder = (order) => {
    // navigate("/dashboard/delivery/track-shipments");
    console.log("order", order);
    setSelectedOrder(order);
    setIsModalVisible(true);
    setOtp("");
    setOtpSent(false);
    setUserAddress(order?.buyer?.address);
  };

  const handleSendOtp = async () => {
    if (selectedOrder?.buyer?.phone) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/get-sms-otp`, {
          mobile: selectedOrder.buyer.phone,
          email: selectedOrder.buyer.email,
        });

        if (res && res.data.success) {
          toast.success(res.data.message);
          setOtpSent(true);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Error:", error);
      }
    }
  };

  const handleOtpSubmit = async () => {
    console.log("selectedOrder", selectedOrder);
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/verify-sms-otp`, {
        userId: selectedOrder.buyer.email,
        otp,
      });

      if (res && res.data.success) {
        // toast.success(res.data.message);
        setIsModalVisible(false);
        try {
          const { data } = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/delivery/update-order-status/${selectedOrder.key}`,
            { status: "Pending for Approval" }
          );
          if (data?.success) {
            toast.success(data?.message);
            await getOrders();
          }
        } catch (error) {
          toast.error(error.data?.message || "Something went wrong", {
            icon: "⚠️",
            style: {
              background: "#f8d7da",
              color: "#721c24",
            },
          });
        }
      } else {
        toast.error(res.data.message || "Verification failed", {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        icon: "⚠️",
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      });
      console.error("Error:", error);
    }
  };

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "index",
      key: "index",
      fixed: "left",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      render: (status) => <span>{status}</span>,
    },
    {
      title: "BUYER",
      dataIndex: "buyer",
      key: "buyer",
      render: (buyer) => buyer?.name,
    },
    {
      title: "ADDRESS",
      dataIndex: "buyer",
      key: "buyer",
      render: (buyer) => {
        // setUserAddress(buyer?.address);
        return buyer?.address;
      },
    },
    {
      title: "PHONE NO.",
      dataIndex: "buyer",
      key: "buyer",
      render: (buyer) => buyer?.phone,
    },
    {
      title: "PRODUCTS",
      key: "products",
      render: (text, record) => (
        <div>
          {Array.isArray(record.products) && record.products.length > 0 ? (
            record.products.map((p) => {
              const product = p.product;
              return (
                <div
                  key={product._id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    width="50px"
                    height="50px"
                    style={{ marginRight: "10px" }}
                  />
                  <div>{product.name}</div>
                </div>
              );
            })
          ) : (
            <div>No products</div>
          )}
        </div>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      fixed: isMobileView ? false : "right",
      render: (text, record) => (
        <>
          {record.deliverystatus === "Pending Approval" ? (
            <Button disabled type="default">
              Pending Approval
            </Button>
          ) : (
            <Button type="primary" onClick={() => handleTakeOrder(record)}>
              Take Order
            </Button>
          )}
        </>
      ),
    },
  ];

  // Data formatting for the table
  const data = filteredOrders.map((order) => ({
    key: order._id,
    status: order.status,
    deliverystatus: order?.deliverystatus,
    buyer: order.buyer,
    products: order.products || [],
    payment: order.payment || [],
    partner: order.partner || null,
  }));

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDrdGO4WZZUva2vHxOAP4VF7sArwO5-IP0",
    // googleMapsApiKey: process.env.REACT_APP_GO_MAPS_API_KEYS,
    // googleMapsApiKey: process.env.REACT_APP_GO_MAPS_SEC_API_KEYS,
    // libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <DeliveryPartnerLayout title={"Dashboard - Pending Deliveries"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Assigned Deliveries"
              extra={
                <Radio.Group value={filterStatus} onChange={handleFilterChange}>
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="pendings">Pending(s)</Radio.Button>
                </Radio.Group>
              }
            >
              <div className="table-responsive">
                {loading ? (
                  <div className={styles.customTable}>
                    <AssignedDeliveriesSkeleton />
                  </div>
                ) : (
                  <Table
                    className={styles.customTable}
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{
                      current: currentPage,
                      onChange: handlePageChange,
                      pageSize: pageSize,
                    }}
                    scroll={{ x: "max-content" }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal
        title="Verify OTP"
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          // setSelectedOrder(null);
          // setOtp("");
          // setOtpSent(false);
        }}
        footer={null}
      >
        <div>
          {userLocation && deliveryPartnerLocation && (
            <MapWithDirections
              userLocation={deliveryPartnerLocation}
              deliveryPartnerLocation={userLocation}
              setMapRef={setMap}
              UserLabel="Delivery Partner"
              deliveryPartnerLabel="User"
            />
          )}
          <div className="d-flex justify-content-center mt-2">
            <Button onClick={() => map.panTo(deliveryPartnerLocation)}>
              Center
            </Button>
          </div>
          <p>Buyer Phone: {selectedOrder?.buyer?.phone}</p>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            isInputNum={true}
            shouldAutoFocus={otpSent}
            inputStyle={{
              width: "40px",
              height: "40px",
              marginRight: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "center",
            }}
            renderInput={(props, index) => (
              <input
                {...props}
                disabled={!otpSent}
                type="tel" //
                onInput={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            )}
            containerStyle={{ justifyContent: "center" }}
          />

          <Row justify="end" style={{ marginTop: "10px" }}>
            <Col>
              <Button
                type="primary"
                onClick={handleSendOtp}
                style={{ marginRight: "10px" }}
                disabled={otpSent} // Disable Send OTP button if OTP is already sent
              >
                Send OTP
              </Button>
              <Button type="primary" onClick={handleOtpSubmit}>
                Submit OTP
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
    </DeliveryPartnerLayout>
  );
};

export default DeliveryPartnerOrders;
