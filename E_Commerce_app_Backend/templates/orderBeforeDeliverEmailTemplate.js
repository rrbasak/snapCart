const generateOrderBeforeDeliverEmailContent = (orderDetails) => {
  const { customerName, orderId, arrivalDate } = orderDetails;

  const trackOrderUrl = `http://localhost:3000/order?orderId=${orderId}`;

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
      padding: 60px;
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
    .button {
      display: grid;
      padding: 10px 20px;
      background-color: #f0c14b;
      color: #333 !important;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      margin-top: 20px;
      text-align: center;
    }
    .footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      margin-top: 20px;
      border-top: 1px solid #ddd;
      padding-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://snap-cart-frontend-api.vercel.app/logo.png" alt="Snapcart.in">
    </div>
    <div class="content">
      <p>Hi ${customerName},</p>
      <p>Your package will be delivered between 7:00 AM and 10:00 PM on ${arrivalDate} by our Snapcart Delivery Agent.</p>
      <a href="${trackOrderUrl}" class="button">Track your package</a>
    </div>
    <div class="footer">
      <p>This email was sent from an email address that can't receive emails. Please don't reply to this email.</p>
    </div>
  </div>
</body>
</html>`;
};

export { generateOrderBeforeDeliverEmailContent };
