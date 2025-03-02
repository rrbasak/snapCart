import React, { useEffect, useState } from "react";
import { Modal, Table, Card, Radio, Row, Col } from "antd";
import toast from "react-hot-toast";
import axios from "axios";
import ProductColorForm from "../../components/layout/Form/ProductColorForm";
import AdminLayout from "../../components/layout/AdminLayout";

export default function CreateProductColor() {
  const [productColor, setProductColor] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [radioValue, setRadioValue] = useState("all");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
  };
  // Create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
       const { data } = await axios.post(
         `${process.env.REACT_APP_API}/api/v1/product-color/create-product-color`,
         { name }
       );
      setLoading(false);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllColors();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all product colors
  const getAllColors = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product-color/get-product-color`
      );
      if (data.success) {
        setProductColor(data.color);
      }
    } catch (error) {
      toast.error("Something went wrong in getting product color");
    }
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product-color/update-product-color/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllColors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product-color/delete-product-color/${pId}`
      );
      if (data.success) {
        toast.success("Color is deleted");
        getAllColors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllColors();
  }, []);

  // Ant Design table columns
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
      title: "PRODUCT COLOR",
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

  const onChange = (e) => {
    setRadioValue(e.target.value);
    // You can handle any filtering logic here if needed
    //console.log(`radio checked: ${e.target.value}`);
  };

  return (
    <AdminLayout title={"Dashboard - Create Product Color"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Product Color</h1>
            <div className="table-responsive">
              <ProductColorForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product Color Table"
              // extra={
              //   <Radio.Group onChange={onChange} value={radioValue}>
              //     <Radio.Button value="all">All</Radio.Button>
              //     <Radio.Button value="active">Active</Radio.Button>
              //   </Radio.Group>
              // }
            >
              <div className="table-responsive">
                <Table
                  bordered
                  columns={columns}
                  dataSource={productColor}
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
                  rowKey="_id" // Assuming '_id' is the unique identifier
                />
              </div>
            </Card>
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible} // Updated to 'open'
            >
              <ProductColorForm
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
