const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const connectDB = require("./config/db");
const errorHandler = require("./middlewares/errorHandler");
const { apiLimiter } = require("./middlewares/rateLimiter");

dotenv.config();
connectDB();

const app = express();

// Security headers
app.use(helmet());

// Rate limit all routes
app.use(apiLimiter);

// Middleware
// Allow requests from any origin (e.g., Vercel frontend) in production
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "IntelliCV API running", status: "ok" });
});

// Global error handler — must be last
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for serverless platforms like Vercel (if used)
module.exports = app;
