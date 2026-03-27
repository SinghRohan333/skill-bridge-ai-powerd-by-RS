import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Upload,
  FileText,
  X,
  CheckCircle,
  Briefcase,
  Sparkles,
} from "lucide-react";
import axiosInstance from "../utils/axios";

const JOB_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Data Analyst",
  "Machine Learning Engineer",
  "DevOps Engineer",
  "Cloud Engineer",
  "Cybersecurity Analyst",
  "UI/UX Designer",
  "Product Manager",
  "Business Analyst",
  "Mobile App Developer",
  "Database Administrator",
];

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only PDF and DOCX files are allowed. Max size is 5MB.");
      return;
    }
    if (acceptedFiles.length > 0) setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  });

  const removeFile = () => setFile(null);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file first");
    if (!targetRole) return toast.error("Please select a target job role");

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("resume", file);

      const uploadResponse = await axiosInstance.post(
        "/resume/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const resumeId = uploadResponse.data.resume.id;
      toast.success("Resume uploaded! Analyzing with AI...");

      const analysisResponse = await axiosInstance.post("/analyze/resume", {
        resumeId,
        targetRole,
      });

      toast.success("Analysis complete!");
      navigate(`/analysis/${analysisResponse.data.analysis._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-400" />
            <span className="font-bold text-white">Skill Bridge AI</span>
          </Link>
          <Link
            to="/dashboard"
            className="text-sm text-white/40 hover:text-white transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </div>

      <div className="relative max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Upload Your Resume
          </h1>
          <p className="text-white/40">
            Upload your resume and select a target role for AI-powered analysis
          </p>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? "border-violet-500 bg-violet-500/10 scale-105" : "border-white/10 hover:border-violet-500/50 hover:bg-white/3"}
            ${file ? "border-emerald-500/50 bg-emerald-500/5" : ""}
          `}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={48} className="text-emerald-400" />
              <p className="text-emerald-400 font-semibold text-lg">
                File Selected
              </p>
              <p className="text-white/30 text-sm">Click or drag to replace</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload size={40} className="text-white/20" />
              {isDragActive ? (
                <p className="text-violet-400 font-semibold text-lg">
                  Drop your resume here
                </p>
              ) : (
                <>
                  <p className="text-white font-semibold text-lg">
                    Drag & drop your resume here
                  </p>
                  <p className="text-white/30 text-sm">
                    or click to browse files
                  </p>
                </>
              )}
              <p className="text-white/20 text-xs mt-2">
                Supported formats: PDF, DOCX — Max size: 5MB
              </p>
            </div>
          )}
        </div>

        {/* File Preview */}
        {file && (
          <div className="mt-4 bg-white/3 border border-white/10 rounded-xl p-4 flex items-center gap-4">
            <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2">
              <FileText size={20} className="text-violet-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">{file.name}</p>
              <p className="text-sm text-white/30">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={removeFile}
              className="p-1.5 text-white/30 hover:text-red-400 transition-colors rounded-lg hover:bg-white/5"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {/* Job Role Dropdown */}
        <div className="mt-6">
          <label className="text-sm font-medium text-white/70 mb-1.5 flex items-center gap-2">
            <Briefcase size={14} className="text-violet-400" />
            Target Job Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-violet-500/50 transition-colors text-sm"
          >
            <option value="" className="bg-[#0a0a0f]">
              Select your target job role
            </option>
            {JOB_ROLES.map((role) => (
              <option key={role} value={role} className="bg-[#0a0a0f]">
                {role}
              </option>
            ))}
          </select>
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || !targetRole || uploading}
          className="w-full mt-6 flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
        >
          {uploading ? (
            <>
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analyzing your resume...
            </>
          ) : (
            "Upload & Analyze Resume"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
