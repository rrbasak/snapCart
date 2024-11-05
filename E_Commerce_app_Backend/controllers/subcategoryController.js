import slugify from "slugify";
import subcategoryModel from "../models/subcategoryModel.js";
import sub_categoryModel from "../models/sub_categoryModel.js";
import fs from "fs";

// get all sub category
export const subcategoryControlller = async (req, res) => {
  try {
    const subcategories = await subcategoryModel.find({});
    res.status(200).send({
      success: true,
      messsage: "All category List",
      subcategories,
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
// get all models based on brand
export const subcategoryBrandWiseModelControlller = async (req, res) => {
  try {
    const { brand, subcategoryId } = req.params;
    const allModels = await subcategoryModel.findOne(
      {
        _id: subcategoryId,
        "subcategory.metadata": {
          $elemMatch: { brand: brand },
        },
      },
      {
        "subcategory.metadata.$": 1,
      }
    );

    //console.log(allModels);
    res.status(200).send({
      success: true,
      messsage: "All Model List based on brand",
      allmodels: allModels.subcategory.metadata,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting models",
      error: error,
    });
  }
};

// get all exchange price based on model
export const subcategoryModelWiseExchangePriceControlller = async (
  req,
  res
) => {
  try {
    const { model } = req.params;
    const allExchangePrices = await subcategoryModel.findOne(
      {
        _id: "66a0923d19fa4444bfb7fa2e",
        "subcategory.metadata": {
          $elemMatch: { brand: brand },
        },
      },
      {
        "subcategory.metadata.$": 1,
      }
    );

    //console.log(allModels);
    res.status(200).send({
      success: true,
      messsage: "All Model List based on brand",
      allmodels: allModels.subcategory.metadata,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting models",
      error: error,
    });
  }
};

// export const createsubcategoryControlller = async (req, res) => {
//   //console.log("req", req.body);
//   try {
//     const { subname, category } = req.body;
//     if (!subname || !category) {
//       return res.status(400).send({
//         success: false,
//         message: "Subname or Category are required",
//       });
//     }
//     const sub_category = await sub_categoryModel({
//       ...req.body,
//       slug: slugify(subname),
//     }).save();

//     //console.log(sub_category);
//     res.status(200).send({
//       success: true,
//       messsage: "Sub Category Created Successfully",
//       sub_category,
//     });
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error while creating sub_category",
//       error: error,
//     });
//   }
// };

// create sub_category
export const createsubcategoryControlller = async (req, res) => {
  //console.log("req", req.fields);
  try {
    const { subname, category } = req.fields;
    const { photo } = req.files;
    if (!subname) {
      return res.status(400).send({
        success: false,
        message: "Subname  are required",
      });
    }
    if (!photo) {
      return res.status(401).send({ message: "Photo is required" });
    }
    const existingSubCategory = await sub_categoryModel.findOne({ subname });
    if (existingSubCategory) {
      return res.status(200).send({
        success: true,
        message: "Sub category Already Exisits",
      });
    }
    const sub_category = await sub_categoryModel({
      ...req.fields,
      slug: slugify(subname),
    });

    if (photo) {
      sub_category.photo.data = fs.readFileSync(photo.path);
      sub_category.photo.contentType = photo.type;
    }
    await sub_category.save();

    //console.log(sub_category);
    res.status(200).send({
      success: true,
      messsage: "Sub Category Created Successfully",
      sub_category,
    });
  } catch (error) {
    //console.log("error123",error);
    res.status(500).send({
      success: false,
      message: "Error while creating sub_category",
      error: error,
    });
  }
};
//delete sub_category
export const deletesubcategoryControlller = async (req, res) => {
  const { scid } = req.params;
  //console.log("req", req.body);
  try {
    const deleteSub_Category = await sub_categoryModel.deleteOne({
      _id: scid,
    });

    res.status(200).send({
      success: true,
      messsage: "Sub Category deleted Successfully",
      deleteSub_Category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting sub_category",
      error: error,
    });
  }
};

//get all sub_category
export const getallsub_categoryControlller = async (req, res) => {
  try {
    const sub_categories = await sub_categoryModel
      .find({})
      .populate("category");
    res.status(200).send({
      success: true,
      messsage: "All Sub categories",
      sub_categories,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting sub_category",
      error: error,
    });
  }
};
export const getallsub_categoryByCategoryControlller = async (req, res) => {
  try {
    const { category_id } = req.params;
    const sub_categories_based_on_category = await sub_categoryModel
      .find({ category: category_id })
      .select("subname");
    res.status(200).send({
      success: true,
      messsage: "All Sub categories Based on Category",
      sub_categories_based_on_category,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting sub_category based on category",
      error: error,
    });
  }
};

//create a subcategory
export const createExchangeProductController = async (req, res) => {
  try {
    const subCategory = await subcategoryModel({
      ...req.body,
    }).save();

    res.status(200).send({
      success: true,
      messsage: "Sub category created successfully",
      subCategory,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting sub category ",
      error: error,
    });
  }
};
//update a subcategory
export const updateExchangeProductController = async (req, res) => {
  try {
    const { subcategory_id } = req.params;
    const subCategory = await subcategoryModel.findByIdAndUpdate(
      { _id: subcategory_id },
      {
        ...req.body,
      }
    );

    res.status(200).send({
      success: true,
      messsage: "Sub category updated successfully",
      subCategory,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating sub category ",
      error: error,
    });
  }
};

//get sub category based oncategory

export const getSubCategoryController = async (req, res) => {
  const { cid } = req.params;
  try {
    const subcategory = await sub_categoryModel.find({ category: cid });
    res.status(200).send({
      success: true,
      messsage: "subcategory fetched Successfully",
      subcategory,
    });
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while fetching subcategory",
      error: error,
    });
  }
};

// get photo
export const subcategoryPhotoController = async (req, res) => {
  try {
    const subcategory = await sub_categoryModel
      .findById({ _id: req.params.scid })
      .select("photo");
    if (subcategory.photo.data) {
      res.set("Content-type", subcategory.photo.contentType);
      return res.status(200).send(subcategory.photo.data);
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
