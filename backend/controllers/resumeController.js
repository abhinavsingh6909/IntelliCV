const {
  uploadResume,
  analyzeResumeById,
} = require("../services/resumeService");

const upload = async (req, res) => {
  try {
    const resume = await uploadResume(req.file, req.user.id);
    res.status(201).json({
      message: "Resume uploaded successfully",
      resumeId: resume._id,
      extractedLength: resume.extractedText.length,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const analyze = async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const analysis = await analyzeResumeById(req.params.resumeId, req.user.id, jobDescription);
    res.status(200).json({ analysis });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { upload, analyze };
