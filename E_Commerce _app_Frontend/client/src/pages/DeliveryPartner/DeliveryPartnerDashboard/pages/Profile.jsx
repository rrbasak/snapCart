import { useState } from "react";

import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";

import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";

import BgProfile from "../assets/images/bg-profile.jpg";
import profilavatar from "../assets/images/face-1.jpg";
import convesionImg from "../assets/images/face-3.jpg";
import convesionImg2 from "../assets/images/face-4.jpg";
import convesionImg3 from "../assets/images/face-5.jpeg";
import convesionImg4 from "../assets/images/face-6.jpeg";
import convesionImg5 from "../assets/images/face-2.jpg";
import project1 from "../assets/images/home-decor-1.jpeg";
import project2 from "../assets/images/home-decor-2.jpeg";
import project3 from "../assets/images/home-decor-3.jpeg";
import { useAuth } from "../../../../context/auth";
import { Form, Modal, Input } from "antd";
import axios from "axios";

function Profile() {
  const [auth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const handleEditClick = () => {
    setIsModalOpen(true);
    form.setFieldsValue({
      fullName: auth?.user?.name,
      mobile: auth?.user?.phone,
      email: auth?.user?.email,
      location: auth?.user?.address,
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API}/api/v1/user/update-profile`, values);
      if (response.status === 200) {
        message.success("Profile updated successfully");
        // Optionally update auth state with new user data
        // setAuth({ ...auth, user: response.data.user });
      }
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to update profile. Please try again.");
    }
  };
  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];
  return (
    <>
      <div
        className="profile-nav-bg"
        style={{ backgroundImage: `url(${BgProfile})` }}
      ></div>

      <Card
        className="card-profile-head"
        bodyStyle={{ display: "none" }}
        title={
          <Row justify="space-between" align="middle" gutter={[24, 0]}>
            <Col span={24} md={12} className="col-info">
              <Avatar.Group>
                <Avatar size={74} shape="square" src={profilavatar} />
                <div className="avatar-info">
                  <h4 className="font-semibold m-0">{auth?.user?.name}</h4>
                </div>
              </Avatar.Group>
            </Col>
          </Row>
        }
      ></Card>

      <Row gutter={[24, 0]}>
        <Col span={24} md={24} className="mb-24">
          <Card
            bordered={false}
            title={<h6 className="font-semibold m-0">Profile Information</h6>}
            className="header-solid h-full card-profile-information"
            extra={
              <Button type="link" onClick={handleEditClick}>
                {pencil}
              </Button>
            }
            bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
          >
            <Descriptions>
              <Descriptions.Item label="Full Name" span={3}>
                {auth?.user?.name}
              </Descriptions.Item>
              <Descriptions.Item label="Mobile" span={3}>
                {auth?.user?.phone}
              </Descriptions.Item>
              <Descriptions.Item label="Email" span={3}>
                {auth?.user?.email}
              </Descriptions.Item>
              <Descriptions.Item label="Location" span={3}>
                {auth?.user?.address}
              </Descriptions.Item>
              <Descriptions.Item label="Account Type" span={4}>
                {auth?.user?.role === 1 ? "Manager" : "XD"}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Modal
        title="Edit Profile"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            fullName: auth?.user?.name,
            mobile: auth?.user?.phone,
            email: auth?.user?.email,
            location: auth?.user?.address,
          }}
        >
          <Form.Item
            name="fullName"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your full name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Mobile"
            rules={[
              { required: true, message: "Please enter your mobile number" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please enter your email" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="location"
            label="Location"
            rules={[{ required: true, message: "Please enter your location" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Profile;
