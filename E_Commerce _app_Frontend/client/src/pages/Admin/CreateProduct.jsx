/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import toast from "react-hot-toast";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import { Select, TimePicker, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import styles from "../../styles/CreateProduct.module.css";
import CreateExchangeProductModal from "../../components/Modals/CreateExchangeProductModal";
import ImageUpload from "../../frontendUtil/ImageUpload";

dayjs.extend(customParseFormat);

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function CreateProduct() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [websitename, setWebsiteName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [subcategoryId, setSubCategoryId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [freederliverydate, setFreeDeliveryDate] = useState("");
  const [publishdate, setPublishDate] = useState("");
  const [fastestderliverydate, setFastestDeliveryDate] = useState("");
  const [fastestderliverytime, setFastestDeliveryTime] = useState("");
  const [primestarttime, setPrimeStartTime] = useState("");
  const [primeendtime, setPrimeEndTime] = useState("");
  const [availability, setAvailability] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [searchInputKeys, setSearchInputKeys] = useState([]);
  const [subCategory, setSubCategory] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExchangeProductModalOpen, setIsExchangeProductModalOpen] =
    useState(false);
  const [isSpecialDay, setIsSpecialDay] = useState("");
  const [specialDayOffer, setSpecialDayOffer] = useState("");
  const [isExchangeAvailable, setIsExchangeAvailable] = useState("");
  const [rams, setRAMs] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [material, setMaterial] = useState([]);
  const [style, setStyle] = useState([]);
  const [gender, setGender] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [ramoptions, setRamOptions] = useState([]);
  const [sizeoptions, setSizeOptions] = useState([]);
  const [coloroptions, setColorOptions] = useState([]);
  const [noofproductvariation, setNoofproductvariation] = useState();
  const [materialoptions, setMaterialOptions] = useState([
    { label: "Cotton", value: "cotton" },
    { label: "Wool", value: "wool" },
    { label: "Silk", value: "silk" },
    { label: "Polyester", value: "polyester" },
    { label: "Nylon", value: "nylon" },
  ]);
  const [styleoptions, setStyleOptions] = useState([
    { label: "Casual", value: "casual" },
    { label: "Formal", value: "formal" },
    { label: "Sporty", value: "sporty" },
    { label: "Elegant", value: "elegant" },
    { label: "Vintage", value: "vintage" },
  ]);

  const [genderoptions, setGenderOptions] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ]);

  const [ram, setRAM] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);

  const [ageGroup, setAgeGroup] = useState([]);
  const [ageGroupOptions, setAgeGroupOptions] = useState([
    { label: "Infants", value: "infants" },
    { label: "Toddlers", value: "toddlers" },
    { label: "Teens", value: "teens" },
  ]);

  const [heelType, setHeelType] = useState([]);
  const [heelTypeOptions, setHeelTypeOptions] = useState([
    { label: "Stiletto", value: "stiletto" },
    { label: "Wedge", value: "wedge" },
    { label: "Block", value: "block" },
  ]);

  const [weight, setWeight] = useState([]);
  const [weightOptions, setWeightOptions] = useState([
    { label: "Lightweight", value: "lightweight" },
    { label: "Medium", value: "medium" },
    { label: "Heavyweight", value: "heavyweight" },
  ]);

  const [capacity, setCapacity] = useState([]);
  const [capacityOptions, setCapacityOptions] = useState([
    { label: "20L", value: "20l" },
    { label: "40L", value: "40l" },
    { label: "60L", value: "60l" },
  ]);

  const [waterproof, setWaterproof] = useState([]);
  const [waterproofOptions, setWaterproofOptions] = useState([
    { label: "Water-resistant", value: "water-resistant" },
    { label: "Waterproof", value: "waterproof" },
    { label: "Not waterproof", value: "not-waterproof" },
  ]);

  const [durability, setDurability] = useState([]);
  const [durabilityOptions, setDurabilityOptions] = useState([
    { label: "High Durability", value: "high-durability" },
    { label: "Medium Durability", value: "medium-durability" },
    { label: "Low Durability", value: "low-durability" },
  ]);

  const [author, setAuthor] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([
    { label: "J.K. Rowling", value: "jk-rowling" },
    { label: "George R.R. Martin", value: "george-martin" },
    { label: "J.R.R. Tolkien", value: "tolkien" },
  ]);

  const [genre, setGenre] = useState([]);
  const [genreOptions, setGenreOptions] = useState([
    { label: "Fiction", value: "fiction" },
    { label: "Non-fiction", value: "non-fiction" },
    { label: "Fantasy", value: "fantasy" },
  ]);

  const [language, setLanguage] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([
    { label: "English", value: "english" },
    { label: "Spanish", value: "spanish" },
    { label: "French", value: "french" },
  ]);

  const [publisher, setPublisher] = useState([]);
  const [publisherOptions, setPublisherOptions] = useState([
    { label: "Penguin", value: "penguin" },
    { label: "HarperCollins", value: "harpercollins" },
    { label: "Random House", value: "random-house" },
  ]);

  const [pageCount, setPageCount] = useState([]);
  const [pageCountOptions, setPageCountOptions] = useState([
    { label: "100-200", value: "100-200" },
    { label: "200-400", value: "200-400" },
    { label: "400+", value: "400+" },
  ]);

  const [processor, setProcessor] = useState([]);
  const [processorOptions, setProcessorOptions] = useState([
    { label: "Intel i7", value: "intel-i7" },
    { label: "Intel i5", value: "intel-i5" },
    { label: "AMD Ryzen 7", value: "amd-ryzen-7" },
  ]);

  // State and options for Battery Capacity (Electronics)
  const [batteryCapacity, setBatteryCapacity] = useState([]);
  const [batteryCapacityOptions, setBatteryCapacityOptions] = useState([
    { label: "3000mAh", value: "3000mah" },
    { label: "4000mAh", value: "4000mah" },
    { label: "5000mAh", value: "5000mah" },
  ]);

  // State and options for Operating System (Electronics)
  const [operatingSystem, setOperatingSystem] = useState([]);
  const [operatingSystemOptions, setOperatingSystemOptions] = useState([
    { label: "Windows", value: "windows" },
    { label: "MacOS", value: "macos" },
    { label: "Android", value: "android" },
  ]);

  // State and options for Camera (Electronics)
  const [camera, setCamera] = useState([]);
  const [cameraOptions, setCameraOptions] = useState([
    { label: "12 MP", value: "12mp" },
    { label: "48 MP", value: "48mp" },
    { label: "108 MP", value: "108mp" },
  ]);

  // State and options for Network Connectivity (Electronics)
  const [networkConnectivity, setNetworkConnectivity] = useState([]);
  const [networkConnectivityOptions, setNetworkConnectivityOptions] = useState([
    { label: "4G", value: "4g" },
    { label: "5G", value: "5g" },
    { label: "Wi-Fi 6", value: "wifi-6" },
  ]);

  // State and options for Storage (Electronics)
  const [storage, setStorage] = useState([]);
  const [storageOptions, setStorageOptions] = useState([
    { label: "128GB", value: "128gb" },
    { label: "256GB", value: "256gb" },
    { label: "512GB", value: "512gb" },
  ]);

  // State and options for Graphics Card (Laptops)
  const [graphicsCard, setGraphicsCard] = useState([]);
  const [graphicsCardOptions, setGraphicsCardOptions] = useState([
    { label: "NVIDIA GTX 1660", value: "nvidia-gtx-1660" },
    { label: "NVIDIA RTX 3060", value: "nvidia-rtx-3060" },
    { label: "AMD Radeon RX 5600M", value: "amd-rx-5600m" },
  ]);

  // State and options for Ports (Laptops)
  const [ports, setPorts] = useState([]);
  const [portsOptions, setPortsOptions] = useState([
    { label: "USB-C", value: "usb-c" },
    { label: "HDMI", value: "hdmi" },
    { label: "Thunderbolt", value: "thunderbolt" },
  ]);

  // State and options for Type (Laptops/Photography)
  const [type, setType] = useState([]);
  const [typeOptions, setTypeOptions] = useState([
    { label: "Ultrabook", value: "ultrabook" },
    { label: "Gaming", value: "gaming" },
    { label: "DSLR", value: "dslr" },
  ]);

  // State and options for Lens Type (Cameras)
  const [lensType, setLensType] = useState([]);
  const [lensTypeOptions, setLensTypeOptions] = useState([
    { label: "Prime", value: "prime" },
    { label: "Zoom", value: "zoom" },
    { label: "Telephoto", value: "telephoto" },
  ]);

  // State and options for Connectivity (Electronics)
  const [connectivity, setConnectivity] = useState([]);
  const [connectivityOptions, setConnectivityOptions] = useState([
    { label: "Bluetooth", value: "bluetooth" },
    { label: "Wi-Fi", value: "wifi" },
    { label: "NFC", value: "nfc" },
  ]);

  // State and options for Display Type (Cameras/Devices)
  const [displayType, setDisplayType] = useState([]);
  const [displayTypeOptions, setDisplayTypeOptions] = useState([
    { label: "LCD", value: "lcd" },
    { label: "OLED", value: "oled" },
    { label: "AMOLED", value: "amoled" },
  ]);

  // State and options for Noise Cancellation (Audio Devices)
  const [noiseCancellation, setNoiseCancellation] = useState([]);
  const [noiseCancellationOptions, setNoiseCancellationOptions] = useState([
    { label: "Active", value: "active" },
    { label: "Passive", value: "passive" },
    { label: "None", value: "none" },
  ]);

  // State and options for Camera Type (Cameras)
  const [cameraType, setCameraType] = useState([]);
  const [cameraTypeOptions, setCameraTypeOptions] = useState([
    { label: "Mirrorless", value: "mirrorless" },
    { label: "DSLR", value: "dslr" },
    { label: "Point and Shoot", value: "point-and-shoot" },
  ]);

  const [priceVariants, setPriceVariants] = useState([]);

  const [currentCombination, setCurrentCombination] = useState({
    ram: "",
    storage: "",
    color: "",
    processor: "",
    price: "",
    connectivity: "",
    displayType: "",
    noiseCancellation: "",
    cameraType: "",
    size: "",
    material: "",
    style: "",
    gender: "",
    heel: "",
    capacity: "",
    waterproof: "",
    durability: "",
    lensType: "",
    ageGroup: "",
    weight: "",
    author: "",
    genre: "",
    language: "",
    publisher: "",
    pageCount: "",
    batteryCapacity: "",
    operatingSystem: "",
    camera: "",
    networkConnectivity: "",
    graphicsCard: "",
    ports: "",
    type: "",
  });

  const handleInputChange = (key, value) => {
    setCurrentCombination((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleAddCombination = () => {
    setPriceVariants((prevState) => [...prevState, currentCombination]);
    setCurrentCombination({
      ram: "",
      storage: "",
      color: "",
      processor: "",
      price: "",
      connectivity: "",
      displayType: "",
      noiseCancellation: "",
      cameraType: "",
      size: "",
      material: "",
      style: "",
      gender: "",
      heel: "",
      capacity: "",
      waterproof: "",
      durability: "",
      lensType: "",
      ageGroup: "",
      weight: "",
      author: "",
      genre: "",
      language: "",
      publisher: "",
      pageCount: "",
      batteryCapacity: "",
      operatingSystem: "",
      camera: "",
      networkConnectivity: "",
      graphicsCard: "",
      ports: "",
      type: "",
    });
    setCameraType([]);
    setNetworkConnectivity([]);
    setCamera([]);
    setOperatingSystem([]);
    setBatteryCapacity([]);
    setProcessor([]);
    // setPublishDate(null);
    setPageCount([]);
    setPublisher([]);
    setLanguage([]);
    setGenre([]);
    setAuthor([]);
    setWaterproof([]);
    setCapacity([]);
    setWeight([]);
    setHeelType([]);
    setAgeGroup([]);
    setGender([]);
    setSize([]);
    setMaterial([]);
    setColor([]);
    setStyle([]);
    setRAM([]);
    setNoiseCancellation([]);
    setDisplayType([]);
    setConnectivity([]);
    setLensType([]);
    setType([]);
    setPorts([]);
    setGraphicsCard([]);
    setStorage([]);

    toast.success(
      `${priceVariants.length} product variation added successfully`
    );
  };

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

  // Fetch categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.categories);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };
  const getAllRAM = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product-ram/get-product-ram`);
      if (data?.success) {
        setRAMs(data?.ram);
        setRamOptions(
          data?.ram?.map((ram) => ({
            label: ram.name,
            value: ram.name,
          }))
        );
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };
  const getAllSize = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product-size/get-product-size`);
      if (data?.success) {
        setSizes(data?.size);
        setSizeOptions(
          data?.size?.map((size) => ({
            label: size.name,
            value: size.name,
          }))
        );
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };
  const getAllColor = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product-color/get-product-color`
      );
      if (data?.success) {
        setColors(data?.color);
        setColorOptions(
          data?.color?.map((color) => ({
            label: color.name,
            value: color.name,
          }))
        );
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };

  // Handle product creation
  const handleCreate = async (e) => {
    //console.log(subCategory);
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("brand", brand);
      productData.append("websitename", websitename);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      // productData.append("photo", photo);
      // photos.forEach((photo) => productData.append("photo", photo));
      photos.forEach((photo) => {
        if (photo.originFileObj) {
          productData.append("photo", photo.originFileObj);
        }
      });
      productData.append("category", category);
      productData.append("ram", ram);
      productData.append("size", size);
      productData.append("color", color);
      productData.append("priceVariants", JSON.stringify(priceVariants));
      //console.log(subcategoryId);
      if (subcategoryId) {
        productData.append("subcategory", subcategoryId);
      }
      productData.append("subcategoryName", subCategory.subname);
      productData.append("freedeliveryDate", freederliverydate);
      productData.append("fastestdeliverydate", fastestderliverydate);
      productData.append("fastestdeliverytime", fastestderliverytime);
      // productData.append("primestarttime", primestarttime);
      // productData.append("primeendtime", primeendtime);
      productData.append("publishdate", publishdate);
      productData.append("availableInStock", availability);
      // productData.append("specialty", specialty);
      productData.append("search", searchInputKeys);
      productData.append("specialDayTag", isSpecialDay);
      if (specialDayOffer === null || specialDayOffer === "") {
        productData.append("specialDayOffer", 0);
      } else {
        productData.append("specialDayOffer", specialDayOffer);
      }

      productData.append("exchangeavailable", isExchangeAvailable);
      //console.log("productData", productData);
      for (let pair of productData.entries()) {
        //console.log(pair[0] + ": " + pair[1]);
      }

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllRAM();
    getAllSize();
    getAllColor();
  }, []);

  //console.log("here",priceVariants);
  const ondFreeDeliveryateChange = (date, dateString) => {
    //console.log(dateString);
    setFreeDeliveryDate(dateString);
  };
  const ondPublishChange = (date, dateString) => {
    //console.log(dateString);
    setPublishDate(dateString);
  };
  const ondFastestDeliveryateChange = (date, dateString) => {
    setFastestDeliveryDate(dateString);
  };
  const onFastestTimeChange = (time, timeString) => {
    setFastestDeliveryTime(timeString);
  };
  const onPrimeTimeChange = (time, timeString) => {
    setPrimeStartTime(timeString[0]);
    setPrimeEndTime(timeString[1]);
  };

  const handleChange = (value) => {
    setSearchInputKeys([...value]);
  };

  const onSearch = (value) => {
    //console.log("search:", value);
  };

  const categoryChangeHandler = (value) => {
    setCategory(value);
    setSubCategory();
    getSubCategoriesBaseOnCAtegory(value);
  };
  const ramChangeHandler = (value) => {
    handleInputChange("ram", value);
    setRAM(value);
  };
  const sizeChangeHandler = (value) => {
    // const sizesArray = value.split(",");
    // setSize((prevSizes) => [...prevSizes, ...sizesArray]);
    handleInputChange("size", value);
    setSize(value);
  };
  const colorChangeHandler = (value) => {
    // const colorsArray = value.split(",");
    // setColor((prevColors) => [...prevColors, ...colorsArray]);
    handleInputChange("color", value);
    setColor(value);
  };
  const materialChangeHandler = (value) => {
    handleInputChange("material", value);
    setMaterial(value);
  };
  const styleChangeHandler = (value) => {
    handleInputChange("style", value);
    setStyle(value);
  };
  const genderChangeHandler = (value) => {
    handleInputChange("gender", value);
    setGender(value);
  };
  const ageGroupChangeHandler = (value) => {
    handleInputChange("ageGroup", value);
    setAgeGroup(value);
  };

  const heelTypeChangeHandler = (value) => {
    handleInputChange("heel", value);
    setHeelType(value);
  };

  const weightChangeHandler = (value) => {
    handleInputChange("weight", value);
    setWeight(value);
  };

  const capacityChangeHandler = (value) => {
    handleInputChange("capacity", value);
    setCapacity(value);
  };

  const waterproofChangeHandler = (value) => {
    handleInputChange("waterproof", value);
    setWaterproof(value);
  };

  const durabilityChangeHandler = (value) => {
    handleInputChange("durability", value);
    setDurability(value);
  };

  const authorChangeHandler = (value) => {
    handleInputChange("author", value);
    setAuthor(value);
  };

  const genreChangeHandler = (value) => {
    handleInputChange("genre", value);
    setGenre(value);
  };

  const languageChangeHandler = (value) => {
    handleInputChange("language", value);
    setLanguage(value);
  };

  const publisherChangeHandler = (value) => {
    handleInputChange("publisher", value);
    setPublisher(value);
  };

  const pageCountChangeHandler = (value) => {
    handleInputChange("pageCount", value);
    setPageCount(value);
  };

  const processorChangeHandler = (value) => {
    handleInputChange("processor", value);
    setProcessor(value);
  };

  const batteryCapacityChangeHandler = (value) => {
    handleInputChange("batteryCapacity", value);
    setBatteryCapacity(value);
  };

  const operatingSystemChangeHandler = (value) => {
    handleInputChange("operatingSystem", value);
    setOperatingSystem(value);
  };

  const cameraChangeHandler = (value) => {
    handleInputChange("camera", value);
    setCamera(value);
  };

  const networkConnectivityChangeHandler = (value) => {
    handleInputChange("networkConnectivity", value);
    setNetworkConnectivity(value);
  };

  const storageChangeHandler = (value) => {
    handleInputChange("storage", value);
    setStorage(value);
  };

  const graphicsCardChangeHandler = (value) => {
    handleInputChange("graphicsCard", value);
    setGraphicsCard(value);
  };

  const portsChangeHandler = (value) => {
    handleInputChange("ports", value);
    setPorts(value);
  };

  const typeChangeHandler = (value) => {
    handleInputChange("type", value);
    setType(value);
  };

  const lensTypeChangeHandler = (value) => {
    handleInputChange("lensType", value);
    setLensType(value);
  };

  const connectivityChangeHandler = (value) => {
    handleInputChange("connectivity", value);
    setConnectivity(value);
  };

  const displayTypeChangeHandler = (value) => {
    handleInputChange("displayType", value);
    setDisplayType(value);
  };

  const noiseCancellationChangeHandler = (value) => {
    handleInputChange("noiseCancellation", value);
    setNoiseCancellation(value);
  };

  const cameraTypeChangeHandler = (value) => {
    handleInputChange("cameraType", value);
    setCameraType(value);
  };

  const getSubCategoriesBaseOnCAtegory = async (value) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/subcategory/get-subcategory-oncategory/${value}`
      );
      if (data?.success) {
        setSubCategories(data?.sub_categories_based_on_category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting sub category");
    }
  };

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

  // setRamOptions(
  //   rams?.map((ram) => ({
  //     label: ram.name,
  //     value: ram.name,
  //   }))
  // );
  const handleSubCategoryChange = (sc_id) => {
    //console.log(sc_id);
    const selectedSubCategoryObject = subCategories.find(
      (sc) => sc._id === sc_id
    );
    //console.log(selectedSubCategoryObject);
    setSubCategory(selectedSubCategoryObject);
  };
  //console.log("photos", photos);
  return (
    <>
      <CreateExchangeProductModal
        isModalOpen={isExchangeProductModalOpen}
        handleOk={handleOkExchangeProductModal}
        handleCancel={handleCancelExchangeProductModal}
        categories={categories}
        subCategories={subCategories}
        selectedCategory={category}
        selectedSubCategory={subCategory}
      />
      <Layout title={"Dashboard - Create Product"}>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1>Create Product</h1>
              <div className={`m-1 w-75`}>
                {/* Category Select */}
                <Select
                  bordered={false}
                  showSearch
                  placeholder="Select a category"
                  size="large"
                  optionFilterProp="label"
                  className={styles.selectWrapper}
                  onChange={(value) => {
                    categoryChangeHandler(value);
                  }}
                  onSearch={onSearch}
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
                  optionFilterProp="label"
                  className={styles.selectWrapper}
                  onChange={handleSubCategoryChange}
                >
                  {subCategories?.map((sc) => (
                    <Option key={sc._id} value={sc._id}>
                      {sc.subname}
                    </Option>
                  ))}
                </Select>

                {/* Photo Upload */}
                {/* <div className={styles.photoUpload}>
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
                {/* Photo Upload */}
                {/* <div className={styles.photoUpload}>
                  <label className="btn btn-outline-secondary col-md-12">
                    Upload Photos
                    <input
                      type="file"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        const filesArray = Array.from(e.target.files);
                        setPhotos((prevPhotos) => [
                          ...prevPhotos,
                          ...filesArray,
                        ]);
                      }}
                      hidden
                    />
                  </label>
                </div> */}
                {/* Image Upload Component */}
                <div className={styles.photoUpload}>
                  <ImageUpload
                    initialFileList={photos}
                    onChange={(newFileList) => setPhotos(newFileList)}
                    maxFiles={8}
                  />
                </div>

                {/* {photo && (
                  <div className={`text-center ${styles.photoUpload}`}>
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )} */}
                {/* {photos.length > 0 && (
                  <div className={styles.photoPreviewContainer}>
                    {photos.map((photo, index) => (
                      <div key={index} className={styles.photoWrapper}>
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`product_photo_${index}`}
                          height={"200px"}
                          className="img img-responsive"
                        />
                        <button
                          type="button"
                          className={styles.removePhotoButton}
                          onClick={() => {
                            setPhotos(photos.filter((_, i) => i !== index));
                          }}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )} */}

                {/* Product Details */}
                <div className={styles.namebrandContainer}>
                  <input
                    type="text"
                    value={name}
                    placeholder="Product name"
                    className="form-control"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    type="text"
                    value={brand}
                    placeholder="Brand name"
                    className="form-control"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className={styles.namebrandContainer}>
                  <input
                    type="url"
                    value={websitename}
                    placeholder="Brand link"
                    className="form-control"
                    onChange={(e) => setWebsiteName(e.target.value)}
                  />
                </div>

                <div className={styles.productDetails}>
                  <textarea
                    value={description}
                    placeholder="Write a description"
                    className="form-control"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className={styles.productDetails}>
                  <input
                    type="number"
                    value={price}
                    placeholder="Write a price"
                    className="form-control"
                    onChange={(e) => {
                      setPrice(e.target.value);
                      handleInputChange("price", e.target.value);
                    }}
                  />
                </div>
                <div className={styles.productDetails}>
                  <input
                    type="number"
                    value={quantity}
                    placeholder="Write a quantity"
                    className="form-control"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                {/* <Select
                  bordered={false}
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setShipping(value)}
                  onSearch={onSearch}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select> */}

                {/* Delivery Dates and Times */}
                <div className={styles.deliveryContainer}>
                  <DatePicker
                    placeholder="Free Delivery Date"
                    onChange={ondFreeDeliveryateChange}
                    className={styles.datePicker}
                  />
                  <DatePicker
                    placeholder="Fastest Delivery Date"
                    onChange={ondFastestDeliveryateChange}
                    className={styles.datePicker}
                  />
                  <TimePicker
                    placeholder="Fastest Delivery Time"
                    onChange={onFastestTimeChange}
                    className={styles.timePicker}
                  />
                </div>
                {/* Prime Delivery */}
                {/* <TimePicker.RangePicker
                  size="large"
                  className={styles.datePickerWrapper}
                  onChange={onPrimeTimeChange}
                  placeholder={["Prime Start Time", "Prime End Time"]}
                /> */}

                {/* Availability */}
                <Select
                  bordered={false}
                  placeholder="Availability"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setAvailability(value)}
                  onSearch={onSearch}
                >
                  <Option value="In Stock">In Stock</Option>
                  <Option value="Out Of Stock">Out Of Stock</Option>
                </Select>

                {/* Specialty */}
                {/* <Select
                  bordered={false}
                  placeholder="Specialty"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setSpecialty(value)}
                  onSearch={onSearch}
                >
                  <Option value="none">None</Option>
                  <Option value="toprated">Top Rated</Option>
                  <Option value="mostsold">Most Sold</Option>
                  <Option value="bestseller">Best Seller</Option>
                </Select> */}

                {/* Is Special Day */}
                <Select
                  bordered={false}
                  placeholder="Is Prime day"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setIsSpecialDay(value)}
                  onSearch={onSearch}
                >
                  <Option value="true">Yes</Option>
                  <Option value="false">No</Option>
                </Select>
                {isSpecialDay === "true" && (
                  <div className={styles.productDetails}>
                    <input
                      type="number"
                      value={specialDayOffer}
                      placeholder="Special Day Offer"
                      className="form-control"
                      onChange={(e) => setSpecialDayOffer(e.target.value)}
                    />
                  </div>
                )}
                {/* Search Keywords */}
                <div className={styles.selectWrapper}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Enter the search keywords"
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    options={options}
                  />
                </div>
                {/* Is Exchange Available */}
                <Select
                  bordered={false}
                  placeholder="Is Exchange Available"
                  size="large"
                  showSearch
                  className={styles.selectWrapper}
                  onChange={(value) => setIsExchangeAvailable(value)}
                  onSearch={onSearch}
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
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select product RAM"
                    className={styles.selectBox}
                    onChange={ramChangeHandler}
                    options={ramoptions}
                    value={ram}
                  />
                  {/* {rams?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))} */}

                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select product size"
                    className={styles.selectBox}
                    onChange={sizeChangeHandler}
                    options={sizeoptions}
                    value={size}
                  />

                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select product color"
                    className={styles.selectBox}
                    onChange={colorChangeHandler}
                    options={coloroptions}
                    value={color}
                  >
                    {/* {colors?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))} */}
                  </Select>
                </div>

                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select product material"
                    className={styles.selectBox}
                    onChange={materialChangeHandler}
                    options={materialoptions}
                    value={material}
                  />
                  {/* {rams?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))} */}

                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select product style"
                    className={styles.selectBox}
                    onChange={styleChangeHandler}
                    options={styleoptions}
                    value={style}
                  />

                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select gender"
                    className={styles.selectBox}
                    onChange={genderChangeHandler}
                    options={genderoptions}
                    value={gender}
                  >
                    {/* {colors?.map((c) => (
                      <Option key={c._id} value={c.name}>
                        {c.name}
                      </Option>
                    ))} */}
                  </Select>
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Age Group"
                    className={styles.selectBox}
                    onChange={ageGroupChangeHandler}
                    options={ageGroupOptions}
                    value={ageGroup}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Heel Type"
                    className={styles.selectBox}
                    onChange={heelTypeChangeHandler}
                    options={heelTypeOptions}
                    value={heelType}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Weight"
                    className={styles.selectBox}
                    onChange={weightChangeHandler}
                    options={weightOptions}
                    value={weight}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Capacity"
                    className={styles.selectBox}
                    onChange={capacityChangeHandler}
                    options={capacityOptions}
                    value={capacity}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Waterproof Level"
                    className={styles.selectBox}
                    onChange={waterproofChangeHandler}
                    options={waterproofOptions}
                    value={waterproof}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Durability Level"
                    className={styles.selectBox}
                    onChange={durabilityChangeHandler}
                    options={durabilityOptions}
                    value={author}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Author"
                    className={styles.selectBox}
                    onChange={authorChangeHandler}
                    options={authorOptions}
                    value={author}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Genre"
                    className={styles.selectBox}
                    onChange={genreChangeHandler}
                    options={genreOptions}
                    value={genre}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Language"
                    className={styles.selectBox}
                    onChange={languageChangeHandler}
                    options={languageOptions}
                    value={language}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Publisher"
                    className={styles.selectBox}
                    onChange={publisherChangeHandler}
                    options={publisherOptions}
                    value={publisher}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Page Count"
                    className={styles.selectBox}
                    onChange={pageCountChangeHandler}
                    options={pageCountOptions}
                    value={pageCount}
                  />
                  <DatePicker
                    placeholder="Publish Date"
                    onChange={ondPublishChange}
                    className={styles.datePicker}
                    value={publishdate ? dayjs(publishdate) : null}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Processor"
                    className={styles.selectBox}
                    onChange={processorChangeHandler}
                    options={processorOptions}
                    value={processor}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Battery Capacity"
                    className={styles.selectBox}
                    onChange={batteryCapacityChangeHandler}
                    options={batteryCapacityOptions}
                    value={batteryCapacity}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Operating System"
                    className={styles.selectBox}
                    onChange={operatingSystemChangeHandler}
                    options={operatingSystemOptions}
                    value={operatingSystem}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Camera"
                    className={styles.selectBox}
                    onChange={cameraChangeHandler}
                    options={cameraOptions}
                    value={camera}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Network Connectivity"
                    className={styles.selectBox}
                    onChange={networkConnectivityChangeHandler}
                    options={networkConnectivityOptions}
                    value={networkConnectivity}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Storage"
                    className={styles.selectBox}
                    onChange={storageChangeHandler}
                    options={storageOptions}
                    value={storage}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Graphics Card"
                    className={styles.selectBox}
                    onChange={graphicsCardChangeHandler}
                    options={graphicsCardOptions}
                    value={graphicsCard}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Ports"
                    className={styles.selectBox}
                    onChange={portsChangeHandler}
                    options={portsOptions}
                    value={ports}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Type"
                    className={styles.selectBox}
                    onChange={typeChangeHandler}
                    options={typeOptions}
                    value={type}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Lens Type"
                    className={styles.selectBox}
                    onChange={lensTypeChangeHandler}
                    options={lensTypeOptions}
                    value={lensType}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Connectivity"
                    className={styles.selectBox}
                    onChange={connectivityChangeHandler}
                    options={connectivityOptions}
                    value={connectivity}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Display Type"
                    className={styles.selectBox}
                    onChange={displayTypeChangeHandler}
                    options={displayTypeOptions}
                    value={displayType}
                  />
                </div>
                <div className={styles.selectContainer}>
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Noise Cancellation"
                    className={styles.selectBox}
                    onChange={noiseCancellationChangeHandler}
                    options={noiseCancellationOptions}
                    value={noiseCancellation}
                  />
                  <Select
                    mode="tags"
                    size="large"
                    placeholder="Select Camera Type"
                    className={styles.selectBox}
                    onChange={cameraTypeChangeHandler}
                    options={cameraTypeOptions}
                    value={cameraType}
                  />
                </div>
                {/* Submit Button */}
                <div className="my-2">
                  <button
                    className="btn btn-success"
                    onClick={handleAddCombination}
                    type="button"
                  >
                    Add Combination
                  </button>
                </div>
                <div className="my-2">
                  <button
                    className="btn btn-primary"
                    onClick={handleCreate}
                    type="button"
                  >
                    CREATE PRODUCT
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
