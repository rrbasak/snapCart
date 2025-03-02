import React, { useState, useEffect } from "react";
import { Select, Table, Card, Radio, Row, Col } from "antd";
import moment from "moment";
import axios from "axios";
import AdminLayout from "../../components/layout/AdminLayout";
import toast from "react-hot-toast";
import { createStyles } from "antd-style";
import OrdersTableSkeleton from "../../skeleton/OrdersTableSkeleton";

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

const AdminOrders = () => {
  const [statusOptions] = useState([
    "Order Confirmed",
    "Processed",
    "Shipped",
    "Out For Delivery",
    // "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  // const [deliverypartners, setDeliveryPartners] = useState([]);
  const [partners, setPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const { styles } = useStyle();
  const pageSize = 5;

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
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
  };

  const getOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-orders`
      );
      setOrders(data);
    } catch (error) {
      //console.log("Error fetching orders", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // }, []);

  // const getPartners = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       "/api/v1/auth/get-all-delivery-partners"
  //     );
  //     if (data?.success) {
  //       setDeliveryPartners(data?.deliveryPartner);
  //     }
  //   } catch (error) {
  //     //console.log("Error fetching Delivery Partners", error);
  //   }
  // };
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  const filteredOrders = orders.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "delivered") return order.status === "Delivered";
    if (filterStatus === "canceled") return order.status === "Canceled";
    return false;
  });

  const handleChange = async (orderId, value, userId, products) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        {
          status: value,
        }
      );
      const productNames = products
        .map((product) => product.productName)
        .join(", ");
      const statusMessages = {
        // "Order Confirmed": `Your order containing ${productNames} has been confirmed. We will start processing it soon.`,
        Processed: `Your order containing ${productNames} is now being processed.`,
        Shipped: `Great news! Your order containing ${productNames} has been shipped.`,
        "Out For Delivery": `Your order containing ${productNames} is out for delivery. It will reach you soon!`,
        Delivered: `Your order containing ${productNames} has been successfully delivered. Enjoy your purchase!`,
        Canceled: `Unfortunately, your order containing ${productNames} has been canceled. Please contact support if needed.`,
      };

      const notificationTitles = {
        // "Order Confirmed": "Order Confirmed ✅",
        Processed: "Order Processing 🔄",
        Shipped: "Order Shipped 🚚",
        "Out For Delivery": "Out for Delivery 📦",
        Delivered: "Order Delivered 🎉",
        Canceled: "Order Canceled ❌",
      };

      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/create-order-placed-notification`,
        {
          title: notificationTitles[value] || "Order Update",
          message:
            statusMessages[value] ||
            `Your order containing ${productNames} has been updated to '${value}'.`,
          recipient: "users",
          recipientId: userId,
          status: "unread",
          type: "order_update",
        }
      );

      getOrders();
      fetchPartners();
    } catch (error) {
      //console.log("Error changing status", error);
    }
  };
  const fetchPartners = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/available-partners`
      );
      //console.log("data", data);
      if (data.success) {
        const availablePartners = data.availablePartners.filter(
          (partner) => partner.remaining > 0
        );
        setPartners(availablePartners);
      } else {
        console.error("Error fetching partners:");
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
      // message.error("Failed to load partners");
    }
  };

  // Function to assign a partner
  const handlePartnerAssign = async (orderId, partnerId) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/assign-partner/${orderId}`,
        {
          partner: partnerId,
        }
      );
      if (data?.success) {
        getOrders();
        fetchPartners();
      } else {
        toast(data.message, {
          icon: "⚠️",
          style: {
            background: "#fff9c4",
            color: "#000",
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast(errorMessage, {
        icon: "⚠️",
        style: {
          background: "#fff9c4",
          color: "#000",
        },
      });
    }
  };

  useEffect(() => {
    getOrders();
    // getPartners();
    fetchPartners();
  }, []);

  const getAllowedStatuses = (currentStatus) => {
    const currentIndex = statusOptions.indexOf(currentStatus);

    return statusOptions.map((status, index) => ({
      status,
      disabled: index < currentIndex,
    }));
  };

  // Columns for the Ant Design Table
  const columns = [
    {
      title: "Sl No.",
      dataIndex: "index",
      key: "index",
      fixed: "left",
      render: (text, record, index) => {
        return (currentPage - 1) * pageSize + index + 1;
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      fixed: isMobileView ? false : "left",
      render: (text, record) => {
        if (record.status === "Delivered" || record.status === "Canceled") {
          return <span>{record.status}</span>;
        }
        const allowedStatuses = getAllowedStatuses(record.status);
        const disableDeliveryStatuses = !record.partner && [
          "Out For Delivery",
          "Delivered",
        ];

        return (
          <Select
            bordered={false}
            onChange={(value) =>
              handleChange(record.key, value, record.userId, record.products)
            }
            defaultValue={record.status}
          >
            {allowedStatuses.map((option, i) => (
              <Option
                key={i}
                value={option.status}
                disabled={
                  option.disabled ||
                  (disableDeliveryStatuses &&
                    disableDeliveryStatuses.includes(option.status))
                }
              >
                {option.status}
              </Option>
            ))}
          </Select>
        );
      },
    },
    {
      title: "BUYER",
      dataIndex: "buyer",
      key: "buyer",
      width: 150,
      render: (buyer) => buyer?.name,
    },
    {
      title: "DATE",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).format("MMMM Do YYYY, h:mm:ss a"),
    },
    {
      title: "PAYMENT",
      dataIndex: "payment",
      key: "payment",
      render: (payment) => (payment.success ? "Success" : "Failed"),
    },
    {
      title: "STATUS UPDATE DATE",
      dataIndex: "statusUpdateDate",
      key: "statusUpdateDate",
      render: (statusUpdateDate) =>
        moment(statusUpdateDate).format("MMMM Do YYYY, h:mm:ss a"),
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
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p.product._id}`}
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
      title: "QUANTITY",
      dataIndex: "products",
      key: "products",
      render: (products) => (Array.isArray(products) ? products.length : 0),
    },
    {
      title: "ORDER STATUS",
      dataIndex: "ostatus",
      key: "ostatus",
      render: (deliverystatus) => deliverystatus,
    },
    {
      title: "PARTNER",
      dataIndex: "partner",
      key: "partner",
      fixed: isMobileView ? false : "right",
      render: (partner, record) => {
        if (
          record.status === "Out For Delivery" ||
          record.status === "Delivered" ||
          record.status === "Canceled"
        ) {
          return <span>{partner || "No Partner Assigned"}</span>;
        }

        if (record.status !== "Shipped") {
          return <span>No Partner Assigned</span>;
        }

        return (
          <Select
            placeholder="Select Partner"
            onChange={(value) => handlePartnerAssign(record.key, value)}
            defaultValue={partner}
            style={{ width: "100%" }}
          >
            {partners.map((partner) => (
              <Option
                key={partner.id}
                value={partner.id}
                // Optionally, disable selection if no deliveries left
              >
                {partner.name} ({partner.remaining} deliveries left)
              </Option>
            ))}
          </Select>
        );
      },
    },
  ];

  // Data formatting for the table
  const data = filteredOrders.map((order) => ({
    key: order._id,
    status: order.status,
    buyer: order.buyer,
    createAt: order.createdAt,
    payment: order.payment,
    statusUpdateDate: order.updatedAt,
    products: order.products || [],
    partner: order.partner?.name || "",
    userId: order.buyer._id,
    ostatus: order.deliverystatus || "",
  }));
  const [loading, setLoading] = useState(false);

  return (
    <AdminLayout title={"Dashboard - Orders"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Orders Table"
              extra={
                <Radio.Group value={filterStatus} onChange={handleFilterChange}>
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="delivered">Delivered</Radio.Button>
                  <Radio.Button value="canceled">Canceled</Radio.Button>
                </Radio.Group>
              }
            >
              <div className="table-responsive">
                {loading ? (
                  <div className={styles.customTable}>
                    <OrdersTableSkeleton />
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
                    scroll={{
                      x: "max-content",
                    }}
                  />
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
