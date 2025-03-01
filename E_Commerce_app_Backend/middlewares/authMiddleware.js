import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
import deliveryPartnerModel from "../models/deliveryPartnerModel.js";

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    ////console.log(error);
    next(error);
  }
};

// user access
export const isUser = async (req, res, next) => {
  //console.log("reqUser11", req.user);

  try {
    const user = await userModel.findById(req.user._id);
    //console.log("User", user);
    if (user.role !== 0) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      //console.log("Access granted");
      next();
    }
  } catch (error) {
    //console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in user middleware",
      error: error,
    });
  }
};
// admin access
export const isAdmin = async (req, res, next) => {
  //console.log("reqAdmin", req.user);
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    //////console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error,
    });
  }
};
// delivery partner access
export const isDeliveryPartner = async (req, res, next) => {
  // //console.log("reqPartner", req.user);
  try {
    const user = await deliveryPartnerModel.findById(req.user._id);
    if (user.role !== 2) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error in delivery partner middleware",
      error: error,
    });
  }
};

export const isUserOrDeliveryPartner = async (req, res, next) => {
  try {
    const user =
      (await userModel.findById(req.user._id)) ||
      (await deliveryPartnerModel.findById(req.user._id));

    if (!user || (user.role !== 0 && user.role !== 2)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in role verification middleware",
      error,
    });
  }
};

export const errorMiddleware = (err, req, res, next) => {
  return res.status(500).send({
    success: false,
    message: "I think the token expired",
    error: err.message || err,
  });
};
