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
    //console.log("error", error);
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
    ////console.log(error);
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
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting ram",
      error: error,
    });
  }
};
