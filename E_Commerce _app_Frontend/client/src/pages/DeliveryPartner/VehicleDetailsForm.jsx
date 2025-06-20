import React, { useEffect, useState } from "react";
import { Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import styles from "../../../src/styles/VehicleDetails.module.css";
import { DirectionsBike, TwoWheeler } from "@mui/icons-material";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { motion } from "framer-motion";
import { CircularProgress } from "@mui/material";

const { Option } = Select;

const VehicleDetailsForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [selectedVehicle, setSelectedVehicle] = useState("Bike");
  const [startLoading, setStartLoading] = useState(false);

  const vehicleIcons = {
    Bike: <TwoWheeler fontSize="large" className={styles.vehicleIcon} />,
    Scooter: (
      <DeliveryDiningIcon fontSize="large" className={styles.vehicleIcon} />
    ),
    Bicycle: <DirectionsBike fontSize="large" className={styles.vehicleIcon} />,
  };

  // const handleFileChange = (fieldName, info) => {
  //   const file = info.file.originFileObj;
  //   if (file) {
  //     form.setFieldsValue({ [fieldName]: info.fileList });
  //   }
  // };

  const handleFinish = async (values) => {
    setStartLoading(true);
    const files = [
      "drivingLicenseFile",
      "vehicleRegistrationFile",
      "insuranceFile",
    ].reduce((acc, fieldName) => {
      let fileData = values[fieldName];
      if (fileData && !Array.isArray(fileData)) {
        fileData = [fileData];
      }
      const fileList = fileData || [];
      const fileObj = fileList[0]?.originFileObj || null;
      return { ...acc, [fieldName]: fileObj };
    }, {});

    console.log("Extracted files:", files);
    try {
      if (onSubmit) {
        await onSubmit(values, files);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setStartLoading(false);
    }
  };
  useEffect(() => {
    form.setFieldsValue({ vehicleType: "Bike" });
  }, []);
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.title}>Vehicle Details</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ vehicleType: "" }}
        requiredMark="optional"
      >
        {/* Vehicle Type */}
        <Form.Item
          name="vehicleType"
          label={
            <span>
              Vehicle Type<span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          className={styles.formLabel}
          rules={[{ required: true, message: "Please select a vehicle type" }]}
        >
          <div className={styles.selectWrapper}>
            <motion.div
              key={selectedVehicle}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className={styles.iconWrapper}
            >
              {vehicleIcons[selectedVehicle]}
            </motion.div>

            {/* Select Dropdown */}
            <Select
              placeholder="Select Vehicle Type"
              className={styles.selectField}
              onChange={(value) => {
                setSelectedVehicle(value);
                form.setFieldsValue({ vehicleType: value });
                form.validateFields(["vehicleType"]);
              }}
              defaultValue="Bike"
            >
              <Option value="Bike">Bike</Option>
              <Option value="Scooter">Scooter</Option>
              <Option value="Bicycle">Bicycle</Option>
            </Select>
          </div>
        </Form.Item>

        {/* Vehicle Model */}
        <Form.Item
          name="vehicleModel"
          label={
            <span>
              Vehicle Model
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            { required: true, message: "Please enter your vehicle model" },
          ]}
          className={styles.formLabel}
        >
          <Input
            placeholder="e.g., Honda Activa 5G"
            className={styles.inputField}
          />
        </Form.Item>

        <Form.Item
          name="registrationNumber"
          label={
            <span>
              Registration Number
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your registration number",
            },
          ]}
          className={styles.formLabel}
        >
          <div className={styles.inputWrapper}>
            <Input
              placeholder="e.g., KA-05-AB-1234"
              className={styles.inputField}
            />
          </div>
        </Form.Item>

        {/* Vehicle Color */}
        <Form.Item
          name="vehicleColor"
          label={
            <span>
              Vehicle Color
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            { required: true, message: "Please enter your vehicle color" },
          ]}
          className={styles.formLabel}
        >
          <Input placeholder="e.g., Red" className={styles.inputField} />
        </Form.Item>

        {/* Owner Name */}
        <Form.Item
          name="ownerName"
          label={
            <span>
              Owner's Name
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[{ required: true, message: "Please enter the owner's name" }]}
          className={styles.formLabel}
        >
          <Input placeholder="e.g., John Doe" className={styles.inputField} />
        </Form.Item>

        {/* Driving License Number */}
        <Form.Item
          name="drivingLicenseNumber"
          label={
            <span>
              Driving License Number
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please enter your driving license number",
            },
          ]}
          className={styles.formLabel}
        >
          <Input
            placeholder="e.g., DL-1234-5678"
            className={styles.inputField}
          />
        </Form.Item>

        {/* Insurance Provider */}
        <Form.Item
          name="insuranceProvider"
          label={
            <span>
              Insurance Provider
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            { required: true, message: "Please enter your insurance provider" },
          ]}
          className={styles.formLabel}
        >
          <Input
            placeholder="e.g., ICICI Lombard"
            className={styles.inputField}
          />
        </Form.Item>

        {/* Policy Number */}
        <Form.Item
          name="policyNumber"
          label={
            <span>
              Policy Number
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            { required: true, message: "Please enter your policy number" },
          ]}
          className={styles.formLabel}
        >
          <Input
            placeholder="e.g., POL12345678"
            className={styles.inputField}
          />
        </Form.Item>

        {/* Expiry Date */}
        <Form.Item
          name="expiryDate"
          label={
            <span>
              Policy Expiry Date
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            </span>
          }
          rules={[
            { required: true, message: "Please select the policy expiry date" },
          ]}
          className={styles.formLabel}
        >
          <DatePicker className={styles.inputField} />
        </Form.Item>

        {/* File Uploads */}
        <Form.Item
          name="drivingLicenseFile"
          label="Upload Driving License"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          className={styles.formLabel}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            className={styles.uploadField}
          >
            <Button icon={<UploadOutlined />}>
              Upload Driving License (Max: 1)
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="vehicleRegistrationFile"
          label="Upload Vehicle Registration"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          className={styles.formLabel}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            className={styles.uploadField}
          >
            <Button icon={<UploadOutlined />}>
              Upload Vehicle Registration (Max: 1)
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item
          name="insuranceFile"
          label="Upload Insurance File"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          className={styles.formLabel}
        >
          <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            beforeUpload={() => false}
            listType="picture"
            maxCount={1}
            className={styles.uploadField}
          >
            <Button icon={<UploadOutlined />}>
              Upload Insurance File (Max: 1)
            </Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          {/* <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
          >
            Submit
          </Button> */}
          <Button
            type="primary"
            htmlType="submit"
            className={styles.submitButton}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: startLoading ? "not-allowed" : "pointer",
              backgroundColor: "#1677ff",
              borderColor: "#1677ff",
              opacity: startLoading ? 0.7 : 1,
            }}
            disabled={startLoading}
          >
            {startLoading ? (
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <CircularProgress size={20} style={{ color: "white" }} />
                <span style={{ color: "white" }}>Submitting...</span>
              </div>
            ) : (
              <span>Submit</span>
            )}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VehicleDetailsForm;
