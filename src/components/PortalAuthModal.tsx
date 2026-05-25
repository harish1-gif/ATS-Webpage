"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, AlertCircle, CheckCircle } from "lucide-react";

interface PortalAuthModalProps {
  portalType: "admin" | "client";
  isOpen: boolean;
  onSuccess: (token: string) => void;
  onClose: () => void;
}

export default function PortalAuthModal({
  portalType,
  isOpen,
  onSuccess,
  onClose,
}: PortalAuthModalProps) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          portalType,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Authentication failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSuccess(data.token);
        setPassword("");
        setSuccess(false);
      }, 1500);
    } catch (err) {
      setError("Connection error. Please try again.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md glass-card bg-white/95 backdrop-blur-xl border border-slate-200/50 rounded-3xl p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-violet/20 to-brand-blue/20 flex items-center justify-center">
            <Lock className="w-6 h-6 text-brand-violet" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">
              {portalType === "admin" ? "Admin" : "Client"} Portal
            </h2>
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              Password Protected
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Password Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Enter Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={loading || success}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3 bg-red-50 border border-red-200 rounded-xl"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span className="text-xs font-medium text-red-700">{error}</span>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-medium text-emerald-700">
                Authentication successful!
              </span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success || !password}
            className="w-full py-3 bg-gradient-to-r from-brand-violet to-brand-blue text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                Verifying...
              </span>
            ) : success ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Authenticated
              </span>
            ) : (
              "Unlock Portal"
            )}
          </button>

          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-slate-600 hover:text-slate-800 text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            Cancel
          </button>
        </form>

        {/* Info Text */}
        <p className="text-center text-[10px] text-slate-500 mt-6 font-medium">
          This portal requires a password for security purposes.
        </p>
      </motion.div>
    </motion.div>
  );
}
