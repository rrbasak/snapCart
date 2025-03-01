import productColorModel from "../models/productColorModel.js";
import axios from "axios";

export const createProductColorController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "color is required" });
    }

    const existingColor = await productColorModel.findOne({ name });
    if (existingColor) {
      return res.status(200).send({
        success: true,
        message: "color Already Exisits",
      });
    }
    const color = await new productColorModel({
      ...req.body,
    });

    await color.save();
    res.status(201).send({
      success: true,
      message: "New color created",
      color,
    });
  } catch (error) {
    ////console.log("error", error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in color",
    });
  }
};

// get all color
export const getProductColorController = async (req, res) => {
  try {
    const color = await productColorModel.find({});
    res.status(200).send({
      success: true,
      messsage: "All color List",
      color,
    });
  } catch (error) {
    //////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting colors",
      error: error,
    });
  }
};
// get all color
export const deleteProductColorController = async (req, res) => {
  try {
    const { id } = req.params;
    const color = await productColorModel.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      messsage: "color Deleted Successfully",
      color,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting color",
      error: error,
    });
  }
};
