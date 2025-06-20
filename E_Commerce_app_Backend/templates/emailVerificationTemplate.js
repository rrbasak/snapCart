const generateEmailVerificationOTPContent = (otp) => {
  const snapcartUrl = "http://localhost:3000";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Verification OTP</title>
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
    .companyHeader {
      font-size: 1.4em;
      color: #f0c14b !important;
      text-decoration: none;
      font-weight: 600;
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
    .conclusion {
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
    <div class="header">
      <a href="${snapcartUrl}" class="companyHeader">Snapcart.in</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Welcome to Snapcart! Use the following OTP to verify your email address. The OTP is valid for 2 minutes.</p>
    <h2 style="background: #f0c14b; margin: 0 auto; width: max-content; padding: 0 10px; color: #333; border-radius: 4px;">${otp}</h2>
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
export { generateEmailVerificationOTPContent };
