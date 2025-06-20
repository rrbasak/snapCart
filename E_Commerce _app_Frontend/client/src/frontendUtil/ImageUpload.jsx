import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import PropTypes from "prop-types";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({
  initialFileList = [],
  onChange,
  maxFiles = 8,
  onPreviewChange,
}) => {
  ////console.log("Uploading", initialFileList);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState(initialFileList);

  useEffect(() => {
    setFileList(initialFileList); 
  }, [initialFileList]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (onChange) onChange(newFileList);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
        customRequest={({ file, onSuccess }) => {
          // Prevent the default behavior of uploading
          onSuccess(); // Mock success callback
        }}
      >
        {fileList.length >= maxFiles ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => {
              setPreviewOpen(visible);
              if (onPreviewChange) onPreviewChange(visible);
            },
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

ImageUpload.propTypes = {
  initialFileList: PropTypes.array,
  onChange: PropTypes.func,
  maxFiles: PropTypes.number,
  onPreviewChange: PropTypes.func,
};

export default ImageUpload;
