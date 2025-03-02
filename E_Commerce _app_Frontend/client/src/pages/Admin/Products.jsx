import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Card, Table, Radio, Row, Col } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [radioValue, setRadioValue] = useState("all");
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Fetch all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
      setFilteredProducts(data.products); // Set filtered products initially to all
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  // Handle radio button change for filtering
  const onChange = (e) => {
    const value = e.target.value;
    setRadioValue(value);
    if (value === "all") {
      setFilteredProducts(products);
    } else if (value === "available") {
      setFilteredProducts(
        products.filter((p) => p.availableInStock === "In Stock")
      );
    } else if (value === "unavailable") {
      setFilteredProducts(
        products.filter((p) => p.availableInStock === "Out Of Stock")
      );
    }
  };

  // Maximum length for description
  const MAX_DESCRIPTION_LENGTH = 50;

  // Table columns
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
      title: "IMAGE",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <img
          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${record.key}`}
          alt={record.name}
          style={{ width: "50px", height: "50px", objectFit: "cover" }}
        />
      ),
    },
    {
      title: "PRODUCT NAME",
      dataIndex: "name",
      key: "name",
      render: (text, record) => <Link to={`${record.slug}`}>{text}</Link>,
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (text) => {
        if (text && text.length > MAX_DESCRIPTION_LENGTH) {
          return `${text.substring(0, MAX_DESCRIPTION_LENGTH)}...`;
        }
        return text;
      },
    },
    {
      title: "AVAILABILITY",
      dataIndex: "availableInStock",
      key: "availableInStock",
      render: (text) => <span>{text}</span>,
    },
  ];

  // Table data
  const data = filteredProducts.map((product) => ({
    key: product._id,
    name: product.name,
    description: product.description,
    image: `${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`,
    slug: product.slug,
    availableInStock: product.availableInStock,
  }));

  return (
    <AdminLayout title="Dashboard - Products">
      <div className="col-md-12">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="tablespace mb-24"
              title="Products Table"
              extra={
                <Radio.Group onChange={onChange} defaultValue="all">
                  <Radio.Button value="all">All</Radio.Button>
                  <Radio.Button value="available">AVAILABLE</Radio.Button>
                  <Radio.Button value="unavailable">UNAVAILABLE</Radio.Button>
                </Radio.Group>
              }
            >
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
                  scroll={{
                    x: "max-content",
                    // y: 120 * 5,
                  }}
                  loading={loading}
                  className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  );
}
