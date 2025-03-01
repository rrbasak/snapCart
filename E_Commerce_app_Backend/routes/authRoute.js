//external imports
import express from "express";
//internal imports
import {
  registerController,
  testController,
  loginController,
  userController,
  forgotPasswordController,
  adminController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
  loginControllerViaGoogle,
  registerControllerViaGoogle,
  forgotPasswordControllerViaOTPvalidation,
  resetPasswordController,
  afterResetPasswordController,
  forgotPasswordRecoveryControllerViaOTPvalidation,
  resetPasswordControllerAfterOTPvalidation,
  checkMailController,
  smsController,
  refreshTokenController,
  updateContactController,
  uploadPicController,
  userDetailsController,
  userPhotoController,
  getOneOrderController,
  verifyOtpController,
  resendOtpverifyController,
  deliverytPartnerRegisterController,
  getAllDeliveryPartnersController,
  assignPartnerController,
  getAvailableDeliveryPartnersController,
  getAllPendingApprovalOrdersController,
  deliveryOrderStatusController,
  getPartnerStatusController,
} from "../controllers/authController.js";

import {
  isAdmin,
  isUser,
  requireSignIn,
  // verifyRefreshToken,
  isDeliveryPartner,
} from "../middlewares/authMiddleware.js";

//photo upload
import formidable from "express-formidable";
import formidableMiddleware from "express-formidable";
import createRateLimiter from "../utils/limitUtil.js";
import dotenv from "dotenv";
import {
  createOrderPlacedNotificationController,
  creatingOrderPlacedOrderNotificationController,
  getOrderPlacedNotificationController,
  getAdminNotificationController,
  primeDayStartNotificationController,
  updateUserNotificationsController,
  updateAdminNotificationsController,
  lowStockNotificationsController,
  outOfStockNotificationsController,
  deliveryPartnerNotificationController,
  getDeliverpartnerNotificationController,
  updateDeliverpartnerNotificationsController,
} from "../controllers/notificationController.js";

// Configure env
dotenv.config();
////console.log("auth routes", process.env.OTP_RATE_LIMIT_WINDOW_MS);
////console.log(process.env.LOGIN_RATE_LIMIT_REQUESTS);
////console.log(process.env.LOGIN_RATE_LIMIT_MESSAGE);

const router = express.Router();

// Creating specific rate limiters
const loginRateLimiter = createRateLimiter({
  windowMs: parseInt(process.env.LOGIN_RATE_LIMIT_WINDOW_MS, 10),
  limit: parseInt(process.env.LOGIN_RATE_LIMIT_REQUESTS, 10),
  message: process.env.LOGIN_RATE_LIMIT_MESSAGE,
});

const otpRateLimiter = createRateLimiter({
  windowMs: parseInt(process.env.OTP_RATE_LIMIT_WINDOW_MS, 10),
  limit: parseInt(process.env.OTP_RATE_LIMIT_REQUESTS, 10),
  message: process.env.OTP_RATE_LIMIT_MESSAGE,
});

//REGISTER || METHOD POST
router.post("/register", registerController);
router.post("/registerViaGoogle", registerControllerViaGoogle);

//LOGIN || METHOD POST
router.post("/login", loginRateLimiter, loginController);
router.post("/loginViaGoogle", loginControllerViaGoogle);

//LOGIN || METHOD POST
router.post("/test", requireSignIn, isAdmin, testController);

//PROTECTED || METHOD  POST
router.get("/user-auth", requireSignIn, userController);

//PROTECTED || METHOD  POST
router.get("/admin-auth", requireSignIn, isAdmin, adminController);

//FORGOT PASSWORD || POST
// router.post("/forgot-password", forgotPasswordController);

//UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);
//contact references
router.put("/contactref", requireSignIn, updateContactController);
//upload photo
router.put(
  "/uploadpic",
  requireSignIn,
  formidableMiddleware(),
  uploadPicController
);

//orders
router.get("/orders", requireSignIn, getOrdersController);
//get one order
router.get("/get-one-order/:orderid", requireSignIn, getOneOrderController);

//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

//forgot password via OTP
// router.post("/forgot-password", forgotPasswordControllerViaOTPvalidation);

//forgot password by OTP via email
router.post(
  "/forgot-password",
  otpRateLimiter,
  forgotPasswordRecoveryControllerViaOTPvalidation
);

//reset password
router.get("/reset-password/:id/:accessToken", resetPasswordController);

