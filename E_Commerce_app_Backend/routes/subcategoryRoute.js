import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  subcategoryBrandWiseModelControlller,
  subcategoryControlller,
  subcategoryModelWiseExchangePriceControlller,
  createsubcategoryControlller,
  getallsub_categoryControlller,
  getallsub_categoryByCategoryControlller,
  createExchangeProductController,
  updateExchangeProductController,
  deletesubcategoryControlller,
  getSubCategoryController,
  subcategoryPhotoController,
} from "../controllers/subcategoryController.js";
import formidable from "express-formidable";
const router = express.Router();
//getALl category
router.get("/get-subcategory", subcategoryControlller);
//get Model based on brand id
router.get(
  "/get-subcategory/:brand/:subcategoryId",
  subcategoryBrandWiseModelControlller
);
//get Model based on brand id
router.get("/get-exchangeprice/:model", subcategoryModelWiseExchangePriceControlller);
//create sub_category
router.post(
  "/create-subcategory",
  requireSignIn,
  isAdmin,
  formidable(),
  createsubcategoryControlller
);
//get photo
router.get("/subcategory-photo/:scid", subcategoryPhotoController);
//delete sub_category
router.delete(
  "/delete-subcategory/:scid",
  requireSignIn,
  isAdmin,
  deletesubcategoryControlller
);
//get all sub_category
router.get(
  "/get-sub-category",
  requireSignIn,
  isAdmin,
  getallsub_categoryControlller
);
router.get(
  "/get-subcategory-oncategory/:category_id",
  requireSignIn,
  isAdmin,
  getallsub_categoryByCategoryControlller
);
//create subcategory
router.post(
  "/create-exchange-product",
  requireSignIn,
  isAdmin,
  createExchangeProductController
);
//update subcategory
router.put(
  "/update-exchange-product/:subcategory_id",
  requireSignIn,
  isAdmin,
  updateExchangeProductController
);

//get sub category based on category
router.get("/category-subcategory/:cid", getSubCategoryController);


export default router;
