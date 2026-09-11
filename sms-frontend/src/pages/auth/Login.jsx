import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  AlertCircle,
  Loader2,
  ArrowRight,
  BookOpenCheck,
  Award,
  Building,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  Globe,
} from "lucide-react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { loginUser } from "../../services/authApi";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  // Get login function from AuthContext
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
        const result = await loginUser(formData);

        console.log("LOGIN RESPONSE:", result);

        // Laravel returns user inside "data"
        const user = result.data;
        const token = result.token;

        if (!token || !user) {
            throw new Error("Invalid login response from server.");
        }

        // Save authentication
        login(token, user);

        // Redirect based on role
        switch (user.role) {
            case "super_admin":
                navigate("/super-admin/dashboard", {
                    replace: true,
                });
                break;

            case "admin":
                navigate("/admin/dashboard", {
                    replace: true,
                });
                break;

            case "teacher":
                navigate("/teacher/dashboard", {
                    replace: true,
                });
                break;

            case "student":
                navigate("/student/dashboard", {
                    replace: true,
                });
                break;

            default:
                setError("Your account role is not authorized.");
        }

    } catch (err) {
        console.error("LOGIN ERROR:", err);

        setError(
            err.message ||
            "Invalid email or password. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

  // Google / GitHub
  const handleSocialLogin = (provider) => {
    window.location.href = `http://127.0.0.1:8000/api/auth/${provider}`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950 font-sans text-slate-100 overflow-hidden">
      {/* ================= LEFT SECTION ================= */}

      <div className="hidden lg:flex flex-col justify-between p-12 bg-slate-950 relative overflow-hidden border-r border-slate-800/60 select-none">
        {/* Glow */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-blue-600/15 blur-[120px] pointer-events-none" />

        <div className="absolute bottom-10 right-0 w-96 h-96 rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between relative z-10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600/20 rounded-xl border border-blue-500/30 text-blue-400 shadow-md">
              <GraduationCap className="h-6 w-6" />
            </div>

            <div>
              <span className="text-xl font-bold tracking-tight text-white block">
                TALUTUN High School
              </span>

              <span className="text-[11px] text-slate-400 font-medium">
                Academic Management System
              </span>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Semester 2 Active
          </span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 space-y-6 my-auto py-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-3"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              Direct Campus Portal
            </span>

            <h1 className="text-3xl font-black tracking-tight text-white leading-snug">
              Empowering Academic Excellence & Student Potential
            </h1>

            <p className="text-slate-400 text-xs leading-relaxed max-w-lg">
              Official portal for tracking TALUTUN High School curriculum
              progress, monthly assessment rankings, attendance, and exam
              readiness.
            </p>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-3 gap-3"
          >
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2 text-blue-400 mb-1">
                <Building className="w-4 h-4" />

                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Classes
                </span>
              </div>

              <p className="text-xl font-bold text-white">42 Classes</p>

              <p className="text-[10px] text-slate-500 mt-0.5">
                Grades 7 to 12
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <BookOpenCheck className="w-4 h-4" />

                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Tracks
                </span>
              </div>

              <p className="text-xl font-bold text-white">Science & Social</p>

              <p className="text-[10px] text-slate-500 mt-0.5">
                Grades 11 & 12
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Award className="w-4 h-4" />

                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Pass Rate
                </span>
              </div>

              <p className="text-xl font-bold text-white">96.8%</p>

              <p className="text-[10px] text-slate-500 mt-0.5">
                Annual Graduation
              </p>
            </div>
          </motion.div>

          {/* Operations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3 backdrop-blur-md"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                TALUTUN Academic Operations
              </span>

              <span className="text-[10px] text-slate-400">
                Campus Verified
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Monthly Ranking Reports</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Practice Examination System</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Daily Attendance Monitoring</span>
              </div>

              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span>Parent & Student Alerts</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-10 flex items-center justify-between text-xs text-slate-500 border-t border-slate-800/60 pt-4"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            TALUTUN Campus District
          </span>

          <span className="text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            support@talutun.edu
          </span>
        </motion.div>
      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="flex items-center justify-center p-6 sm:p-12 relative my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md space-y-6 bg-slate-900/60 p-8 rounded-3xl border border-slate-800/80 shadow-2xl backdrop-blur-xl"
        >
          {/* Mobile Logo */}
          <div className="text-center lg:hidden">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl text-white mb-3 shadow-lg shadow-blue-500/30">
              <GraduationCap className="h-7 w-7" />
            </div>

            <h2 className="text-2xl font-bold text-white">
              TALUTUN High School
            </h2>
          </div>

          {/* Header */}
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">
              Welcome Back
            </h2>

            <p className="text-sm text-slate-400 mt-2">
              Sign in with your TALUTUN school account credentials.
            </p>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-950/80 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaGithub className="w-5 h-5 text-white" />
              GitHub
            </motion.button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800" />
            </div>

            <div className="relative px-3 bg-slate-900 text-xs uppercase tracking-wider text-slate-500">
              Or continue with school email
            </div>
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 rounded-2xl bg-red-500/10 p-4 text-sm text-red-400 border border-red-500/20 shadow-sm"
              >
                <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />

                <div className="flex-1">{error}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Email Address / Student ID
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Mail className="h-5 w-5" />
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@talutun.edu"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <Lock className="h-5 w-5" />
                </div>

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 bg-slate-950/70 border border-slate-800 rounded-xl text-slate-100 text-sm placeholder-slate-500 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-inner"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-300 transition-colors">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-600 focus:ring-blue-500/20"
                />
                Remember me
              </label>

              <a
                href="#"
                className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{
                scale: loading ? 1 : 1.015,
              }}
              whileTap={{
                scale: loading ? 1 : 0.985,
              }}
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Register */}
          <p className="text-center text-xs text-slate-400 pt-1">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Request Access
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
