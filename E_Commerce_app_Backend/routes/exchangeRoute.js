import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  createExchangeControlller,
  deleteExchangeController,
  getExchangeControlller,
} from "../controllers/exchangeController.js";

const router = express.Router();

//create exchange
router.post("/create-exchange", createExchangeControlller);
//delete exchange
router.delete("/remove-exchange/:authId?/:exchangeId", deleteExchangeController); 
// ? means optional 
// or
// // Route with authId
// router.delete("/remove-exchange/:authId/:exchangeId", deleteExchangeController);

// // Route without authId
// router.delete("/remove-exchange/:exchangeId", deleteExchangeController);

//get exchange product
router.get("/get-exchange/:authId/:exchangeId", getExchangeControlller);


export default router;
