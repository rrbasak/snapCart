import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";
// import { renewToken } from "../utils/renewTokenUtil.js";

// export const requireSignIn = async (req, res, next) => {
//     ////console.log("request here",req);
//     ////console.log("response here",res);
//     try {
//         // const accessToken = req.cookies.accessToken;
//         // if(!accessToken){
//         //     if(renewToken(req,res)){
//         //         next();
//         //     }
//         // }
//         // else{
//         //     const decode = await JWT.verify(
//         //       req.headers.authorization,
//         //       process.env.JWT_SECRET
//         //     );
//         //     ////console.log("decode", decode);
//         //     req.user = decode;
//         //     next();
//         // }
//         const decode = await JWT.verify(
//           req.headers.authorization,
//           process.env.JWT_SECRET
//         );
//         ////console.log("decode", decode);
//         req.user = decode;
//         next();

//     } catch (error) {
//         ////console.log("error",error);
//          next(error);
//     }
// }

export const requireSignIn = async (req, res, next) => {
  try {
    const decode = await JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    //console.log(error);
    next(error);
  }
};

// export const requireSignIn = async (req, res, next) => {
//   ////console.log("request here", req);
//   ////console.log("response here", res);
//   ////console.log("cookie", req.cookies.accessToken);
//   try {
//     let accessToken = req.cookies.accessToken;
//     if (!accessToken) {
//       if (renewToken(req, res)) {
//         accessToken = req.cookies.accessToken;
//       } else {
//         return res.status(401).send({
//           success: false,
//           message: "Unauthorized",
//         });
//       }
//     }
//     const decode = await JWT.verify(accessToken, process.env.JWT_SECRET);
//     ////console.log("decode", decode);
//     req.user = decode;
//     next();
//   } catch (error) {
//     ////console.log("error", error);
//     next(error);
//   }
// };

// export const requireSignIn = async (req, res, next) => {
//   ////console.log("request here", req);
//   ////console.log("response here", res);
//   ////console.log("cookie", req.cookies);

//   try {
//     let accessToken = req.cookies.accessToken;
//     //console.log("accessToken 10", accessToken);
//     //console.log("req.headers.authorization", req.headers.authorization);
//     if (!accessToken) {
//         //console.log("accessToken 11", accessToken);
//       if (renewToken(req, res)) {
//         accessToken = req.cookies.accessToken;
//         //console.log("accessToken 12", accessToken);
//         // return res.status(200).send({
//         //   success: true,
//         //   message: "Generated access token again",
//         // });
//         next();
//       }
//     }

//     else{
//         //console.log("req.headers.authorization 10", req.headers.authorization);
//         JWT.verify(req.headers.authorization, process.env.JWT_SECRET, async (err, decode) => {
//           if (err) {
//             return res.status(401).send({
//               success: false,
//               message: "Unauthorized 10",
//             });
//           } else {
//             //console.log("else", req.headers.authorization);
//             req.user = decode;
//             next();
//           }
//         });
//     }
//   } catch (error) {
//     ////console.log("error", error);
//     next(error);
//   }
// };

// export const requireSignIn = async (req, res, next) => {
//   try {
//     let accessToken = req.cookies.accessToken;
//     if (!accessToken) {
//       const renewed = await renewToken(req, res);
//       if (renewed) {
//         accessToken = req.cookies.accessToken;
//         next();
//       } else {
//         return res.status(401).send({
//           success: false,
//           message: "Unauthorized - No Access Token",
//         });
//       }
//     } else {
//       JWT.verify(accessToken, process.env.JWT_SECRET, (err, decode) => {
//         if (err) {
//           const renewed = renewToken(req, res);
//           if (renewed) {
//             accessToken = req.cookies.accessToken;
//             next();
//           } else {
//             return res.status(401).send({
//               success: false,
//               message: "Unauthorized - Invalid Access Token",
//             });
//           }
//         } else {
//           req.user = decode;
//           next();
//         }
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized access",
      });
    } else {
      next();
    }
  } catch (error) {
    ////console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in admin middleware",
      error: error,
    });
  }
};

// // Middleware to verify the refresh token
// export const verifyRefreshToken = (req, res, next) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) {
//     return res.status(403).send({
//       success: false,
//       message: "Access Denied: No Token Provided!",
//     });
//   }

//   JWT.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).send({
//         success: false,
//         message: "Invalid Refresh Token",
//       });
//     }

//     req.userId = decoded._id;
//     next();
//   });
// };

export const errorMiddleware = (err, req, res, next) => {
  ////console.log(err);
  return res.status(500).send({
    success: false,
    message: "I think the token expired",
    error: err.message || err,
  });
};
