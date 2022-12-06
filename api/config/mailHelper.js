const nodemailer = require("nodemailer");

exports.mailHelper = async (req, res, option) => {
  const { email, name, verifyToken } = option;
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.HOST,
      port: 2525,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
    const sendMailOption = {
      from: "deepakdutta752@gmail.com",
      to: email,
      subject: "Plz verify the email ✔",
      html: `<h1> ${name} ! Thanks for registration our site </h1>
      <h4> please varify your mail to continue... </h4>
      <a href="http://${req.headers.host}/api/v1/user/verify-email/${verifyToken}">Varify Your Email</a>`,
    };
    await transporter.sendMail(sendMailOption);
  } catch (error) {
    return res.status(202).json({
      message: `Hello ${name} Account created successfully but here is some problem. Longin your account and resend your email verification link`,
    });
  }
};
