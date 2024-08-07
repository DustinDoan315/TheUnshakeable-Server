const emailService = require("../services/emailService");
const verificationCodes = {};

const sendCode = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).send("Email is required");
  }

  const code = Math.floor(1000 + Math.random() * 9000);
  verificationCodes[email] = code;

  try {
    await emailService.sendVerificationCode(email, code);
    res.status(200).send("Code sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

module.exports = {
  sendCode,
  verificationCodes,
};
