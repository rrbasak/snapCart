import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createCartControlller,
  getCartControlller,
  removeCartController,
  
} from "../controllers/cartController.js";


const router = express.Router();

//create cart
router.post("/create-cart", createCartControlller);
//get cart of a user
router.get("/get-cart/:auth_id", getCartControlller);

//delete cart of a user
router.delete("/remove-cart/:auth_id/:pid", removeCartController);
export default router;