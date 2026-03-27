import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sparkles size={24} className="text-primary" />
          <span className="text-xl font-bold text-primary">
            Skill Bridge AI
          </span>
        </div>
        <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-base-content mb-2">
          Page Not Found
        </h2>
        <p className="text-base-content/50 mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none gap-2"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
