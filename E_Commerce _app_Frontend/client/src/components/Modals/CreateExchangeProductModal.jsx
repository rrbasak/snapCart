/* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable no-unused-vars */
// /* eslint-disable array-callback-return */
// import React, { useState } from "react";
// import { Modal, Button, Input, Select } from "antd";
// import styles from "../../styles/ExchangeProductModal.module.css";

// const { Option } = Select;

// export const CreateExchangeProductModal = ({
//   isModalOpen,
//   handleOk,
//   handleCancel,
// }) => {
//   const [brands, setBrands] = useState([
//     { models: [{ name: "", price: "", damage: "" }] },
//   ]);

//   const addBrand = () => {
//     setBrands([...brands, { models: [{ name: "", price: "", damage: "" }] }]);
//   };

//   const addModel = (brandIndex) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         return {
//           ...brand,
//           models: [...brand.models, { name: "", price: "", damage: "" }],
//         };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   const handleBrandChange = (brandIndex, field, value) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         return { ...brand, [field]: value };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   const handleModelChange = (brandIndex, modelIndex, field, value) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         const newModels = brand.models.map((model, idx) => {
//           if (idx === modelIndex) {
//             return { ...model, [field]: value };
//           }
//           return model;
//         });
//         return { ...brand, models: newModels };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   return (
//     <Modal
//       title="Select products that can exchange with this product"
//       visible={isModalOpen}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       className={styles.modal}
//       footer={null}
//     >
//       <div className={styles.content}>
//         {brands.map((brand, brandIndex) => (
//           <div key={brandIndex} className={styles.section}>
//             <Input
//               placeholder="Brand"
//               value={brand.name || ""}
//               onChange={(e) =>
//                 handleBrandChange(brandIndex, "name", e.target.value)
//               }
//               className={styles.input}
//             />
//             {brand.models.map((model, modelIndex) => (
//               <div key={modelIndex} className={styles.modelSection}>
//                 <Input
//                   placeholder="Model Name"
//                   value={model.name}
//                   onChange={(e) =>
//                     handleModelChange(
//                       brandIndex,
//                       modelIndex,
//                       "name",
//                       e.target.value
//                     )
//                   }
//                   className={styles.input}
//                 />
//                 <Input
//                   placeholder="Model Price"
//                   value={model.price}
//                   onChange={(e) =>
//                     handleModelChange(
//                       brandIndex,
//                       modelIndex,
//                       "price",
//                       e.target.value
//                     )
//                   }
//                   className={styles.input}
//                 />
//                 <Select
//                   placeholder="Damage"
//                   value={model.damage}
//                   onChange={(value) =>
//                     handleModelChange(brandIndex, modelIndex, "damage", value)
//                   }
//                   className={styles.select}
//                 >
//                   <Option value="No Damage">No Damage</Option>
//                   <Option value="Body Damage">Body Damage</Option>
//                   <Option value="Screen Damage">Screen Damage</Option>
//                 </Select>
//               </div>
//             ))}
//             <Button
//               type="dashed"
//               onClick={() => addModel(brandIndex)}
//               className={styles.addButton}
//             >
//               Add Model
//             </Button>
//           </div>
//         ))}
//         <Button type="primary" onClick={addBrand} className={styles.addButton}>
//           Add Brand
//         </Button>
//       </div>
//     </Modal>
//   );
// };

// /* eslint-disable no-unused-vars */
// /* eslint-disable array-callback-return */
// import React, { useState } from "react";
// import { Modal, Button, Input } from "antd";
// import styles from "../../styles/ExchangeProductModal.module.css";

// export const CreateExchangeProductModal = ({
//   isModalOpen,
//   handleOk,
//   handleCancel,
// }) => {
//   const [brands, setBrands] = useState([{ models: [{ name: "", price: "", damagePrices: { noDamage: "", bodyDamage: "", screenDamage: "" } }] }]);

//   const addBrand = () => {
//     setBrands([...brands, { models: [{ name: "", price: "", damagePrices: { noDamage: "", bodyDamage: "", screenDamage: "" } }] }]);
//   };

//   const deleteBrand = (brandIndex) => {
//     const newBrands = brands.filter((_, index) => index !== brandIndex);
//     setBrands(newBrands);
//   };

//   const addModel = (brandIndex) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         return { ...brand, models: [...brand.models, { name: "", price: "", damagePrices: { noDamage: "", bodyDamage: "", screenDamage: "" } }] };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   const deleteModel = (brandIndex, modelIndex) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         const newModels = brand.models.filter((_, idx) => idx !== modelIndex);
//         return { ...brand, models: newModels };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   const handleBrandChange = (brandIndex, field, value) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         return { ...brand, [field]: value };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   const handleModelChange = (brandIndex, modelIndex, field, value) => {
//     const newBrands = brands.map((brand, index) => {
//       if (index === brandIndex) {
//         const newModels = brand.models.map((model, idx) => {
//           if (idx === modelIndex) {
//             if (field.includes("damagePrices")) {
//               const damageField = field.split(".")[1];
//               return { ...model, damagePrices: { ...model.damagePrices, [damageField]: value } };
//             }
//             return { ...model, [field]: value };
//           }
//           return model;
//         });
//         return { ...brand, models: newModels };
//       }
//       return brand;
//     });
//     setBrands(newBrands);
//   };

