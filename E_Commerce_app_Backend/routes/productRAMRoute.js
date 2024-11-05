import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductRAMController, deleteProductRAMController, getProductRAMController } from "../controllers/productRAMController.js";
const app = express();

const router = express.Router();


// create product ram
router.post(
  "/create-product-ram",
  requireSignIn,
  isAdmin,
  createProductRAMController
);
// get product ram
router.get(
  "/get-product-ram",
  requireSignIn,
  getProductRAMController
);
// delete product ram
router.delete(
  "/delete-product-ram/:id",
  requireSignIn,
  isAdmin,
  deleteProductRAMController
);

export default router;
