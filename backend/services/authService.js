const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async ({ name, email, password }) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  // Hash the password — 10 is the "salt rounds" (cost factor)
  // Higher = more secure but slower. 10 is the industry standard
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user to DB
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT — contains user ID, signed with our secret
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare entered password with stored hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials"); // Same error — don't reveal which was wrong
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return {
    token,
    user: { id: user._id, name: user.name, email: user.email },
  };
};

module.exports = { registerUser, loginUser };
