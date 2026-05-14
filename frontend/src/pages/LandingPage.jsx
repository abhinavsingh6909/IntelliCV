import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileSearch, Sparkles, Target, Zap } from "lucide-react";

const LandingPage = () => {
  const features = [
    {
      icon: <FileSearch className="w-6 h-6 text-blue-400" />,
      title: "Smart ATS Scoring",
      description:
        "Get an instant simulated ATS score to see how your resume performs against automated filters.",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: "AI-Powered Insights",
      description:
        "Receive detailed feedback on your strengths and actionable areas for improvement.",
    },
    {
      icon: <Target className="w-6 h-6 text-emerald-400" />,
      title: "Skill Gap Analysis",
      description:
        "Identify missing keywords and skills required for your target roles to boost your chances.",
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "Instant Results",
      description:
        "Upload your PDF and get a comprehensive analysis report in seconds.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-10 w-full px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Stop Getting Rejected by
          <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
            ATS Systems
          </span>
        </h1>
        <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Upload your resume and discover why recruiters may be rejecting it.
          IntelliCV analyzes ATS compatibility, missing keywords, skill gaps,
          and resume weaknesses to help you improve your chances of getting
          shortlisted.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/register"
            className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] hover:-translate-y-1"
          >
            Get Started Free
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-lg border border-slate-700 transition-all hover:-translate-y-1"
          >
            Sign In
          </Link>
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
            className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800 transition-colors"
          >
            <div className="w-12 h-12 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center mb-6">
              {feature.icon}
            </div>
            <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
