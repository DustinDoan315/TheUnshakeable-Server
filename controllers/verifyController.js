const { verificationCodes } = require("./emailController");

const verifyCode = (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send("Email and code are required");
  }

  const storedCode = verificationCodes[email];

  if (storedCode && storedCode == code) {
    delete verificationCodes[email];
    res.status(200).send("Code verified successfully");
  } else {
    res.status(400).send("Invalid code");
  }
};

module.exports = {
  verifyCode,
};
