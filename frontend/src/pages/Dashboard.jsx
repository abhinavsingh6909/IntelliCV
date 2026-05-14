import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UploadCloud, File, X, AlertCircle, CheckCircle2 } from "lucide-react";
import api from "../api/api";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setError(null);

    if (selected && selected.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      setFile(null);
      return;
    }

    if (selected && selected.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB.");
      setFile(null);
      return;
    }

    setFile(selected);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = e.dataTransfer.files[0];
    if (dropped) {
      // Create a mock event to reuse handleFileChange
      handleFileChange({ target: { files: [dropped] } });
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      // 1. Upload the resume
      const uploadRes = await api.post("/resume", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const { resumeId } = uploadRes.data;

      setIsUploading(false);
      setIsAnalyzing(true);

      // 2. Analyze the resume
      const analyzeRes = await api.post(`/resume/analyze/${resumeId}`, {
        jobDescription,
      });

      // 3. Redirect to analysis page with results
      navigate(`/analysis/${resumeId}`, {
        state: { analysis: analyzeRes.data.analysis },
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Something went wrong during processing. Please try again.",
      );
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex-grow p-4 py-12 w-full max-w-5xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Upload your latest resume to get instant AI-powered feedback.
        </p>
      </div>

      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <UploadCloud className="text-blue-400" /> Upload Resume (PDF)
        </h2>

        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/50 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="mb-8">
          <label
            htmlFor="jd"
            className="block text-sm font-medium text-slate-300 mb-2"
          >
            Job Description (Optional)
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-32 px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-slate-100 resize-none"
            placeholder="Paste job description here to get strict JD-based ATS analysis..."
          ></textarea>
        </div>

        {!file ? (
          <div
            className="border-2 border-dashed border-slate-600 rounded-xl p-12 text-center hover:border-blue-500 hover:bg-slate-800/80 transition-colors cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 group-hover:bg-blue-900/30 text-slate-400 group-hover:text-blue-400 mb-4 transition-colors">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-1">Click or drag and drop</h3>
            <p className="text-slate-400 text-sm">PDF (MAX. 5MB)</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".pdf"
              className="hidden"
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-600 rounded-xl p-6 bg-slate-900/50 flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4">
              <File className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium mb-1 truncate max-w-sm">
              {file.name}
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>

            <div className="flex gap-4 w-full max-w-sm">
              <button
                onClick={clearFile}
                disabled={isUploading || isAnalyzing}
                className="flex-1 py-2 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors border border-slate-600 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleUploadAndAnalyze}
                disabled={isUploading || isAnalyzing}
                className="flex-1 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors shadow-lg shadow-blue-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Uploading...
                  </>
                ) : isAnalyzing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                    Analyzing...
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-4 h-4" /> Analyze
                  </>
                )}
              </button>
            </div>

            {isAnalyzing && (
              <p className="text-blue-400 text-sm mt-4 animate-pulse">
                Reviewing your resume against ATS standards.... This takes about
                5-10 seconds.
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
