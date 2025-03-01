import express from "express";
import {
    isAdmin,
  requireSignIn,
} from "../middlewares/authMiddleware.js";
import { getAdminDashboardData , getSalesDataController} from "../controllers/salesController.js";


const router = express.Router();

// Get sales data for Admin
router.get("/dashboard-data", requireSignIn, isAdmin, getAdminDashboardData);
// Fetch sales-related data
router.get("/product-data", requireSignIn, isAdmin, getSalesDataController);


export default router;
