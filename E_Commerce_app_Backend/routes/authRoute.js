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
} from "../controllers/authController.js";

import {
  isAdmin,
  requireSignIn,
  // verifyRefreshToken,
} from "../middlewares/authMiddleware.js";

//photo upload
import formidable from "express-formidable";
import formidableMiddleware from "express-formidable";
import createRateLimiter from "../utils/limitUtil.js";
import dotenv from "dotenv";

// Configure env
dotenv.config();
//console.log("auth routes", process.env.OTP_RATE_LIMIT_WINDOW_MS);
//console.log(process.env.LOGIN_RATE_LIMIT_REQUESTS);
//console.log(process.env.LOGIN_RATE_LIMIT_MESSAGE);

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

//refresh token
// router.post("/refresh-token", verifyRefreshToken, refreshTokenController);

export default router;

// //external imports
// import express from "express";
// //internal imports
// import {
//   registerController,
//   testController,
//   loginController,
//   userController,
//   forgotPasswordController,
//   adminController,
//   updateProfileController,
//   getOrdersController,
//   getAllOrdersController,
//   orderStatusController,
//   loginControllerViaGoogle,
//   registerControllerViaGoogle,
//   forgotPasswordControllerViaOTPvalidation,
//   resetPasswordController,
//   afterResetPasswordController,
//   forgotPasswordRecoveryControllerViaOTPvalidation,
//   resetPasswordControllerAfterOTPvalidation,
//   checkMailController,
//   smsController,
//   refreshTokenController,
//   updateContactController,
//   uploadPicController,
// } from "../controllers/authController.js";

// import {
//   isAdmin,
//   requireSignIn,
//   // verifyRefreshToken,
// } from "../middlewares/authMiddleware.js";

// //photo upload
// import formidable from "express-formidable";

// const router = express.Router();
// //REGISTER || METHOD POST
// router.post("/register", registerController);
// router.post("/registerViaGoogle", registerControllerViaGoogle);

// //LOGIN || METHOD POST
// router.post("/login", loginController);
// router.post("/loginViaGoogle", loginControllerViaGoogle);

// //LOGIN || METHOD POST
// router.post("/test", isAdmin, testController);

// //PROTECTED || METHOD  POST
// router.get("/user-auth",  userController);

// //PROTECTED || METHOD  POST
// router.get("/admin-auth",  isAdmin, adminController);

// //FORGOT PASSWORD || POST
// // router.post("/forgot-password", forgotPasswordController);

// //UPDATE PROFILE
// router.put("/profile",  updateProfileController);
// //contact references
// router.put("/contactref",  updateContactController);
// //upload photo
// router.put("/uploadpic",  formidable(), uploadPicController);

// //orders
// router.get("/orders",  getOrdersController);

// //all orders
// router.get("/all-orders",  isAdmin, getAllOrdersController);

// // order status update
// router.put(
//   "/order-status/:orderId",

//   isAdmin,
//   orderStatusController
// );

// //forgot password via OTP
// // router.post("/forgot-password", forgotPasswordControllerViaOTPvalidation);

// //forgot password by OTP via email
// router.post(
//   "/forgot-password",
//   forgotPasswordRecoveryControllerViaOTPvalidation
// );

// //reset password
// router.get("/reset-password/:id/:accessToken", resetPasswordController);

// //after reset password
// router.post("/reset-password/:id/:accessToken", afterResetPasswordController);

// //reset password after otp verification
// router.put("/reset-password-otp", resetPasswordControllerAfterOTPvalidation);

// //check Mail
// router.get("/checkMail/:email", checkMailController);

// //sms - for -otp
// router.post("/get-otp", smsController);

// //refresh token
// // router.post("/refresh-token", verifyRefreshToken, refreshTokenController);

// export default router;
