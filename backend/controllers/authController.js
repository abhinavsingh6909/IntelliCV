const { registerUser, loginUser } = require("../services/authService");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation at controller level
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await registerUser({ name, email, password });
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await loginUser({ email, password });
    res.status(200).json(result);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = { register, login };
