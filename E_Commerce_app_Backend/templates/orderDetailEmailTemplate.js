// const generateOrderEmailContent = (orderDetails) => {
//   const { customerName, orderId, arrivalDate, shippingSpeed, recipientName, address, itemSubtotal, shippingCost, orderTotal, paymentPending } = orderDetails;

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Confirmation</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       background-color: #ffffff;
//       margin: 0 auto;
//       padding: 20px;
//       max-width: 600px;
//       border: 1px solid #e2e2e2;
//     }
//     .header {
//       display: flex;
//       align-items: center;
//       padding-bottom: 20px;
//       border-bottom: 1px solid #e2e2e2;
//     }
//     .header img {
//       margin-right: 10px;
//     }
//     .header a {
//       font-size: 14px;
//       color: #0046ad;
//       text-decoration: none;
//       margin-left: auto;
//     }
//     .greeting {
//       font-size: 18px;
//       color: #333333;
//     }
//     .details {
//       background-color: #f8f8f8;
//       padding: 15px;
//       margin-top: 20px;
//       border: 1px solid #e2e2e2;
//     }
//     .details p {
//       margin: 5px 0;
//       color: #333333;
//       font-size: 14px;
//     }
//     .details .arrival-date {
//       color: #008000;
//       font-weight: bold;
//       font-size: 16px;
//     }
//     .button {
//       display: inline-block;
//       background-color: #ff9900;
//       color: #ffffff;
//       padding: 10px 15px;
//       text-decoration: none;
//       border-radius: 3px;
//       margin-top: 10px;
//     }
//     .summary {
//       margin-top: 30px;
//     }
//     .summary table {
//       width: 100%;
//       border-collapse: collapse;
//     }
//     .summary th, .summary td {
//       padding: 8px;
//       border-bottom: 1px solid #e2e2e2;
//       text-align: left;
//       font-size: 14px;
//     }
//     .summary th {
//       background-color: #f8f8f8;
//     }
//     .footer {
//       font-size: 12px;
//       color: #999999;
//       margin-top: 30px;
//       text-align: center;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="https://example.com/logo.png" alt="Logo" height="30">
//       <a href="#">Your Orders</a>
//       <a href="#">Your Account</a>
//       <a href="#">Amazon.in</a>
//     </div>
//     <p class="greeting">Hello ${customerName},</p>
//     <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order or make any changes to it, please visit <a href="#">Your Orders</a> on Amazon.in.</p>
//     <div class="details">
//       <p class="arrival-date">Arriving: ${arrivalDate}</p>
//       <p>Your order will be sent to:</p>
//       <p>${recipientName}<br>${address}</p>
//       <p>Your shipping speed: ${shippingSpeed}</p>
//       <a href="#" class="button">View or manage order</a>
//     </div>
//     <div class="summary">
//       <h3>Order summary</h3>
//       <table>
//         <tr>
//           <th>Order #<a href="#">${orderId}</a></th>
//           <th>Placed on: ${new Date().toDateString()}</th>
//         </tr>
//         <tr>
//           <td>Item Subtotal:</td>
//           <td>Rs.${itemSubtotal}</td>
//         </tr>
//         <tr>
//           <td>Shipping & Handling:</td>
//           <td>Rs.${shippingCost}</td>
//         </tr>
//         <tr>
//           <td>Order Total:</td>
//           <td>Rs.${orderTotal}</td>
//         </tr>
//         <tr>
//           <td>Payment Pending:</td>
//           <td>Rs.${paymentPending}</td>
//         </tr>
//       </table>
//     </div>
//     <div class="footer">
//       <p>Amazon.in</p>
//       <p>© Amazon. Amazon Platforms, Inc., Attention: Community Support, 1 Amazon Way, E-Commerce City, CA 94025</p>
//       <p>California</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderEmailContent };

// utils/templates/orderEmailTemplate.js

