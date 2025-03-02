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

const DeliverypartnerDeliveryHistory = () => {
  const [deliveryHistory, setDeliveryHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { styles } = useStyle();
  const [auth, setAuth] = useAuth();
  const pageSize = 5;
  const [isMobileView, setIsMobileView] = useState(false);
  // Modal state

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Get deliveryHistory from API
  const getDeliverHistory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/delivery/get-delivery-history/${auth?.user?._id}`
      );
      if (data?.success) setDeliveryHistory(data?.ordershistory);
    } catch (error) {
      //console.log("Error fetching Delivery History", error);
    }
  };
  //console.log("hello");
  useEffect(() => {
    getDeliverHistory();
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
    // {
    //   title: "ADDRESS",
    //   dataIndex: "buyer",
    //   key: "buyer",
    //   render: (buyer) => buyer?.address,
    // },
    // {
    //   title: "PHONE NO.",
    //   dataIndex: "buyer",
    //   key: "buyer",
    //   render: (buyer) => buyer?.phone,
    // },
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
      title: "DELIVERY STATUS",
      dataIndex: "deliverystatus",
      key: "deliverystatus",
      fixed: isMobileView ? false : "right",
    },
  ];

  const data = deliveryHistory.map((order) => ({
    key: order._id,
    status: order.status,
    deliverystatus: order?.deliverystatus,
    buyer: order.buyer,
    products: order.products || [],
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
    </DeliveryPartnerLayout>
  );
};

export default DeliverypartnerDeliveryHistory;
