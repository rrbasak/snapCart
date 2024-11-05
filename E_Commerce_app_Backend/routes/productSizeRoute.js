import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductSizeController, deleteProductSizeController, getProductSizeController } from "../controllers/productSizeController.js";

const app = express();

const router = express.Router();

// create product size
router.post(
  "/create-product-size",
  requireSignIn,
  isAdmin,
  createProductSizeController
);
// get product size
router.get("/get-product-size", requireSignIn, getProductSizeController);
// delete product size
router.delete(
  "/delete-product-size/:id",
  requireSignIn,
  isAdmin,
  deleteProductSizeController
);

export default router;
