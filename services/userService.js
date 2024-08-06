const { ACCESS_TOKEN_SECRET } = require("../config");

const db = require("./firebase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (userData) => {
  const { firstName, lastName, email, password, phoneNumber, userName } =
    userData;

  const existingUserSnapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (!existingUserSnapshot.empty) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserRef = db.collection("users").doc();
  await newUserRef.set({
    firstName,
    lastName,
    userName,
    email,
    phoneNumber,
    password: hashedPassword,
  });

  return { id: newUserRef.id };
};

const getUserById = async (id) => {
  const userRef = db.collection("users").doc(id);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new Error("User not found");
  }
  return doc.data();
};

const updateUserById = async (id, userData) => {
  const { name, email, password } = userData;
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  const updateData = {
    name,
    email,
    ...(hashedPassword && { password: hashedPassword }),
  };
  const userRef = db.collection("users").doc(id);
  await userRef.update(updateData);
  return { success: true };
};

const deleteUserById = async (id) => {
  const userRef = db.collection("users").doc(id);
  await userRef.delete();
  return { success: true };
};

const loginUser = async (email, password) => {
  const userRef = db.collection("users").where("email", "==", email);
  const snapshot = await userRef.get();
  if (snapshot.empty) {
    throw new Error("User not found");
  }

  const userDoc = snapshot.docs[0];
  const user = userDoc.data();

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: userDoc.id,
      email: user.email,
      userName: user.userName,
      phoneNumber: user.phoneNumber,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return { token };
};

module.exports = {
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
};
