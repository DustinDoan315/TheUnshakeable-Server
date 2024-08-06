// controllers/userController.js
const {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
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

module.exports = {
  createUserHandler,
  getUserHandler,
  updateUserHandler,
  deleteUserHandler,
  loginUserHandler,
};
