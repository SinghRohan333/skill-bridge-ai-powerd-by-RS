import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  Download,
  ExternalLink,
  ArrowLeft,
  FileCode,
  Copy,
  Check,
} from "lucide-react";
import axiosInstance from "../utils/axios";

const Latex = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [latex, setLatex] = useState("");
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchOrGenerate = async () => {
      try {
        const analysisResponse = await axiosInstance.get(`/analyze/${id}`);
        const analysis = analysisResponse.data.analysis;

        if (analysis.latexTemplate) {
          setLatex(analysis.latexTemplate);
          setLoading(false);
          return;
        }

        setGenerating(true);
        const latexResponse = await axiosInstance.post(
          "/resume/generate-latex",
          {
            analysisId: id,
          },
        );
        setLatex(latexResponse.data.latex);
      } catch (error) {
        toast.error("Failed to generate LaTeX template");
        navigate(`/analysis/${id}`);
      } finally {
        setLoading(false);
        setGenerating(false);
      }
    };

    fetchOrGenerate();
  }, [id]);

  const handleDownload = () => {
    const blob = new Blob([latex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded resume.tex successfully!");
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latex);
    setCopied(true);
    toast.success("LaTeX code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverleaf = () => {
    handleDownload();
    setTimeout(() => {
      window.open("https://www.overleaf.com/project", "_blank");
    }, 500);
    toast.success("Opening Overleaf... Upload the downloaded .tex file there!");
  };

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-base-content/60">
            {generating
              ? "Generating your LaTeX resume with AI..."
              : "Loading your template..."}
          </p>
        </div>
      </div>
    );
  }

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
          <Link
            to={`/analysis/${id}`}
            className="btn btn-ghost btn-sm flex items-center gap-1"
          >
            <ArrowLeft size={16} />
            Back to Analysis
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-base-content flex items-center gap-2">
              <FileCode size={24} className="text-primary" />
              Your LaTeX Resume Template
            </h1>
            <p className="text-base-content/50 text-sm mt-1">
              Download the file and upload it to Overleaf to compile your PDF
              resume
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className="btn btn-outline btn-sm flex items-center gap-1"
            >
              {copied ? (
                <Check size={16} className="text-success" />
              ) : (
                <Copy size={16} />
              )}
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-outline btn-sm flex items-center gap-1"
            >
              <Download size={16} />
              Download .tex
            </button>
            <button
              onClick={handleOverleaf}
              className="btn btn-sm text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none flex items-center gap-1"
            >
              <ExternalLink size={16} />
              Open in Overleaf
            </button>
          </div>
        </div>

        {/* Instructions Card */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body py-4">
            <h2 className="font-semibold text-base-content mb-2">
              How to compile your resume
            </h2>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <p className="text-sm text-base-content/70">
                  Click <strong>Download .tex</strong> to save the file to your
                  computer
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <p className="text-sm text-base-content/70">
                  Go to <strong>overleaf.com</strong> and create a free account
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <p className="text-sm text-base-content/70">
                  Create a new project → Upload the <strong>.tex file</strong> →
                  Click Compile
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LaTeX Code Preview */}
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body p-0">
            <div className="flex items-center justify-between px-4 py-3 border-b border-base-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-error"></div>
                <div className="w-3 h-3 rounded-full bg-warning"></div>
                <div className="w-3 h-3 rounded-full bg-success"></div>
                <span className="text-xs text-base-content/40 ml-2">
                  resume.tex
                </span>
              </div>
              <button
                onClick={handleCopy}
                className="btn btn-ghost btn-xs flex items-center gap-1"
              >
                {copied ? (
                  <Check size={12} className="text-success" />
                ) : (
                  <Copy size={12} />
                )}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="overflow-auto max-h-150">
              <pre className="p-4 text-xs text-base-content/80 font-mono leading-relaxed whitespace-pre-wrap">
                {latex}
              </pre>
            </div>
          </div>
        </div>

        {/* Bottom Action Bar */}
        <div className="card bg-linear-to-r from-blue-600 to-purple-700 shadow-sm">
          <div className="card-body flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-white">
              <h2 className="text-lg font-bold">
                Ready to compile your resume?
              </h2>
              <p className="text-white/70 text-sm mt-1">
                Download the .tex file and open it in Overleaf for free PDF
                compilation
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="btn bg-white text-primary hover:bg-white/90 border-none"
              >
                <Download size={16} />
                Download .tex
              </button>
              <button
                onClick={handleOverleaf}
                className="btn bg-white/20 text-white hover:bg-white/30 border-white/30"
              >
                <ExternalLink size={16} />
                Open Overleaf
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Latex;
