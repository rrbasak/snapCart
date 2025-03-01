import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAddressCoordinateController,
  getDistanceTimeController,
//   getAutoCompleteSuggestionsController,
//   getCaptainsInTheRadiusController,
} from "../controllers/mapsController.js";

const router = express.Router();

// Define routes
router.get("/coordinates", getAddressCoordinateController);
router.get("/distance-time",  getDistanceTimeController);
// router.get("/autocomplete",  getAutoCompleteSuggestionsController);
// router.post("/captains-radius", [requireSignIn, isAdmin], getCaptainsInTheRadiusController);

export default router;
