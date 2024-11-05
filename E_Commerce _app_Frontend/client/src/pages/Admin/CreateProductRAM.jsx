import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/layout/Form/CategoryForm";
import { Modal } from "antd";
import ProductRAMForm from "../../components/layout/Form/ProductRAMForm";

export default function CreateProductRAM() {
  const [productRAM, setProductRAM] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  //create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "/api/v1/product-ram/create-product-ram",
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllRAMs();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  //get all productRAM
  const getAllRAMs = async () => {
    try {
      const { data } = await axios.get("/api/v1/product-ram/get-product-ram");
      if (data.success) {
        setProductRAM(data.ram);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong in getting productRAM");
    }
  };

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/product-ram/update-category/${selected._id}`,
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

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product-ram/delete-product-ram/${pId}`
      );
      if (data.success) {
        toast.success("RAM is deleted");
        getAllRAMs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllRAMs();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Manage Product RAM</h1>
            <div className="p-3 w-75">
              <ProductRAMForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product RAM</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productRAM?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
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
              <CategoryForm
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
