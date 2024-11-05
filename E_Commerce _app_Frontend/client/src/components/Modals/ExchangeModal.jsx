import React, { useState } from "react";
import { Modal, Select, Checkbox, Button } from "antd";
import styles from "../../styles/ExchangeModal.module.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useDispatch } from "react-redux";
import { addExchange } from "../../features/exchangeProduct/exchangeSlice";
const { Option } = Select;

export const ExchangeModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  modalValue: brands,
  selectedBrand,
  setSelectedBrand,
  selectedModel,
  setSelectedModel,
  setExchangeValue,
  subcategoryId,
  product,
  setExchangeProductId,
}) => {
  // //console.log(brands);
  const [auth, setAuth] = useAuth();
  const [models, setModels] = useState([]);
  const [exchangePrices, setExchangePrices] = useState([]);
  const [selectedConditions, setSelectedConditions] = useState([]);
  const [exchangeValueinModal, setExchangeValueinModal] = useState(null);

  const dispatch = useDispatch();

  const getModelsBasedOnBrand = async (brand) => {
    try {
      const { data } = await axios.get(
        `/api/v1/subcategory/get-subcategory/${brand}/${subcategoryId}`
      );
      setModels(data.allmodels[0].model);
      setSelectedBrand(brand);
      setSelectedModel(null);
      setSelectedConditions([]);
      setExchangePrices([]);
      setExchangeValueinModal(null);
      setExchangeValue(0);
    } catch (error) {
      //console.log(error);
    }
  };

  const getExchangePriceHandler = async (modelName) => {
    setExchangeValueinModal(null);
    setExchangeValue(0);
    setSelectedConditions([]);
    setSelectedModel(modelName);
    models.map((model) => {
      if (model.name === modelName) {
        setExchangePrices(model.damage);
      }
    });
  };

  const handleConditionChange = (checkedValues) => {
    if (checkedValues.includes("no_damage")) {
      checkedValues = ["no_damage"];
    } else {
      checkedValues = checkedValues.filter((value) => value !== "no_damage");
    }
    setSelectedConditions(checkedValues);

    const newValue = checkedValues.reduce((acc, condition) => {
      const conditionObj = exchangePrices.find(
        (price) => price.type.replace(" ", "_").toLowerCase() === condition
      );
      return conditionObj ? Math.abs(acc - conditionObj.exchangePrice) : acc;
    }, 0);
    setExchangeValueinModal(newValue);
    setExchangeValue(newValue);
  };

  const handleCancelExchange = () => {
    setSelectedBrand(null);
    setSelectedModel(null);
    setSelectedConditions([]);
    setExchangePrices([]);
    setExchangeValueinModal(null);
    setExchangeValue(0);
    handleCancel();
  };

  const handleOkExchange = async () => {
    //console.log(selectedConditions);
    const damageDetails = selectedConditions.map((condition) => {
      const conditionObj = exchangePrices.find(
        (price) => price.type.replace(" ", "_").toLowerCase() === condition
      );
      return {
        damage_type: condition,
        exchange_price: conditionObj.exchangePrice,
      };
    });
    try {
      const payload = {
        brand: selectedBrand,
        model: selectedModel,
        damage: damageDetails,
        user: auth?.user?._id,
        product: product._id,
      };
      const { data } = await axios.post(
        "/api/v1/exchange/create-exchange",
        payload
      );
      //console.log(data);
      if (data?.success) {
        setSelectedBrand(null);
        setSelectedModel(null);
        setSelectedConditions([]);
        setExchangePrices([]);
        setExchangeValueinModal(null);
        // setExchangeValue(0);
        setExchangeProductId(data?.exchangeproduct?._id);
        // dispatch(addExchange(data?.exchangeproduct));
        toast.success("Exchange applied successfully!");
        handleOk();
      } else {
        toast.error("Failed to apply exchange.");
      }
    } catch (error) {
      console.error("Error applying exchange:", error);
      toast.error("An error occurred while applying exchange.");
    }
  };
  return (
    <Modal
      title="Exchange your old product"
      visible={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancelExchange}
      className={styles.modal}
      footer={null}
    >
      <div className={styles.content}>
        <div className={styles.section}>
          <p className={styles.title}>
            Which phone would you like to exchange?
          </p>
          <Select
            className={styles.select}
            placeholder="Select a phone brand"
            onChange={getModelsBasedOnBrand}
            value={selectedBrand}
          >
            {brands?.map((item) => (
              <Option key={item._id} value={item.brand}>
                {item.brand}
              </Option>
            ))}
          </Select>
          <Select
            className={styles.select}
            placeholder="Select a model"
            onChange={getExchangePriceHandler}
            value={selectedModel}
          >
            {models?.map((item) => (
              <Option key={item._id} value={item.name}>
                {item.name}
              </Option>
            ))}
          </Select>
        </div>
        {selectedModel && (
          <>
            <div className={styles.section}>
              <p className={styles.title}>Please select your phone condition</p>
              <Checkbox.Group
                options={[
                  { label: "No damage", value: "no_damage" },
                  { label: "Body damage", value: "body_damage" },
                  { label: "Screen damage", value: "screen_damage" },
                ]}
                value={selectedConditions}
                onChange={handleConditionChange}
              />
            </div>
            {exchangeValueinModal !== null && exchangeValueinModal !== 0 && (
              <div className={styles.section}>
                <p className={styles.exchangeValue}>
                  Exchange Value of Up to ₹{exchangeValueinModal}
                </p>
              </div>
            )}
          </>
        )}
        {selectedConditions.length > 0 && (
          <div className={styles.footerButtons}>
            <Button
              onClick={handleCancelExchange}
              className={styles.cancelButton}
            >
              Cancel Exchange
            </Button>
            <Button
              type="primary"
              onClick={handleOkExchange}
              className={styles.applyButton}
            >
              Apply Exchange
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};
