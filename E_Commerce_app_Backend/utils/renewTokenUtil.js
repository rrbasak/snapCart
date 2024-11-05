// export const renewToken = (req, res) => {
//   ////console.log("renew",req);
// //   const data = localStorage.getItem("auth");
// //   let parseData;
// //   if (data) {
// //     parseData = JSON.parse(data);
// //   }
// //   const _id = parseData.user._id;
//   const refreshToken = req.cookies.refreshToken;
//   let exist = false;
//   if (!refreshToken) {
//     return res.status(500).send({
//       success: false,
//       message: "No Refresh Token",
//     });
//   } else {
//     const decode = JWT.verify(
//       refreshToken,
//       process.env.JWT_SECRET,
//       (err, decode) => {
//         if (err) {
//           return res.status(500).send({
//             success: false,
//             message: "Invalid Refresh Token",
//           });
//         } else {
//           const accessToken = JWT.sign({ _id: _id }, process.env.JWT_SECRET, {
//             expiresIn: "60s",
//           });
//           res.cookie("accessToken", accessToken);

//           // Update localStorage
//         //   parseData.accessToken = accessToken;
//         //   localStorage.setItem("auth", JSON.stringify(parseData));

//         //   // Update request header
//         //   req.headers.authorization = accessToken;
//           res.setHeader("new-access-token", accessToken);
//           exist = true;
//         }
//       }
//     );
//   }
//   return exist;
// };

// import JWT from "jsonwebtoken";

// export const renewToken = (req, res) => {
//   ////console.log("renew", req);
//   let exist = false;
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     return res.status(500).send({
//       success: false,
//       message: "No Refresh Token",
//     });
//   } else {
//     //console.log("else in renew token");
//     JWT.verify(refreshToken, process.env.JWT_SECRET, (err, decode) => {
//       //console.log("decode", decode);
//       if (err) {
//         return res.status(500).send({
//           success: false,
//           message: "Invalid Refresh Token",
//         });
//       } else {
//         //console.log("else in renew token part 2");
//         const _id = decode._id;
//         const accessToken = JWT.sign({ _id: _id }, process.env.JWT_SECRET, {
//           expiresIn: "1m",
//         });
//         //console.log("else in renew token part 3");
//         res.cookie("accessToken", accessToken, { maxAge: 60000 });
//         //console.log("accessToken add header", accessToken);
//         res.setHeader("new-access-token", accessToken);
//         exist = true;
//       }
//     });
//   }
//   return exist;
// };

// import JWT from "jsonwebtoken";

// export const renewToken = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) {
//     res.status(401).send({
//       success: false,
//       message: "Unauthorized - No Refresh Token",
//     });
//     return false;
//   } else {
//     try {
//       const decode = JWT.verify(refreshToken, process.env.JWT_SECRET);
//       const _id = decode._id;
//       const newAccessToken = JWT.sign({ _id: _id }, process.env.JWT_SECRET, {
//         expiresIn: "1m",
//       });
//       res.cookie("accessToken", newAccessToken, {
//         maxAge: 60000,
//         httpOnly: true,
//       });
//       res.setHeader("new-access-token", newAccessToken);
//       return true;
//     } catch (err) {
//       res.status(401).send({
//         success: false,
//         message: "Unauthorized - Invalid Refresh Token",
//       });
//       return false;
//     }
//   }
// };
