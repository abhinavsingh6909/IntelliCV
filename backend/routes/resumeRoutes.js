const express = require("express");
const router = express.Router();
const multer = require("multer");
const { protect } = require("../middlewares/authMiddleware");
const { upload, analyze } = require("../controllers/resumeController");
const { aiLimiter } = require("../middlewares/rateLimiter");

// Store file in memory (buffer) — not on disk
// We extract text and discard the file; no need to save it
const storage = multer.memoryStorage();
const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed"));
    }
  },
});

// protect runs first (checks JWT), then uploadMiddleware, then controller
router.post("/", protect, uploadMiddleware.single("resume"), upload);

router.post("/analyze/:resumeId", protect, aiLimiter, analyze);

module.exports = router;
