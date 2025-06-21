import productSizeModel from "../models/productSizeModel.js";
import axios from "axios";

//create a new product size
export const createProductSizeController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "Size is required" });
    }

    const existingRam = await productSizeModel.findOne({ name });
    if (existingRam) {
      return res.status(200).send({
        success: true,
        message: "Size is Already Exisits",
      });
    }
    const size = await new productSizeModel({
      ...req.body,
    });

    await size.save();
    res.status(201).send({
      success: true,
      message: "New size created",
      size,
    });
  } catch (error) {
    ////console.log("error", error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in size",
    });
  }
};

// get all  product size
export const getProductSizeController = async (req, res) => {
  try {
    const size = await productSizeModel.find({});
    res.status(200).send({
      success: true,
      messsage: "All size List",
      size,
    });
  } catch (error) {
    //////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting sizes",
      error: error,
    });
  }
};
// get all size
export const deleteProductSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const size = await productSizeModel.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      messsage: "Size Deleted Successfully",
      size,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting size",
      error: error,
    });
  }
};


export const updateProductSizeController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const size = await productSizeModel.findById(id);

    if (!size) {
      return res.status(404).send({
        success: false,
        message: "Product size not found",
      });
    }

    size.name = name;

    await size.save();

    res.status(200).send({
      success: true,
      message: "Product size updated successfully",
      size,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error while updating product size",
      error: error.message || error,
    });
  }
};