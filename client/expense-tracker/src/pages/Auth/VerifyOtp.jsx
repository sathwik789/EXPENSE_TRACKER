import React, { useState, useEffect } from "react";
import AuthLayout from '../../components/layout/AuthLayout';
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  useEffect(() => {
    if (!userId) {
      navigate("/register");
    }
  }, [userId, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await axiosInstance.post("/api/v1/auth/verify-otp", {
        userId,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      setSuccess("✅ Email verified successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex items-center justify-center h-full w-full">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl animate-fadeIn">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-indigo-700 animate-pulse">
              Verify Your Email 🔒
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Enter the 6-digit OTP sent to your email.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            <div>
              <label
                htmlFor="otp"
                className="text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                maxLength={6}
                pattern="\d*"
                inputMode="numeric"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="w-full px-4 py-2 mt-1 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-200"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm animate-fadeIn">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm animate-fadeIn">{success}</p>
            )}

            <button
              type="submit"
              disabled={loading || !otp.trim() || otp.length !== 6}
              className={`w-full py-2.5 font-semibold rounded-xl text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                loading || !otp.trim() || otp.length !== 6
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
      `}</style>
    </AuthLayout>
  );
};

export default VerifyOtp;
