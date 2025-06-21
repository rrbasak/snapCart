import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductColorController, deleteProductColorController, getProductColorController, updateProductColorController } from "../controllers/productColorController.js";

const app = express();

const router = express.Router();

// create product Color
router.post(
  "/create-product-color",
  requireSignIn,
  isAdmin,
  createProductColorController
);
// get product Color
router.get("/get-product-color", requireSignIn, getProductColorController);
// delete product Color
router.delete(
  "/delete-product-color/:id",
  requireSignIn,
  isAdmin,
  deleteProductColorController
);
// put product Color
router.put("/update-product-color/:id", requireSignIn, isAdmin,updateProductColorController);
export default router;
