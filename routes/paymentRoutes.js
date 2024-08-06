const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const {
  createPaymentIntent,
  paymentSheet,
} = require("../controllers/paymentController");
const {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
} = require("../controllers/userController");

router.post("/create-payment-intent", createPaymentIntent);
router.post("/payment-sheet", paymentSheet);
router.post("/users", createUserHandler);
router.get("/users/:id", verifyToken, getUserHandler);
router.put("/users/:id", verifyToken, updateUserHandler);
router.delete("/users/:id", verifyToken, deleteUserHandler);
router.post("/login", loginUserHandler);

module.exports = router;
