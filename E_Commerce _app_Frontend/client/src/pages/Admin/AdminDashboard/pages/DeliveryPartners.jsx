import React, { useState, useEffect } from "react";
import { Table, Card, Radio, Row, Col, Tag } from "antd";
import moment from "moment";
import axios from "axios";
import AdminLayout from "../../../../components/layout/AdminLayout";
import DeliveryPartnersSkeleton from "../../../../skeleton/DeliveryPartnersSkeleton";

const DeliveryPartners = () => {
  const [deliverypartners, setDeliveryPartners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isMobileView, setIsMobileView] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
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
  const getPartners = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/get-all-delivery-partners`
      );
      if (data?.success) {
        setDeliveryPartners(data?.deliveryPartner);
      }
    } catch (error) {
      //console.log("Error fetching Delivery Partners", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPartners();
  }, []);

  const columns = [
    {
      title: "Sl No.",
      key: "index",
      fixed: "left",
      render: (text, record, index) => (currentPage - 1) * pageSize + index + 1,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "OWNER NAME",
      dataIndex: "ownerName",
      key: "ownerName",
    },
    {
      title: "VEHICLE",
      key: "vehicle",
      render: (record) => `${record.vehicleModel} (${record.vehicleType})`,
    },
    {
      title: "REGISTRATION",
      dataIndex: "registrationNumber",
      key: "registrationNumber",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "STATUS",
      key: "status",
      fixed: "right",
      render: (record) =>
        record.status === "Online" ? (
          <Tag color="green">Online</Tag>
        ) : (
          <Tag color="red">Offline</Tag>
        ),
    },
    // {
    //   title: "DATE",
    //   dataIndex: "createdAt",
    //   key: "createdAt",
    //   render: (createdAt) =>
    //     moment(createdAt).format("MMMM Do YYYY, h:mm:ss a"),
    // },
  ];

  // Data formatting for the table

  const filteredPartners = deliverypartners?.filter((order) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return order.status === "Online";
    if (filterStatus === "inactive") return order.status === "Offline";
    return false;
  });

  const data = filteredPartners.map((partner) => ({
    key: partner._id,
    name: partner.name,
    ownerName: partner.ownerName,
    vehicleModel: partner.vehicleModel,
    vehicleType: partner.vehicleType,
    registrationNumber: partner.registrationNumber,
    phone: partner.phone,
    address: partner.address,
    createdAt: partner.createdAt,
    role: partner.role,
    status: partner.status,
  }));

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };

  return (
    <AdminLayout title={"Dashboard - Delivery partner(s)"}>
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Delivery Partners Table"
              extra={
                <Radio.Group value={filterStatus} onChange={handleFilterChange}>
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="active">Online</Radio.Button>
                  <Radio.Button value="inactive">Offline</Radio.Button>
                </Radio.Group>
              }
            >
              <div className="table-responsive">
                {loading ? (
                  <div>
                    <DeliveryPartnersSkeleton />
                  </div>
                ) : (
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
                    scroll={{
                      x: "max-content",
                      // y: 120 * 5,
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

export default DeliveryPartners;
