import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  FileText,
  Clock,
  ChevronRight,
  LogOut,
  Sparkles,
  BarChart2,
  FileCode,
} from "lucide-react";
import axiosInstance from "../utils/axios";
import useAuthStore from "../store/authStore";

const Dashboard = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axiosInstance.get("/resume/history");
        setResumes(response.data.resumes);
      } catch (error) {
        toast.error("Failed to load resume history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-400" />
            <span className="font-bold text-white">Skill Bridge AI</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-white/40 hidden md:block">
              {user?.name || "User"}
            </span>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <Upload size={14} />
              New Analysis
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-6 py-10 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-white/40 mt-1">
            Here is your resume analysis history
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              icon: <FileText size={18} className="text-violet-400" />,
              value: resumes.length,
              label: "Resumes Uploaded",
              color: "bg-violet-500/10 border-violet-500/20",
            },
            {
              icon: <BarChart2 size={18} className="text-blue-400" />,
              value: resumes.length,
              label: "Analyses Done",
              color: "bg-blue-500/10 border-blue-500/20",
            },
            {
              icon: <FileCode size={18} className="text-emerald-400" />,
              value: resumes.length,
              label: "LaTeX Templates",
              color: "bg-emerald-500/10 border-emerald-500/20",
            },
          ].map((stat, index) => (
            <div key={index} className={`rounded-2xl border p-5 ${stat.color}`}>
              <div className="flex items-center gap-3">
                <div className="bg-white/5 rounded-lg p-2">{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resume History */}
        <div className="bg-white/3 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Clock size={16} className="text-violet-400" />
              Recent Uploads
            </h2>
            <Link
              to="/upload"
              className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Upload size={14} />
              Upload New
            </Link>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="w-8 h-8 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/5 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText size={24} className="text-white/20" />
                </div>
                <h3 className="font-semibold text-white/40 mb-2">
                  No resumes yet
                </h3>
                <p className="text-sm text-white/20 mb-4">
                  Upload your first resume to get started
                </p>
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                >
                  Upload Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/3 transition-colors"
                  >
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2 shrink-0">
                      <FileText size={18} className="text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">
                        {resume.fileName}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-white/30">
                          {formatDate(resume.createdAt)}
                        </span>
                        <span className="text-xs text-white/30">
                          {formatFileSize(resume.fileSize)}
                        </span>
                        <span className="text-xs text-white/30 uppercase">
                          {resume.fileType}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/upload"
                      className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 transition-colors shrink-0"
                    >
                      Analyze Again
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-8">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 to-blue-600/20 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Ready to analyze your resume?
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Upload your resume and get instant AI-powered skill gap analysis
              </p>
            </div>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shrink-0"
            >
              <Upload size={16} />
              Upload Resume
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
