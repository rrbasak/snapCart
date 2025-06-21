import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductRAMController, deleteProductRAMController, getProductRAMController, updateProductRAMController } from "../controllers/productRAMController.js";
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

router.put(
  "/update-product-ram/:ramId",
  requireSignIn,
  updateProductRAMController 
);


// delete product ram
router.delete(
  "/delete-product-ram/:id",
  requireSignIn,
  isAdmin,
  deleteProductRAMController
);

export default router;
