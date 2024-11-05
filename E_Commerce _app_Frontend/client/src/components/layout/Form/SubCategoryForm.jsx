import { Select } from "antd";
import React from "react";
import styles from "../../../styles/CreateProduct.module.css";
const SubCategoryForm = ({
  handleSubmit,
  value,
  setValue,
  categories,
  setCategory,
  photo,
  setPhoto
}) => {
  const { Option } = Select;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            // className={`form-select ${styles.selectWrapper}`}
            className={styles.selectWrapper}
            onChange={(value) => setCategory(value)}
          >
            {categories?.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new subcategory"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12">
            {photo ? photo.name : "Upload Photo"}
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
              hidden
            />
          </label>
        </div>
        <div className="mb-3">
          {photo && (
            <div className="text-center">
              <img
                src={URL.createObjectURL(photo)}
                alt="product_photo"
                height={"200px"}
                className="img img-responsive"
              />
            </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default SubCategoryForm;
