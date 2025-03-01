import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const VehicleDetailsForm = ({ onSubmit }) => {
  const [form] = Form.useForm();

  //   const handleFinish = (values) => {
  //     const files = {
  //       drivingLicenseFile: values.drivingLicenseFile?.file.originFileObj || null,
  //       vehicleRegistrationFile:
  //         values.vehicleRegistrationFile?.file.originFileObj || null,
  //       insuranceFile: values.insuranceFile?.file.originFileObj || null,
  //     };
  //     if (onSubmit) {
  //       onSubmit({ ...values, ...files });
  //     }
  //   };

  // const handleFileChange = (fieldName, info) => {
  //   const file = info.file.originFileObj;
  //   if (file) {
  //     form.setFieldsValue({ [fieldName]: file });
  //   }
  // };
  const handleFileChange = (fieldName, info) => {
    const file = info.file.originFileObj;
    if (file) {
      form.setFieldsValue({ [fieldName]: info.fileList });
    }
  };

  // const handleFinish = (values) => {
  //   const files = {
  //     drivingLicenseFile: values.drivingLicenseFile || null,
  //     vehicleRegistrationFile: values.vehicleRegistrationFile || null,
  //     insuranceFile: values.insuranceFile || null,
  //   };
  //   //console.log("json files", JSON.stringify(files));
  //   //console.log("files", files);

  //   if (onSubmit) {
  //     onSubmit(
  //       values,
  //       files,
  //     );
  //   }
  // };
  // const handleFinish = (values) => {
  //   const files = [
  //     "drivingLicenseFile",
  //     "vehicleRegistrationFile",
  //     "insuranceFile",
  //   ].reduce((acc, fieldName) => {
  //     const fileObj = values[fieldName]?.[0]?.originFileObj || null;
  //     return { ...acc, [fieldName]: fileObj };
  //   }, {});

  //   if (onSubmit) {
  //     //console.log("files",files)
  //     onSubmit(values, files);
  //   }
  // };

  // const handleFinish = (values) => {
  //   //console.log("values",values)
  //   const files = [
  //     "drivingLicenseFile",
  //     "vehicleRegistrationFile",
  //     "insuranceFile",
  //   ].reduce((acc, fieldName) => {
  //     const fileList = values[fieldName] || [];
  //     const fileObj = fileList[0]?.originFileObj || null;
  //     return { ...acc, [fieldName]: fileObj };
  //   }, {});

  //   if (onSubmit) {
  //     //console.log("Extracted files:", files);
  //     onSubmit(values, files);
  //   }
  // };
  const handleFinish = (values) => {
    const files = [
      "drivingLicenseFile",
      "vehicleRegistrationFile",
      "insuranceFile",
    ].reduce((acc, fieldName) => {
      let fileData = values[fieldName];
      if (fileData && !Array.isArray(fileData)) {
        fileData = [fileData]; // Convert object to array if not already an array
      }
      const fileList = fileData || [];
      const fileObj = fileList[0]?.originFileObj || null; // Extract first file
      return { ...acc, [fieldName]: fileObj };
    }, {});

    //console.log("Extracted files:", files); // Debugging output
    if (onSubmit) {
      onSubmit(values, files); // Pass form values and files to onSubmit
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        // background: "#f9f9f9",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Vehicle Details
      </h2>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          vehicleType: "",
        }}
      >
        {/* Vehicle Type */}
        <Form.Item
          name="vehicleType"
          label="Vehicle Type"
          rules={[{ required: true, message: "Please select a vehicle type" }]}
        >
          <Select placeholder="Select Vehicle Type">
            <Option value="Bike">Bike</Option>
            <Option value="Scooter">Scooter</Option>
            <Option value="Car">Car</Option>
            <Option value="Van">Van</Option>
            <Option value="Bicycle">Bicycle</Option>
          </Select>
        </Form.Item>

        {/* Vehicle Model */}
        <Form.Item
          name="vehicleModel"
          label="Vehicle Model"
          rules={[
            { required: true, message: "Please enter your vehicle model" },
          ]}
        >
          <Input placeholder="e.g., Honda Activa 5G" />
        </Form.Item>

        {/* Registration Number */}
        <Form.Item
          name="registrationNumber"
          label="Registration Number"
          rules={[
            {
              required: true,
              message: "Please enter your registration number",
            },
          ]}
        >
          <Input placeholder="e.g., KA-05-AB-1234" />
        </Form.Item>

        {/* Vehicle Color */}
        <Form.Item
          name="vehicleColor"
          label="Vehicle Color"
          rules={[
            { required: true, message: "Please enter your vehicle color" },
          ]}
        >
          <Input placeholder="e.g., Red" />
        </Form.Item>

        {/* Owner Name */}
        <Form.Item
          name="ownerName"
          label="Owner's Name"
          rules={[{ required: true, message: "Please enter the owner's name" }]}
        >
          <Input placeholder="e.g., John Doe" />
        </Form.Item>

        {/* Driving License Number */}
        <Form.Item
          name="drivingLicenseNumber"
          label="Driving License Number"
          rules={[
            {
              required: true,
              message: "Please enter your driving license number",
            },
          ]}
        >
          <Input placeholder="e.g., DL-1234-5678" />
        </Form.Item>

        {/* Insurance Provider */}
        <Form.Item
          name="insuranceProvider"
          label="Insurance Provider"
          rules={[
            { required: true, message: "Please enter your insurance provider" },
          ]}
        >
          <Input placeholder="e.g., ICICI Lombard" />
        </Form.Item>

        {/* Policy Number */}
        <Form.Item
          name="policyNumber"
          label="Policy Number"
          rules={[
            { required: true, message: "Please enter your policy number" },
          ]}
        >
          <Input placeholder="e.g., POL12345678" />
        </Form.Item>

        {/* Expiry Date */}
        <Form.Item
          name="expiryDate"
          label="Policy Expiry Date"
          rules={[
            { required: true, message: "Please select the policy expiry date" },
          ]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Driving License File */}
        {/* <Form.Item
          name="drivingLicenseFile"
          label="Upload Driving License"
          rules={[
            { required: true, message: "Please upload your driving license" },
          ]}
          valuePropName="fileList"
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={(info) => handleFileChange("drivingLicenseFile", info)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

        {/* Vehicle Registration File */}
        {/* <Form.Item
          name="vehicleRegistrationFile"
          label="Upload Vehicle Registration Certificate (RC)"
          rules={[
            {
              required: true,
              message: "Please upload your vehicle registration file",
            },
          ]}
          valuePropName="fileList"
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={(info) =>
              handleFileChange("vehicleRegistrationFile", info)
            }
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

        {/* Insurance File */}
        {/* <Form.Item
          name="insuranceFile"
          label="Upload Insurance Document"
          rules={[
            {
              required: true,
              message: "Please upload your insurance document",
            },
          ]}
          valuePropName="fileList"
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            onChange={(info) => handleFileChange("insuranceFile", info)}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item> */}

        {/* Driving License File Upload */}
        <Form.Item
          name="drivingLicenseFile"
          label="Upload Driving License"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Upload Driving License</Button>
          </Upload>
        </Form.Item>

        {/* Vehicle Registration File Upload */}
        <Form.Item
          name="vehicleRegistrationFile"
          label="Upload Vehicle Registration"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>
              Upload Vehicle Registration
            </Button>
          </Upload>
        </Form.Item>

        {/* Insurance File Upload */}
        <Form.Item
          name="insuranceFile"
          label="Upload Insurance File"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload beforeUpload={() => false} listType="picture">
            <Button icon={<UploadOutlined />}>Upload Insurance File</Button>
          </Upload>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            you are ready to go
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default VehicleDetailsForm;
