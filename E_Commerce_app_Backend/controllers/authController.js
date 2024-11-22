import {
  comparePassword,
  hashOTP,
  hashPassword,
  compareOTP,
} from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import userModelSocialMedia from "../models/userModelSocialMedia.js";
import userOTPverificatioonModel from "../models/userOTPverificatioonModel.js";
import orderModel from "../models/orderModel.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";
import { sendSMS } from "../utils/smsUtil.js";
import { otpGenerator } from "../utils/otpUtil.js";
import axios from "axios";
import fs from "fs";
import sendEmail from "../utils/emailUtil.js";
import { generateOrderEmailContent } from "../templates/orderDetailEmailTemplate.js";
import { generateOrderShippedEmailContent } from "../templates/orderShippedEmailTemplate.js";
import { generatePasswordResetEmailContent } from "../templates/recoverPasswordEmailTemplate.js";

import productModel from "../models/productModel.js";
import { generateOrderBeforeDeliverEmailContent } from "../templates/orderBeforeDeliverEmailTemplate.js";
import { generateOrderAfterDeliverEmailContent } from "../templates/orderAfterDeliverEmailTemplate.js";

import { formatTimestampforOrder } from "../utils/dateUtlFoOrder.js";
import { generateCancelByAdminEmailContent } from "../templates/cancelByAdminTemplate.js";
//registration

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    if (!name) {
      return res.send({ message: "name is required" });
    }
    if (!email) {
      return res.send({ message: "email is required" });
    }
    if (!password) {
      return res.send({ message: "password is required" });
    }
    if (!phone) {
      return res.send({ message: "phone no required" });
    }
    if (!address) {
      return res.send({ message: "address is required" });
    }
    // if (!answer) {
    //   return res.send({ message: "Answer is Required" });
    // }
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: "false",
        message: "Already exists login please",
      });
    }

    //register user
    const hashedPassword = await hashPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    return res.status(200).send({
      success: "true",
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error registering",
      error: error,
    });
  }
};

//registration via Google Account

export const registerControllerViaGoogle = async (req, res) => {
  try {
    const { name, email } = req.body;

    const existingUser = await userModelSocialMedia.findOne({ email });
    //existing user
    if (existingUser) {
      return res.status(200).send({
        success: "false",
        message: "Already exists login please",
      });
    }
    //save
    const user = await new userModelSocialMedia({
      name,
      email,
    }).save();
    return res.status(200).send({
      success: "true",
      message: "User Registered Successfully",
      user: user,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error registering",
      error: error,
    });
  }
};

//post login via Google account

