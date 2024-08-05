const express = require("express");
const router = express.Router();
const {
  createPaymentIntent,
  paymentSheet,
} = require("../controllers/paymentController");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/payment-sheet", paymentSheet);

module.exports = router;
