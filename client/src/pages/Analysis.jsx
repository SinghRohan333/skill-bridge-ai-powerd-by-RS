import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Briefcase,
  CheckCircle,
  XCircle,
  Target,
  Lightbulb,
  ArrowRight,
  FileCode,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import axiosInstance from "../utils/axios";

const Analysis = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axiosInstance.get(`/analyze/${id}`);
        setAnalysis(response.data.analysis);
      } catch (error) {
        toast.error("Failed to load analysis");
        navigate("/upload");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const { extractedData, gapData } = analysis;
  const matchScore = gapData.matchScore || 0;
  const scoreColor =
    matchScore >= 80
      ? "text-success"
      : matchScore >= 60
        ? "text-warning"
        : "text-error";
  const progressColor =
    matchScore >= 80
      ? "progress-success"
      : matchScore >= 60
        ? "progress-warning"
        : "progress-error";

  return (
    <div className="min-h-screen bg-base-200">
      {/* Navbar */}
      <div className="navbar bg-base-100 shadow-sm px-6">
        <div className="flex-1">
          <span className="text-xl font-bold text-primary">
            Skill Bridge AI
          </span>
        </div>
        <div className="flex gap-2">
          <Link to="/upload" className="btn btn-ghost btn-sm">
            New Analysis
          </Link>
          <Link
            to={`/latex/${analysis._id}`}
            className="btn btn-sm text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none"
          >
            Generate LaTeX
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Header Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-base-content">
                  {extractedData.name || "Unknown"}
                </h1>
                <div className="flex flex-wrap gap-4 mt-2">
                  {extractedData.email && (
                    <span className="flex items-center gap-1 text-sm text-base-content/60">
                      <Mail size={14} /> {extractedData.email}
                    </span>
                  )}
                  {extractedData.phone && (
                    <span className="flex items-center gap-1 text-sm text-base-content/60">
                      <Phone size={14} /> {extractedData.phone}
                    </span>
                  )}
                </div>
                {extractedData.summary && (
                  <p className="mt-3 text-sm text-base-content/70 max-w-xl">
                    {extractedData.summary}
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center bg-base-200 rounded-2xl p-4 min-w-32">
                <span className="text-xs text-base-content/50 mb-1">
                  Match Score
                </span>
                <span className={`text-4xl font-bold ${scoreColor}`}>
                  {matchScore}%
                </span>
                <span className="text-xs text-base-content/50 mt-1">
                  {gapData.targetRole}
                </span>
              </div>
            </div>
            <progress
              className={`progress ${progressColor} w-full mt-4`}
              value={matchScore}
              max="100"
            ></progress>
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Education */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <BookOpen size={18} className="text-primary" />
                Education
              </h2>
              <div className="space-y-3 mt-2">
                {extractedData.education?.map((edu, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-primary/30 pl-3"
                  >
                    <p className="font-medium text-sm text-base-content">
                      {edu.degree}
                    </p>
                    <p className="text-xs text-base-content/60">
                      {edu.institution}
                    </p>
                    <p className="text-xs text-base-content/40">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <Briefcase size={18} className="text-primary" />
                Experience
              </h2>
              <div className="space-y-3 mt-2">
                {extractedData.experience?.length > 0 ? (
                  extractedData.experience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-l-2 border-primary/30 pl-3"
                    >
                      <p className="font-medium text-sm text-base-content">
                        {exp.title}
                      </p>
                      <p className="text-xs text-base-content/60">
                        {exp.company}
                      </p>
                      <p className="text-xs text-base-content/40">
                        {exp.duration}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-base-content/40">
                    No experience found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Found */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base flex items-center gap-2">
              <User size={18} className="text-primary" />
              Skills Found in Resume
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {(showAllSkills
                ? extractedData.skills
                : extractedData.skills?.slice(0, 10)
              )?.map((skill, index) => (
                <span key={index} className="badge badge-primary badge-outline">
                  {skill}
                </span>
              ))}
            </div>
            {extractedData.skills?.length > 10 && (
              <button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="btn btn-ghost btn-xs mt-2 self-start flex items-center gap-1"
              >
                {showAllSkills ? (
                  <>
                    <ChevronUp size={14} /> Show less
                  </>
                ) : (
                  <>
                    <ChevronDown size={14} /> Show{" "}
                    {extractedData.skills.length - 10} more
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Skill Gap Report */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strong Skills */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <CheckCircle size={18} className="text-success" />
                Strong Skills
              </h2>
              <p className="text-xs text-base-content/50 mb-2">
                Skills that match the target role
              </p>
              <div className="flex flex-wrap gap-2">
                {gapData.strongSkills?.map((skill, index) => (
                  <span
                    key={index}
                    className="badge badge-success badge-outline"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Missing Skills */}
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-base flex items-center gap-2">
                <XCircle size={18} className="text-error" />
                Missing Skills
              </h2>
              <p className="text-xs text-base-content/50 mb-2">
                Skills needed for the target role
              </p>
              <div className="flex flex-wrap gap-2">
                {gapData.missingSkills?.map((skill, index) => (
                  <span key={index} className="badge badge-error badge-outline">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base flex items-center gap-2">
              <Target size={18} className="text-primary" />
              Overall Assessment
            </h2>
            <p className="text-sm text-base-content/70 mt-1">
              {gapData.summary}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body">
            <h2 className="card-title text-base flex items-center gap-2">
              <Lightbulb size={18} className="text-warning" />
              Recommendations
            </h2>
            <p className="text-xs text-base-content/50 mb-4">
              What you should learn to land the target role
            </p>
            <div className="space-y-4">
              {gapData.recommendations?.map((rec, index) => (
                <div key={index} className="bg-base-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="badge badge-primary">{rec.skill}</span>
                  </div>
                  <p className="text-sm text-base-content/70 mt-1">
                    {rec.reason}
                  </p>
                  <p className="text-xs text-primary mt-1 font-medium">
                    📚 {rec.resource}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Generate LaTeX Button */}
        <div className="card bg-linear-to-r from-blue-600 to-purple-700 shadow-sm">
          <div className="card-body flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <FileCode size={20} />
                Generate Your LaTeX Resume
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Turn your analyzed data into a professional LaTeX resume
                template
              </p>
            </div>
            <Link
              to={`/latex/${analysis._id}`}
              className="btn bg-white text-primary hover:bg-white/90 border-none shrink-0"
            >
              Generate LaTeX
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
