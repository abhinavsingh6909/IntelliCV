const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    // Token arrives as: "Bearer eyJhbGci..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const token = authHeader.split(" ")[1]; // Extract just the token part
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // Attach user ID to request for downstream use
    next(); // Pass control to the next middleware or controller
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

module.exports = { protect };
