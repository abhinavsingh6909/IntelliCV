import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, CheckCircle2, XCircle, Briefcase, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

const AnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    // Check if we got data from navigation state
    if (location.state && location.state.analysis) {
      setAnalysis(location.state.analysis);
    } else {
      // If no data (e.g. user refreshed the page), we should fetch it from backend
      // But for simplicity in this demo, redirect back to dashboard
      navigate('/dashboard');
    }
  }, [location, navigate]);

  if (!analysis) return null; // Or a loading spinner

  const scoreColor = 
    analysis.atsScore >= 80 ? 'text-emerald-400 border-emerald-400/50 bg-emerald-500/10' : 
    analysis.atsScore >= 60 ? 'text-amber-400 border-amber-400/50 bg-amber-500/10' : 
    'text-red-400 border-red-400/50 bg-red-500/10';

  return (
    <div className="flex-grow p-4 py-8 w-full max-w-6xl mx-auto">
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6">
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Score Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col items-center justify-center text-center md:w-1/3"
        >
          <h2 className="text-xl font-bold mb-6 text-slate-200">ATS Match Score</h2>
          <div className={`relative flex items-center justify-center w-40 h-40 rounded-full border-[8px] ${scoreColor} shadow-lg shadow-black/20 mb-6`}>
            <span className="text-5xl font-bold">{analysis.atsScore}</span>
            <span className="absolute bottom-6 text-xs uppercase tracking-widest font-bold opacity-80">/ 100</span>
          </div>
          <p className="text-slate-400 text-sm px-4">
            {analysis.atsScoreNote}
          </p>
        </motion.div>

        {/* Summary Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8 md:w-2/3 flex flex-col justify-center"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FileText className="text-blue-400" /> Professional Summary
            </h2>
            <p className="text-slate-300 leading-relaxed text-lg bg-slate-900/50 p-6 rounded-xl border border-slate-700/50">
              {analysis.experienceSummary}
            </p>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 mt-4">
              <Briefcase className="text-indigo-400" /> Career Suggestions
            </h2>
            <div className="flex flex-wrap gap-2">
              {analysis.careerSuggestions.map((job, i) => (
                <span key={i} className="px-4 py-2 bg-indigo-500/20 text-indigo-300 rounded-lg text-sm font-medium border border-indigo-500/30">
                  {job}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Skills */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" /> Matched Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {analysis.matchedSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-slate-700 text-slate-200 rounded-md text-sm border border-slate-600">
                {skill}
              </span>
            ))}
          </div>
          
          <h2 className="text-xl font-bold mb-6 mt-8 flex items-center gap-2">
            <XCircle className="text-red-400" /> Missing Keywords
          </h2>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill, i) => (
              <span key={i} className="px-3 py-1.5 bg-red-500/10 text-red-400 rounded-md text-sm border border-red-500/20">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Strengths & Improvements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-8 flex flex-col gap-8"
        >
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="text-blue-400" /> Resume Strengths
            </h2>
            <ul className="space-y-3">
              {analysis.strengths.map((strength, i) => (
                <li key={i} className="flex gap-3 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <AlertTriangle className="text-amber-400" /> Actionable Improvements
            </h2>
            <ul className="space-y-3">
              {analysis.improvements.map((improvement, i) => (
                <li key={i} className="flex gap-3 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-slate-700/50">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold border border-amber-500/30">
                    {i + 1}
                  </div>
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
      
      {/* Overall Feedback */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-900/40 to-indigo-900/40 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <FileText className="w-32 h-32" />
        </div>
        <h2 className="text-2xl font-bold mb-4 relative z-10 text-white">Overall Assessment</h2>
        <p className="text-blue-100/80 leading-relaxed text-lg relative z-10">
          {analysis.overallFeedback}
        </p>
      </motion.div>
    </div>
  );
};

export default AnalysisPage;
