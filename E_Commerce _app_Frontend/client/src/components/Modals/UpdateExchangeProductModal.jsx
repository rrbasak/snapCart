/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";
import styles from "../../styles/ExchangeProductModal.module.css";
import toast from "react-hot-toast";

const UpdateExchangeProductModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
  prepopulatedDataForModal,
}) => {
  const initialBrand = {
    name: "",
    models: [
      {
        name: "",
        price: "",
        damagePrices: { noDamage: "", bodyDamage: "", screenDamage: "" },
      },
    ],
  };

  const [brands, setBrands] = useState([initialBrand]);

  useEffect(() => {
    if (prepopulatedDataForModal && isModalOpen) {
      const prepopulatedBrands =
        prepopulatedDataForModal.subcategory.metadata.map((brandData) => ({
          name: brandData.brand,
          models: brandData.model.map((modelData) => ({
            name: modelData.name,
            price: modelData.price,
            damagePrices: {
              noDamage:
                modelData.damage.find((damage) => damage.type === "No Damage")
                  ?.exchangePrice || "",
              bodyDamage:
                modelData.damage.find((damage) => damage.type === "Body Damage")
                  ?.exchangePrice || "",
              screenDamage:
                modelData.damage.find(
                  (damage) => damage.type === "Screen Damage"
                )?.exchangePrice || "",
            },
          })),
        }));
      setBrands(prepopulatedBrands);
    }
  }, [prepopulatedDataForModal, isModalOpen]);

  const addBrand = () => {
    setBrands([...brands, initialBrand]);
  };

  const deleteBrand = (brandIndex) => {
    const newBrands = brands.filter((_, index) => index !== brandIndex);
    setBrands(newBrands);
  };

  const addModel = (brandIndex) => {
    const newBrands = brands.map((brand, index) => {
      if (index === brandIndex) {
        return {
          ...brand,
          models: [
            ...brand.models,
            {
              name: "",
              price: "",
              damagePrices: { noDamage: "", bodyDamage: "", screenDamage: "" },
            },
          ],
        };
      }
      return brand;
    });
    setBrands(newBrands);
  };

  const deleteModel = (brandIndex, modelIndex) => {
    const newBrands = brands.map((brand, index) => {
      if (index === brandIndex) {
        const newModels = brand.models.filter((_, idx) => idx !== modelIndex);
        return { ...brand, models: newModels };
      }
      return brand;
    });
    setBrands(newBrands);
  };

  const handleBrandChange = (brandIndex, field, value) => {
    const newBrands = brands.map((brand, index) => {
      if (index === brandIndex) {
        return { ...brand, [field]: value };
      }
      return brand;
    });
    setBrands(newBrands);
  };

  const handleModelChange = (brandIndex, modelIndex, field, value) => {
    const newBrands = brands.map((brand, index) => {
      if (index === brandIndex) {
        const newModels = brand.models.map((model, idx) => {
          if (idx === modelIndex) {
            if (field.includes("damagePrices")) {
              const damageField = field.split(".")[1];
              return {
                ...model,
                damagePrices: { ...model.damagePrices, [damageField]: value },
              };
            }
            return { ...model, [field]: value };
          }
          return model;
        });
        return { ...brand, models: newModels };
      }
      return brand;
    });
    setBrands(newBrands);
  };
  //console.log(selectedSubCategory);
  const handleOkClick = async () => {
    const payload = {
      category: selectedCategory,
      // sub_category: selectedSubCategory._id,
      sub_category: selectedSubCategory,
      subcategory: {
        category: subCategories.find((sc) => sc._id === selectedSubCategory)
          .subname,
        metadata: brands.map((brand) => ({
          brand: brand.name,
          model: brand.models.map((model) => ({
            name: model.name,
            price: model.price,
            damage: [
              {
                type: "No Damage",
                exchangePrice: model.damagePrices.noDamage,
              },
              {
                type: "Body Damage",
                exchangePrice: model.damagePrices.bodyDamage,
              },
              {
                type: "Screen Damage",
                exchangePrice: model.damagePrices.screenDamage,
              },
            ],
          })),
        })),
      },
    };

    try {
      if (prepopulatedDataForModal) {
        const { data } = await axios.put(
          `${process.env.REACT_APP_API}/api/v1/subcategory/update-exchange-product/${prepopulatedDataForModal._id}`,
          payload
        );
        if (data?.success) {
          //console.log(data?.subCategory._id);
          handleOk(data?.subCategory._id);
        }
      } else {
        const { data } = await axios.post(
          `${process.env.REACT_APP_API}/api/v1/subcategory/create-exchange-product`,
          payload
        );
        if (data?.success) {
          //console.log(data?.subCategory._id);
          handleOk(data?.subCategory._id);
        }
      }
    } catch (error) {
      toast.error("Something went wrong in updating sub category");
    }
  };

  const handleCancelClick = () => {
    setBrands(
      prepopulatedDataForModal
        ? prepopulatedDataForModal.subcategory.metadata.map((brandData) => ({
            name: brandData.brand,
            models: brandData.model.map((modelData) => ({
              name: modelData.name,
              price: modelData.price,
              damagePrices: {
                noDamage:
                  modelData.damage.find((damage) => damage.type === "No Damage")
                    ?.exchangePrice || "",
                bodyDamage:
                  modelData.damage.find(
                    (damage) => damage.type === "Body Damage"
                  )?.exchangePrice || "",
                screenDamage:
                  modelData.damage.find(
                    (damage) => damage.type === "Screen Damage"
                  )?.exchangePrice || "",
              },
            })),
          }))
        : [initialBrand]
    );
    handleCancel();
  };

  return (
    <Modal
      title="Update products that can exchange with this product"
      visible={isModalOpen}
      onOk={handleOkClick}
      onCancel={handleCancelClick}
      className={styles.modal}
      footer={[
        <Button key="cancel" onClick={handleCancelClick}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOkClick}>
          OK
        </Button>,
      ]}
    >
      <div className={styles.content}>
        {brands.map((brand, brandIndex) => (
          <div key={brandIndex} className={styles.section}>
            <Input
              placeholder="Brand"
              value={brand.name || ""}
              onChange={(e) =>
                handleBrandChange(brandIndex, "name", e.target.value)
              }
              className={`mb-3 ${styles.input}`}
            />
            {brand.models.map((model, modelIndex) => (
              <div key={modelIndex} className={styles.modelSection}>
                <Input
                  placeholder="Model Name"
                  value={model.name}
                  onChange={(e) =>
                    handleModelChange(
                      brandIndex,
                      modelIndex,
                      "name",
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
                <Input
                  placeholder="Model Price"
                  value={model.price}
                  onChange={(e) =>
                    handleModelChange(
                      brandIndex,
                      modelIndex,
                      "price",
                      e.target.value
                    )
                  }
                  className={styles.input}
                />
                <div className={styles.exchangePrice}>
                  <h4 className={styles.modal}>
                    Exchange Price based on condition
                  </h4>
                  <div className={styles.damagePrices}>
                    <Input
                      placeholder="No Damage"
                      value={model.damagePrices.noDamage}
                      onChange={(e) =>
                        handleModelChange(
                          brandIndex,
                          modelIndex,
                          "damagePrices.noDamage",
                          e.target.value
                        )
                      }
                      className={styles.input}
                    />
                    <Input
                      placeholder="Body Damage"
                      value={model.damagePrices.bodyDamage}
                      onChange={(e) =>
                        handleModelChange(
                          brandIndex,
                          modelIndex,
                          "damagePrices.bodyDamage",
                          e.target.value
                        )
                      }
                      className={styles.input}
                    />
                    <Input
                      placeholder="Screen Damage"
                      value={model.damagePrices.screenDamage}
                      onChange={(e) =>
                        handleModelChange(
                          brandIndex,
                          modelIndex,
                          "damagePrices.screenDamage",
                          e.target.value
                        )
                      }
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.modelActions}>
                  <Button
                    type="dashed"
                    onClick={() => addModel(brandIndex)}
                    className={styles.addButton}
                  >
                    Add Model
                  </Button>
                  <Button
                    type="dashed"
                    onClick={() => deleteModel(brandIndex, modelIndex)}
                    className={styles.deleteButton}
                  >
                    Delete Model
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className={styles.brandActions}>
          <Button
            type="primary"
            onClick={addBrand}
            className={styles.addButton}
          >
            Add Brand
          </Button>
          <Button
            type="dashed"
            onClick={() => deleteBrand(brands.length - 1)}
            className={`mx-2 ${styles.deleteButton}`}
          >
            Delete Brand
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateExchangeProductModal;
