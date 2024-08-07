const { admin } = require("../services/firebase");
const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  updateUserPassword,
} = require("../services/userService");

const createUserHandler = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).send({ error: "Email and password are required" });
    }

    const user = await createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    if (error.message === "Email already exists") {
      res.status(409).send({ error: error.message });
    } else {
      console.error("Error creating user:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
};

const getUserHandler = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateUserHandler = async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const deleteUserHandler = async (req, res) => {
  try {
    const result = await deleteUserById(req.params.id);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const loginUserHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser(email, password);
    res.send(result);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const resetPasswordHandler = async (req, res) => {
  const { email } = req.body;
  try {
    await admin.auth().generatePasswordResetLink(email);
    res.status(200).send({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).send({ error: "Failed to send password reset email" });
  }
};

const updatePasswordHandler = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    await updateUserPassword(email, newPassword);

    res.status(200).send({ message: "Password has been updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).send({ error: "Failed to update password" });
  }
};

module.exports = {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
  resetPasswordHandler,
  updatePasswordHandler,
};
