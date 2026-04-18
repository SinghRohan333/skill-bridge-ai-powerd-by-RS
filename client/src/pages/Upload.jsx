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
  FileSearch,
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
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDocFile, setJobDocFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [targetRole, setTargetRole] = useState("");
  const [analysisMode, setAnalysisMode] = useState("role");
  const navigate = useNavigate();

  const onDropResume = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only PDF and DOCX files are allowed. Max size is 5MB.");
      return;
    }
    if (acceptedFiles.length > 0) setResumeFile(acceptedFiles[0]);
  }, []);

  const onDropJobDoc = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error("Only PDF and DOCX files are allowed. Max size is 5MB.");
      return;
    }
    if (acceptedFiles.length > 0) setJobDocFile(acceptedFiles[0]);
  }, []);

  const dropzoneConfig = {
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  };

  const {
    getRootProps: getResumeRootProps,
    getInputProps: getResumeInputProps,
    isDragActive: isResumeDragActive,
  } = useDropzone({
    ...dropzoneConfig,
    onDrop: onDropResume,
  });

  const {
    getRootProps: getJobDocRootProps,
    getInputProps: getJobDocInputProps,
    isDragActive: isJobDocDragActive,
  } = useDropzone({
    ...dropzoneConfig,
    onDrop: onDropJobDoc,
  });

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleUpload = async () => {
    if (!resumeFile) return toast.error("Please select your resume file");
    if (analysisMode === "role" && !targetRole)
      return toast.error("Please select a target job role");
    if (analysisMode === "document" && !jobDocFile)
      return toast.error("Please upload a job description document");

    try {
      setUploading(true);

      const resumeFormData = new FormData();
      resumeFormData.append("resume", resumeFile);

      const uploadResponse = await axiosInstance.post(
        "/resume/upload",
        resumeFormData,
      );
      const resumeId = uploadResponse.data.resume.id;
      toast.success("Resume uploaded! Analyzing with AI...");

      let analysisResponse;

      if (analysisMode === "role") {
        analysisResponse = await axiosInstance.post("/analyze/resume", {
          resumeId,
          targetRole,
          analysisMode: "role",
        });
      } else {
        const analysisFormData = new FormData();
        analysisFormData.append("resumeId", resumeId);
        analysisFormData.append("analysisMode", "document");
        analysisFormData.append("jobDocument", jobDocFile);
        analysisResponse = await axiosInstance.post(
          "/analyze/resume",
          analysisFormData,
        );
      }

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
            Choose your analysis mode and let AI find your skill gaps
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex gap-3 mb-8 bg-white/3 border border-white/10 rounded-2xl p-1.5">
          <button
            onClick={() => setAnalysisMode("role")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              analysisMode === "role"
                ? "bg-violet-600 text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            <Briefcase size={16} />
            Target Job Role
          </button>
          <button
            onClick={() => setAnalysisMode("document")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
              analysisMode === "document"
                ? "bg-violet-600 text-white"
                : "text-white/40 hover:text-white"
            }`}
          >
            <FileSearch size={16} />
            Job Description Doc
          </button>
        </div>

        {/* Mode Description */}
        <div className="mb-6 px-1">
          {analysisMode === "role" ? (
            <p className="text-xs text-white/30">
              Select a target job role from the dropdown. AI will analyze your
              resume based on general industry requirements for that role.
            </p>
          ) : (
            <p className="text-xs text-white/30">
              Upload the actual job description document provided by the
              company. AI will analyze your resume against the exact
              requirements in that document.
            </p>
          )}
        </div>

        {/* Resume Dropzone */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-white/70 mb-2">
            Your Resume
          </label>
          <div
            {...getResumeRootProps()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
              ${isResumeDragActive ? "border-violet-500 bg-violet-500/10 scale-105" : "border-white/10 hover:border-violet-500/50 hover:bg-white/3"}
              ${resumeFile ? "border-emerald-500/50 bg-emerald-500/5" : ""}
            `}
          >
            <input {...getResumeInputProps()} />
            {resumeFile ? (
              <div className="flex flex-col items-center gap-2">
                <CheckCircle size={36} className="text-emerald-400" />
                <p className="text-emerald-400 font-semibold">
                  Resume Selected
                </p>
                <p className="text-white/30 text-xs">
                  Click or drag to replace
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload size={32} className="text-white/20" />
                {isResumeDragActive ? (
                  <p className="text-violet-400 font-semibold">
                    Drop your resume here
                  </p>
                ) : (
                  <>
                    <p className="text-white font-semibold">
                      Drag & drop your resume
                    </p>
                    <p className="text-white/30 text-sm">or click to browse</p>
                  </>
                )}
                <p className="text-white/20 text-xs mt-1">
                  PDF or DOCX — Max 5MB
                </p>
              </div>
            )}
          </div>

          {resumeFile && (
            <div className="mt-3 bg-white/3 border border-white/10 rounded-xl p-3 flex items-center gap-3">
              <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2">
                <FileText size={16} className="text-violet-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white text-sm truncate">
                  {resumeFile.name}
                </p>
                <p className="text-xs text-white/30">
                  {formatFileSize(resumeFile.size)}
                </p>
              </div>
              <button
                onClick={() => setResumeFile(null)}
                className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Mode Specific Input */}
        {analysisMode === "role" ? (
          <div className="mb-6">
            <label className="text-sm font-medium text-white/70 mb-2 flex items-center gap-2">
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
        ) : (
          <div className="mb-6">
            <label className="block text-sm font-medium text-white/70 mb-2">
              Job Description Document
            </label>
            <div
              {...getJobDocRootProps()}
              className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200
                ${isJobDocDragActive ? "border-violet-500 bg-violet-500/10 scale-105" : "border-white/10 hover:border-violet-500/50 hover:bg-white/3"}
                ${jobDocFile ? "border-emerald-500/50 bg-emerald-500/5" : ""}
              `}
            >
              <input {...getJobDocInputProps()} />
              {jobDocFile ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle size={36} className="text-emerald-400" />
                  <p className="text-emerald-400 font-semibold">
                    Job Document Selected
                  </p>
                  <p className="text-white/30 text-xs">
                    Click or drag to replace
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <FileSearch size={32} className="text-white/20" />
                  {isJobDocDragActive ? (
                    <p className="text-violet-400 font-semibold">
                      Drop job description here
                    </p>
                  ) : (
                    <>
                      <p className="text-white font-semibold">
                        Drag & drop job description
                      </p>
                      <p className="text-white/30 text-sm">
                        or click to browse
                      </p>
                    </>
                  )}
                  <p className="text-white/20 text-xs mt-1">
                    PDF or DOCX — Max 5MB
                  </p>
                </div>
              )}
            </div>

            {jobDocFile && (
              <div className="mt-3 bg-white/3 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-2">
                  <FileSearch size={16} className="text-violet-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white text-sm truncate">
                    {jobDocFile.name}
                  </p>
                  <p className="text-xs text-white/30">
                    {formatFileSize(jobDocFile.size)}
                  </p>
                </div>
                <button
                  onClick={() => setJobDocFile(null)}
                  className="p-1.5 text-white/30 hover:text-red-400 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={
            !resumeFile ||
            uploading ||
            (analysisMode === "role" && !targetRole) ||
            (analysisMode === "document" && !jobDocFile)
          }
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition-all hover:scale-[1.02]"
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

        {/* Footer */}
        <div className="border-t border-white/5 py-5 px-4 mt-8">
          <div className="max-w-5xl mx-auto text-center">
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

export default UploadPage;
