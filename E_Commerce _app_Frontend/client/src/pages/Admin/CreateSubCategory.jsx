import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import SubCategoryForm from "../../components/layout/Form/SubCategoryForm";

import { Table, Modal, Card, Radio, Row, Col } from "antd";
import AdminLayout from "../../components/layout/AdminLayout";
import ManageSubCategorySkeleton from "../../skeleton/ManageSubCategorySkeleton";

export default function CreateSubCategory() {
  const [categories, setCategories] = useState([]);
  const [allSub_Categories, setAllSub_Categories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const [tableloading, setTableLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page); // Update current page state
  };
  // Get all sub-categories
  const getAllSub_Category = async () => {
    try {
      const { data } = await axios.get("/api/v1/subcategory/get-sub-category");
      if (data.success) {
        setAllSub_Categories(data.sub_categories);
      }
    } catch (error) {
      toast.error("Something went wrong in getting subcategories");
    }
  };

  // Create a new sub-category
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productData = new FormData();
      productData.append("subname", name);
      productData.append("photo", photo);
      productData.append("category", category);

      const { data } = await axios.post(
        "/api/v1/subcategory/create-subcategory",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setLoading(false);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllSub_Category();
        setName("");
        setPhoto("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong in the form");
    } finally {
      setLoading(false);
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    setTableLoading(true);
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      toast.error("Something went wrong in getting categories");
    } finally {
      setTableLoading(false);
    }
  };

  // Handle update of sub-category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/subcategory/update-subcategory/${selected.key}`,
        { subname: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setVisible(false);
        setUpdatedName("");
        setSelected(null);
        getAllSub_Category();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // Handle delete sub-category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/subcategory/delete-subcategory/${id}`
      );
      if (data.success) {
        toast.success("Sub-category deleted");
        getAllSub_Category();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllSub_Category();
  }, []);

  // Table columns configuration
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
      title: "SUB CATEGORY",
      dataIndex: "subname",
      key: "subname",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name, // Assuming category is an object with a 'name' property
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: (text, record) => (
        <div>
          <button
            className="btn btn-primary ms-2"
            onClick={() => {
              setVisible(true);
              setUpdatedName(record.subname);
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
        </div>
      ),
    },
  ];

  // Data for the Ant Design Table
  const data = allSub_Categories.map((sub) => ({
    key: sub._id,
    subname: sub.subname,
    category: sub.category,
  }));

  // Radio button filter change handler
  // const onChange = (e) => //console.log(`Radio checked: ${e.target.value}`);

  return (
    <AdminLayout title={"Dashboard - Create Sub Category"}>
      <div className="col-md-12">
        <div className="row">
          <div className="col-md-9">
            <h1>Manage Sub Category</h1>
            <div className="table-responsive">
              <SubCategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                categories={categories}
                setCategory={setCategory}
                photo={photo}
                setPhoto={setPhoto}
              />
            </div>

            {/* Ant Design Table wrapped in a Card */}
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Sub Category Table"
              // extra={
              //   <Radio.Group onChange={onChange} defaultValue="a">
              //     <Radio.Button value="a">All</Radio.Button>
              //     <Radio.Button value="b">Active</Radio.Button>{" "}
              //     {/* Modify this according to your filter */}
              //   </Radio.Group>
              // }
            >
              <div className="table-responsive">
                {tableloading ? (
                  <div>
                    <ManageSubCategorySkeleton />
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

            {/* Modal for editing subcategory */}
            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible} // Updated to 'open'
            >
              <SubCategoryForm
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
