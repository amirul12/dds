"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${STRAPI_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error?.message || "ইমেইল বা পাসওয়ার্ড সঠিক নয়।");
        return;
      }

      // Store auth info in sessionStorage (clears on tab close)
      sessionStorage.setItem("admin_token", data.data?.token || "authenticated");
      sessionStorage.setItem("admin_user", JSON.stringify({
        name: data.data?.user?.firstname + " " + data.data?.user?.lastname,
        email: data.data?.user?.email,
      }));

      router.replace("/admin-tools/import-members");
    } catch (err: any) {
      setError("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo / Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-white/10 border border-white/20 rounded-full mb-4 overflow-hidden"
          >
            <img src="/images/logo.png" alt="দেবহাটা উপজেলা সমিতি লোগো" className="w-20 h-20 rounded-full object-contain" />
          </motion.div>
          <h1 className="text-3xl font-bold text-white">অ্যাডমিন প্যানেল</h1>
          <p className="text-slate-400 mt-2 text-sm">ঢাকাস্থ দেবহাটা উপজেলা সমিতি</p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="bg-slate-800/60 border border-slate-700/50 rounded-3xl p-8 backdrop-blur-sm shadow-2xl"
        >
          <h2 className="text-xl font-semibold text-white mb-6">লগইন করুন</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">ইমেইল ঠিকানা</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin@example.com"
                className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-white placeholder-slate-500 outline-none transition-colors text-sm"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">পাসওয়ার্ড</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-xl px-4 py-3 pr-12 text-white placeholder-slate-500 outline-none transition-colors text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-300 text-sm"
              >
                <Lock className="w-4 h-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-bold rounded-xl px-6 py-3.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95"
            >
              {loading ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> লগইন হচ্ছে...</>
              ) : (
                <><Lock className="w-5 h-5" /> লগইন করুন</>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-600 mt-6">
            Strapi Admin credentials ব্যবহার করুন
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
