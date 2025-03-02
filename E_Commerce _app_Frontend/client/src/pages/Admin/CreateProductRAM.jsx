import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal, Table, Card, Radio, Col, Row } from "antd";
import ProductRAMForm from "../../components/layout/Form/ProductRAMForm";
import AdminLayout from "../../components/layout/AdminLayout";

export default function CreateProductRAM() {
  const [productRAM, setProductRAM] = useState([]);
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
  // Create Product RAM
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product-ram/create-product-ram`,
        { name }
      );
      setLoading(false);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllRAMs();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all Product RAM
  const getAllRAMs = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product-ram/get-product-ram`
      );
      if (data.success) {
        setProductRAM(data.ram);
      }
    } catch (error) {
      toast.error("Something went wrong in getting Product RAM");
    }
  };

  // Update Product RAM
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/product-ram/update-product-ram/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllRAMs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Delete Product RAM
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/product-ram/delete-product-ram/${pId}`
      );
      if (data.success) {
        toast.success("Product RAM is deleted");
        getAllRAMs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Columns for Ant Design Table
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
      title: "PRODUCT RAM",
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
            onClick={() => {
              handleDelete(record._id);
              //console.log("record", record);
            }}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  // Radio Button Group for filtering (if needed)
  // const onChange = (e) => console.log(`Radio checked: ${e.target.value}`);

  // Fetch RAMs on component mount
  useEffect(() => {
    getAllRAMs();
  }, []);

  return (
    <AdminLayout title={"Dashboard - Create Product RAM"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Product RAM</h1>
            <div className="table-responsive">
              <ProductRAMForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                loading={loading}
              />
            </div>

            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Product RAMs Table"
              // extra={
              //   <Radio.Group onChange={onChange} defaultValue="all">
              //     <Radio.Button value="all">All</Radio.Button>
              //     <Radio.Button value="online">ONLINE</Radio.Button>
              //   </Radio.Group>
              // }
            >
              <div className="table-responsive">
                <Table
                  bordered
                  columns={columns}
                  dataSource={productRAM}
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
                  rowKey="_id" // You should provide a unique key for each row
                  className="ant-border-space"
                />
              </div>
            </Card>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible} // Modal visibility control
            >
              <ProductRAMForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
                loading={loading}
              />
            </Modal>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
