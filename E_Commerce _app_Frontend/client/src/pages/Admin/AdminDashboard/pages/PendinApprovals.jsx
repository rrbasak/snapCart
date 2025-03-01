import React, { useState, useEffect } from "react";
import { Table, Card, Row, Col } from "antd";
// import moment from "moment";
import axios from "axios";
import AdminLayout from "../../../../components/layout/AdminLayout";
import { Select } from "antd";
import PendingApprovalOrdersSkeleton from "../../../../skeleton/PendingApprovalOrdersSkeleton";

const PendinApprovals = () => {
  const [pendingapprovalorders, setPendingApprovalOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const [loading, setLoading] = useState(false);
  const pageSize = 5;

  const handleActionChange = async (action, orderId) => {
    try {
      const response = await axios.put(
        `/api/v1/auth/update-order-status/${orderId}`,
        {
          deliverystatus: action,
        }
      );
      if (response?.data?.success) {
        getPendingApprovalOrders();
        const productNames = response?.data?.order?.products
          .map((product) => product.productName)
          .join(", ");
        const statusMessages = {
          Delivered: `Your order containing ${productNames} has been successfully delivered. Enjoy your purchase!`,
        };

        const notificationTitles = {
          Delivered: "Order Delivered 🎉",
        };

        await axios.post("/api/v1/auth/create-order-placed-notification", {
          title:
            notificationTitles[response?.data?.order?.status] || "Order Update",
          message:
            statusMessages[response?.data?.order?.status] ||
            `Your order containing ${productNames} has been updated to '${response?.data?.order?.status}'.`,
          recipient: "users",
          recipientId: response?.data?.order?.buyer,
          status: "unread",
          type: "order_update",
        });
      } else {
        getPendingApprovalOrders();
        const productNames = response?.data?.order?.products
          .map((product) => product.productName)
          .join(", ");
        const statusMessages = {
          Canceled: `Unfortunately, your order containing ${productNames} has been canceled. Please contact support if needed.`,
        };

        const notificationTitles = {
          Canceled: "Order Canceled ❌",
        };

        await axios.post("/api/v1/auth/create-order-placed-notification", {
          title:
            notificationTitles[response?.data?.order?.status] || "Order Update",
          message:
            statusMessages[response?.data?.order?.status] ||
            `Your order containing ${productNames} has been updated to '${response?.data?.order?.status}'.`,
          recipient: "users",
          recipientId: response?.data?.order?.buyer,
          status: "unread",
          type: "order_update",
        });
      }
    } catch (error) {
      console.error("Error updating order status", error);
    }
  };
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
    setCurrentPage(page);
  };

  // Get delivery partners from API
  const getPendingApprovalOrders = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/v1/auth/all-pending-approval-orders"
      );
      if (data?.success) {
        setPendingApprovalOrders(data?.orders);
      }
    } catch (error) {
      //console.log("Error fetching Delivery Partners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPendingApprovalOrders();
  }, []);

  const columns = [
    {
      title: "Sl No.",
      key: "index",
      fixed: "left",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "BUYER NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "BUYER EMAIL",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "PARTNER NAME",
      dataIndex: "partnerName",
      key: "partnerName",
    },
    {
      title: "PARTNER PHONE",
      dataIndex: "partnerPhone",
      key: "partnerPhone",
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
      title: "DELIVERY STATUS",
      dataIndex: "deliverystatus",
      key: "deliverystatus",
    },
    {
      title: "ACTION",
      key: "action",
      fixed: isMobileView ? false : "right",
      render: (record) => (
        <Select
          style={{ width: 120 }}
          placeholder="Select"
          onChange={(value) => handleActionChange(value, record.key)}
        >
          <Select.Option value="Approved">Approve</Select.Option>
          <Select.Option value="Rejected">Reject</Select.Option>
        </Select>
      ),
    },
  ];

  const data = pendingapprovalorders.map((order) => ({
    key: order?._id,
    name: order?.buyer?.name,
    email: order?.email,
    partnerName: order?.partner?.name,
    partnerPhone: order?.partner?.phone,
    products: order.products || [],
    deliverystatus: order.deliverystatus,
  }));

  return (
    <AdminLayout title={"Dashboard - Pending Approval(s)"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Order(s) Requiring Approval"
              // extra={
              //   <Radio.Group defaultValue="all">
              //     <Radio.Button value="all">All</Radio.Button>
              //     <Radio.Button value="active">Active</Radio.Button>
              //     <Radio.Button value="inactive">Inactive</Radio.Button>
              //   </Radio.Group>
              // }
            >
              {loading ? (
                <div className="table-responsive">
                  <PendingApprovalOrdersSkeleton />
                </div>
              ) : (
                <div className="table-responsive">
                  <Table
                    bordered
                    columns={columns}
                    dataSource={data}
                    pagination={{
                      current: currentPage,
                      onChange: handlePageChange,
                      pageSize: pageSize,
                    }}
                    className="ant-border-space"
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
};

export default PendinApprovals;
