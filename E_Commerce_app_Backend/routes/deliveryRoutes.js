import express from "express";
import {
  requireSignIn,
  isDeliveryPartner,
  isAdmin,
} from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
import { getAssignedPendingOrdersController, getDeliveryActivity, getDeliveryHistoryController, getDeliveryStats, updateOrderStatus, updatePartnerStatus } from "../controllers/deliveryController.js";

const router = express.Router();

//get pending orders for delivery partner
router.get(
  "/get-pending-orders/:deliveryPartner_id",
  requireSignIn,
  isDeliveryPartner,
  getAssignedPendingOrdersController
);
//update delivery order status
router.put(
  "/update-order-status/:orderId",
  requireSignIn,
  isDeliveryPartner,
  updateOrderStatus
);
//get delivery history 
router.get(
  "/get-delivery-history/:deliveryPartner_id",
  requireSignIn,
  isDeliveryPartner,
  getDeliveryHistoryController
);
// Route to get delivery activity for a partner
router.get("/get-delivery-activity/:partnerId",requireSignIn, isDeliveryPartner, getDeliveryActivity);
// get Delivfery stats
router.get("/get-delivery-stats/:partnerId", requireSignIn, isDeliveryPartner, getDeliveryStats ); 
//update partner alive status
router.put("/update-partner-status/:deliveryId",  requireSignIn, isDeliveryPartner, updatePartnerStatus);

export default router;
