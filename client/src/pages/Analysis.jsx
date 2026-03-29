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
  Sparkles,
} from "lucide-react";
import axiosInstance from "../utils/axios";
import Footer from "../components/Footer";

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
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <span className="w-10 h-10 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin block mx-auto" />
          <p className="mt-4 text-white/40">Loading your analysis...</p>
        </div>
      </div>
    );
  }

  if (!analysis) return null;

  const { extractedData, gapData } = analysis;
  const matchScore = gapData.matchScore || 0;
  const scoreColor =
    matchScore >= 80
      ? "text-emerald-400"
      : matchScore >= 60
        ? "text-yellow-400"
        : "text-red-400";
  const progressColor =
    matchScore >= 80
      ? "bg-emerald-500"
      : matchScore >= 60
        ? "bg-yellow-500"
        : "bg-red-500";

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
            <Link
              to="/upload"
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              New Analysis
            </Link>
            <Link
              to={`/latex/${analysis._id}`}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
            >
              Generate LaTeX
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Header Card */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {extractedData.name || "Unknown"}
              </h1>
              <div className="flex flex-wrap gap-4 mt-2">
                {extractedData.email && (
                  <span className="flex items-center gap-1 text-sm text-white/40">
                    <Mail size={13} /> {extractedData.email}
                  </span>
                )}
                {extractedData.phone && (
                  <span className="flex items-center gap-1 text-sm text-white/40">
                    <Phone size={13} /> {extractedData.phone}
                  </span>
                )}
              </div>
              {extractedData.summary && (
                <p className="mt-3 text-sm text-white/50 max-w-xl leading-relaxed">
                  {extractedData.summary}
                </p>
              )}
            </div>
            <div className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-5 min-w-32">
              <span className="text-xs text-white/30 mb-1">Match Score</span>
              <span className={`text-4xl font-bold ${scoreColor}`}>
                {matchScore}%
              </span>
              <span className="text-xs text-white/30 mt-1">
                {gapData.targetRole}
              </span>
            </div>
          </div>
          <div className="mt-4 bg-white/5 rounded-full h-2">
            <div
              className={`${progressColor} h-2 rounded-full transition-all`}
              style={{ width: `${matchScore}%` }}
            />
          </div>
        </div>

        {/* Education & Experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="font-bold text-white flex items-center gap-2 mb-4">
              <BookOpen size={16} className="text-violet-400" /> Education
            </h2>
            <div className="space-y-3">
              {extractedData.education?.map((edu, index) => (
                <div
                  key={index}
                  className="border-l-2 border-violet-500/30 pl-3"
                >
                  <p className="font-medium text-sm text-white">{edu.degree}</p>
                  <p className="text-xs text-white/40">{edu.institution}</p>
                  <p className="text-xs text-white/25">{edu.year}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="font-bold text-white flex items-center gap-2 mb-4">
              <Briefcase size={16} className="text-violet-400" /> Experience
            </h2>
            <div className="space-y-3">
              {extractedData.experience?.length > 0 ? (
                extractedData.experience.map((exp, index) => (
                  <div
                    key={index}
                    className="border-l-2 border-violet-500/30 pl-3"
                  >
                    <p className="font-medium text-sm text-white">
                      {exp.title}
                    </p>
                    <p className="text-xs text-white/40">{exp.company}</p>
                    <p className="text-xs text-white/25">{exp.duration}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-white/25">No experience found</p>
              )}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white flex items-center gap-2 mb-4">
            <User size={16} className="text-violet-400" /> Skills Found in
            Resume
          </h2>
          <div className="flex flex-wrap gap-2">
            {(showAllSkills
              ? extractedData.skills
              : extractedData.skills?.slice(0, 10)
            )?.map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 px-3 py-1.5 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
          {extractedData.skills?.length > 10 && (
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className="flex items-center gap-1 text-sm text-violet-400 hover:text-violet-300 mt-3 transition-colors"
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

        {/* Skill Gap */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="font-bold text-white flex items-center gap-2 mb-2">
              <CheckCircle size={16} className="text-emerald-400" /> Strong
              Skills
            </h2>
            <p className="text-xs text-white/30 mb-3">
              Skills that match the target role
            </p>
            <div className="flex flex-wrap gap-2">
              {gapData.strongSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
            <h2 className="font-bold text-white flex items-center gap-2 mb-2">
              <XCircle size={16} className="text-red-400" /> Missing Skills
            </h2>
            <p className="text-xs text-white/30 mb-3">
              Skills needed for the target role
            </p>
            <div className="flex flex-wrap gap-2">
              {gapData.missingSkills?.map((skill, index) => (
                <span
                  key={index}
                  className="text-xs bg-red-500/10 border border-red-500/20 text-red-400 px-3 py-1.5 rounded-lg"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white flex items-center gap-2 mb-3">
            <Target size={16} className="text-violet-400" /> Overall Assessment
          </h2>
          <p className="text-sm text-white/50 leading-relaxed">
            {gapData.summary}
          </p>
        </div>

        {/* Recommendations */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-6">
          <h2 className="font-bold text-white flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-yellow-400" /> Recommendations
          </h2>
          <p className="text-xs text-white/30 mb-4">
            What you should learn to land the target role
          </p>
          <div className="space-y-3">
            {gapData.recommendations?.map((rec, index) => (
              <div
                key={index}
                className="bg-white/3 border border-white/5 rounded-xl p-4"
              >
                <span className="text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 px-2 py-1 rounded-md">
                  {rec.skill}
                </span>
                <p className="text-sm text-white/50 mt-2">{rec.reason}</p>
                <p className="text-xs text-violet-400 mt-1">
                  📚 {rec.resource}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Generate LaTeX CTA */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-8">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 to-blue-600/20 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileCode size={18} /> Generate Your LaTeX Resume
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Turn your analyzed data into a professional LaTeX resume
                template
              </p>
            </div>
            <Link
              to={`/latex/${analysis._id}`}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105 shrink-0"
            >
              Generate LaTeX <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Analysis;
