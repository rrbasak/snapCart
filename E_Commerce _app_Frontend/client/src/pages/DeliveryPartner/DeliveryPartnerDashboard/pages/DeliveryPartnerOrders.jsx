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

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get orders from API
  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/delivery/get-pending-orders/${auth?.user?._id}`
      );
      setOrders(data);
    } catch (error) {
      //console.log("Error fetching orders", error);
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
    setSelectedOrder(order);
    setIsModalVisible(true);
    setOtp("");
    setOtpSent(false);
  };

  const handleSendOtp = async () => {
    if (selectedOrder?.buyer?.phone) {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API}auth/get-otp`, {
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
    //console.log("selectedOrder", selectedOrder);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/verify-otp`,
        {
          userId: selectedOrder.buyer.email,
          otp,
        }
      );

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
      render: (buyer) => buyer?.address,
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
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
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
