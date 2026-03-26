import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Upload, FileText, X, CheckCircle, Briefcase } from "lucide-react";
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
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
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
    <div className="min-h-screen bg-base-200">
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">
            Skill Bridge AI
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Upload Your Resume
          </h1>
          <p className="text-base-content/50">
            Upload your resume and select a target role for AI-powered skill gap
            analysis
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-200
            ${isDragActive ? "border-primary bg-primary/5 scale-105" : "border-base-300 hover:border-primary hover:bg-base-100"}
            ${file ? "border-success bg-success/5" : ""}
          `}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="flex flex-col items-center gap-3">
              <CheckCircle size={48} className="text-success" />
              <p className="text-success font-semibold text-lg">
                File Selected
              </p>
              <p className="text-base-content/50 text-sm">
                Click or drag to replace
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <Upload size={48} className="text-primary/50" />
              {isDragActive ? (
                <p className="text-primary font-semibold text-lg">
                  Drop your resume here
                </p>
              ) : (
                <>
                  <p className="text-base-content font-semibold text-lg">
                    Drag & drop your resume here
                  </p>
                  <p className="text-base-content/50 text-sm">
                    or click to browse files
                  </p>
                </>
              )}
              <p className="text-base-content/30 text-xs mt-2">
                Supported formats: PDF, DOCX — Max size: 5MB
              </p>
            </div>
          )}
        </div>

        {file && (
          <div className="mt-4 bg-base-100 rounded-xl p-4 flex items-center gap-4 shadow-sm">
            <div className="bg-primary/10 rounded-lg p-3">
              <FileText size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-base-content truncate">
                {file.name}
              </p>
              <p className="text-sm text-base-content/50">
                {formatFileSize(file.size)}
              </p>
            </div>
            <button
              onClick={removeFile}
              className="btn btn-ghost btn-sm btn-circle text-error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        <div className="mt-6">
          <label className="label pb-1">
            <span className="label-text font-medium flex items-center gap-2">
              <Briefcase size={16} className="text-primary" />
              Target Job Role
            </span>
          </label>
          <select
            className="select select-bordered w-full"
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
          >
            <option value="">Select your target job role</option>
            {JOB_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleUpload}
          disabled={!file || !targetRole || uploading}
          className="btn w-full mt-6 text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none disabled:opacity-50"
        >
          {uploading ? (
            <span className="flex items-center gap-2">
              <span className="loading loading-spinner loading-sm"></span>
              Analyzing your resume...
            </span>
          ) : (
            "Upload & Analyze Resume"
          )}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
