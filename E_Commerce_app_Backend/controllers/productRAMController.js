import ramModel from "../models/RAMModel.js";
import axios from "axios";

export const createProductRAMController = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(401).send({ message: "RAM is required" });
    }

    const existingRam = await ramModel.findOne({ name });
    if (existingRam) {
      return res.status(200).send({
        success: true,
        message: "RAM Already Exisits",
      });
    }
    const ram = await new ramModel({
      ...req.body,
    });

    await ram.save();
    res.status(201).send({
      success: true,
      message: "New RAM created",
      ram,
    });
  } catch (error) {
    ////console.log("error", error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in RAM",
    });
  }
};

// get all ram
export const getProductRAMController = async (req, res) => {
  try {
    const ram = await ramModel.find({});
    res.status(200).send({
      success: true,
      messsage: "All ram List",
      ram,
    });
  } catch (error) {
    //////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting rams",
      error: error,
    });
  }
};
// get all ram
export const deleteProductRAMController = async (req, res) => {
  try {
    const { id } = req.params;
    const ram = await ramModel.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      messsage: "RAM Deleted Successfully",
      ram,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting ram",
      error: error,
    });
  }
};


export const updateProductRAMController = async (req, res) => {
  try {
    const { ramId } = req.params;
    const { name } = req.body;

    // Find the RAM by ID
    const ram = await ramModel.findById(ramId);

    if (!ram) {
      return res.status(404).send({
        success: false,
        message: "RAM not found",
      });
    }

    ram.name = name || ram.name;

    await ram.save();

    res.status(200).send({
      success: true,
      message: "Product RAM updated successfully",
      ram,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating RAM",
      error: error,
    });
  }
};