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
  resetPasswordHandler,
  updatePasswordHandler,
} = require("../controllers/userController");
const { sendCode } = require("../controllers/emailController");
const { verifyCode } = require("../controllers/verifyController");

/**
 * @openapi
 * /create-payment-intent:
 *   post:
 *     summary: Create a payment intent
 *     description: Initiates a payment process by creating a payment intent.
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *       400:
 *         description: Bad request
 */
router.post("/create-payment-intent", createPaymentIntent);

/**
 * @openapi
 * /payment-sheet:
 *   post:
 *     summary: Payment sheet
 *     description: Creates a payment sheet to handle payment flows.
 *     responses:
 *       200:
 *         description: Payment sheet created successfully
 *       400:
 *         description: Bad request
 */
router.post("/payment-sheet", paymentSheet);

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Registers a new user in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
router.post("/users", createUserHandler);

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieves user details by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 */
router.get("/users/:id", verifyToken, getUserHandler);

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Updates user details by user ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               userName:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */
router.put("/users/:id", verifyToken, updateUserHandler);

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete("/users/:id", verifyToken, deleteUserHandler);

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Authenticates a user and returns a token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", loginUserHandler);

/**
 * @openapi
 * /reset-password:
 *   post:
 *     summary: Request password reset
 *     description: Sends a password reset email to the user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Bad request
 */
router.post("/reset-password", resetPasswordHandler);

/**
 * @openapi
 * /update-password:
 *   post:
 *     summary: Update password
 *     description: Updates a user's password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       400:
 *         description: Bad request
 */
router.post("/update-password", updatePasswordHandler);

/**
 * @openapi
 * /send-code:
 *   post:
 *     summary: Send verification code
 *     description: Sends a verification code to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification code sent
 *       400:
 *         description: Bad request
 */
router.post("/send-code", sendCode);

/**
 * @openapi
 * /verify-code:
 *   post:
 *     summary: Verify the code
 *     description: Verifies the code sent to the user's email.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               code:
 *                 type: string
 *     responses:
 *       200:
 *         description: Code verified successfully
 *       400:
 *         description: Bad request
 */
router.post("/verify-code", verifyCode);

module.exports = router;
