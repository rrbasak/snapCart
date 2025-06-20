const generateUserWelcomeContent = (userDetails) => {
  const { name:customerName } = userDetails;

  const snapcartUrl = "http://localhost:3000";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Welcome to Snapcart!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #dddddd;
    }
    .header a {
      font-size: 1.6em;
      color: #f0c14b;
      text-decoration: none;
      font-weight: 700;
    }
    .welcome-text {
      font-size: 1.2em;
      color: #333;
      margin-top: 20px;
    }
    .cta-button {
      display: inline-block;
      padding: 12px 24px;
      font-size: 1em;
      font-weight: bold;
      color: #fff;
      background-color: #f0c14b;
      border-radius: 5px;
      text-decoration: none;
      margin-top: 20px;
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
  </style>
</head>
<body>
<div class="container">
    <div class="header">
      <a href="${snapcartUrl}">Snapcart</a>
    </div>
    <p class="welcome-text">Hi ${customerName},</p>
    <p>Welcome to <strong>Snapcart</strong>! 🎉 We're thrilled to have you on board.</p>
    <p>Start exploring amazing deals and enjoy a seamless shopping experience with us.</p>

    <a href="${snapcartUrl}" class="cta-button">Start Shopping</a>

    <p style="font-size:0.9em; margin-top: 20px;">If you have any questions, feel free to contact our support team.</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <p style="font-size:12px;">© Snapcart. Snapcart Platforms, Inc., Attention: Community Support, 1 Snapcart Way, E-Commerce City, CA 94025</p>
</div>
<div class="footer">
  <p>This email was sent from a notification-only address that cannot accept incoming email. Please do not reply to this message.</p>
</div>
</body>
</html>`;
};

export { generateUserWelcomeContent };
