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
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1 flex items-center gap-2">
          <Sparkles size={20} className="text-primary" />
          <span className="text-xl font-bold text-primary">
            Skill Bridge AI
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-base-content/60 hidden md:block">
            Welcome, {user?.name || "User"}
          </span>
          <Link
            to="/upload"
            className="btn btn-sm text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
          >
            <Upload size={14} />
            New Analysis
          </Link>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <LogOut size={16} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-2xl font-bold text-base-content">
            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
          </h1>
          <p className="text-base-content/50 mt-1">
            Here is your resume analysis history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-lg p-2">
                  <FileText size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {resumes.length}
                  </p>
                  <p className="text-xs text-base-content/50">
                    Resumes Uploaded
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-500/10 rounded-lg p-2">
                  <BarChart2 size={20} className="text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {resumes.length}
                  </p>
                  <p className="text-xs text-base-content/50">Analyses Done</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body py-4">
              <div className="flex items-center gap-3">
                <div className="bg-success/10 rounded-lg p-2">
                  <FileCode size={20} className="text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-base-content">
                    {resumes.length}
                  </p>
                  <p className="text-xs text-base-content/50">
                    LaTeX Templates
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resume History */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-base-content flex items-center gap-2">
                <Clock size={18} className="text-primary" />
                Recent Uploads
              </h2>
              <Link
                to="/upload"
                className="btn btn-ghost btn-sm text-primary flex items-center gap-1"
              >
                <Upload size={14} />
                Upload New
              </Link>
            </div>

            {loading ? (
              <div className="flex justify-center py-8">
                <span className="loading loading-spinner loading-md text-primary"></span>
              </div>
            ) : resumes.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-base-200 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FileText size={28} className="text-base-content/30" />
                </div>
                <h3 className="font-semibold text-base-content/60 mb-2">
                  No resumes yet
                </h3>
                <p className="text-sm text-base-content/40 mb-4">
                  Upload your first resume to get started
                </p>
                <Link
                  to="/upload"
                  className="btn btn-sm text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
                >
                  Upload Resume
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {resumes.map((resume) => (
                  <div
                    key={resume._id}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-base-200 transition-colors"
                  >
                    <div className="bg-primary/10 rounded-lg p-2 shrink-0">
                      <FileText size={20} className="text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-base-content truncate">
                        {resume.fileName}
                      </p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-base-content/40">
                          {formatDate(resume.createdAt)}
                        </span>
                        <span className="text-xs text-base-content/40">
                          {formatFileSize(resume.fileSize)}
                        </span>
                        <span className="badge badge-xs badge-outline">
                          {resume.fileType.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/upload"
                      className="btn btn-ghost btn-sm flex items-center gap-1 shrink-0"
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

        {/* Quick Action Card */}
        <div className="card bg-linear-to-r from-blue-600 to-purple-700 shadow-sm">
          <div className="card-body flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-lg font-bold">
                Ready to analyze your resume?
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Upload your resume and get instant AI-powered skill gap analysis
              </p>
            </div>
            <Link
              to="/upload"
              className="btn bg-white text-primary hover:bg-white/90 border-none shrink-0"
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
