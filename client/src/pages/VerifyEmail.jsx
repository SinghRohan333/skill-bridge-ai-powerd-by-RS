import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { Sparkles, Mail, ArrowLeft, RefreshCw } from "lucide-react";
import axiosInstance from "../utils/axios";
import useAuthStore from "../store/authStore";

const VerifyEmail = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, setToken } = useAuthStore();

  const email = location.state?.email || "";

  useEffect(() => {
    if (!email) {
      navigate("/register");
    }
  }, [email]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pasted)) {
      const newCode = [...code];
      pasted.split("").forEach((char, i) => {
        newCode[i] = char;
      });
      setCode(newCode);
      inputs.current[Math.min(pasted.length, 5)]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 6) {
      return toast.error("Please enter the complete 6-digit code");
    }

    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/verify-email", {
        email,
        code: fullCode,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success("Email verified successfully! Welcome to Skill Bridge AI");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      setResending(true);
      await axiosInstance.post("/auth/resend-code", { email });
      toast.success("New verification code sent to your email");
      setCooldown(60);
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-125 h-75 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-violet-400" />
            <span className="text-xl font-bold text-white">
              Skill Bridge AI
            </span>
          </Link>
          <div className="bg-violet-500/10 border border-violet-500/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <Mail size={28} className="text-violet-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">
            Check your email
          </h2>
          <p className="text-white/40 text-sm">
            We sent a 6-digit verification code to
          </p>
          <p className="text-violet-400 font-medium text-sm mt-1">{email}</p>
        </div>

        <div className="bg-white/3 border border-white/10 rounded-2xl p-8">
          <p className="text-white/60 text-sm text-center mb-6">
            Enter the 6-digit code from your email
          </p>

          <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-xl font-bold bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-violet-500 transition-colors"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading || code.join("").length !== 6}
            className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Verify Email"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-white/40 text-sm mb-2">
              Did not receive the code?
            </p>
            <button
              onClick={handleResend}
              disabled={resending || cooldown > 0}
              className="flex items-center gap-2 text-violet-400 hover:text-violet-300 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-medium transition-colors mx-auto"
            >
              <RefreshCw
                size={14}
                className={resending ? "animate-spin" : ""}
              />
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
          </div>
        </div>

        <p className="text-center mt-6 text-white/40 text-sm">
          <Link
            to="/register"
            className="flex items-center justify-center gap-1 text-violet-400 hover:text-violet-300 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
