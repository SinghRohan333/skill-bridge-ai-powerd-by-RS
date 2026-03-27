import { Link } from "react-router-dom";
import {
  Sparkles,
  Upload,
  BarChart2,
  FileCode,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import useAuthStore from "../store/authStore";

const Landing = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-violet-400" />
            <span className="text-lg font-bold text-white">
              Skill Bridge AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm text-white/60 hover:text-white transition-colors px-3 py-1.5"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-75 h-75 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-75 h-75 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/60 mb-8 uppercase tracking-widest">
            <Sparkles size={12} className="text-violet-400" />
            Powered by Groq LLaMA AI
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
            Analyze Your Resume <br />
            with AI.{" "}
            <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Find Skill Gaps.
            </span>
          </h1>

          <p className="text-lg text-white/50 mb-10 max-w-xl mx-auto leading-relaxed">
            Upload your resume and get instant AI-powered analysis. Discover
            missing skills, get personalized recommendations and download a
            professional LaTeX resume template.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">How It Works</h2>
            <p className="text-white/40">
              Three simple steps to supercharge your career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Upload size={24} className="text-violet-400" />,
                step: "01",
                title: "Upload Resume",
                desc: "Upload your resume in PDF or DOCX format and select your target job role",
                color: "bg-violet-500/10 border-violet-500/20",
              },
              {
                icon: <BarChart2 size={24} className="text-blue-400" />,
                step: "02",
                title: "AI Analysis",
                desc: "Our AI analyzes your resume, finds skill gaps and gives personalized recommendations",
                color: "bg-blue-500/10 border-blue-500/20",
              },
              {
                icon: <FileCode size={24} className="text-emerald-400" />,
                step: "03",
                title: "Get LaTeX Template",
                desc: "Download a professional LaTeX resume template and compile it on Overleaf for free",
                color: "bg-emerald-500/10 border-emerald-500/20",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-6 ${item.color}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/5 rounded-xl p-3">{item.icon}</div>
                  <span className="text-4xl font-black text-white/5">
                    {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Features</h2>
            <p className="text-white/40">
              Everything you need to land your dream job
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "Smart Resume Parsing",
                desc: "Extracts skills, experience and education from PDF and DOCX files automatically",
              },
              {
                title: "AI Skill Gap Analysis",
                desc: "Compares your skills against target job requirements and identifies what is missing",
              },
              {
                title: "Personalized Recommendations",
                desc: "Get specific learning resources and courses to fill your skill gaps",
              },
              {
                title: "Match Score",
                desc: "See how well your resume matches the target job role with a percentage score",
              },
              {
                title: "LaTeX Resume Generator",
                desc: "Generate a professional ATS-friendly LaTeX resume template from your data",
              },
              {
                title: "Overleaf Integration",
                desc: "Download your .tex file and compile it into a beautiful PDF using Overleaf for free",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-5 rounded-xl bg-white/3 border border-white/5 hover:bg-white/5 transition-colors"
              >
                <CheckCircle
                  size={18}
                  className="text-violet-400 shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-white mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-white/50">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-violet-600/20 rounded-3xl blur-3xl pointer-events-none" />
            <div className="relative bg-white/3 border border-white/10 rounded-3xl p-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to bridge your skill gap?
              </h2>
              <p className="text-white/50 mb-8">
                Start analyzing your resume with AI today. It is completely
                free.
              </p>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:scale-105"
              >
                Get Started Free
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-6 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-violet-400" />
            <span className="font-bold text-white">Skill Bridge AI</span>
          </div>
          <p className="text-sm text-white/30">
            Smart Resume Analyzer · Skill Gap Finder · LaTeX Template Generator
          </p>

          <a
            href="https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/40 hover:text-white transition-colors text-sm"
          >
            <FaGithub size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