// const generateOrderEmailContent = (orderDetails) => {
//   const { customerName, orderId, arrivalDate, shippingSpeed, recipientName, address, itemSubtotal, shippingCost, orderTotal, paymentPending } = orderDetails;

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Confirmation</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       background-color: #ffffff;
//       margin: 0 auto;
//       padding: 20px;
//       max-width: 600px;
//       border: 1px solid #e2e2e2;
//     }
//     .header {
//       display: flex;
//       align-items: center;
//       padding-bottom: 20px;
//       border-bottom: 1px solid #e2e2e2;
//     }
//     .header img {
//       margin-right: 10px;
//     }
//     .header a {
//       font-size: 14px;
//       color: #0046ad;
//       text-decoration: none;
//       margin-left: auto;
//     }
//     .greeting {
//       font-size: 18px;
//       color: #333333;
//     }
//     .details {
//       background-color: #f8f8f8;
//       padding: 15px;
//       margin-top: 20px;
//       border: 1px solid #e2e2e2;
//     }
//     .details p {
//       margin: 5px 0;
//       color: #333333;
//       font-size: 14px;
//     }
//     .details .arrival-date {
//       color: #008000;
//       font-weight: bold;
//       font-size: 16px;
//     }
//     .button {
//       display: inline-block;
//       background-color: #ff9900;
//       color: #ffffff;
//       padding: 10px 15px;
//       text-decoration: none;
//       border-radius: 3px;
//       margin-top: 10px;
//     }
//     .summary {
//       margin-top: 30px;
//     }
//     .summary table {
//       width: 100%;
//       border-collapse: collapse;
//     }
//     .summary th, .summary td {
//       padding: 8px;
//       border-bottom: 1px solid #e2e2e2;
//       text-align: left;
//       font-size: 14px;
//     }
//     .summary th {
//       background-color: #f8f8f8;
//     }
//     .footer {
//       font-size: 12px;
//       color: #999999;
//       margin-top: 30px;
//       text-align: center;
//     }
//     .footer p {
//       margin: 5px 0;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <img src="https://example.com/logo.png" alt="Logo" height="30">
//       <a href="#">Your Orders</a>
//       <a href="#">Your Account</a>
//       <a href="#">Amazon.in</a>
//     </div>
//     <p class="greeting">Hello ${customerName},</p>
//     <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order or make any changes to it, please visit <a href="#">Your Orders</a> on Amazon.in.</p>
//     <div class="details">
//       <p class="arrival-date">Arriving: ${arrivalDate}</p>
//       <p>Your order will be sent to:</p>
//       <p>${recipientName}<br>${address}</p>
//       <p>Your shipping speed: ${shippingSpeed}</p>
//       <a href="#" class="button">View or manage order</a>
//     </div>
//     <div class="summary">
//       <h3>Order summary</h3>
//       <table>
//         <tr>
//           <th>Order #<a href="#">${orderId}</a></th>
//           <th>Placed on: ${new Date().toDateString()}</th>
//         </tr>
//         <tr>
//           <td>Item Subtotal:</td>
//           <td>Rs.${itemSubtotal}</td>
//         </tr>
//         <tr>
//           <td>Shipping & Handling:</td>
//           <td>Rs.${shippingCost}</td>
//         </tr>
//         <tr>
//           <td>Order Total:</td>
//           <td>Rs.${orderTotal}</td>
//         </tr>
//         <tr>
//           <td>Payment Pending:</td>
//           <td>Rs.${paymentPending}</td>
//         </tr>
//       </table>
//     </div>
//     <div class="footer">
//       <p>To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell and then move back to maintain adequate distance while waiting for you to collect your package.</p>
//       <p>We hope to see you again soon.</p>
//       <p>Amazon.in</p>
//       <p>© Amazon. Amazon Platforms, Inc., Attention: Community Support, 1 Amazon Way, E-Commerce City, CA 94025</p>
//       <p>California</p>
//     </div>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderEmailContent };

// const generateOrderEmailContent = (orderDetails, cart) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     shippingSpeed,
//     recipientName,
//     address,
//     itemSubtotal,
//     orderTotal,
//   } = orderDetails;
//   const userProfileUrl = "http://localhost:3000/dashboard/profile";
//   const snapcartUrl = "http://localhost:3000";
//   const userordersUrl = "http://localhost:3000/dashboard/profile?tab=orders";
//   const userOneorderUrl = `http://localhost:3000/order?orderId=${orderId}`;

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Confirmation</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       margin: 0 auto;
//       padding: 20px;
//       max-width: 600px;
//     }
//     .header {
//       display: flex;
//       align-items: center;
//       padding-bottom: 20px;

