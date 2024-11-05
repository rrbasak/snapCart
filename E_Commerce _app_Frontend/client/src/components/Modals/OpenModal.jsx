/* eslint-disable no-unused-vars */
// import React from "react";
// import { Modal, Input } from "antd";

// export const OpenModal = ({
//   isModalOpen,
//   handleOk,
//   handleCancel,
//   modalValue,
//   setModalValue,
//   modalField,
// }) => {
//   return (
//     <Modal
//       title={`Edit ${modalField.charAt(0).toUpperCase() + modalField.slice(1)}`}
//       visible={isModalOpen}
//       onOk={handleOk}
//       onCancel={handleCancel}
//     >
//       <Input
//         value={modalValue}
//         onChange={(e) => setModalValue(e.target.value)}
//       />
//     </Modal>
//   );
// };




import React from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { Modal, Input,Dropdown, Select, Button, Space } from "antd";
import DropDown from "../DropDown";

const { Option } = Select;

export const OpenModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  modalValue,
  setModalValue,
  modalField,
}) => {

  const renderInputField = () => {
    if (modalField === "gender") {
      // return (
      //   <DropDown/>
      // );
    } else if (modalField === "name") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    } else if (modalField === "dob") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    } else if (modalField === "address") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    } else if (modalField === "city") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    } else if (modalField === "state") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    } else if (modalField === "country") {
      return (
        <Input
          value={modalValue}
          onChange={(e) => setModalValue(e.target.value)}
        />
      );
    }
  };

  return (
    <Modal
      title={`Edit ${modalField.charAt(0).toUpperCase() + modalField.slice(1)}`}
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {renderInputField()}
    </Modal>
  );
};
