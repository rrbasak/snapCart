import { createTransport } from "nodemailer";

const sendEmail = async ({ service, to, subject, html }) => {
  try {
    const transporter = createTransport({
      service: service,
      secure: true,
      port: 465,
      auth: {
        user: "rajdeepbasak2000@gmail.com",
        pass: "xegxajrjlluecgdi",
      },
    });

    const mailOptions = {
      from: "rajdeepbasak2000@gmail.com",
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    //console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
