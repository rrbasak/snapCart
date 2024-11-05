import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/layout/Form/CategoryForm";
import { DatePicker, Modal, Select, TimePicker } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Option } from "antd/es/mentions";
import styles from "../../styles/UpdateProduct.module.css";
import moment from "moment";
import UpdateExchangeProductModal from "../../components/Modals/UpdateExchangeProductModal";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import ImageUpload from "../../frontendUtil/ImageUpload";
dayjs.extend(customParseFormat);

export default function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState();
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");
  const [isCall, setIsCall] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [freeDeliverydate, setFreeDeliveryDate] = useState("");
  const [fastestDeliverydate, setFastestDeliveryDate] = useState("");
  const [fastestDeliverytime, setFastestDeliveryTime] = useState("");
  const [availability, setAvailability] = useState("");
  const [isSpecialDay, setIsSpecialDay] = useState("");
  const [specialDayOffer, setSpecialDayOffer] = useState("");
  const [searchInputKeys, setSearchInputKeys] = useState([]);
  const [previousSelectedKeys, setPreviousSelectedKeys] = useState([]);
  const [isExchangeAvailable, setIsExchangeAvailable] = useState("");
  const [isExchangeProductModalOpen, setIsExchangeProductModalOpen] =
    useState(false);
  const [subcategoryId, setSubCategoryId] = useState("");
  const [prepopulatedDataForModal, setPrepopulatedDataForModal] = useState();
  const [datas, setData] = useState();
  const [subCategoryName, setSubCategoryName] = useState();
  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      if (!data.success || !data.product) {
        debugger;
        return navigate("/404");
      }
      //console.log(dayjs(data?.product?.freedeliveryDate).format("YYYY-MM-DD"));
      setData(data);
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      // setSubCategory(data.product.subcategoryName);

      setFreeDeliveryDate(
        dayjs(data?.product?.freedeliveryDate).format("YYYY-MM-DD")
      );
      setFastestDeliveryDate(
        dayjs(data?.product?.fastestdelivery.date).format("YYYY-MM-DD")
      );
      setFastestDeliveryTime(
        dayjs(data?.product?.fastestdelivery?.closetime, "HH:mm:ss")
      );
      setAvailability(data?.product?.availableInStock);
      setIsSpecialDay(data?.product?.specialDayTag);
      setSpecialDayOffer(data?.product?.specialDayOffer);
      const searchItems = data?.product?.search[0].split(",");
      setSearchInputKeys(searchItems);
      const transformedKeys = searchItems.map((val) => ({
        label: val,
        value: val.toLowerCase(),
      }));
      setPreviousSelectedKeys(transformedKeys.map((key) => key.value));
      setIsExchangeAvailable(data?.product?.exchangeavailable);
      setPrepopulatedDataForModal(data?.product?.subcategory);
      setSubCategoryName(data?.product?.subcategoryName);
      setSubCategory(
        data?.product?.subcategory?.sub_category ||
          subCategories.find((sc) => sc.subname === subCategoryName)?.["_id"]
      ); //sub_category id
      setIsCall(true);
    } catch (error) {
      //console.log(error);
      toast.error("Failed to fetch search data");
      navigate("/404");
    }
  };
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (id) {
      fetchPhotos();
    }
  }, [id]);

  //get all photo pof product
  const fetchPhotos = async () => {
    try {
      //console.log("id", id);
      const { data } = await axios.get(
        `/api/v1/product/product-all-photo/${id}`
      );
      //console.log(data);
      if (data.success) {
        const formattedPhotos = data.photos.map((photo, index) => ({
          uid: index,
          name: `photo-${index}`,
          status: "done",
          url: `data:${photo.contentType};base64,${photo.data}`,
        }));
        setPhotos(formattedPhotos);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };
  // Handling photo change in ImageUpload component
  //console.log("photo",photos)
  const handlePhotoChange = (newFileList) => {
    //console.log("newFileList", newFileList);
    setPhotos(newFileList);
  };
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      ////console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  const getSubCategoriesBaseOnCAtegory = async (value) => {
    try {
      const { data } = await axios.get(
        `/api/v1/subcategory/get-subcategory-oncategory/${value}`
      );
      if (data?.success) {
        setSubCategories(data?.sub_categories_based_on_category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting sub category");
    }
  };
  // remove a file (photo)
  const handleRemovePhoto = (photoIndex) => {
    setPhotos(photos.filter((_, index) => index !== photoIndex));
  };
  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // photo && productData.append("photo", photo);
      photos.forEach((photo) => {
        if (photo.originFileObj) {
          //console.log("photo.originFileObj", photo.originFileObj);
          productData.append("photo", photo.originFileObj);
        } else {
          // Handle base64 encoded images
          //console.log("photo.url", photo.url);
          productData.append("photo", photo.url);
        }
      });
      productData.append("category", category);
      if (subcategoryId) {
        productData.append("subcategory", subcategoryId);
      }
      productData.append("subcategoryName", subCategoryName);

      productData.append("freedeliveryDate", freeDeliverydate);
      productData.append("fastestdeliverydate", fastestDeliverydate);
      productData.append("fastestdeliverytime", fastestDeliverytime);
      productData.append("availableInStock", availability);
      productData.append("search", searchInputKeys);
      productData.append("specialDayTag", isSpecialDay);
      productData.append("specialDayOffer", specialDayOffer);
      productData.append("exchangeavailable", isExchangeAvailable);

      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      ////console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      ////console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (isCall) {
      getAllCategory();
      getSubCategoriesBaseOnCAtegory(category);
    }
  }, [isCall]);

  const categoryChangeHandler = (value) => {
    //console.log(value);
    setCategory(value);
    setSubCategory();
    getSubCategoriesBaseOnCAtegory(value);
  };

  const ondFreeDeliveryateChange = (date, dateString) => {
    //console.log(dateString);
    setFreeDeliveryDate(dateString);
  };
  const ondFastestDeliveryateChange = (date, dateString) => {
    //console.log(dateString);
    setFastestDeliveryDate(dateString);
  };
  const onFastestTimeChange = (time, timeString) => {
    setFastestDeliveryTime(timeString);
  };
  const handleChange = (value) => {
    setSearchInputKeys([...value]);
  };
  // const transformedKeys = searchInputKeys.map((val) => ({
  //   label: val,
  //   value: val.toLowerCase(),
  // }));
  // setPreviousSelectedKeys(transformedKeys);
  //console.log(previousSelectedKeys.map((key) => key.value));
  //console.log(previousSelectedKeys);

  const options = [
    { label: "Electronics", value: "electronics" },
    { label: "Home Appliances", value: "home_appliances" },
    { label: "Fashion", value: "fashion" },
    { label: "Beauty & Personal Care", value: "beauty_personal_care" },
    { label: "Sports & Outdoors", value: "sports_outdoors" },
    { label: "Toys & Games", value: "toys_games" },
    { label: "Automotive", value: "automotive" },
    { label: "Books", value: "books" },
    { label: "Groceries", value: "groceries" },
    { label: "Health & Wellness", value: "health_wellness" },
  ];

  const handleOpenExchangeProductModal = () => {
    setIsExchangeProductModalOpen(true);
  };
  const handleOkExchangeProductModal = (subCategoryId) => {
    setIsExchangeProductModalOpen(false);
    setSubCategoryId(subCategoryId);
  };
  const handleCancelExchangeProductModal = () => {
    setIsExchangeProductModalOpen(false);
  };

  const handleSubCategoryChange = (sc_id) => {
    //console.log(sc_id);
    setSubCategory(sc_id);
    //console.log(sc_id);
    const selectedSubCategoryObject = subCategories.find(
      (sc) => sc._id === sc_id
    );
    //console.log(selectedSubCategoryObject);
    setSubCategoryName(selectedSubCategoryObject.subname);
  };
  // const handleSubCategoryChange = (sc_id) => {
  //   //console.log(sc_id);
  //   const selectedSubCategoryObject = subCategories.find(
  //     (sc) => sc._id === sc_id
  //   );
  //   //console.log(selectedSubCategoryObject);
  //   setSubCategory(selectedSubCategoryObject);
  // };
  return (
    <>
      <UpdateExchangeProductModal
        isModalOpen={isExchangeProductModalOpen}
        handleOk={handleOkExchangeProductModal}
        handleCancel={handleCancelExchangeProductModal}
        categories={categories}
        subCategories={subCategories}
        selectedCategory={category}
        selectedSubCategory={subCategory}
        prepopulatedDataForModal={prepopulatedDataForModal}
      />
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Update Product</h1>
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  showSearch
                  placeholder="Select a category"
                  size="large"
                  // optionFilterProp="label"
                  className={styles.selectWrapper}
                  value={category}
                  onChange={(value) => {
                    categoryChangeHandler(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <Select
                  bordered={false}
                  showSearch
                  placeholder="Select a sub category"
                  size="large"
                  // optionFilterProp="label"
                  className={styles.selectWrapper}
                  // value={subCategory}
                  value={
                    subCategory ||
                    subCategories.find(
                      (sc) => sc.subname === subCategoryName
                    )?.["_id"]
                  }
                  onChange={(value) => handleSubCategoryChange(value)}
                >
                  {subCategories?.map((sc) => (
                    <Option key={sc._id} value={sc._id}>
                      {sc.subname}
                    </Option>
                  ))}
                </Select>
                {/* <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div> */}
                {/* <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`/api/v1/product/product-all-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div> */}

                {/* <div className="mb-3">
                  {photos.length > 0 ? (
                    <div className={styles.photoPreviewContainer}>
                      {photos.map((photo, index) => (
                        <div key={index} className={styles.photoWrapper}>
                          <img
                            src={`data:${photo.contentType};base64,${photo.data}`}
                            alt={`product_photo_${index}`}
                            height={"200px"}
                            className="img img-responsive"
                          />
                          <button
                            type="button"
                            className={styles.removePhotoButton}
                            onClick={() => handleRemovePhoto(index)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No photos available</p>
                  )}
                </div> */}
                <div className={styles.photoUpload}>
                  <ImageUpload
                    initialFileList={photos}
                    onChange={handlePhotoChange}
                    maxFiles={8}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    placeholder="write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    placeholder="write a Price"
                    className="form-control"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                {/* <div className="mb-3">
                <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="form-select mb-3"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                  value={shipping ? "yes" : "No"}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div> */}
                {/* Delivery Dates and Times */}
                <div className={styles.deliveryContainer}>
                  {/* <label>Free Delivery Date:</label> */}
                  <DatePicker
                    placeholder="Free Delivery Date"
                    onChange={ondFreeDeliveryateChange}
                    className={styles.datePicker}
                    value={freeDeliverydate ? dayjs(freeDeliverydate) : null}
                  />
                  {/* <label>Fastest Delivery Date:</label> */}
                  <DatePicker
                    placeholder="Fastest Delivery Date"
                    onChange={ondFastestDeliveryateChange}
                    className={styles.datePicker}
                    value={
                      fastestDeliverydate ? dayjs(fastestDeliverydate) : null
                    }
                  />
                  {/* <label>Fastest Delivery Time:</label> */}
                  <TimePicker
                    placeholder="Fastest Delivery Time"
                    onChange={onFastestTimeChange}
                    className={styles.timePicker}
                    value={
                      fastestDeliverytime
                        ? dayjs(fastestDeliverytime, "HH:mm:ss")
                        : null
                    }
                  />
                </div>
                {/* Availability */}
                <label className={styles.label}>Availability:</label>
                <Select
                  bordered={false}
                  placeholder="Availability"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setAvailability(value)}
                  value={availability}
                  // onSearch={onSearch}
                >
                  <Option value="In Stock">In Stock</Option>
                  <Option value="Out Of Stock">Out Of Stock</Option>
                </Select>

                {/* Is Special Day */}
                <label className={styles.label}>Special Day Tag:</label>
                <Select
                  bordered={false}
                  placeholder="Is Prime day"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setIsSpecialDay(value)}
                  value={isSpecialDay}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
                {isSpecialDay === "true" && (
                  <>
                    <label className={styles.label}>Offer:</label>
                    <div className={styles.productDetails}>
                      <input
                        type="number"
                        placeholder="Special Day Offer"
                        className="form-control"
                        onChange={(e) => setSpecialDayOffer(e.target.value)}
                        value={specialDayOffer}
                      />
                    </div>
                  </>
                )}
                {/* Search Keywords */}
                <label className={styles.label}>Search Inputs:</label>
                <div className={styles.selectWrapper}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Enter the search keywords"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    options={options}
                    // defaultValue={previousSelectedKeys}
                    // defaultValue={datas?.product?.search[0]
                    //   .split(",")
                    //   .map((val) => ({
                    //     label: val,
                    //     value: val.toLowerCase(),
                    //   }))
                    //   .map((key) => key.label)}
                    value={searchInputKeys}
                  />
                </div>
                {/* Is Exchange Available */}
                <label className={styles.label}>Exchange Available:</label>
                <Select
                  bordered={false}
                  placeholder="Is Exchange Available"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setIsExchangeAvailable(value)}
                  value={isExchangeAvailable}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>

                {isExchangeAvailable === "true" && (
                  <button
                    type="button"
                    className="btn btn-outline-primary mb-3"
                    onClick={handleOpenExchangeProductModal}
                  >
                    Exchange Product
                  </button>
                )}
                {/* <div className={styles.selectContainer}>
                  <Select
                    bordered={false}
                    showSearch
                    placeholder="Select product RAM"
                    size="large"
                    optionFilterProp="label"
                    className={styles.selectBox}
                    onChange={ramChangeHandler}
                  >
                    {rams?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    bordered={false}
                    showSearch
                    placeholder="Select product size"
                    size="large"
                    optionFilterProp="label"
                    className={styles.selectBox}
                    onChange={sizeChangeHandler}
                  >
                    {sizes?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                  <Select
                    bordered={false}
                    showSearch
                    placeholder="Select product color"
                    size="large"
                    optionFilterProp="label"
                    className={styles.selectBox}
                    onChange={colorChangeHandler}
                  >
                    {colors?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div> */}
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleUpdate}>
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button className="btn btn-danger" onClick={handleDelete}>
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
