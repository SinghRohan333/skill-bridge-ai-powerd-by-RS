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

const Landing = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-6 sticky top-0 z-50">
        <div className="flex-1 flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <span className="text-xl font-bold text-primary">
            Skill Bridge AI
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/login" className="btn btn-ghost btn-sm">
            Login
          </Link>
          <Link
            to="/register"
            className="btn btn-sm text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-linear-to-br from-blue-600 to-purple-700 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-sm mb-6">
            <Sparkles size={14} />
            Powered by Groq LLaMA AI
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Analyze Your Resume with AI. <br />
            <span className="text-white/80">Find Your Skill Gaps.</span>
          </h1>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
            Upload your resume and get instant AI-powered analysis. Discover
            missing skills, get personalized recommendations and download a
            professional LaTeX resume template.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/register"
              className="btn bg-white text-primary hover:bg-white/90 border-none gap-2"
            >
              Get Started Free
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/login"
              className="btn bg-white/10 text-white hover:bg-white/20 border-white/20"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 px-6 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">
            How It Works
          </h2>
          <p className="text-center text-base-content/50 mb-10">
            Three simple steps to supercharge your career
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card bg-base-100 shadow-sm text-center">
              <div className="card-body items-center">
                <div className="bg-primary/10 rounded-2xl p-4 mb-3">
                  <Upload size={28} className="text-primary" />
                </div>
                <div className="badge badge-primary mb-2">Step 1</div>
                <h3 className="font-bold text-base-content">Upload Resume</h3>
                <p className="text-sm text-base-content/60 mt-1">
                  Upload your resume in PDF or DOCX format and select your
                  target job role
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-sm text-center">
              <div className="card-body items-center">
                <div className="bg-purple-500/10 rounded-2xl p-4 mb-3">
                  <BarChart2 size={28} className="text-purple-500" />
                </div>
                <div className="badge badge-secondary mb-2">Step 2</div>
                <h3 className="font-bold text-base-content">AI Analysis</h3>
                <p className="text-sm text-base-content/60 mt-1">
                  Our AI analyzes your resume, finds skill gaps and gives
                  personalized recommendations
                </p>
              </div>
            </div>
            <div className="card bg-base-100 shadow-sm text-center">
              <div className="card-body items-center">
                <div className="bg-success/10 rounded-2xl p-4 mb-3">
                  <FileCode size={28} className="text-success" />
                </div>
                <div className="badge badge-success mb-2">Step 3</div>
                <h3 className="font-bold text-base-content">
                  Get LaTeX Template
                </h3>
                <p className="text-sm text-base-content/60 mt-1">
                  Download a professional LaTeX resume template and compile it
                  on Overleaf for free
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 bg-base-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-base-content mb-2">
            Features
          </h2>
          <p className="text-center text-base-content/50 mb-10">
            Everything you need to land your dream job
          </p>
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
                className="flex items-start gap-3 p-4 rounded-xl bg-base-200"
              >
                <CheckCircle
                  size={20}
                  className="text-primary shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="font-semibold text-base-content">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-base-content/60 mt-0.5">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-6 bg-linear-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to bridge your skill gap?
          </h2>
          <p className="text-white/70 mb-8">
            Join and start analyzing your resume with AI today. It is completely
            free.
          </p>
          <Link
            to="/register"
            className="btn bg-white text-primary hover:bg-white/90 border-none gap-2"
          >
            Get Started Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-base-200 py-6 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <span className="font-bold text-primary">Skill Bridge AI</span>
          </div>
          <p className="text-sm text-base-content/50">
            Smart Resume Analyzer, Skill Gap Finder and LaTeX Template Generator
          </p>

          <a
            href="https://github.com/SinghRohan333/skill-bridge-ai-powerd-by-RS"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm flex items-center gap-1"
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