//     }
//     .header img {
//       margin-right: 10px;
//     }
//     .header a {
//       font-size: 14px;
//       color: #0046ad;
//       text-decoration: none;
//       margin-left: auto;
//     }
//     .greeting {
//       font-size: 18px;
//       color: #cc6600; 
//     }
//     .details {
//     }
//     .details p {
//       margin: 5px 0;
//       color: #333333;
//       font-size: 14px;
//     }
//     .details .arrival-date {
//       color: #008000;
//       font-weight: bold;
//       font-size: 16px;
//     }
//     .button {
//       display: inline-block;
//       background-color: #f0c14b;
//       color: black !important;
//       padding: 10px 15px;
//       text-decoration: none;
//       margin-top: 10px;
//       border-radius: 8px;
//     }
//     .summary {
      
//     }
//     .summary h3 {
//       color: #cc6600; 
//       font-size: 16px;
//       margin-bottom: 15px;
//     }
//     .summary table {
//       width: 100%;
//       border-collapse: collapse;
//     }
//     .summary th, .summary td {
//       padding: 8px;
//       text-align: left;
//       font-size: 14px;
//     }
//     .summary th {
//       background-color: #e2e2e2; 
//     }
//     .footer {
//       font-size: 12px;
//       color: #999999;
//       margin: 0 auto;
//       padding: 20px;
//       max-width: 609px;
//     }
//     .conclusion{
//       color: #333;
//       font-size: 12px;
//       margin-top: 30px;
//     }
//     .conclusion p {
//       margin: 5px 0;
//     }
//     .orderID{
//       color: #15c;
//     }
//     .orderTotal{
//       font-weight: bold;
//     }
//     .delivery{
//       font-weight: bold;
//     }
//     .company{
//       font-weight: bold;
//       font-size:16px
//     }
//     .secTable{
//       padding-bottom:82px
//     }
//     .tableStyle{
//       width:100%
//     }
//     .recipientName{
//      font-weight: bold;
//      font-size:16px
//     }
//     .details {
//       background-color: #f8f8f8;
//       padding: 15px;
//       margin-top: 20px;
//       border: 1px solid #e2e2e2;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <a href="${snapcartUrl}" target="_blank">Snapcart.in</a>
//       <a href="${userordersUrl}" target="_blank">Your Orders</a>
//       <a href="${userProfileUrl}" target="_blank">Your Account</a>
//       <a href="${snapcartUrl}" target="_blank">Snapcart.in</a>
//     </div>
//     <p class="greeting">Hello ${customerName},</p>
//     <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order , please visit <a href="${userordersUrl}" target="_blank">Your Orders</a> on Snapcart.in.</p>
//     <div class="details">
//         <table class="tableStyle">
//           <tr>
//             <td>
//               <p>Arriving:</p>
//               <p class="arrival-date">${arrivalDate}</p>
//               <p>Your shipping speed:</p>
//               <p class="delivery"> ${shippingSpeed}</p>
//               <a href=${userOneorderUrl} class="button">View order</a>
//             </td>
//             <td class="secTable">
//               <p>Your order will be sent to:</p>
//               <p class="recipientName">${recipientName}<br>${address}</p>
//             </td>
//           </tr>
//         </table>
//     </div>
//     <div class="summary">
//       <h3>Order summary</h3>
//       <table>
//         <tr>
//           <th>Order #<a href=${userOneorderUrl} class"orderID">${orderId}</a></th>
//           <th>Placed on: ${new Date().toDateString()}</th>
//         </tr>
//         <tr>
//           <td>Item Subtotal:</td>
//           <td>Rs.${itemSubtotal}</td>
//         </tr>
//         <tr>
//           <td>Shipping & Handling:</td>
//           <td>Rs.0.00</td>
//         </tr>
//         <tr>
//           <td class="orderTotal">Order Total:</td>
//           <td class="orderTotal">Rs.${orderTotal}</td>
//         </tr>
      
