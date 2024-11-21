import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  categoryControlller,
  categoryPhotoController,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "../controllers/categoryController.js";
import formidable from "express-formidable";
import { getCachedData } from "../middlewares/redisMiddleware.js";

const router = express.Router();

//routes
// create category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  formidable(),
  createCategoryController
);

//update category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getALl category
router.get("/get-category", getCachedData("categories"), categoryControlller);

//single category
router.get("/single-category/:slug", singleCategoryController);

//get photo
router.get("/category-photo/:cid", categoryPhotoController);

//delete category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);
export default router;

// import express from "express";
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// import {
//   categoryControlller,
//   createCategoryController,
//   deleteCategoryCOntroller,
//   singleCategoryController,
//   updateCategoryController,
// } from "../controllers/categoryController.js";

// const router = express.Router();

// //routes
// // create category
// router.post(
//   "/create-category",

//   isAdmin,
//   createCategoryController
// );

// //update category
// router.put(
//   "/update-category/:id",

//   isAdmin,
//   updateCategoryController
// );

// //getALl category
// router.get("/get-category", categoryControlller);

// //single category
// router.get("/single-category/:slug", singleCategoryController);
// //delete category
// router.delete(
//   "/delete-category/:id",

//   isAdmin,
//   deleteCategoryCOntroller
// );
// export default router;
