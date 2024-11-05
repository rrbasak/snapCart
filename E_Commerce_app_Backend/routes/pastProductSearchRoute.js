import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { getPastProductSearchControlller, insertPastProductSearchControlller } from "../controllers/pastProductSearchController.js";


const router = express.Router();

//insert past search
router.post("/insert-past-product-search/:productId/:userId", requireSignIn,insertPastProductSearchControlller);
// //delete past search
// router.get(
//   "/remove-past-search/:search/:userId",
//   requireSignIn,
//   removePastSearchControlller
// );
//get past search
router.get("/get-past-product-search/:userId", requireSignIn, getPastProductSearchControlller);

export default router;