//after reset password
router.post("/reset-password/:id/:accessToken", afterResetPasswordController);

//reset password after otp verification
router.put("/reset-password-otp", resetPasswordControllerAfterOTPvalidation);

//check Mail
router.get("/checkMail/:email", checkMailController);

//sms - for -otp
router.post("/get-otp", smsController);

//verify otp
router.post("/verify-otp", verifyOtpController);
//resend otp
router.post("/resend-otp", resendOtpverifyController);

//get user
router.get("/get-user/:uid", requireSignIn, userDetailsController);

//get photo
router.get("/user-photo/:uid", userPhotoController);

//DELIVERY PARTNER REGISTER || METHOD POST
router.post(
  "/delivery-partner/register",
  formidable({ multiples: true, keepExtensions: true }),
  deliverytPartnerRegisterController
);
// router.post("/delivery-partner/register", (req, res) => {
//   const form = new formidable.IncomingForm();

//   // Ensure that formidable parses the files and fields
//   form.parse(req, (err, fields, files) => {
//     if (err) {
//       console.error("Error in form parsing:", err);
//       return res.status(500).send({
//         success: false,
//         message: "Error in file processing",
//       });
//     }

//     //console.log("Parsed fields:", fields);
//     //console.log("Parsed files:", files);

//     // Pass the parsed fields and files to your controller
//     deliverytPartnerRegisterController(req, res, fields, files);
//   });
// });
//refresh token
// router.post("/refresh-token", verifyRefreshToken, refreshTokenController);

//get all delivey partners
router.get(
  "/get-all-delivery-partners",
  requireSignIn,
  isAdmin,
  getAllDeliveryPartnersController
);
//assign partner
router.put(
  "/assign-partner/:orderId",
  requireSignIn,
  isAdmin,
  assignPartnerController
);
//get available delivery partners
router.get(
  "/available-partners",
  requireSignIn,
  isAdmin,
  getAvailableDeliveryPartnersController
);
//get all pending orders for approvals
router.get(
  "/all-pending-approval-orders",
  requireSignIn,
  isAdmin,
  getAllPendingApprovalOrdersController
);
//update delivery orders status
router.put(
  "/update-order-status/:orderId",
  requireSignIn,
  isAdmin,
  deliveryOrderStatusController
);

//Notificatons for user
//create notification
router.post(
  "/create-order-placed-notification",
  requireSignIn,
  isAdmin,
  createOrderPlacedNotificationController
);
//get notification
router.get(
  "/get-user-order-notifications/:userId",
  requireSignIn,
  isUser,
  getOrderPlacedNotificationController
);
//update status of notification
router.put(
  "/update-user-order-notifications/:userId",
  requireSignIn,
  isUser,
  updateUserNotificationsController
);
//get order notification but created by user
router.post(
  "/create-purchased-order-notification",
  requireSignIn,
  isUser,
  creatingOrderPlacedOrderNotificationController
);
//low stock notification
router.post(
  "/low-stock-notification",
  requireSignIn,
  isUser,
  lowStockNotificationsController
);
//out of stock notification
router.post(
  "/out-of-stock-notification",
  requireSignIn,
  isUser,
  outOfStockNotificationsController
);

//Notifications for Admin
//prime day start
router.post(
  "/prime-day-start-notification",
  requireSignIn,
  isAdmin,
  primeDayStartNotificationController
);
//get notification
router.get(
  "/get-admin-order-notifications/:adminId",
  requireSignIn,
  isAdmin,
  getAdminNotificationController
);
//update status of notification
router.put(
  "/update-admin-notifications/:adminId",
  requireSignIn,
  isAdmin,
  updateAdminNotificationsController
);
//new delivery partner register notification
router.post(
  "/deliver-partner-register-notification",
  deliveryPartnerNotificationController
);
//deliverpartner notifications
router.get(
  "/get-delivery-update-notification/:deliverPartnerId",
  requireSignIn,
  isDeliveryPartner,
  getDeliverpartnerNotificationController
);
//update status of notification
router.put(
  "/update-delivery-order-notifications/:deliverPartnerId",
  requireSignIn,
  isDeliveryPartner,
  updateDeliverpartnerNotificationsController
);

//get partner alive status
router.get(
  "/get-partner-status/:deliveryId",
  requireSignIn,
  isAdmin,
  getPartnerStatusController
);

export default router;
