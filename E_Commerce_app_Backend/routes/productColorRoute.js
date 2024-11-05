import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductColorController, deleteProductColorController, getProductColorController } from "../controllers/productColorController.js";

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

export default router;
