import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles,
  Upload,
  BarChart2,
  FileCode,
  CheckCircle,
  ArrowRight,
  Mail,
  Code2,
  Brain,
  Shield,
  ExternalLink,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import useAuthStore from "../store/authStore";

const Landing = () => {
  const { isAuthenticated } = useAuthStore();
  const [showEmail, setShowEmail] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-1.5 shrink-0">
            <Sparkles size={16} className="text-violet-400" />
            <span className="text-base font-bold text-white whitespace-nowrap">
              Skill Bridge AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-xs sm:text-sm text-white/60 hover:text-white transition-colors px-2 py-1.5 sm:px-3 whitespace-nowrap"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="text-xs sm:text-sm bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-colors font-medium whitespace-nowrap"
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-100 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-75 h-75 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-75 h-75 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-xs text-white/60 mb-6 uppercase tracking-widest">
            <Sparkles size={10} className="text-violet-400" />
            Powered by Groq LLaMA AI
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5 tracking-tight">
            Analyze Your Resume <br className="hidden sm:block" />
            with AI.{" "}
            <span className="bg-linear-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Find Skill Gaps.
            </span>
          </h1>

          <p className="text-base md:text-lg text-white/50 mb-8 max-w-xl mx-auto leading-relaxed">
            Upload your resume and get instant AI-powered analysis. Discover
            missing skills, get personalized recommendations and download a
            professional LaTeX resume template.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm sm:max-w-none mx-auto">
            <Link
              to="/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Login to Dashboard
            </Link>
          </div>

          <p className="text-xs text-white/20 mt-6">
            Built by{" "}
            <span className="text-violet-400 font-medium">Rohan Singh</span> ·
            University Lab Project
          </p>
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

      {/* About The Creator Section */}
      <div className="py-20 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              About The Creator
            </h2>
            <p className="text-white/40">The mind behind Skill Bridge AI</p>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Photo */}
              <div className="shrink-0">
                <img
                  src="/src/assets/github_rohan.png"
                  alt="Rohan Singh"
                  className="w-32 h-32 rounded-2xl object-cover border-2 border-violet-500/20"
                />
                <p className="text-center text-xs text-white/20 mt-2">
                  Rohan Singh
                </p>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                  <h3 className="text-2xl font-bold text-white">Rohan Singh</h3>
                  <span className="inline-flex items-center gap-1 bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs px-3 py-1 rounded-full">
                    <Sparkles size={10} />
                    Creator & Developer
                  </span>
                </div>

                <p className="text-white/50 leading-relaxed mb-6 text-sm">
                  A passionate web developer with strong problem solving and DSA
                  skills. 2 Star Competitive Programmer on CodeChef. AI/ML
                  enthusiast actively exploring the latest in artificial
                  intelligence. Also diving deep into Cybersecurity and
                  Blockchain technologies.
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {[
                    {
                      icon: <Code2 size={12} />,
                      label: "Full Stack Dev",
                      color:
                        "bg-violet-500/10 border-violet-500/20 text-violet-300",
                    },
                    {
                      icon: <BarChart2 size={12} />,
                      label: "2★ CodeChef",
                      color:
                        "bg-yellow-500/10 border-yellow-500/20 text-yellow-300",
                    },
                    {
                      icon: <Brain size={12} />,
                      label: "AI/ML Enthusiast",
                      color: "bg-blue-500/10 border-blue-500/20 text-blue-300",
                    },
                    {
                      icon: <Shield size={12} />,
                      label: "Cybersecurity",
                      color:
                        "bg-emerald-500/10 border-emerald-500/20 text-emerald-300",
                    },
                    {
                      icon: <FileCode size={12} />,
                      label: "Blockchain",
                      color:
                        "bg-orange-500/10 border-orange-500/20 text-orange-300",
                    },
                  ].map((tag, index) => (
                    <span
                      key={index}
                      className={`inline-flex items-center gap-1.5 border text-xs px-3 py-1.5 rounded-lg ${tag.color}`}
                    >
                      {tag.icon}
                      {tag.label}
                    </span>
                  ))}
                </div>

                {/* Contact Links */}
                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <button
                    onClick={() => setShowEmail(!showEmail)}
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg transition-all"
                  >
                    <Mail size={14} />
                    {showEmail ? "rohan.singh@gmail.com" : "Email"}
                  </button>

                  <a
                    href="https://github.com/SinghRohan333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    <FaGithub size={14} />
                    GitHub
                  </a>

                  <a
                    href="https://www.linkedin.com/in/singhrohan333/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/60 hover:text-white text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    <ImLinkedin size={14} />
                    LinkedIn
                  </a>

                  <a
                    href="https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/20 text-violet-300 hover:text-violet-200 text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink size={14} />
                    View Project
                  </a>
                </div>
              </div>
            </div>
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
      <div className="border-t border-white/5 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-violet-400" />
              <span className="font-bold text-white">Skill Bridge AI</span>
            </div>
            <p className="text-sm text-white/30 text-center">
              Smart Resume Analyzer · Skill Gap Finder · LaTeX Template
              Generator
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
          <div className="border-t border-white/5 pt-4 text-center">
            <p className="text-xs text-white/20">
              © {new Date().getFullYear()} Skill Bridge AI. Designed & Developed
              by{" "}
              <span className="text-violet-400 font-medium">Rohan Singh</span>.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
