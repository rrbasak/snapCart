const generateCancelByUserEmailContent = (orderDetails) => {
  const {
    customerName,
    orderId,
    orderStatus, 
  } = orderDetails;

  const snapcartUrl = "http://localhost:3000";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Order Cancellation Notification</title>
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
    }
    .header {
      text-align: center;
      padding: 20px 0;
      border-bottom: 1px solid #dddddd;
    }
    .header a {
      font-size: 1.4em;
      color: #f0c14b;
      text-decoration: none;
      font-weight: 600;
    }
    .order-details, .expected-delivery {
      padding: 20px;
      background-color: #f7f7f7;
      border-radius: 8px;
      margin-bottom: 20px;
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
      <a href="${snapcartUrl}">Snapcart.in</a>
    </div>
    <p style="font-size:1.1em">Hi ${customerName},</p>
    <p>We have received your request to cancel order <strong>#${orderId}</strong>.</p>
    
    ${
      orderStatus === "Shipped"
        ? `<p style="font-weight: bold;">Since your order has already been shipped, we'll initiate the full refund once we get the package.</p>`
        : `<p>Your order has been successfully cancelled.</p>`
    }
    
    

    <p style="font-size:0.9em;">If you have any questions, please contact our support team.</p>
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

export { generateCancelByUserEmailContent };
