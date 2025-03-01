import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Table, Radio, Card, Row, Col } from "antd";
import ProductSizeForm from "../../components/layout/Form/ProductSizeForm";
import AdminLayout from "../../components/layout/AdminLayout";

export default function CreateProductSize() {
  const [productSize, setProductSize] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
  };

  // For filtering (if needed, adjust this based on requirements)
  const [filterValue, setFilterValue] = useState("all");

  // Create product size
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/api/v1/product-size/create-product-size",
        { name }
      );
      setLoading(false);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllSizes();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in input form");
    }
  };

  // Get all product sizes
  const getAllSizes = async () => {
    try {
      const { data } = await axios.get("/api/v1/product-size/get-product-size");
      if (data.success) {
        setProductSize(data.size);
      }
    } catch (error) {
      toast.error("Something went wrong in getting product size");
    }
  };

  // Update product size
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/product-size/update-product-size/${selected._id}`,
        {
          name: updatedName,
        }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllSizes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete product size
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product-size/delete-product-size/${pId}`
      );
      if (data.success) {
        toast.success("Size is deleted");
        getAllSizes();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllSizes();
  }, []);

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
      title: "PRODUCT SIZE",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (text, record) => (
        <>
          <button
            className="btn btn-primary ms-2"
            onClick={() => {
              setVisible(true);
              setUpdatedName(record.name);
              setSelected(record);
            }}
          >
            Edit
          </button>
          <button
            className="btn btn-danger ms-2"
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <AdminLayout title={"Dashboard - Create Product Size"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Product Size</h1>
            <div className="table-responsive">
              <ProductSizeForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product Size Table"
              // extra={
              //   <Radio.Group
              //     onChange={(e) => setFilterValue(e.target.value)}
              //     value={filterValue}
              //     buttonStyle="solid"
              //   >
              //     <Radio.Button value="all">All</Radio.Button>
              //     <Radio.Button value="online">Online</Radio.Button>
              //   </Radio.Group>
              // }
            >
              <div className="table-responsive">
                <Table
                  bordered
                  columns={columns}
                  dataSource={productSize}
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
                  rowKey="_id"
                  className="ant-border-space"
                />
              </div>
            </Card>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible} // Updated to 'open'
            >
              <ProductSizeForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
