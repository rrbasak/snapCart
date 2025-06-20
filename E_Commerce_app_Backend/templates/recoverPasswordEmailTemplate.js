// const generatePasswordResetEmailContent = (otp) => {
//   const snapcartUrl = "http://localhost:3000";
//   return `<!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <title>OTP Email Template</title>
//   <style>
//     .footer {
//       font-size: 12px;
//       color: #999999;
//       margin: 0 auto;
//       padding: 20px;
//       width: 100%;
//       max-width: 600px;
//       border-top: 1px solid #dddddd;
//       margin-top: 20px;
//     }
//     .comapnyheader{
//       font-size:1.4em;
//       color: #f0c14b !important;
//       text-decoration:none;
//       font-weight:600;
//     }
//   </style>
// </head>
// <body>
// <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
//   <div style="margin:50px auto;width:70%;padding:20px 0">
//     <div style="border-bottom:1px solid #eee">
//       <a href=${snapcartUrl} class="comapnyheader">Snapcart.in</a>
//     </div>
//     <p style="font-size:1.1em">Hi,</p>
//     <p>Thank you for choosing Snapcart. Use the following OTP to complete your password recovery procedure. The OTP is valid for 5 minutes.</p>
//     <h2 style="background: #f0c14b;margin: 0 auto;width: max-content;padding: 0 10px;color: #333;border-radius: 4px;">${otp}</h2>
//     <p style="font-size:0.9em;">Regards,<br />SnapCart Team</p>
//     <hr style="border:none;border-top:1px solid #eee" />
//     <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
//       <p>SnapCart</p>
//       <p>© SnapCart Inc., Attention: Support, 1 SnapCart Way, E-Commerce City, CA 94025</p>
//       <p>California</p>
//     </div>
//   </div>
// </div>
// <div class="footer">
//   <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
// </div>
// </body>
// </html>`;
// };

// // Export the function
// export { generatePasswordResetEmailContent };





const generatePasswordResetEmailContent = (otp) => {
  const snapcartUrl = "http://localhost:3000";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>OTP Email Template</title>
  <style>
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
    .comapnyheader{
      font-size:1.4em;
      color: #f0c14b !important;
      text-decoration:none;
      font-weight:600;
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
    .conclusion{
      color: #333;
      font-size: 12px;
      margin-top: 30px;
    }
    .conclusion p {
      margin: 5px 0;
    }
  </style>
</head>
<body>
<div class="container">
    <div sclass="header">
      <a href=${snapcartUrl} class="comapnyheader">Snapcart.in</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Snapcart. Use the following OTP to complete your password recovery procedure. The OTP is valid for 2 minutes.</p>
    <h2 style="background: #f0c14b;margin: 0 auto;width: max-content;padding: 0 10px;color: #333;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />SnapCart Team</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div class="conclusion">
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

// Export the function
export { generatePasswordResetEmailContent };
