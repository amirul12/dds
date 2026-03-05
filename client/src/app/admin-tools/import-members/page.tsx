"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Download,
  CheckCircle2,
  XCircle,
  FileSpreadsheet,
  AlertTriangle,
  Loader2,
  Users,
  RefreshCw,
  Info,
  Code2,
  FileJson,
  LogOut,
  User,
} from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

const JSON_TEMPLATE = JSON.stringify(
  [
    {
      serialNumber: "1",
      name: "মোঃ আব্দুল কাদের",
      fatherName: "মোঃ আব্দুল গাফফার",
      location: "ভাতশালা",
      union: "Debhata",
      company: "এস এম সোর্সিং",
      role: "সিনিয়র মার্চেন্ডাইজার",
      phone: "01912406634",
    },
  ],
  null,
  2
);

interface ImportResult {
  success: boolean;
  imported: number;
  updated: number;
  total: number;
  errors: string[];
  message: string;
}

type Tab = "excel" | "json";

export default function ImportMembersPage() {
  const { user, checking, logout } = useAdminAuth();
  const [tab, setTab] = useState<Tab>("excel");

  // Excel state
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(false);

  // JSON state
  const [jsonText, setJsonText] = useState(JSON_TEMPLATE);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Shared state
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped && (dropped.name.endsWith(".xlsx") || dropped.name.endsWith(".xls"))) {
      setFile(dropped);
      setResult(null);
      setError(null);
    } else {
      setError("শুধুমাত্র .xlsx বা .xls ফাইল আপলোড করুন।");
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      setResult(null);
      setError(null);
    }
  };

  const handleDownloadTemplate = async () => {
    setTemplateLoading(true);
    try {
      const response = await fetch(`${STRAPI_URL}/api/member-import/template`);
      if (!response.ok) throw new Error("Download failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "member-template.xlsx";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError("টেমপ্লেট ডাউনলোড করা যায়নি: " + err.message);
    } finally {
      setTemplateLoading(false);
    }
  };

  const handleExcelImport = async () => {
    if (!file) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${STRAPI_URL}/api/member-import/excel`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error?.message || "আপলোড ব্যর্থ হয়েছে।");
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleJsonImport = async () => {
    setJsonError(null);
    setError(null);
    setResult(null);

    // Validate JSON first
    let parsed: any[];
    try {
      parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) throw new Error("JSON অবশ্যই একটি Array [] হতে হবে।");
    } catch (err: any) {
      setJsonError("JSON ফরম্যাট সঠিক নয়: " + err.message);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${STRAPI_URL}/api/member-import/json`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ members: parsed }),
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.error?.message || "আমদানি ব্যর্থ হয়েছে।");
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError("সার্ভারের সাথে সংযোগ স্থাপন করা যায়নি: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setResult(null);
    setError(null);
    setJsonError(null);
    setJsonText(JSON_TEMPLATE);
  };

  // Auth gate
  if (checking) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-indigo-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
      {/* Admin Top Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg">
              <Users className="w-4 h-4 text-indigo-400" />
            </div>
            <span className="text-white font-semibold text-sm">অ্যাডমিন প্যানেল</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <User className="w-3.5 h-3.5" />
                <span>{user.name || user.email}</span>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-red-500/20 border border-slate-700 hover:border-red-500/40 text-slate-400 hover:text-red-400 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              লগআউট
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 md:p-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto mb-8"
      >
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-indigo-500/20 rounded-2xl border border-indigo-500/30">
            <Users className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">সদস্য তালিকা আমদানি</h1>
            <p className="text-slate-400 text-sm mt-1">Excel বা JSON ফরম্যাটে সদস্যদের তথ্য আপলোড করুন</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-5">

        {/* Tab Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-2 bg-slate-800/60 border border-slate-700/50 p-1.5 rounded-2xl"
        >
          <button
            onClick={() => { setTab("excel"); setResult(null); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ${
              tab === "excel"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            Excel আপলোড
          </button>
          <button
            onClick={() => { setTab("json"); setResult(null); setError(null); }}
            className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold text-sm transition-all duration-300 ${
              tab === "json"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "text-slate-400 hover:text-white hover:bg-slate-700/50"
            }`}
          >
            <Code2 className="w-4 h-4" />
            JSON পেস্ট করুন
          </button>
        </motion.div>

        <AnimatePresence mode="wait">
          {/* ─── EXCEL TAB ─── */}
          {tab === "excel" && (
            <motion.div
              key="excel"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-5"
            >
              {/* Info */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-5 flex gap-4">
                <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300 space-y-2">
                  <p className="font-semibold text-indigo-300">Excel কলাম (বাংলা হেডার ব্যবহার করুন):</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-400 font-mono">
                    <span>• ক্রমিক নং</span>
                    <span>• নাম *</span>
                    <span>• পিতার নাম</span>
                    <span>• গ্রামের নাম</span>
                    <span>• ইউনিয়নের নাম</span>
                    <span>• বর্তমান চাকরি (কোম্পানি/সংস্থা)</span>
                    <span>• বর্তমান চাকরির পদ</span>
                    <span>• মোবাইল নম্বর</span>
                  </div>
                </div>
              </div>

              {/* Template Download */}
              <button
                onClick={handleDownloadTemplate}
                disabled={templateLoading}
                className="group w-full flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-400/50 text-emerald-300 hover:text-emerald-200 rounded-2xl px-6 py-4 transition-all duration-300 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {templateLoading ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> ডাউনলোড হচ্ছে...</>
                ) : (
                  <><Download className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" /> টেমপ্লেট Excel ডাউনলোড করুন (নমুনা ফাইল) <FileSpreadsheet className="w-5 h-5 opacity-60" /></>
                )}
              </button>

              {/* Drop Zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-2xl p-10 text-center transition-all duration-300 cursor-pointer ${
                  dragging ? "border-indigo-400 bg-indigo-500/10"
                  : file ? "border-indigo-500/50 bg-indigo-500/5"
                  : "border-slate-600 hover:border-slate-500 bg-slate-800/30 hover:bg-slate-800/50"
                }`}
                onClick={() => document.getElementById("fileInput")?.click()}
              >
                <input id="fileInput" type="file" accept=".xlsx,.xls" className="hidden" onChange={handleFileChange} />
                {file ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 bg-indigo-500/20 rounded-2xl">
                      <FileSpreadsheet className="w-10 h-10 text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">{file.name}</p>
                      <p className="text-slate-400 text-sm">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setFile(null); setResult(null); }}
                      className="text-xs text-slate-500 hover:text-red-400 transition-colors"
                    >
                      ফাইল পরিবর্তন করুন
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-4">
                    <div className="p-4 bg-slate-700/50 rounded-2xl">
                      <Upload className="w-10 h-10 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-lg">Excel ফাইল এখানে ছেড়ে দিন</p>
                      <p className="text-slate-400 text-sm mt-1">অথবা ক্লিক করে ফাইল বেছে নিন</p>
                      <p className="text-slate-600 text-xs mt-2">.xlsx বা .xls ফরম্যাট সমর্থিত</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Import Button */}
              <button
                onClick={handleExcelImport}
                disabled={!file || loading}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl px-6 py-5 font-bold text-lg transition-all duration-300 ${
                  !file || loading
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {loading ? <><Loader2 className="w-6 h-6 animate-spin" /> আমদানি চলছে...</> : <><Upload className="w-6 h-6" /> সদস্য তালিকা আমদানি করুন</>}
              </button>
            </motion.div>
          )}

          {/* ─── JSON TAB ─── */}
          {tab === "json" && (
            <motion.div
              key="json"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="space-y-5"
            >
              {/* JSON Info */}
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-5 flex gap-4">
                <FileJson className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-slate-300 space-y-1">
                  <p className="font-semibold text-amber-300">JSON ফরম্যাট (Array অবশ্যই):</p>
                  <p className="text-xs text-slate-400">নিচের ফিল্ডগুলো সমর্থিত: <code className="bg-slate-800 px-1 rounded text-amber-300">serialNumber, name, fatherName, location, union, company, role, phone</code></p>
                  <p className="text-xs text-slate-400"><code className="text-emerald-400">union</code> মান: <code className="bg-slate-800 px-1 rounded">Debhata | Kulya | Parulia | Sakhra | Nalta | Debhata Sadar</code> — অথবা বাংলায় ইউনিয়নের নাম।</p>
                </div>
              </div>

              {/* JSON Editor */}
              <div className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">JSON Editor</span>
                  <button
                    onClick={() => setJsonText(JSON_TEMPLATE)}
                    className="text-xs text-slate-500 hover:text-indigo-400 transition-colors"
                  >
                    নমুনা লোড করুন
                  </button>
                </div>
                <textarea
                  value={jsonText}
                  onChange={(e) => { setJsonText(e.target.value); setJsonError(null); }}
                  spellCheck={false}
                  className="w-full h-80 bg-slate-900 border border-slate-700 focus:border-indigo-500 rounded-2xl p-4 text-sm text-emerald-300 font-mono resize-none outline-none transition-colors leading-relaxed"
                  placeholder={`[\n  {\n    "name": "...",\n    "fatherName": "...",\n    ...\n  }\n]`}
                />
                {/* Line count */}
                <div className="absolute bottom-3 right-4 text-xs text-slate-600 pointer-events-none select-none">
                  {jsonText.split("\n").length} লাইন
                </div>
              </div>

              {/* JSON Validation error */}
              {jsonError && (
                <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4">
                  <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-red-300 text-sm font-mono">{jsonError}</p>
                </div>
              )}

              {/* Import Button */}
              <button
                onClick={handleJsonImport}
                disabled={!jsonText.trim() || loading}
                className={`w-full flex items-center justify-center gap-3 rounded-2xl px-6 py-5 font-bold text-lg transition-all duration-300 ${
                  !jsonText.trim() || loading
                    ? "bg-slate-700 text-slate-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 active:scale-95"
                }`}
              >
                {loading ? <><Loader2 className="w-6 h-6 animate-spin" /> আমদানি চলছে...</> : <><Code2 className="w-6 h-6" /> JSON থেকে আমদানি করুন</>}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared: Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-start gap-3 bg-red-500/10 border border-red-500/30 rounded-xl p-4"
            >
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Shared: Result */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-slate-800/60 border border-slate-700/50 rounded-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 p-5 bg-emerald-500/10 border-b border-emerald-500/20">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <div>
                  <p className="text-white font-bold text-lg">আমদানি সফল হয়েছে!</p>
                  <p className="text-slate-300 text-sm">{result.message}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-700/50">
                <div className="p-5 text-center">
                  <p className="text-3xl font-bold text-emerald-400">{result.imported}</p>
                  <p className="text-slate-400 text-sm mt-1">নতুন যোগ</p>
                </div>
                <div className="p-5 text-center">
                  <p className="text-3xl font-bold text-blue-400">{result.updated}</p>
                  <p className="text-slate-400 text-sm mt-1">আপডেট</p>
                </div>
                <div className="p-5 text-center">
                  <p className="text-3xl font-bold text-slate-300">{result.total}</p>
                  <p className="text-slate-400 text-sm mt-1">মোট সারি</p>
                </div>
              </div>

              {result.errors?.length > 0 && (
                <div className="border-t border-slate-700/50 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <p className="text-yellow-300 text-sm font-semibold">সতর্কতা ({result.errors.length}টি সমস্যা)</p>
                  </div>
                  <div className="space-y-1 max-h-40 overflow-y-auto">
                    {result.errors.map((err, i) => (
                      <p key={i} className="text-slate-400 text-xs bg-slate-900/50 rounded px-3 py-1.5 font-mono">{err}</p>
                    ))}
                  </div>
                </div>
              )}

              <div className="border-t border-slate-700/50 p-4 flex gap-3">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  আরও আমদানি করুন
                </button>
                <a
                  href="http://localhost:1337/admin/content-manager/collection-types/api::member-directory.member-directory"
                  target="_blank"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <Users className="w-4 h-4" />
                  Strapi-তে দেখুন
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </div>
    </div>
  );
}
