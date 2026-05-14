const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // This links to the User model — a "foreign key" in MongoDB
      required: true,
    },
    originalName: {
      type: String, // The original filename e.g. "john_resume.pdf"
      required: true,
    },
    extractedText: {
      type: String, // The raw text pulled out of the PDF
      required: true,
    },
    analysis: {
      type: Object, // Will store Gemini's response later — Day 3
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Resume", resumeSchema);
