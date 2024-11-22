// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const { customerName, orderId, arrivalDate, orderTotal ,productIds} = orderDetails;

//   const rateproductUrl = `http://localhost:3000/order?orderId=${orderId}&productId=${}`;

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 60px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .button {
//       display: grid;
//       padding: 10px 20px;
//       background-color: #f0c14b;
//       color: #333 !important;
//       text-decoration: none;
//       border-radius: 4px;
//       font-weight: bold;
//       margin-top: 20px;
//       text-align: center;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="http://localhost:3000/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered!</p>
//       <p>Please rate the product.</p>
//       <a href="${rateproductUrl}" class="button">Rate your product</a>
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };


// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     orderTotal,
//     productIds,
//     orgprices,
//     productname,
//   } = orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map(
//       (productId) => `
//     <div style="margin-bottom: 15px;">
//       <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//          style="display: inline-block; padding: 10px 20px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center;">
//          Rate this product
//       </a>
//     </div>
//   `
//     )
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 60px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };



// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     orderTotal,
//     productIds,
//     orgprices,
//     productname,
//   } = orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map((productId, index) => {
//       const productName = productname[index];
//       const productPrice = orgprices[index];
//       return `
//         <div style="margin-bottom: 15px; text-align: center;">
//           <img
//             src="http://localhost:8080/api/v1/product/product-photo/${productId}"
//             alt="${productName}"
//             style="width: 100px; height: auto; border-radius: 8px; margin-bottom: 8px;"
//           />
//           <p style="font-size: 14px; font-weight: bold; color: #333;">${productName}</p>
//           <p style="font-size: 14px; color: #888;">Price: ₹${productPrice.toFixed(2)}</p>
//           <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//              style="display: inline-block; padding: 10px 20px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center;">
//              Rate this product
//           </a>
//         </div>
//       `;
//     })
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 60px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };



// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     orderTotal,
//     productIds,
//     orgprices,
//     productname,
//   } = orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map((productId, index) => {
//       const productName = productname[index];
//       const productPrice = orgprices[index];
//       return `
//         <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #ddd;">
//           <!-- Image Column -->
//           <div style="width: 80px; flex-shrink: 0; margin-right: 15px;">
//             <img
//               src="http://localhost:8080/api/v1/product/product-photo/${productId}"
//               alt="${productName}"
//               style="width: 100%; height: auto; border-radius: 8px;"
//             />
//           </div>
//           <!-- Description Column -->
//           <div style="flex-grow: 1;">
//             <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${productName}</p>
//             <p style="font-size: 14px; color: #888; margin: 5px 0;">Price: ₹${productPrice.toFixed(
//               2
//             )}</p>
//           </div>
//           <!-- Rate Now Button Column -->
//           <div style="width: auto; margin-left: auto;">
//             <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//                style="display: inline-block; padding: 8px 15px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold;">
//                Rate Now
//             </a>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 40px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };



// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const { customerName, orderId, productIds, orgprices, productname } =
//     orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map((productId, index) => {
//       const productName = productname[index];
//       const productPrice = orgprices[index];
//       return `
//         <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #ddd; flex-wrap: wrap;">
//           <!-- Image Column -->
//           <div style="width: 80px; flex-shrink: 0; margin-right: 15px;">
//             <img src="http://localhost:8080/api/v1/product/product-photo/${productId}"
//               alt="${productName}"
//               style="width: 100%; height: auto; border-radius: 8px;" />
//           </div>
//           <!-- Description Column -->
//           <div style="flex-grow: 1;">
//             <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${productName}</p>
//             <p style="font-size: 14px; color: #888; margin: 5px 0;">Price: ₹${productPrice.toFixed(
//               2
//             )}</p>
//           </div>
//           <!-- Rate Now Button Column -->
//           <div style="width: auto; margin-left: auto; margin-top: 10px;">
//             <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//                style="display: inline-block; padding: 8px 15px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold;">
//                Rate Now
//             </a>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body { font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0; color: #333; }
//     .container { max-width: 600px; margin: 10px auto; padding: 40px; background-color: #fff; border: 1px solid #ddd; }
//     .header { text-align: center; padding-bottom: 20px; }
//     .header img { max-width: 150px; }
//     .content { font-size: 16px; line-height: 1.6; }
//     .content p { margin: 0 0 15px; }
//     .footer { font-size: 12px; color: #888; text-align: center; margin-top: 20px; border-top: 1px solid #ddd; padding-top: 10px; }
//     @media (max-width: 600px) {
//       .container div[style*="display: flex;"] {
//         flex-direction: column;
//         align-items: flex-start;
//       }
//       .container div[style*="margin-left: auto;"] {
//         margin-left: 0;
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };


// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     orderTotal,
//     productIds,
//     orgprices,
//     productname,
//   } = orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map((productId, index) => {
//       const productName = productname[index];
//       const productPrice = orgprices[index];
//       return `
//         <div style="display: flex; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #ddd;">
//           <!-- Image Column -->
//           <div style="width: 80px; flex-shrink: 0; margin-right: 15px;">
//             <img
//               src="http://localhost:8080/api/v1/product/product-photo/${productId}"
//               alt="${productName}"
//               style="width: 100%; height: auto; border-radius: 8px;"
//             />
//           </div>
//           <!-- Description Column -->
//           <div style="flex-grow: 1;">
//             <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${productName}</p>
//             <p style="font-size: 14px; color: #888; margin: 5px 0;">Price: ₹${productPrice.toFixed(
//               2
//             )}</p>
//           </div>
//         </div>
//         <div style="padding: 15px 0;">
//           <!-- Rate Now Button Column -->
//           <div style="width: auto; margin-left: 0;">
//             <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//                style="display: inline-block; padding: 8px 15px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold;">
//                Rate Now
//             </a>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 40px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//     @media (max-width: 600px) {
//       /* Mobile Styles */
//       .rate-button {
//         display: block;
//         margin-top: 10px; /* Add some spacing above the button */
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };


