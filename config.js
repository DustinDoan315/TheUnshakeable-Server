require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 4000,
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
};
