import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";
import fs from "fs";
import redis from "../config/client.js";

export const createCategoryController = async (req, res) => {
  //console.log("req category", req.fields);
  try {
    const { name } = req.fields;
    const { photo } = req.files;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!photo) {
      return res.status(401).send({ message: "Photo is required" });
    }
    const existingCategory = await categoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category Already Exisits",
      });
    }
    const category = await new categoryModel({
      ...req.fields,
      slug: slugify(name),
    });
    if (photo) {
      category.photo.data = fs.readFileSync(photo.path);
      category.photo.contentType = photo.type;
    }
    await category.save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (error) {
    //console.log("error", error);
    res.status(500).send({
      success: false,
      error,
      message: "Errro in Category",
    });
  }
};

//update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = await categoryModel.findByIdAndUpdate(
      { _id: id },
      { name: name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Category Updated Successfully",
      category,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating category",
    });
  }
};

// get all category
export const categoryControlller = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    await redis.setex("categories", 12000, JSON.stringify(categories));
    res.status(200).send({
      success: true,
      messsage: "All category List",
      categories,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting categories",
      error: error,
    });
  }
};

// single category
export const singleCategoryController = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await categoryModel.findOne({ slug: slug });
    res.status(200).send({
      success: true,
      messsage: "Got SIngle Category SUccessfully",
      category,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting category",
      error: error,
    });
  }
};

// get photo
export const categoryPhotoController = async (req, res) => {
  try {
    const category = await categoryModel
      .findById({ _id: req.params.cid })
      .select("photo");
    if (category.photo.data) {
      res.set("Content-type", category.photo.contentType);
      return res.status(200).send(category.photo.data);
    }
  } catch (error) {
    //console.log("error",error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete category

export const deleteCategoryCOntroller = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.deleteOne({ _id: id });
    res.status(200).send({
      success: true,
      messsage: "Categry Deleted Successfully",
      category,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error: error,
    });
  }
};