//       </table>
//     </div>
//     <div class="conclusion">
//       <p>To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell and then move back to maintain adequate distance while waiting for you to collect your package.</p>
//       <p >We hope to see you again soon.</p>
//       <p class="company">Snapcart.in</p>
//       <p>© Snapcart. Snapcart Platforms, Inc., Attention: Community Support, 1 Snapcart Way, E-Commerce City, CA 94025</p>
//       <p>California</p>
//     </div>
    
//   </div>
//   <div class="footer">
//     <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderEmailContent };



// const generateOrderEmailContent = (orderDetails, cart) => {
//   const {
//     customerName,
//     orderId,
//     arrivalDate,
//     shippingSpeed,
//     recipientName,
//     address,
//     itemSubtotal,
//     orderTotal,
//   } = orderDetails;
//   const userProfileUrl = "http://localhost:3000/dashboard/profile";
//   const snapcartUrl = "http://localhost:3000";
//   const userordersUrl = "http://localhost:3000/dashboard/profile?tab=orders";
//   const userOneorderUrl = `http://localhost:3000/order?orderId=${orderId}`;

//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>Order Confirmation</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       background-color: #f2f2f2;
//       margin: 0;
//       padding: 0;
//     }
//     .container {
//       margin: 0 auto;
//       padding: 20px;
//       width: 100%;
//       max-width: 600px;
//     }
//     .header {
//       display: flex;
//       align-items: center;
//       padding-bottom: 20px;
//     }
//     .header a {
//       font-size: 14px;
//       color: #0046ad;
//       text-decoration: none;
//       margin-left: 15px;
//     }
//     .header a:first-child {
//       margin-left: 0; 
//     }
//     .greeting {
//       font-size: 18px;
//       color: #cc6600; 
//     }
//     .details {
//       background-color: #f8f8f8;
//       padding: 15px;
//       margin-top: 20px;
//       border: 1px solid #e2e2e2;
//     }
//     .details p {
//       margin: 5px 0;
//       color: #333333;
//       font-size: 14px;
//     }
//     .details .arrival-date {
//       color: #008000;
//       font-weight: bold;
//       font-size: 16px;
//     }
//     .button {
//       display: inline-block;
//       background-color: #f0c14b;
//       color: black !important;
//       padding: 10px 15px;
//       text-decoration: none;
//       margin-top: 10px;
//       border-radius: 8px;
//     }
//     .summary {
//       margin-top: 20px;
//     }
//     .summary h3 {
//       color: #cc6600; 
//       font-size: 16px;
//       margin-bottom: 15px;
//     }
//     .summary table {
//       width: 100%;
//       border-collapse: collapse;
//     }
//     .summary th, .summary td {
//       padding: 8px;
//       text-align: left;
//       font-size: 14px;
//     }
//     .summary th {
//       background-color: #e2e2e2; 
//     }
//     .footer {
//       font-size: 12px;
//       color: #999999;
//       margin: 0 auto;
//       padding: 20px;
//       width: 100%;
//       max-width: 600px;
//     }
//     .conclusion{
//       color: #333;
//       font-size: 12px;
//       margin-top: 30px;
//     }
//     .conclusion p {
//       margin: 5px 0;
//     }
//     .orderID {
//       color: #15c;
//     }
//     .orderTotal {
//       font-weight: bold;
//     }
//     .delivery {
//       font-weight: bold;
//     }
//     .company {
//       font-weight: bold;
//       font-size: 16px;
//     }
//     .secTable {
//       padding-bottom: 20px;
//     }
//     .tableStyle {
//       width: 100%;
//     }
//     .recipientName {
//       font-weight: bold;
//       font-size: 16px;
//     }
//      @media (max-width: 768px) {
//     .header a {
//       font-size: 12px; /* Smaller font size for mobile */
//         margin-left: 10px; /* Reduced spacing for mobile */
//       }
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <div class="header">
//       <a href="${snapcartUrl}" target="_blank">Snapcart.in</a>
//       <a href="${userordersUrl}" target="_blank">Your Orders</a>
//       <a href="${userProfileUrl}" target="_blank">Your Account</a>
//       <a href="${snapcartUrl}" target="_blank">Snapcart.in</a>
//     </div>
//     <p class="greeting">Hello ${customerName},</p>
//     <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order, please visit <a href="${userordersUrl}" target="_blank">Your Orders</a> on Snapcart.in.</p>
//     <div class="details">
//       <table class="tableStyle">
//         <tr>
//           <td>
//             <p>Arriving:</p>
//             <p class="arrival-date">${arrivalDate}</p>
//             <p>Your shipping speed:</p>
//             <p class="delivery">${shippingSpeed}</p>
//             <a href=${userOneorderUrl} class="button">View order</a>
//           </td>
//           <td class="secTable">
//             <p>Your order will be sent to:</p>
//             <p class="recipientName">${recipientName}<br>${address}</p>
//           </td>
//         </tr>
//       </table>
//     </div>
//     <div class="summary">
//       <h3>Order summary</h3>
//       <table>
//         <tr>
//           <th>Order #<a href=${userOneorderUrl} class="orderID">${orderId}</a></th>
//           <th>Placed on: ${new Date().toDateString()}</th>
//         </tr>
//         <tr>
//           <td>Item Subtotal:</td>
//           <td>Rs.${itemSubtotal}</td>
//         </tr>
//         <tr>
//           <td>Shipping & Handling:</td>
//           <td>Rs.0.00</td>
//         </tr>
//         <tr>
//           <td class="orderTotal">Order Total:</td>
//           <td class="orderTotal">Rs.${orderTotal}</td>
//         </tr>
//       </table>
//     </div>
//     <div class="conclusion">
//       <p>To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell, and then move back to maintain adequate distance while waiting for you to collect your package.</p>
//       <p>We hope to see you again soon.</p>
//       <p class="company">Snapcart.in</p>
//       <p>© Snapcart. Snapcart Platforms, Inc., Attention: Community Support, 1 Snapcart Way, E-Commerce City, CA 94025</p>
//       <p>California</p>
//     </div>
//   </div>
//   <div class="footer">
//     <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
//   </div>
// </body>
// </html>`;
// };

