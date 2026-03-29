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
  Sparkles,
} from "lucide-react";
import axiosInstance from "../utils/axios";
import Footer from "../components/Footer";

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
          { analysisId: id },
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
    setTimeout(
      () => window.open("https://www.overleaf.com/project", "_blank"),
      500,
    );
    toast.success("Opening Overleaf... Upload the downloaded .tex file there!");
  };

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <span className="w-10 h-10 border-2 border-white/10 border-t-violet-500 rounded-full animate-spin block mx-auto" />
          <p className="mt-4 text-white/40">
            {generating
              ? "Generating your LaTeX resume with AI..."
              : "Loading your template..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Navbar */}
      <div className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-violet-400" />
            <span className="font-bold text-white">Skill Bridge AI</span>
          </div>
          <Link
            to={`/analysis/${id}`}
            className="flex items-center gap-1 text-sm text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Analysis
          </Link>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <FileCode size={22} className="text-violet-400" />
              Your LaTeX Resume Template
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Download the file and upload it to Overleaf to compile your PDF
              resume
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {copied ? (
                <Check size={14} className="text-emerald-400" />
              ) : (
                <Copy size={14} />
              )}
              {copied ? "Copied!" : "Copy Code"}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              <Download size={14} />
              Download .tex
            </button>
            <button
              onClick={handleOverleaf}
              className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium"
            >
              <ExternalLink size={14} />
              Open in Overleaf
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white/3 border border-white/10 rounded-2xl p-5">
          <h2 className="font-semibold text-white mb-3 text-sm">
            How to compile your resume
          </h2>
          <div className="flex flex-col md:flex-row gap-4">
            {[
              {
                step: "1",
                text: "Click Download .tex to save the file to your computer",
              },
              {
                step: "2",
                text: "Go to overleaf.com and create a free account",
              },
              {
                step: "3",
                text: "Create a new project → Upload the .tex file → Click Compile",
              },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {item.step}
                </div>
                <p className="text-sm text-white/50">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Code Preview */}
        <div className="bg-white/3 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 bg-white/2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
              <span className="text-xs text-white/25 ml-2">resume.tex</span>
            </div>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-white/30 hover:text-white transition-colors"
            >
              {copied ? (
                <Check size={12} className="text-emerald-400" />
              ) : (
                <Copy size={12} />
              )}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="overflow-auto max-h-150">
            <pre className="p-6 text-xs text-white/60 font-mono leading-relaxed whitespace-pre-wrap">
              {latex}
            </pre>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="relative rounded-2xl overflow-hidden border border-white/10 p-8">
          <div className="absolute inset-0 bg-linear-to-r from-violet-600/20 to-blue-600/20 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Ready to compile your resume?
              </h2>
              <p className="text-white/50 text-sm mt-1">
                Download the .tex file and open it in Overleaf for free PDF
                compilation
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2.5 rounded-xl transition-colors text-sm font-medium"
              >
                <Download size={14} /> Download .tex
              </button>
              <button
                onClick={handleOverleaf}
                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-xl transition-colors text-sm font-medium"
              >
                <ExternalLink size={14} /> Open Overleaf
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Latex;