export const loginControllerViaGoogle = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModelSocialMedia.findOne({ email: email });
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }

    const accessToken = await JWT.sign(
      { _id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );
    return res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      accessToken: accessToken,
    });
  } catch (error) {
    ////console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error: error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  ////console.log(req.body);
  try {
    const { email, password, recaptchaValue } = req.body;
    //console.log(req.body);

    if (!email && !password) {
      //validation
      return res.send({
        success: false,
        message: "Invalid email or password",
      });
    }
    if (!email) {
      return res.send({
        success: false,
        message: "Email please",
      });
    }
    if (!password) {
      return res.send({
        success: false,
        message: "Password please",
      });
    }
    if (!recaptchaValue) {
      return res.send({
        success: false,
        message: "Make sure you are not a Robot",
      });
    }
    //check user
    const olduser = await userModel.findOne({ email });
    //console.log("olduser", olduser);
    const oldSocialMediauser = await userModelSocialMedia.findOne({ email });
    if (!olduser && !oldSocialMediauser) {
      return res.send({
        success: false,
        message: "Email is not registered",
      });
    }
    if (oldSocialMediauser) {
      return res.status(200).send({
        success: false,
        message:
          "You have signed up with Social Media.So login with your Social Media account",
      });
    }
    const match = await comparePassword(password, olduser.password);
    ////console.log(match);
    if (!match) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }
    //accessToken
    const data = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${"6LcclwQqAAAAAD4z_bET6tP3je_6LOOpBBb4mBU8"}&response=${recaptchaValue}`
    );
    ////console.log("success Data", data);
    if (data.status === 200) {
      const accessToken = JWT.sign(
        { _id: olduser._id },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1m",
          expiresIn: "7d",
        }
      );
      const refreshToken = JWT.sign(
        { _id: olduser._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      // res.cookie("accessToken", accessToken, { maxAge: 60000 });

      // res.cookie("refreshToken", refreshToken, {
      //   maxAge: 3600000,
      //   httpOnly: true,
      //   // secure: process.env.NODE_ENV === "production",
      //   secure: true,
      //   sameSite: "strict",
      // });
      return res.status(200).send({
        success: true,
        message: "login successfully",
        user: {
          _id: olduser._id,
          name: olduser.name,
          email: olduser.email,
          phone: olduser.phone,
          address: olduser.address,
          role: olduser.role,
          city: olduser.city,
          state: olduser.state,
          country: olduser.country,
          createdAt: olduser.createdAt,
          photo: olduser.photo,
        },
        accessToken,
      });
    } else {
      ////console.log(data);
      return res.status(200).send({
        success: false,
        message: "Invalid Recaptcha",
      });
    }
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 429) {
      return res.status(429).send({
        success: false,
        message: "Too many login attempts, please try again later.",
      });
    }
    return res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// test controller
export const testController = (req, res) => {
  ////console.log("Protectted Rote");
  res.status(200).send({
    success: true,
    message: "Protectted Rote",
  });
};

//user controller
export const userController = (req, res) => {
  res.status(200).send({
    ok: true,
  });
};

//admin controller
export const adminController = (req, res) => {
  res.status(200).send({
    ok: true,
  });
};

//forgotPasswordController

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Email is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    ////console.log(user);
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//update prfole
export const updateProfileController = async (req, res) => {
  //console.log("HIII req", req.body);
  try {
    // const { name, email, password, address, phone } = req.body;
    const { name } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    // if (password && password.length < 6) {
    //   return res.json({ error: "Passsword is required and 6 character long" });
    // }
    // const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        // password: hashedPassword || user.password,
        // phone: phone || user.phone,
        // address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile",
      error,
    });
  }
};

//update contact references
export const updateContactController = async (req, res) => {
  //console.log("HIII req", req.body);
  try {
    const updates = req.body;
    const user = await userModel.findById(req.user._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      updates,
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    ////console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//update contact references
export const uploadPicController = async (req, res) => {
  //console.log("request files", req.files);
  try {
    const { photo } = req.files;
    if (!photo) {
      return res
        .status(400)
        .send({ success: false, message: "No photo uploaded" });
    }
    const user = await userModel.findById(req.user._id);

    if (photo) {
      user.photo.data = fs.readFileSync(photo.path);
      user.photo.contentType = photo.type;
    }

    // const updatedUser = await userModel.findByIdAndUpdate(
    //   req.user._id,
    //   { photo: user.photo },
    //   { new: true }
    // );

    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Profile picture updated successfully",
      updatedUser,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Update profile picture",
      error,
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate({
        path: "products.product",
        select: "-photo",
      })
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Geting Orders",
      error,
    });
  }
};
//get one orders
export const getOneOrderController = async (req, res) => {
  try {
    const order = await orderModel
      .find({ _id: req.params.orderid })
      .populate({
        path: "products.product",
        select: "-photo",
      })
      .populate("buyer", "name");
    //console.log("get one orders 2", order);
    res.json(order);
  } catch (error) {
    //console.log("get one orders", error);
    res.status(500).send({
      success: false,
      message: "Error While Geting one Orders",
      error,
    });
  }
};
//all orders
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products.product", "-photo")
      .populate("buyer", "name")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    //console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//order status
// import { io } from "../server.js";
export const orderStatusController = async (req, res) => {
  try {
    //console.log("hello bruno", req.body);
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await orderModel.findById(orderId).populate("buyer");
    const product = await orderModel
      .findById(orderId)
      .populate("products.product");
    const recipientEmail = order.buyer.email;
    const recipientName = order.buyer.name;
    const recipientAddress = order.buyer.address;
    const total = order.payment.transaction.amount;
    const productId = order.products[0].product;
    const productDetails = await productModel.findById(productId);
    const arrivalDate = productDetails.freedeliveryDate;
    const noofitems = order.products.length;
    const productIds = order.products.map((item) => item.product);
    const orgprices = order.products.map((item) => item.orgprice);
    const productname = order.products.map((item) => item.productName);

    // console.log(
    //   "email here 3",
    //   recipientEmail,
    //   recipientName,
    //   recipientAddress,
    //   total,
    //   // productId,
    //   // productDetails,
    //   arrivalDate,
    //   productname,
    //   orgprices
    // );
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    //console.log("orders", orders);
    // io.emit("orderStatusUpdated", orders); // Emit the updated order status

    // shipped
    if (
      req.body.status === "Shipped" &&
      recipientEmail &&
      recipientName &&
      recipientAddress &&
      total &&
      arrivalDate
    ) {
      //console.log("recipientName", recipientName, recipientAddress, total);
      const orderDetails = {
        customerName: recipientName,
        orderId: order._id.toString(),
        arrivalDate: formatTimestampforOrder(arrivalDate),
        shippingSpeed: "Delivery",
        recipientName: recipientName,
        address: recipientAddress,
        itemSubtotal: total,
        orderTotal: total,
      };
      const emailContent = generateOrderShippedEmailContent(orderDetails);

      await sendEmail({
        service: "gmail",
        to: recipientEmail,
        subject: `Your Snapcart.in Order ${order._id.toString()} of ${noofitems} Item(s) Has Been Dispatched`,
        // subject: "Shipping Confirmation",
        html: emailContent,
      });
    }
    //out for delivery
    if (
      req.body.status === "Out For Delivery" &&
      recipientEmail &&
      recipientName &&
      recipientAddress &&
      total &&
      arrivalDate
    ) {
      //console.log("recipientName", recipientName, recipientAddress, total);
      const orderDetails = {
        customerName: recipientName,
        orderId: order._id.toString(),
        arrivalDate: formatTimestampforOrder(arrivalDate),
        shippingSpeed: "Delivery",
        recipientName: recipientName,
        address: recipientAddress,
        itemSubtotal: total,
        orderTotal: total,
      };
      const emailContent = generateOrderBeforeDeliverEmailContent(orderDetails);

      await sendEmail({
        service: "gmail",
        to: recipientEmail,
        subject: `🚚 Your Snapcart.in Order ${order._id.toString()} of ${noofitems} Item(s) is Out for Delivery!`,
        html: emailContent,
      });
    }
    //Delivered
    if (
      req.body.status === "Delivered" &&
      recipientEmail &&
      recipientName &&
      recipientAddress &&
      total &&
      arrivalDate
    ) {
      //console.log("recipientName", recipientName, recipientAddress, total);
      const orderDetails = {
        customerName: recipientName,
        orderId: order._id.toString(),
        arrivalDate: formatTimestampforOrder(arrivalDate),
        shippingSpeed: "Delivery",
        recipientName: recipientName,
        address: recipientAddress,
        itemSubtotal: total,
        orderTotal: total,
        productIds: productIds,
        orgprices: orgprices,
        productname: productname,
      };
      const emailContent = generateOrderAfterDeliverEmailContent(orderDetails);

      await sendEmail({
        service: "gmail",
        to: recipientEmail,
        subject: `📦 Your Snapcart.in Order ${order._id.toString()} Has Been Delivered!`,
        html: emailContent,
      });
    }
    //canceled by admin
    if (
      req.body.status === "Canceled" &&
      recipientEmail &&
      recipientName &&
      recipientAddress &&
      total &&
      arrivalDate
    ) {
      //console.log("recipientName", recipientName, recipientAddress, total);
      const orderDetails = {
        customerName: recipientName,
        orderId: order._id.toString(),
        arrivalDate: formatTimestampforOrder(arrivalDate),
        shippingSpeed: "Delivery",
        recipientName: recipientName,
        address: recipientAddress,
        itemSubtotal: total,
        orderTotal: total,
        cancellationReason: "Out of Stock",
      };
      const emailContent = generateCancelByAdminEmailContent(orderDetails);

      await sendEmail({
        service: "gmail",
        to: recipientEmail,
        subject: `🔔 Update: Your Snapcart.in Order ${order._id.toString()} Has Been Canceled by Admin`,
        html: emailContent,
      });
    }
    res.json(orders);
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

// forgot passwod via email validation

export const forgotPasswordControllerViaOTPvalidation = async (req, res) => {
  try {
    const { email } = req.body;
    ////console.log(email);
    // res.status(200).send({
    //   success: true,
    //   message: "Email goota",
    // });
    if (!email) {
      return res.status(200).send({ message: "Email is required" });
    }
    //check
    const oldUser = await userModel.findOne({ email });
    if (!oldUser) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    const accessToken = JWT.sign(
      { email: oldUser.email, id: oldUser._id },
      secret,
      {
        expiresIn: "5m",
      }
    );
    const link = `http://localhost:8080/api/v1/auth/reset-password/${oldUser._id}/${accessToken}`;
    ////console.log(link);

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "rajdeepbasak2000@gmail.com",
        pass: "xegxajrjlluecgdi",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: email,
      subject: "password reset",
      text: link,
    };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     ////console.log(error);
    //   } else {
    //     ////console.log("Email sent: " + info.response);
    //   }
    // });

    return res.status(200).send({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//forgot passwod recovery by OTP via email validation

export const forgotPasswordRecoveryControllerViaOTPvalidation = async (
  req,
  res
) => {
  try {
    const { email } = req.body;
    ////console.log(email);

    if (!email) {
      return res.status(200).send({ message: "Email is required" });
    }
    //check
    const oldUser = await userModel.findOne({ email });
    const oldUserinUserSocialMediaModel = await userModelSocialMedia.findOne({
      email: email,
    });

    if (oldUserinUserSocialMediaModel) {
      return res.status(200).send({
        success: false,
        message: "Log in with Google please",
      });
    }
    if (!oldUser) {
      return res.status(200).send({
        success: false,
        message: "Email is not registered",
      });
    }

    // const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // const otp = otpGenerator();
    // const hashedotp = await hashOTP(password);

    // const emailContent = generatePasswordResetEmailContent(otp);

    const oldUserModelUserId = oldUser ? oldUser._id : null;
    const oldUserinUserSocialMediaModelUserId = oldUserinUserSocialMediaModel
      ? oldUserinUserSocialMediaModel._id
      : null;

    const userId = oldUserModelUserId || oldUserinUserSocialMediaModelUserId;
    //console.log("userId2", userId.toString());
    const result = await sendOtpVerificationEmail(userId.toString(), email);

    if (result.success) {
      return res.status(200).send({
        success: true,
        message: result.message,
        userId: userId,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: result.message || "Failed to send OTP",
      });
    }
    // const newOTPverification = await new userOTPverificatioonModel({
    //   userId: userId,
    //   otp: hashedotp,
    //   createdAt: Date.now(),
    //   expiresAt: Date.now() + 300000,
    // });
    // await newOTPverification.save();

    // await sendEmail({
    //   service: "gmail",
    //   to: email,
    //   subject: "Password Reset",
    //   html: emailContent,
    // });

    // return res.status(200).send({
    //   success: true,
    //   message: "OTP sent successfully",
    //   otp,
    // });
  } catch (error) {
    ////console.log(error);
    if (error.response && error.response.status === 429) {
      return res.status(429).send({
        success: false,
        message: "Too many requests. Please try again later.",
      });
    }
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// send Otp Verification Email
const sendOtpVerificationEmail = async (userId, email) => {
  try {
    const otp = otpGenerator();
    const hashedotp = await hashOTP(otp);
    const emailContent = generatePasswordResetEmailContent(otp);
    // const istDate = new Date().toLocaleString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    // });

    const createdAtIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000); // IST is UTC + 5:30
    const expiresAtIST = new Date(createdAtIST.getTime() + 180000);
    const newOTPverification = await new userOTPverificatioonModel({
      userId: userId,
      otp: hashedotp,
      createdAt: createdAtIST,
      expiresAt: expiresAtIST,
    });
    await newOTPverification.save();
    //console.log("here", newOTPverification);
    await sendEmail({
      service: "gmail",
      to: email,
      subject: "Password Reset",
      html: emailContent,
    });
    return { success: true, message: "OTP sent successfully", userId: userId };
  } catch (error) {
    console.error("Error in send otp email verification:", error.message);
    return { success: false, message: error.message };
  }
};

//verify otp controller
// export const verifyOtpController = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;
//     //console.log("req.body", req.body);
//     if (!userId || !otp) {
//       throw Error("Empty otp details are not allowed");
//     } else {
//       const userOtpVerificationRecord = await userOTPverificatioonModel.find({
//         userId,
//       });
//       //console.log("userOtpVerificationRecord", userOtpVerificationRecord);
//       if (userOtpVerificationRecord.length === 0) {
//         throw new Error(
//           "Account record does not exist or has been verified already,Please sign in or log in"
//         );
//       } else {
//         const { expiresAt } = userOtpVerificationRecord[0];
//         const hashedotp = userOtpVerificationRecord[0].otp;

//         if (expiresAt < new Date(Date.now() + 5.5 * 60 * 60 * 1000)) {
//           //user otp record has expired
//           await userOTPverificatioonModel.deleteMany({ userId });
//           throw new Error("Code has expired,Please request again");
//         } else {
//           const validOtp =await compareOTP(otp, hashedotp);
//           //console.log("validOtp", validOtp);
//           if (!validOtp) {
//             throw new Error("Invalid code passed.Check your inbox");
//           } else {
//             await userOTPverificatioonModel.deleteMany({ userId });
//             res.json({
//               success: true,
//               message: "User email verified successfully",
//             });
//           }
//         }
//       }
//     }
//   } catch (error) {
//     //console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

//verify otp controller
export const verifyOtpController = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    console.log("req.body", req.body);

    if (!userId || !otp) {
      // throw new Error("Empty OTP details are not allowed");
      return res.status(401).send({
        success: false,
        message: "Empty OTP details are not allowed",
      });
    }

    const userOtpVerificationRecord = await userOTPverificatioonModel.find({
      $or: [{ userId: userId }, { email: userId }],
    });
    console.log("userOtpVerificationRecord", userOtpVerificationRecord);

    if (userOtpVerificationRecord.length === 0) {
      // throw new Error(
      //   "Account record does not exist or has been verified already, please sign in or log in"
      // );
      return res.status(401).send({
        success: false,
        message:
          "Account record does not exist or has been verified already, please sign in or log in",
      });
    }

    const { expiresAt } = userOtpVerificationRecord[0];
    const hashedotp = userOtpVerificationRecord[0].otp;
    console.log("expiresAt", expiresAt);
    console.log("current", new Date(Date.now() + 5.5 * 60 * 60 * 1000));
    if (expiresAt < new Date(Date.now() + 5.5 * 60 * 60 * 1000)) {
      await userOTPverificatioonModel.deleteMany({
        $or: [{ userId: userId }, { email: userId }],
      });
      // throw new Error("Code has expired, please request again");
      return res.status(401).send({
        success: false,
        message: "Code has expired, please request again",
      });
    }

    // Validate the OTP
    const validOtp = await compareOTP(otp, hashedotp); // Await here
    console.log("validOtp", validOtp);

    if (!validOtp) {
      return res.status(401).send({
        success: false,
        message: "Invalid code passed. Check your inbox",
      });
    }

    // OTP is valid, proceed with the next steps
    await userOTPverificatioonModel.deleteMany({
      $or: [{ userId: userId }, { email: userId }],
    });
    const verificationMethod = userId ? "email" : "mobile number";
    const successMessage = `User ${verificationMethod} verified successfully`;
    res.json({
      success: true,
      message: successMessage,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

//resend otp controller
export const resendOtpverifyController = async (req, res) => {
  try {
    const { userId, email, mobile } = req.body;
    //console.log("req.body 123", req.body);
    await userOTPverificatioonModel.deleteMany({ userId });
    let result;
    if (email) {
      result = await sendOtpVerificationEmail(userId, email);
    } else if (mobile) {
      result = await sendOtpVerificationMobile(mobile, userId);
    }

    // return res.status(200).send({
    //   success: true,
    //   message: "OTP sent successfully",
    //   otp,
    // });
    if (result.success) {
      return res.status(200).send({
        success: true,
        message: result.message,
        userId: userId,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: result.message || "Failed to resend OTP",
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//reset password
export const resetPasswordController = async (req, res) => {
  try {
    const { id, accessToken } = req.params;
    ////console.log(req.params);
    const oldUser = await userModel.findOne({ _id: id });
    if (!oldUser) {
      return res.status(200).send({
        success: false,
        message: "User not exists!",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = JWT.verify(accessToken, secret);
      res.render("index", { email: verify.email, status: "Not Verified" });
      // return res.status(200).send({
      //   success: true,
      //   message: "Verified",
      // });
    } catch (error) {
      ////console.log(error);
      res.status(500).send({
        success: false,
        message: "Not Verified",
        error,
      });
    }
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//after reset password
export const afterResetPasswordController = async (req, res) => {
  try {
    const { id, accessToken } = req.params;
    // ////console.log(req.params);
    const { password, cPassword } = req.body;
    ////console.log(req.body);
    // const passwordString = String(password);
    const oldUser = await userModel.findOne({ _id: id });
    ////console.log(oldUser);
    if (!oldUser) {
      return res.status(200).send({
        success: false,
        message: "User not exists!",
      });
    }
    const secret = process.env.JWT_SECRET + oldUser.password;
    try {
      const verify = JWT.verify(accessToken, secret);
      const hashedPassword = await hashPassword(password);
      ////console.log("hashedPassword", hashedPassword);
      await userModel.findByIdAndUpdate(oldUser._id, {
        password: hashedPassword,
      });
      // res.status(200).send({
      //   success: true,
      //   message: "Password updated successfully",
      // });
      res.render("index", { email: verify.email, status: "verified" });
    } catch (error) {
      ////console.log(error);
      res.status(500).send({
        success: false,
        message: "Not Verified",
        error,
      });
    }
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const resetPasswordControllerAfterOTPvalidation = async (req, res) => {
  try {
    const { otpEmail, resetPassword, confirmResetPassword } = req.body;
    if (resetPassword !== confirmResetPassword) {
      return res.status(200).send({
        success: false,
        message: "Both passwords are not same",
      });
    }
    const oldUser = await userModel.findOne({ email: otpEmail });
    ////console.log(oldUser);
    if (!oldUser) {
      return res.status(200).send({
        success: false,
        message: "User not exists!",
      });
    }
    const hashedPassword = await hashPassword(resetPassword);
    await userModel.findByIdAndUpdate(oldUser._id, {
      password: hashedPassword,
    });
    return res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

//check  mail controller

export const checkMailController = async (req, res) => {
  try {
    const { email } = req.params;
    ////console.log(req.body);
    if (!email) {
      return res.status(200).send({
        success: false,
        message: "Please Provide all inputs",
      });
    }
    const oldUserinUserModel = await userModel.findOne({ email: email });
    const oldUserinUserSocialMediaModel = await userModelSocialMedia.findOne({
      email: email,
    });
    ////console.log(oldUserinUserModel);
    ////console.log(oldUserinUserSocialMediaModel);
    if (!oldUserinUserModel && !oldUserinUserSocialMediaModel) {
      return res.status(200).send({
        success: true,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "Email already in use",
      });
    }
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
// sms otp controller
export const smsController = async (req, res) => {
  const { mobile, email } = req.body;

  try {
    // const otp = otpGenerator();
    // const smsVal = await sendSMS(
    //   mobile,
    //   "Hello from facebook.Thanks for choosing us here is your OTP",
    //   otp
    // );
    ////console.log(smsVal);
    const result = await sendOtpVerificationMobile(mobile, email);
    if (result.success) {
      return res.status(200).send({
        success: true,
        message: result.message,
      });
    } else {
      return res.status(500).send({
        success: false,
        message: result.message || "Failed to send OTP",
      });
    }
    // res.status(200).send({
    //   success: true,
    //   message: "SMS sent successfully",
    //   otp: otp,
    // });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
// send Otp Verification Mobile
const sendOtpVerificationMobile = async (mobile, email) => {
  try {
    const otp = otpGenerator();
    console.log("Otp Verification Mobile", otp);
    const hashedotp = await hashOTP(otp);

    const createdAtIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000); // IST is UTC + 5:30
    const expiresAtIST = new Date(createdAtIST.getTime() + 60000);
    const newOTPverification = await new userOTPverificatioonModel({
      email: email,
      otp: hashedotp,
      createdAt: createdAtIST,
      expiresAt: expiresAtIST,
    });
    await newOTPverification.save();
    console.log("here", newOTPverification);
    await sendSMS(
      mobile,
      "Hello from Snapcart.Thanks for choosing us here is your OTP",
      otp
    );
    return { success: true, message: "OTP sent successfully" };
  } catch (error) {
    console.error("Error in send otp mobile verification:", error.message);
    return { success: false, message: error.message };
  }
};
//controller for refreshing the token
export const refreshTokenController = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const accessToken = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    return res.status(200).send({
      success: true,
      accessToken,
    });
  } catch (error) {
    ////console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in refreshing token",
      error,
    });
  }
};

//user details
export const userDetailsController = async (req, res) => {
  const { uid } = req.params;
  try {
    const user = await userModel.findById(uid);
    return res.status(200).send({
      success: true,
      user,
    });
  } catch (error) {
    //console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in getting user information",
      error,
    });
  }
};

// get user photo
export const userPhotoController = async (req, res) => {
  try {
    const user = await userModel
      .findById({ _id: req.params.uid })
      .select("photo");
    if (user.photo.data) {
      res.set("Content-type", user.photo.contentType);
      return res.status(200).send(user.photo.data);
    }
  } catch (error) {
    //console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while user getting photo",
      error,
    });
  }
};
