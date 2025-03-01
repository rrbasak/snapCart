// DeleteModal.js
import React from "react";
import { Modal, Input, Button } from "antd";
import toast from "react-hot-toast";
import axios from "axios";

const DeleteModal = ({
  isVisible,
  handleOk,
  handleCancel,
  reason,
  setReason,
  oid,
  userId,
  status,
  buyerName,
  email,
}) => {
  const handleOkExchange = async () => {
    try {
      const payload = {
        oid: oid,
        userId: userId,
        status: status,
        reason: reason,
        buyerName: buyerName,
        email: email,
      };

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/remove-order`,
        payload
      );
      ////console.log(data);

      if (data?.success) {
        toast.success("Order successfully deleted.");
        handleOk();
      } else {
        toast.error("Failed to delete the order.");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("An error occurred while deleting the order.");
    }
  };

  return (
    <Modal
      title="Are you sure to delete?"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" danger onClick={handleOkExchange}>
          OK
        </Button>,
      ]}
    >
      <p>Please provide a reason for cancellation (optional):</p>
      <Input
        placeholder="Reason for deletion"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
      />
    </Modal>
  );
};

export default DeleteModal;