//   return (
//     <Modal
//       title="Select products that can exchange with this product"
//       visible={isModalOpen}
//       onOk={handleOk}
//       onCancel={handleCancel}
//       className={styles.modal}
//       footer={null}
//     >
//       <div className={styles.content}>
//         {brands.map((brand, brandIndex) => (
//           <div key={brandIndex} className={styles.section}>
//             <Input
//               placeholder="Brand"
//               value={brand.name || ""}
//               onChange={(e) =>
//                 handleBrandChange(brandIndex, "name", e.target.value)
//               }
//               className={`mb-3 ${styles.input}`}
//             />
//             {brand.models.map((model, modelIndex) => (
//               <div key={modelIndex} className={styles.modelSection}>
//                 <Input
//                   placeholder="Model Name"
//                   value={model.name}
//                   onChange={(e) =>
//                     handleModelChange(
//                       brandIndex,
//                       modelIndex,
//                       "name",
//                       e.target.value
//                     )
//                   }
//                   className={styles.input}
//                 />
//                 <Input
//                   placeholder="Model Price"
//                   value={model.price}
//                   onChange={(e) =>
//                     handleModelChange(
//                       brandIndex,
//                       modelIndex,
//                       "price",
//                       e.target.value
//                     )
//                   }
//                   className={styles.input}
//                 />
//                 <div className={styles.exchangePrice}>
//                   <h4 className={styles.modal}>
//                     Exchange Price based on condition
//                   </h4>
//                   <div className={styles.damagePrices}>
//                     <Input
//                       placeholder="No Damage"
//                       value={model.damagePrices.noDamage}
//                       onChange={(e) =>
//                         handleModelChange(
//                           brandIndex,
//                           modelIndex,
//                           "damagePrices.noDamage",
//                           e.target.value
//                         )
//                       }
//                       className={styles.input}
//                     />
//                     <Input
//                       placeholder="Body Damage"
//                       value={model.damagePrices.bodyDamage}
//                       onChange={(e) =>
//                         handleModelChange(
//                           brandIndex,
//                           modelIndex,
//                           "damagePrices.bodyDamage",
//                           e.target.value
//                         )
//                       }
//                       className={styles.input}
//                     />
//                     <Input
//                       placeholder="Screen Damage"
//                       value={model.damagePrices.screenDamage}
//                       onChange={(e) =>
//                         handleModelChange(
//                           brandIndex,
//                           modelIndex,
//                           "damagePrices.screenDamage",
//                           e.target.value
//                         )
//                       }
//                       className={styles.input}
//                     />
//                   </div>
//                 </div>
//                 <div className={styles.modelActions}>
//                   <Button
//                     type="dashed"
//                     onClick={() => addModel(brandIndex)}
//                     className={styles.addButton}
//                   >
//                     Add Model
//                   </Button>
//                   <Button
//                     type="dashed"
//                     onClick={() => deleteModel(brandIndex, modelIndex)}
//                     className={styles.deleteButton}
//                   >
//                     Delete Model
//                   </Button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ))}
//         <div className={styles.brandActions}>
//           <Button
//             type="primary"
//             onClick={addBrand}
//             className={styles.addButton}
//           >
//             Add Brand
//           </Button>
//           <Button
//             type="dashed"
//             onClick={() => deleteBrand(brands.length - 1)}
//             className={`mx-2 ${styles.deleteButton}`}
//           >
//             Delete Brand
//           </Button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";
import axios from "axios";
import styles from "../../styles/ExchangeProductModal.module.css";
import toast from "react-hot-toast";

const CreateExchangeProductModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  categories,
  subCategories,
  selectedCategory,
  selectedSubCategory,
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
  //console.log(subCategories);
  //console.log(selectedSubCategory?._id);
  useEffect(() => {
    if (!isModalOpen) {
      setBrands([initialBrand]);
    }
  }, [isModalOpen]);

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

  // const handleOkClick = async () => {
  //   const payload = {
  //     category: selectedCategory,
  //     sub_category: selectedSubCategory,
  //     subcategory: {
  //       category: categories.find((c) => c._id === selectedCategory).name,
  //       metadata: brands.map((brand) => ({
  //         brand: brand.name,
  //         model: brand.models.map((model) => ({
  //           name: model.name,
  //           price: model.price,
  //           damage: [
  //             {
  //               type: "No Damage",
  //               exchangePrice: model.damagePrices.noDamage,
  //             },
  //             {
  //               type: "Body Damage",
  //               exchangePrice: model.damagePrices.bodyDamage,
  //             },
  //             {
  //               type: "Screen Damage",
  //               exchangePrice: model.damagePrices.screenDamage,
  //             },
  //           ],
  //         })),
  //       })),
  //     },
  //   };

  //   try {
  //     const { data } = await axios.post(
  //       "/api/v1/subcategory/create-exchange-product",
  //       payload
  //     );
  //     if (data?.success) {
  //       //console.log(data?.subCategory);
  //       handleOk();
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong in creating sub category");
  //   }
  // };

  const handleOkClick = async () => {
    const payload = {
      category: selectedCategory,
      sub_category: selectedSubCategory._id,
      subcategory: {
        category: subCategories.find((sc) => sc._id === selectedSubCategory._id)
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
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/subcategory/create-exchange-product`,
        payload
      );
      if (data?.success) {
        //console.log(data?.subCategory._id);
        handleOk(data?.subCategory._id);
      }
    } catch (error) {
      toast.error("Something went wrong in creating sub category");
    }
  };

  const handleCancelClick = () => {
    setBrands([initialBrand]);
    handleCancel();
  };

  return (
    <Modal
      title="Select products that can exchange with this product"
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

export default CreateExchangeProductModal;
