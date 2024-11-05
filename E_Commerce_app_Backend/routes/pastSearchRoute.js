import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import {
  getPastSearchControlller,
  insertPastSearchControlller,
  removePastSearchControlller,
} from "../controllers/pastSearchController.js";

const router = express.Router();

//insert past search
router.post("/insert-past-search", requireSignIn, insertPastSearchControlller);
//delete past search
router.get(
  "/remove-past-search/:search/:userId",
  requireSignIn,
  removePastSearchControlller
);
//get past search
router.get("/get-past-search/:userId", requireSignIn, getPastSearchControlller);

export default router;
