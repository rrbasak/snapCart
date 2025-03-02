import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/layout/Form/CategoryForm";
import { Modal, Table, Card, Radio, Row, Col } from "antd"; // Import necessary Ant Design components
import AdminLayout from "../../components/layout/AdminLayout";
import ManageCategorySkeleton from "../../skeleton/ManageCategorySkeleton";

export default function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableloading, setTableLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 5;
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
  };
  // Handle form submission to create a category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const existingCategory = categories.some(
        (cat) => cat.name.toLowerCase() === name.toLowerCase()
      );

      if (existingCategory) {
        setLoading(false);
        toast.error("Category Already Exisits");
        return;
      }
      const productData = new FormData();
      productData.append("name", name);
      productData.append("photo", photo);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        productData
      );
      setLoading(false);

      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setPhoto("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      // toast.error("Something went wrong in input form");
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (error.response && error.response.status === 500) {
        toast.error(
          error.response.data.message ||
            "Something went wrong in the input form"
        );
      } else {
        toast.error("Something went wrong in the input form");
      }
    } finally {
      setLoading(false);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    setTableLoading(true);
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong in getting categories");
    } finally {
      setTableLoading(false);
    }
  };

  // Handle category update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handle category deletion
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success("Category is deleted");
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategory();
  }, []);

  // Define table columns
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
      title: "CATEGORY",
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
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </button>
        </>
      ),
    },
  ];

  // Table data (converted from categories state)
  const dataSource = categories.map((category) => ({
    key: category._id,
    name: category.name,
    _id: category._id,
  }));

  // OnChange handler for the Radio button
  const onChange = (e) => {
    //console.log(`radio checked:${e.target.value}`);
  };

  return (
    <AdminLayout title={"Dashboard - Create Category"}>
      <div className="col-md-12">
        <div className="col-md-9">
          <h1>Manage Category</h1>
          <div className="table-responsive">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
              photo={photo}
              setPhoto={setPhoto}
            />
          </div>

          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Category Table"
          >
            <div className="table-responsive">
              {tableloading ? (
                <div>
                  <ManageCategorySkeleton />
                </div>
              ) : (
                <Table
                  bordered
                  columns={columns}
                  dataSource={dataSource}
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
              )}
            </div>
          </Card>

          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CategoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </AdminLayout>
  );
}
