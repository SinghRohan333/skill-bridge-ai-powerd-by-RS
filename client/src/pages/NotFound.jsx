import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import Footer from "../components/Footer";

const NotFound = () => {
  return (
    <div className="bg-[#0a0a0f]">
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-100 h-75 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Sparkles size={20} className="text-violet-400" />
            <span className="text-lg font-bold text-white">
              Skill Bridge AI
            </span>
          </div>
          <h1 className="text-9xl font-black text-white/5 mb-0 leading-none">
            404
          </h1>
          <h2 className="text-2xl font-bold text-white mt-2 mb-2">
            Page Not Found
          </h2>
          <p className="text-white/40 mb-8 max-w-sm mx-auto">
            The page you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-3 rounded-xl font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
