import {
  comparePassword,
  hashOTP,
  hashPassword,
  compareOTP,
} from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import userModelSocialMedia from "../models/userModelSocialMedia.js";
import deliveryPartnerModel from "../models/deliveryPartnerModel.js";
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
import formatTimestampforOrder from "../utils/dateUtlFoOrder.js";
import productModel from "../models/productModel.js";
import { generateOrderBeforeDeliverEmailContent } from "../templates/orderBeforeDeliverEmailTemplate.js";
import { generateOrderAfterDeliverEmailContent } from "../templates/orderAfterDeliverEmailTemplate.js";
import { generateCancelByAdminEmailContent } from "../templates/cancelByAdminTemplate.js";
import NotificationModel from "../models/notificationModel.js";
import { generateUserWelcomeContent } from "../templates/userWelcomeTemplate.js";
import { generateEmailVerificationOTPContent } from "../templates/emailVerificationTemplate.js";
import { generateDeliveryPartnerWelcomeContent } from "../templates/deliverypartnerWelcomeTemplate.js";
import generateInvoice from "../templates/generateInvoice.js";

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
      return res.status(409).send({
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
    const notification = await new NotificationModel({
      title: "Welcome to SnapCart 🎉",
      message: `Hello ${name}, welcome to our platform! 🚀`,
      recipient: "users",
      status: "unread",
      type: "system",
      recipientId: user?._id,
    }).save();
    const userDetails = req.body;
    const emailContent = generateUserWelcomeContent(userDetails);

    await sendEmail({
      service: "gmail",
      to: email,
      subject: `🎉 Welcome to Snapcart, ${name}! 🚀`,
      html: emailContent,
    });
    return res.status(200).send({
      success: "true",
      message: "User registered successfully",
      user: user,
    });
  } catch (error) {
    ////console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while registering",
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
    // console.log("olduser", olduser);
    const oldSocialMediauser = await userModelSocialMedia.findOne({ email });
    const deliveryPartner = await deliveryPartnerModel.findOne({ email });
    if (!olduser && !oldSocialMediauser && !deliveryPartner) {
      return res.send({
        success: false,
        message: "Email is not registered",
      });
    }
    if (oldSocialMediauser) {
      return res.status(200).send({
        success: false,
        message:
          "You have signed up with Google.So login with your Google account",
      });
    }
    // const userMatch = await comparePassword(password, olduser.password);
    // const deliveryPartnerMatch  = await comparePassword(password, deliveryPartner.password);

    // if (!userMatch || !deliveryPartnerMatch) {
    //   return res.send({
    //     success: false,
    //     message: "Invalid Password",
    //   });
    // }
    const userMatch = olduser
      ? await comparePassword(password, olduser.password)
      : false;
    const deliveryPartnerMatch = deliveryPartner
      ? await comparePassword(password, deliveryPartner.password)
      : false;

    if (!userMatch && !deliveryPartnerMatch) {
      return res.send({
        success: false,
        message: "Invalid Password",
      });
    }
    //accessToken
    const data = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`
    );
    ////console.log("success Data", data);
    if (data.status === 200) {
      const loggedInUser = olduser || deliveryPartner;
      const accessToken = JWT.sign(
        { _id: loggedInUser._id },
        process.env.JWT_SECRET,
        {
          // expiresIn: "1m",
          expiresIn: "7d",
        }
      );
      // const refreshToken = JWT.sign(
      //   { _id: olduser._id },
      //   process.env.JWT_SECRET,
      //   {
      //     expiresIn: "1h",
      //   }
      // );

      // res.cookie("accessToken", accessToken, { maxAge: 60000 });

      // res.cookie("refreshToken", refreshToken, {
      //   maxAge: 3600000,
      //   httpOnly: true,
      //   // secure: process.env.NODE_ENV === "production",
      //   secure: true,
      //   sameSite: "strict",
      // });

      let responseUser = {
        _id: loggedInUser._id,
        name: loggedInUser.name,
        email: loggedInUser.email,
        phone: loggedInUser.phone,
        address: loggedInUser.address,
        role: loggedInUser.role,
        city: loggedInUser.city,
        state: loggedInUser.state,
        country: loggedInUser.country,
        createdAt: loggedInUser.createdAt,
        photo: loggedInUser.photo,
      };

      if (deliveryPartnerMatch) {
        responseUser = {
          ...responseUser,
          vehicleType: deliveryPartner.vehicleType,
          vehicleModel: deliveryPartner.vehicleModel,
          registrationNumber: deliveryPartner.registrationNumber,
          vehicleColor: deliveryPartner.vehicleColor,
          ownerName: deliveryPartner.ownerName,
          drivingLicenseNumber: deliveryPartner.drivingLicenseNumber,
          insuranceProvider: deliveryPartner.insuranceProvider,
          policyNumber: deliveryPartner.policyNumber,
          expiryDate: deliveryPartner.expiryDate,
          drivingLicenseFile: deliveryPartner.drivingLicenseFile,
          vehicleRegistrationFile: deliveryPartner.vehicleRegistrationFile,
          insuranceFile: deliveryPartner.insuranceFile,
        };
      }
      // return res.status(200).send({
      //   success: true,
      //   message: "login successfully",
      //   user: {
      //     _id: olduser._id,
      //     name: olduser.name,
      //     email: olduser.email,
      //     phone: olduser.phone,
      //     address: olduser.address,
      //     role: olduser.role,
      //     city: olduser.city,
      //     state: olduser.state,
      //     country: olduser.country,
      //     createdAt: olduser.createdAt,
      //     photo: olduser.photo,
      //   },
      //   accessToken,
      // });
      return res.status(200).send({
        success: true,
        message: "Login successful",
        user: responseUser,
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

//update profile picture
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

//delete profile picture
export const deletePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    user.photo.data = undefined;
    user.photo.contentType = undefined;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "Profile picture deleted successfully",
      updatedUser,
    });
  } catch (error) {
    //console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Delete profile picture",
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
      .populate("partner", "name")
      .sort({ updatedAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error while geting orders",
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
    console.log("order", order);
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
    console.log("error", error);
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
    const link = `${process.env.REACT_APP_API}/api/v1/auth/reset-password/${oldUser._id}/${accessToken}`;
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
    const oldUser =
      (await userModel.findOne({ email })) ||
      (await deliveryPartnerModel.findOne({ email }));
    const oldUserinUserSocialMediaModel = await userModelSocialMedia.findOne({
      email: email,
    });
    // console.log("oldUser", oldUser);
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
    const expiresAtIST = new Date(createdAtIST.getTime() + 120000);
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
    return {
      success: true,
      message: "OTP resent successfully",
      userId: userId,
    };
  } catch (error) {
    console.error("Error in send otp email verification:", error.message);
    return { success: false, message: error.message };
  }
};
// send Otp Verification Register Email
const sendOtpVerificationForRegisterEmail = async (email) => {
  try {
    const otp = otpGenerator();
    const hashedotp = await hashOTP(otp);
    const emailContent = generateEmailVerificationOTPContent(otp);
    const createdAtIST = new Date(Date.now() + 5.5 * 60 * 60 * 1000);
    const expiresAtIST = new Date(createdAtIST.getTime() + 120000);
    const newOTPverification = await new userOTPverificatioonModel({
      email: email,
      otp: hashedotp,
      createdAt: createdAtIST,
      expiresAt: expiresAtIST,
    });
    await newOTPverification.save();
    await sendEmail({
      service: "gmail",
      to: email,
      subject: "Email Verification",
      html: emailContent,
    });
    return { success: true, message: "OTP resent successfully" };
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
export const verifySmsOtpController = async (req, res) => {
  try {
    const { userId, otp } = req.body;
    // console.log("req.body", req.body);

    // if (!userId || !otp) {
    //   // throw new Error("Empty OTP details are not allowed");
    //   return res.status(401).send({
    //     success: false,
    //     message: "Empty OTP details are not allowed",
    //   });
    // }

    // const userOtpVerificationRecord = await userOTPverificatioonModel.find({
    //   $or: [{ userId: userId }, { email: userId }],
    // });
    // console.log("userOtpVerificationRecord", userOtpVerificationRecord);

    // if (userOtpVerificationRecord.length === 0) {
    //   // throw new Error(
    //   //   "Account record does not exist or has been verified already, please sign in or log in"
    //   // );
    //   return res.status(401).send({
    //     success: false,
    //     message:
    //       "Account record does not exist or has been verified already, please sign in or log in",
    //   });
    // }

    // const { expiresAt } = userOtpVerificationRecord[0];
    // const hashedotp = userOtpVerificationRecord[0].otp;
    // console.log("expiresAt", expiresAt);
    // console.log("current", new Date(Date.now() + 5.5 * 60 * 60 * 1000));
    // if (expiresAt < new Date(Date.now() + 5.5 * 60 * 60 * 1000)) {
    //   await userOTPverificatioonModel.deleteMany({
    //     $or: [{ userId: userId }, { email: userId }],
    //   });
    //   // throw new Error("Code has expired, please request again");
    //   return res.status(401).send({
    //     success: false,
    //     message: "Code has expired, please request again",
    //   });
    // }

    // // Validate the OTP
    // const validOtp = await compareOTP(otp, hashedotp); // Await here
    // // console.log("validOtp", validOtp);

    // if (!validOtp) {
    //   return res.status(401).send({
    //     success: false,
    //     message: "Invalid code passed. Check your inbox",
    //   });
    // }

    // // OTP is valid, proceed with the next steps
    // await userOTPverificatioonModel.deleteMany({
    //   $or: [{ userId: userId }, { email: userId }],
    // });
    // const verificationMethod = userId ? "email" : "mobile number";
    const successMessage = `User mobile number verified successfully`;
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

//verify register email otp controller
export const verifyEmailOtpController = async (req, res) => {
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
    // console.log("validOtp", validOtp);

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

    const successMessage = "User email verified successfully";
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

//resend register email otp controller
export const resendRegisterEmailOtpverifyController = async (req, res) => {
  try {
    const { email } = req.body;

    await userOTPverificatioonModel.deleteMany({ email });
    let result;
    if (email) {
      result = await sendOtpVerificationForRegisterEmail(email);
    }

    if (result.success) {
      return res.status(200).send({
        success: true,
        message: result.message,
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
    const deliveryPartner = await deliveryPartnerModel.findOne({
      email: otpEmail,
    });
    console.log("oldUser", oldUser);
    console.log("deliveryPartner", deliveryPartner);
    if (!oldUser && !deliveryPartner) {
      return res.status(200).send({
        success: false,
        message: "User not exists!",
      });
    }
    const hashedPassword = await hashPassword(resetPassword);
    if (oldUser) {
      await userModel.findByIdAndUpdate(oldUser._id, {
        password: hashedPassword,
      });
    } else if (deliveryPartner) {
      await deliveryPartnerModel.findByIdAndUpdate(deliveryPartner._id, {
        password: hashedPassword,
      });
    } else {
      return res.status(200).send({
        success: false,
        message: "User not exists!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Password Updated Successfully",
    });
  } catch (error) {
    // console.log("error", error);
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
export const smsOTPController = async (req, res) => {
  const { mobile, email } = req.body;

  try {
    // const result = await sendOtpVerificationMobile(mobile, email);
    // if (result.success) {
    //   return res.status(200).send({
    //     success: true,
    //     message: result.message,
    //   });
    // }
    if (true) {
      return res.status(200).send({
        success: true,
        message: "OTP sent successfully",
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
export const emailOTPController = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await sendOtpVerificationForRegisterEmail(email);
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
// add delivrey partner
// export const deliverytPartnerRegisterController = async (req, res) => {
//   console.log("req body", req.fields);
//   console.log("res here", req.files);
//   try {
//     const { email, password } = req.fields;
//     const { drivingLicenseFile, vehicleRegistrationFile, insuranceFile } =
//       req.fields;

//     const existingDeliveryPartner = await deliveryPartnerModel.findOne({
//       email,
//     });
//     if (existingDeliveryPartner) {
//       return res.status(409).send({
//         success: false,
//         message: "Already exists login please",
//       });
//     }

//     //register user
//     const hashedPassword = await hashPassword(password);

//     const deliveryPartner = await new deliveryPartnerModel({
//       ...req.fields,
//       password: hashedPassword,
//     });
//     if (drivingLicenseFile) {
//       deliveryPartner.drivingLicenseFile.data = fs.readFileSync(drivingLicenseFile.path);
//       deliveryPartner.drivingLicenseFile.contentType = drivingLicenseFile.type;
//     }
//     if (vehicleRegistrationFile) {
//       deliveryPartner.vehicleRegistrationFile.data = fs.readFileSync(
//         vehicleRegistrationFile.path
//       );
//       deliveryPartner.vehicleRegistrationFile.contentType =
//         vehicleRegistrationFile.type;
//     }
//     if (insuranceFile) {
//       deliveryPartner.insuranceFile.data = fs.readFileSync(insuranceFile.path);
//       deliveryPartner.insuranceFile.contentType = insuranceFile.type;
//     }
//     await deliveryPartner.save();
//     res.status(201).send({
//       success: true,
//       message: "User registered successfully",
//       user: deliveryPartner,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({
//       success: false,
//       message: "Error while registering",
//       error:error,
//     });
//   }
// };
export const deliverytPartnerRegisterController = async (req, res) => {
  try {
    const { email, password } = req.fields;
    const { drivingLicenseFile, vehicleRegistrationFile, insuranceFile } =
      req.files;
    console.log("req.files", req.files);
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing fields" });
    }

    const hashedPassword = await hashPassword(password);
    const deliveryPartner = new deliveryPartnerModel({
      ...req.fields,
      password: hashedPassword,
    });

    if (drivingLicenseFile) {
      deliveryPartner.drivingLicenseFile = {
        data: fs.readFileSync(drivingLicenseFile.path),
        contentType: drivingLicenseFile.type,
      };
    }

    if (vehicleRegistrationFile) {
      deliveryPartner.vehicleRegistrationFile = {
        data: fs.readFileSync(vehicleRegistrationFile.path),
        contentType: vehicleRegistrationFile.type,
      };
    }

    if (insuranceFile) {
      deliveryPartner.insuranceFile = {
        data: fs.readFileSync(insuranceFile.path),
        contentType: insuranceFile.type,
      };
    }

    await deliveryPartner.save();
    const notification = await new NotificationModel({
      title: "Welcome to SnapCart 🎉",
      message: `Hello ${deliveryPartner?.name}, welcome to our platform! 🚀`,
      recipient: "delivery_partner",
      status: "unread",
      type: "system",
      recipientId: deliveryPartner?._id,
    }).save();

    const emailContent = generateDeliveryPartnerWelcomeContent(deliveryPartner);

    await sendEmail({
      service: "gmail",
      to: email,
      subject: `🎉 Welcome to Snapcart, ${deliveryPartner?.name}! 🚀`,
      html: emailContent,
    });
    res.status(201).send({
      success: true,
      message: "Delivery Partner Registered Successfully",
      deliveryPartner,
    });
  } catch (error) {
    console.error("Error in registration", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// // add delivrey partner
// export const deliverytPartnerRegisterController = async (req, res, fields, files) => {
//   console.log("fields:", fields);
//   console.log("files:", files);
//   try {
//     const { email, password } = fields;
//     const { drivingLicenseFile, vehicleRegistrationFile, insuranceFile } = files;

//     const existingDeliveryPartner = await deliveryPartnerModel.findOne({
//       email,
//     });
//     if (existingDeliveryPartner) {
//       return res.status(409).send({
//         success: false,
//         message: "Already exists, please login",
//       });
//     }

//     // Register user
//     const hashedPassword = await hashPassword(password);

//     const deliveryPartner = await new deliveryPartnerModel({
//       ...fields,
//       password: hashedPassword,
//     });

//     // Handle files if present
//     if (drivingLicenseFile) {
//       deliveryPartner.drivingLicenseFile.data = fs.readFileSync(drivingLicenseFile[0].path);
//       deliveryPartner.drivingLicenseFile.contentType = drivingLicenseFile[0].type;
//     }
//     if (vehicleRegistrationFile) {
//       deliveryPartner.vehicleRegistrationFile.data = fs.readFileSync(vehicleRegistrationFile[0].path);
//       deliveryPartner.vehicleRegistrationFile.contentType = vehicleRegistrationFile[0].type;
//     }
//     if (insuranceFile) {
//       deliveryPartner.insuranceFile.data = fs.readFileSync(insuranceFile[0].path);
//       deliveryPartner.insuranceFile.contentType = insuranceFile[0].type;
//     }

//     await deliveryPartner.save();
//     res.status(201).send({
//       success: true,
//       message: "User registered successfully",
//       user: deliveryPartner,
//     });
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).send({
//       success: false,
//       message: "Error while registering",
//       error: error,
//     });
//   }
// };

//GET ALL DELIVERY PARTNER
export const getAllDeliveryPartnersController = async (req, res) => {
  try {
    const deliveryPartner = await deliveryPartnerModel.find({});
    res.status(200).send({
      success: true,
      deliveryPartner,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error while getting delivery partner",
      error,
    });
  }
};

// Controller to assign a partner to an order
export const assignPartnerController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { partner } = req.body;

    if (!partner) {
      return res
        .status(400)
        .send({ success: false, message: "Partner is required" });
    }

    // Count the orders assigned to the partner for today
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const partnerAssignments = await orderModel.countDocuments({
      partner,
      updatedAt: { $gte: startOfDay, $lte: endOfDay },
    });

    if (partnerAssignments > 10) {
      return res.status(400).send({
        success: false,
        message: "Partner has reached the maximum delivery limit for today",
      });
    }

    // Assign the partner to the order
    const order = await orderModel.findByIdAndUpdate(
      orderId,
      { partner },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .send({ success: false, message: "Order not found" });
    }

    const productsName = order?.products?.map((o) => o.productName).join(",");
    const notification = new NotificationModel({
      title: "New Delivery",
      message: `You have been assigned to deliver the following orders: ${productsName}.`,
      recipient: "delivery_partner",
      status: "unread",
      type: "delivery_update",
      recipientId: partner,
    });

    await notification.save();
    res
      .status(200)
      .send({ success: true, message: "Partner assigned successfully", order });
  } catch (error) {
    console.error("Error in assigning partner:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

// export const getAvailableDeliveryPartnersController = async (req, res) => {
//   try {
//     const today = new Date();
//     const startOfDay = new Date(today.setHours(0, 0, 0, 0));
//     const endOfDay = new Date(today.setHours(23, 59, 59, 999));

//     const orders = await orderModel.aggregate([
//       { $match: { createdAt: { $gte: startOfDay, $lte: endOfDay } } },
//       { $group: { _id: "$partner", count: { $sum: 1 } } },
//     ]);

//     const partnerCounts = orders.reduce((acc, order) => {
//       acc[order._id] = order.count;
//       return acc;
//     }, {});

//     // Fetch all partners and check their availability
//     const deliveryPartner = await deliveryPartnerModel.find({});
//     const allPartners = deliveryPartner;
//     console.log("allPartners", allPartners);
//     console.log("deliveryPartner", deliveryPartner);
//     const availablePartners = allPartners.map((partner) => ({
//       name: partner?.name,
//       id: partner?._id,
//       remaining: 3 - (partnerCounts[partner?._id.toString()] || 0),
//     }));

//     res.status(200).send({ success: true, availablePartners });
//   } catch (error) {
//     console.error("Error fetching available partners:", error);
//     res.status(500).send({ success: false, message: "Internal Server Error" });
//   }
// };

export const getAvailableDeliveryPartnersController = async (req, res) => {
  try {
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    const orders = await orderModel.aggregate([
      { $match: { updatedAt: { $gte: startOfDay, $lte: endOfDay } } },
      { $group: { _id: "$partner", count: { $sum: 1 } } },
    ]);

    const partnerCounts = orders.reduce((acc, order) => {
      acc[order._id] = order.count;
      return acc;
    }, {});

    console.log("partnerCounts", partnerCounts);
    const deliveryPartners = await deliveryPartnerModel.find({
      status: "Online",
    });
    const availablePartners = deliveryPartners.map((partner) => ({
      name: partner.name,
      id: partner._id,
      remaining: 10 - (partnerCounts[partner._id.toString()] || 0),
    }));

    res.status(200).send({ success: true, availablePartners });
  } catch (error) {
    console.error("Error fetching available partners:", error);
    res.status(500).send({ success: false, message: "Internal Server Error" });
  }
};

//all pending orders
export const getAllPendingApprovalOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({
        $or: [
          { deliverystatus: "Pending Approval" },
          // { deliverystatus: "Rejected" },
        ],
      })
      .populate("products.product", "-photo")
      .populate("buyer", "name")
      .populate("partner", "name phone")
      .sort({ updatedAt: -1 });
    res.status(200).send({ success: true, orders });
  } catch (error) {
    //console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};
//update delivery order status
export const deliveryOrderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { deliverystatus } = req.body;
    const pendingorder = await orderModel
      .findById(orderId)
      .populate("buyer")
      .populate("partner");
    const recipientEmail = pendingorder.buyer.email;
    const recipientName = pendingorder.buyer.name;
    const recipientAddress = pendingorder.buyer.address;
    const total = pendingorder.payment.transaction.amount;
    const productId = pendingorder.products[0].product;
    const productDetails = await productModel.findById(productId);
    const arrivalDate = productDetails.freedeliveryDate;
    const noofitems = pendingorder.products.length;
    const productIds = pendingorder.products.map((item) => item.product);
    const orgprices = pendingorder.products.map((item) => item.orgprice);
    const productname = pendingorder.products.map((item) => item.productName);
    if (
      !["Pending Approval", "Approved", "Rejected"].includes(deliverystatus)
    ) {
      return res.status(400).send({
        success: false,
        message: "Invalid delivery status value",
      });
    }

    let updateFields = { deliverystatus };

    if (deliverystatus === "Approved") {
      updateFields.status = "Delivered";
      const orderDetails = {
        customerName: recipientName,
        orderId: pendingorder._id.toString(),
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
        subject: `📦 Your Snapcart.in Order ${pendingorder._id.toString()} Has Been Delivered!`,
        html: emailContent,
      });
      const productNames = pendingorder.products
        .map((item) => item.productName)
        .join(",");
      const notification = new NotificationModel({
        title: "Order Delivered 📦",
        message: `✅ You successfully delivered order ${productNames}. Great work! 🎉`,
        recipient: "delivery_partner",
        recipientId: pendingorder?.partner?._id,
        type: "delivery_update",
      });
      await notification.save();
      const order = await orderModel.findByIdAndUpdate(orderId, updateFields, {
        new: true,
      });

      if (!order) {
        return res.status(404).send({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).send({
        success: true,
        message: `Order delivery status updated to ${deliverystatus}`,
        order,
      });
    } else {
      updateFields.status = "Canceled";
      const productNames = pendingorder.products
        .map((item) => item.productName)
        .join(",");
      const notification = new NotificationModel({
        title: "Delivery Failed ⚠️",
        message: `⚠️ The delivery for ${productNames} could not be completed. Please verify the order details and delivery address.`,
        recipient: "delivery_partner",
        recipientId: pendingorder?.partner?._id,
        type: "delivery_update",
      });
      await notification.save();
      const order = await orderModel.findByIdAndUpdate(orderId, updateFields, {
        new: true,
      });

      if (!order) {
        return res.status(404).send({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).send({
        success: false,
        message: `Order delivery status updated to ${deliverystatus}`,
        order,
      });
    }
  } catch (error) {
    console.error("Error updating delivery status", error);
    res.status(500).send({
      success: false,
      message: "Error updating delivery status",
      error,
    });
  }
};

export const getPartnerStatusController = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    console.log("deliveryId", deliveryId);

    const delivery = await deliveryPartnerModel.findById(deliveryId);
    console.log("delivery", delivery);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found" });
    }

    return res.status(200).json(delivery);
  } catch (error) {
    console.error("Error fetching delivery:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const downloadInvoiceController = async (req, res) => {
  try {
    const { order, address } = req.body;

    if (!order || !order._id) {
      return res.status(400).json({ error: "Invalid order data" });
    }

    const pdfBuffer = await generateInvoice(order, address);

    res
      .writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice_${order._id}.pdf`,
        "Content-Length": pdfBuffer.length,
      })
      .end(pdfBuffer);
  } catch (error) {
    console.error("Invoice generation error:", error);
    res.status(500).json({ error: "Failed to generate invoice" });
  }
};