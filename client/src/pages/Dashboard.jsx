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
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 shrink-0">
            <Sparkles size={16} className="text-violet-400" />
            <span className="font-bold text-white text-sm whitespace-nowrap">
              Skill Bridge AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/40 hidden md:block truncate max-w-32">
              {user?.name || "User"}
            </span>
            <Link
              to="/upload"
              className="flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white text-xs px-3 py-1.5 rounded-lg transition-colors font-medium whitespace-nowrap"
            >
              <Upload size={12} />
              <span className="hidden sm:inline">New Analysis</span>
              <span className="sm:hidden">New</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-1.5 text-white/40 hover:text-white transition-colors rounded-lg hover:bg-white/5"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-8 space-y-6 flex-1 w-full">
        {/* Welcome */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-white/40 mt-1 text-sm">
            Here is your resume analysis history
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              icon: <FileText size={16} className="text-violet-400" />,
              value: resumes.length,
              label: "Uploaded",
              color: "bg-violet-500/10 border-violet-500/20",
            },
            {
              icon: <BarChart2 size={16} className="text-blue-400" />,
              value: resumes.length,
              label: "Analyses",
              color: "bg-blue-500/10 border-blue-500/20",
            },
            {
              icon: <FileCode size={16} className="text-emerald-400" />,
              value: resumes.length,
              label: "Templates",
              color: "bg-emerald-500/10 border-emerald-500/20",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className={`rounded-2xl border p-3 sm:p-5 ${stat.color}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <div className="bg-white/5 rounded-lg p-1.5 sm:p-2 w-fit">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-bold text-white">
                    {stat.value}
                  </p>
                  <p className="text-xs text-white/40">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resume History */}
        <div className="bg-white/3 border border-white/10 rounded-2xl">
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/5">
            <h2 className="font-bold text-white flex items-center gap-2 text-sm sm:text-base">
              <Clock size={15} className="text-violet-400" />
              Recent Uploads
            </h2>
            <Link
              to="/upload"
              className="flex items-center gap-1 text-xs sm:text-sm text-violet-400 hover:text-violet-300 transition-colors"
            >
              <Upload size={12} />
              Upload New
            </Link>
          </div>

          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <span className="w-8 h-8 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin" />
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/5 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                  <FileText size={22} className="text-white/20" />
                </div>
                <h3 className="font-semibold text-white/40 mb-2 text-sm">
                  No resumes yet
                </h3>
                <p className="text-xs text-white/20 mb-4">
                  Upload your first resume to get started
                </p>
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-xs px-4 py-2 rounded-lg transition-colors"
                >
                  Upload Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-2">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/3 transition-colors"
                  >
                    <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2 shrink-0">
                      <FileText size={16} className="text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-sm truncate">
                        {resume.fileName}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
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
                      className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors shrink-0"
                    >
                      <span className="hidden sm:inline">Analyze Again</span>
                      <ChevronRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-6 sm:p-8">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 to-blue-600/20 pointer-events-none" />
          <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-base sm:text-lg font-bold text-white">
                Ready to analyze your resume?
              </h2>
              <p className="text-white/50 text-xs sm:text-sm mt-1">
                Upload your resume and get instant AI-powered skill gap analysis
              </p>
            </div>
            <Link
              to="/upload"
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all hover:scale-105 shrink-0 text-sm"
            >
              <Upload size={14} />
              Upload Resume
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5 py-5 px-4 mt-8">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} Skill Bridge AI. Designed & Developed
            by <span className="text-violet-400 font-medium">Rohan Singh</span>.
            All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