// export { generateOrderEmailContent };


const generateOrderEmailContent = (orderDetails, cart, updatedPrice) => {
  const {
    customerName,
    orderId,
    arrivalDate,
    shippingSpeed,
    recipientName,
    address,
    itemSubtotal,
    orderTotal,
  } = orderDetails;
  const userProfileUrl = "http://localhost:3000/dashboard/profile";
  const snapcartUrl = "http://localhost:3000";
  const userordersUrl = "http://localhost:3000/dashboard/profile?tab=orders";
  const userOneorderUrl = `http://localhost:3000/order?orderId=${orderId}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f2f2f2;
      margin: 0;
      padding: 0;
    }
    .container {
      margin: 0 auto;
      padding: 20px;
      width: 100%;
      max-width: 600px;
      background-color: #ffffff;
    }
    .header {
      display: flex;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .header a {
      font-size: 14px;
      color: #0046ad;
      text-decoration: none;
      margin-left: 15px;
    }
    .header a:first-child {
      margin-left: 0; 
    }
    .title {
      font-size: 24px;
      font-weight: bold;
      color: #333;
      margin: 2px 0;
      text-align: end;
    }
    .orderNo {
      font-size: 12px;
      color: #333;
      margin: 2px 0;
      text-align: end;
    }
    .greeting {
      font-size: 18px;
      color: #cc6600; 
    }
    .details {
      padding: 15px;
      margin-top: 20px;
      border: 1px solid #e2e2e2;
    }
    .details p {
      margin: 5px 0;
      color: #333333;
      font-size: 14px;
    }
    .details .arrival-date {
      color: #008000;
      font-weight: bold;
      font-size: 16px;
    }
    .button {
      display: inline-block;
      background-color: #f0c14b;
      color: black !important;
      padding: 10px 15px;
      text-decoration: none;
      margin-top: 10px;
      border-radius: 8px;
    }
    .summary {
      margin-top: 20px;
    }
    .summary h3 {
      color: #cc6600; 
      font-size: 16px;
      margin-bottom: 15px;
    }
    .summary table {
      width: 100%;
      border-collapse: collapse;
    }
    .summary th, .summary td {
      padding: 8px;
      text-align: left;
      font-size: 14px;
    }
    .summary th {
      background-color: #e2e2e2; 
    }
    .footer {
      font-size: 12px;
      color: #999999;
      margin: 0 auto;
      padding: 20px;
      width: 100%;
      max-width: 600px;
      border-top: 1px solid #dddddd;
      margin-top: 20px;
    }
    .conclusion{
      color: #333;
      font-size: 12px;
      margin-top: 30px;
    }
    .conclusion p {
      margin: 5px 0;
    }
    .orderID {
      color: #15c;
    }
    .orderTotal {
      font-weight: bold;
    }
    .delivery {
      font-weight: bold;
    }
    .company {
      font-weight: bold;
      font-size: 16px;
    }
    .secTable {
      padding-bottom: 20px;
    }
    .tableStyle {
      width: 100%;
    }
    .recipientName {
      font-weight: bold;
      font-size: 16px;
    }
    .comapnyheader{
      font-size:1.4em;
      font-weight:600;
      color: #f0c14b;
    }
    @media (max-width: 768px) {
      .header a {
        font-size: 12px; 
        margin-left: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <a href="${snapcartUrl}" target="_blank" class="comapnyheader">Snapcart.in</a>
      <a href="${userordersUrl}" target="_blank">Your Orders</a>
      <a href="${userProfileUrl}" target="_blank">Your Account</a>
      <a href="${snapcartUrl}" target="_blank">Snapcart.in</a>
    </div>
    <div class="title">Order Confirmation</div>
    <p class="orderNo">Order #<a href=${userOneorderUrl} class="orderID">${orderId}</a></p>
    <p class="greeting">Hello ${customerName},</p>
    <p>Thank you for your order. We’ll send a confirmation when your order ships. Your estimated delivery date is indicated below. If you would like to view the status of your order, please visit <a href="${userordersUrl}" target="_blank">Your Orders</a> on Snapcart.in.</p>
    <div class="details">
      <table class="tableStyle">
        <tr>
          <td>
            <p>Arriving:</p>
            <p class="arrival-date">${arrivalDate}</p>
            <p>Your shipping speed:</p>
            <p class="delivery">${shippingSpeed}</p>
            <a href=${userOneorderUrl} class="button">View order</a>
          </td>
          <td class="secTable">
            <p>Your order will be sent to:</p>
            <p class="recipientName">${recipientName}<br>${address}</p>
          </td>
        </tr>
      </table>
    </div>
    <div class="summary">
      <h3>Order summary</h3>
      <table>
        <tr>
          <th>Order #<a href=${userOneorderUrl} class="orderID">${orderId}</a></th>
          <th>Placed on: ${new Date().toDateString()}</th>
        </tr>
        <tr>
          <td>Item Subtotal:</td>
          <td>Rs.${updatedPrice}</td>
        </tr>
        <tr>
          <td>Shipping & Handling:</td>
          <td>Rs.0.00</td>
        </tr>
        <tr>
          <td class="orderTotal">Order Total:</td>
          <td class="orderTotal">Rs.${updatedPrice}</td>
        </tr>
      </table>
    </div>
    <div class="conclusion">
      <p>To ensure your safety, the Delivery Agent will drop the package at your doorstep, ring the doorbell, and then move back to maintain adequate distance while waiting for you to collect your package.</p>
      <p>We hope to see you again soon.</p>
      <p class="company">Snapcart.in</p>
      <p>© Snapcart. Snapcart Platforms, Inc., Attention: Community Support, 1 Snapcart Way, E-Commerce City, CA 94025</p>
      <p>California</p>
    </div>
  </div>
  <div class="footer">
    <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
  </div>
</body>
</html>`;
};

export { generateOrderEmailContent };
