import express from "express";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";
import {
  getAddressCoordinateController,
  getDirectionsController,
  getDistanceTimeController,
  getLatandLogController,
  //   getAutoCompleteSuggestionsController,
  //   getCaptainsInTheRadiusController,
} from "../controllers/mapsController.js";

const router = express.Router();

// Define routes
router.get("/coordinates", getAddressCoordinateController);
router.get("/geocode/:address", getLatandLogController);
router.get("/distance-time", getDistanceTimeController);
router.get("/get-direction", getDirectionsController);
// router.get("/autocomplete",  getAutoCompleteSuggestionsController);
// router.post("/captains-radius", [requireSignIn, isAdmin], getCaptainsInTheRadiusController);

export default router;