// const generateOrderAfterDeliverEmailContent = (orderDetails) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     orderTotal,
//     productIds,
//     orgprices,
//     productname,
//   } = orderDetails;

//   const snapcartUrl = "http://localhost:3000";
//   const productRatingsHTML = productIds
//     .map((productId, index) => {
//       const productName = productname[index];
//       const productPrice = orgprices[index];
//       return `
//         <div style="display: flex; align-items: center; padding: 15px 0; border-bottom: 1px solid #ddd;">
//           <!-- Image Column -->
//           <div style="width: 80px; flex-shrink: 0; margin-right: 15px;">
//             <img
//               src="http://localhost:8080/api/v1/product/product-photo/${productId}"
//               alt="${productName}"
//               style="width: 100%; height: auto; border-radius: 8px;"
//             />
//           </div>
//           <!-- Description Column -->
//           <div style="flex-grow: 1;">
//             <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${productName}</p>
//             <p style="font-size: 14px; color: #888; margin: 5px 0;">Price: ₹${productPrice.toFixed(
//               2
//             )}</p>
//           </div>
//           <!-- Rate Now Button Column -->
//           <div style="width: auto; margin-left: auto;">
//             <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
//                style="display: inline-block; padding: 8px 15px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold;">
//                Rate Now
//             </a>
//           </div>
//         </div>
//       `;
//     })
//     .join("");

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Delivery Update</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f6f6f6;
//       margin: 0;
//       padding: 0;
//       color: #333;
//     }
//     .container {
//       max-width: 600px;
//       margin: 10px auto;
//       padding: 40px;
//       background-color: #fff;
//       border: 1px solid #ddd;
//     }
//     .header {
//       text-align: center;
//       padding-bottom: 20px;
//     }
//     .header img {
//       max-width: 150px;
//     }
//     .content {
//       font-size: 16px;
//       line-height: 1.6;
//     }
//     .content p {
//       margin: 0 0 15px;
//     }
//     .footer {
//       font-size: 12px;
//       color: #888;
//       text-align: center;
//       margin-top: 20px;
//       border-top: 1px solid #ddd;
//       padding-top: 10px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
//     </div>
//     <div class="content">
//       <p>Hi ${customerName},</p>
//       <p>Your package has been delivered! Please rate each product below:</p>
//       ${productRatingsHTML}
//     </div>
//     <div class="footer">
//       <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderAfterDeliverEmailContent };


const generateOrderAfterDeliverEmailContent = (orderDetails) => {
  const {
    customerName,
    orderId,
    arrivalDate,
    orderTotal,
    productIds,
    orgprices,
    productname,
  } = orderDetails;

  const snapcartUrl = "https://snap-cart-frontend-api.vercel.app";
  const productRatingsHTML = productIds
    .map((productId, index) => {
      const productName = productname[index];
      const productPrice = orgprices[index];
      return `
        <div style="display: flex; align-items: flex-start; padding: 15px 0; border-bottom: 1px solid #ddd;">
          <!-- Image Column -->
          <div style="width: 80px; flex-shrink: 0; margin-right: 15px;">
            <img
              src="${process.env.REACT_APP_API}/api/v1/product/product-photo/${productId}"
              alt="${productName}"
              style="width: 100%; height: auto; border-radius: 8px;"
            />
          </div>
          <!-- Description Column -->
          <div style="flex-grow: 1;">
            <p style="font-size: 16px; font-weight: bold; color: #333; margin: 0;">${productName}</p>
            <p style="font-size: 14px; color: #888; margin: 5px 0;">Price: ₹${productPrice.toFixed(
              2
            )}</p>
          </div>
        </div>
        <div style="padding: 15px 0;">

          <div style="width: auto; margin-left: 0;">
            <a href="${snapcartUrl}/order?orderId=${orderId}&productId=${productId}"
               style="display: inline-block; padding: 8px 15px; background-color: #f0c14b; color: #333; text-decoration: none; border-radius: 4px; font-weight: bold;">
               Rate Now
            </a>
          </div>
        </div>
      `;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Delivery Update</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f6f6;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 10px auto;
      padding: 40px;
      background-color: #fff;
      border: 1px solid #ddd;
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
    }
    .header img {
      max-width: 150px;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
    }
    .content p {
      margin: 0 0 15px;
    }
    .footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
    @media (max-width: 600px) {
      /* Mobile Styles */
      .rate-button {
        display: block;
        margin-top: 10px; /* Add some spacing above the button */
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${snapcartUrl}/logo.png" alt="Snapcart.in">
    </div>
    <div class="content">
      <p>Hi ${customerName},</p>
      <p>Your package has been delivered! Please rate each product below:</p>
      ${productRatingsHTML}
    </div>
    <div class="footer">
      <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
    </div>
  </div>
</body>
</html>`;
};

export { generateOrderAfterDeliverEmailContent };
