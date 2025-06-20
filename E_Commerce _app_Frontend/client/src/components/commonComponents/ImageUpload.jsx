import React, { useEffect, useState } from "react";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const ImageUpload = ({ profilePhoto, setProfilePhoto }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (profilePhoto && !fileList.length) {
      setFileList([
        {
          uid: "-1",
          name: "profile.jpg",
          status: "done",
          url: profilePhoto,
        },
      ]);
    }
  }, [profilePhoto]); // ✅ Only runs when profilePhoto changes

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "Image Preview");
  };

  const uploadPhoto = async (file) => {
    try {
      if (!file || !file.originFileObj) return; // ✅ Prevent unnecessary API calls

      const formData = new FormData();
      formData.append("photo", file.originFileObj);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/upload-pic`,
        formData
      );

      if (data.success) {
        const updatedUser = data.updatedUser;

        const base64Image = `data:${
          updatedUser.photo.contentType
        };base64,${btoa(
          String.fromCharCode(...new Uint8Array(updatedUser.photo.data.data))
        )}`;

        setProfilePhoto(base64Image);
        setFileList([
          {
            uid: "-1",
            name: "profile.jpg",
            status: "done",
            url: base64Image,
          },
        ]);

        toast.success("Profile picture uploaded successfully! 🎉");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong during the photo upload.");
    }
  };

  const handleChange = async ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;
      if (!file) return;

      // Validate file type
      const allowedTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type! Only JPG, PNG, and GIF are allowed.");
        return;
      }

      // Validate file size
      if (file.size / 1024 / 1024 > 1) {
        toast.error("Image must be smaller than 1MB!");
        return;
      }

      setFileList(newFileList);
      uploadPhoto(newFileList[0]); // Upload only valid files
    } else {
      setFileList([]);
    }
  };

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length >= 1 ? null : <PlusOutlined />}
      </Upload>

      {/* Image Preview Modal */}
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUpload;
