import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { addReviewControlller, canReviewController, deleteReviewController, getparticularReviewByPOUControlller, getReviewControlller, getReviewLengthControlller } from "../controllers/reviewController.js";


const router = express.Router();

//create review
router.post("/add-review", requireSignIn,addReviewControlller);
//get review
router.get("/get-review/:pid", getReviewControlller);
//get number of review 
router.get("/get-review-length/:pid", getReviewLengthControlller);
//delete number of review 
router.delete("/delete-review/:reviewId", deleteReviewController);
// check if user can review product
router.get("/can-review/:pid/:uid/:oid", canReviewController);
//get a particular review based on pid,oid,uid
router.get("/get-one-review/:pid/:uid/:oid", getparticularReviewByPOUControlller);

export default router;
