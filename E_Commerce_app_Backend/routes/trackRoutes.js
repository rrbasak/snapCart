import express from "express";
import {
    isAdmin,
  isUserOrDeliveryPartner,
  requireSignIn,
} from "../middlewares/authMiddleware.js";
import { getTrackActivityController, trackActivityController } from "../controllers/trackController.js";

const router = express.Router();

//track users behaviour
router.post("/track-activity", requireSignIn, trackActivityController);
//get users behaviour
router.get("/get-activity", requireSignIn, isAdmin, getTrackActivityController);


export default router;
