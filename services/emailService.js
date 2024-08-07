const nodemailer = require("nodemailer");
const { EMAIL_PASS, EMAIL_USER } = require("../config");

const sendVerificationCode = async (email, code) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Dustin",
    to: email,
    subject: "Your Verification Code",
    text: `Your verification code is ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendVerificationCode,
};
