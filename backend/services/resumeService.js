const pdfParse = require("pdf-parse");
const Resume = require("../models/Resume");
const { analyzeResume } = require("./aiService");

const uploadResume = async (file, userId) => {
  if (!file) {
    throw new Error("No file uploaded");
  }

  const pdfData = await pdfParse(file.buffer);
  const extractedText = pdfData.text;

  if (!extractedText || extractedText.trim().length < 50) {
    throw new Error(
      "Could not extract enough text. Is this a scanned image PDF?",
    );
  }

  const resume = await Resume.create({
    user: userId,
    originalName: file.originalname,
    extractedText: extractedText.trim(),
  });

  return resume;
};

const analyzeResumeById = async (resumeId, userId, jobDescription) => {
  // Fetch resume and verify it belongs to this user — authorization check
  const resume = await Resume.findOne({ _id: resumeId, user: userId });

  if (!resume) {
    throw new Error("Resume not found or unauthorized");
  }

  const analysis = await analyzeResume(resume.extractedText, jobDescription);

  // Save analysis back to the resume document
  resume.analysis = analysis;
  await resume.save();

  return analysis;
};

module.exports = { uploadResume, analyzeResumeById };
