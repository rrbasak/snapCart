import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import SubCategoryForm from "../../components/layout/Form/SubCategoryForm";
import { Modal } from "antd";

export default function CreateSubCategory() {
  const [categories, setCategories] = useState([]);
  const [allSub_Categories, setAllSub_Categories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");

  // //create category
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const productData = new FormData();
  //     productData.append("name", name);
  //     productData.append("photo", photo);
  //     const { data } = await axios.post("/api/v1/category/create-category", {
  //       name,
  //     });
  //     if (data?.success) {
  //       toast.success(`${name} is created`);
  //       getAllCategory();
  //       setName("");
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {
  //     ////console.log(error);
  //     toast.error("Something went wrong in input form");
  //   }
  // };

  //get all sub-categories /get-sub-category
  const getAllSub_Category = async () => {
    try {
      const { data } = await axios.get("/api/v1/subcategory/get-sub-category");
      if (data.success) {
        setAllSub_Categories(data.sub_categories);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };
  //create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //console.log("name", name);
      const productData = new FormData();
      productData.append("subname", name);
      productData.append("photo", photo);
      productData.append("category", category);
      //console.log("productData", productData);
      // const { data } = await axios.post(
      //   "/api/v1/subcategory/create-subcategory",
      //   { subname: name, category: category,photo:photo }
      // );
      const { data } = await axios.post(
        "/api/v1/subcategory/create-subcategory",
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
        setPhoto("");
        getAllSub_Category();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong in getting categories");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
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

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/subcategory/delete-subcategory/${pId}`
      );
      if (data.success) {
        toast.success(data.messsage);
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
  //console.log(allSub_Categories);
  return (
    <Layout title={"Dashboard - Create Sub Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Sub Category</h1>
            <div className="p-3 w-75">
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
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Sub category</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allSub_Categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.subname}</td>
                      <td>{c.category.name}</td>
                      <td>
                        <button
                          className="btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
    </Layout>
  );
}
