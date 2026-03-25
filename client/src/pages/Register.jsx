import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Mail, Lock, User, Sparkles } from "lucide-react";
import axiosInstance from "../utils/axios";
import useAuthStore from "../store/authStore";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      setToken(response.data.token);
      setUser(response.data.user);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex w-1/2 bg-linear-to-br from-blue-600 to-purple-700 flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles size={40} />
          </div>
          <h1 className="text-4xl font-bold mb-4">Skill Bridge AI</h1>
          <p className="text-lg text-white/80 mb-8">
            Smart Resume Analyzer, Skill Gap Finder and LaTeX Template Generator
            powered by AI.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-white/90">
                Upload your resume in PDF or DOCX format
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-white/90">
                AI analyzes and finds your skill gaps
              </p>
            </div>
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-4">
              <div className="w-2 h-2 rounded-full bg-white"></div>
              <p className="text-white/90">
                Download a professional LaTeX resume template
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-base-100">
        <div className="w-full max-w-md">
          <div className="flex items-center gap-2 mb-2 lg:hidden">
            <Sparkles size={24} className="text-primary" />
            <span className="text-xl font-bold text-primary">
              Skill Bridge AI
            </span>
          </div>

          <h2 className="text-3xl font-bold text-base-content mb-1">
            Create account
          </h2>
          <p className="text-base-content/50 mb-8">
            Join Skill Bridge AI and level up your career
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${errors.name ? "input-error" : ""}`}
              >
                <User size={18} className="text-base-content/40" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="grow"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                />
              </label>
              {errors.name && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Email Address</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${errors.email ? "input-error" : ""}`}
              >
                <Mail size={18} className="text-base-content/40" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="grow"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
              </label>
              {errors.email && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Password</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${errors.password ? "input-error" : ""}`}
              >
                <Lock size={18} className="text-base-content/40" />
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  className="grow"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
              </label>
              {errors.password && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">
                    {errors.password.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label pb-1">
                <span className="label-text font-medium">Confirm Password</span>
              </label>
              <label
                className={`input input-bordered flex items-center gap-2 w-full ${errors.confirmPassword ? "input-error" : ""}`}
              >
                <Lock size={18} className="text-base-content/40" />
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="grow"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </label>
              {errors.confirmPassword && (
                <label className="label pt-1">
                  <span className="label-text-alt text-error">
                    {errors.confirmPassword.message}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full text-white bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-none mt-2"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-base-content/50 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
