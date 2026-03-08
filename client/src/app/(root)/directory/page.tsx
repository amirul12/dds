"use client";

import React, { useState, useEffect } from "react";
import { getMemberDirectory } from "@/data/loaders";
import { MemberCard } from "@/components/custom/MemberCard";
import { CorrectionModal } from "@/components/custom/CorrectionModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Users, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const UNIONS = [
  { value: "Debhata", bn: "দেবহাটা" },
  { value: "Kulya", bn: "কুল্যা" },
  { value: "Parulia", bn: "পারুলিয়া" },
  { value: "Sakhipur", bn: "সখিপুর" },
  { value: "Nawapara", bn: "নওয়াপাড়া" }
];

export default function MemberDirectoryPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [union, setUnion] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<any>(null);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const fetchMembers = async (q = "", u = "", p = 1) => {
    setLoading(true);
    try {
      const response = await getMemberDirectory(q, u === "all" ? "" : u, p);
      if (response && response.data) {
        setMembers(response.data);
        setMeta(response.meta || null);
      } else {
        setMembers([]);
        setMeta(null);
      }
    } catch (error) {
      console.error("Failed to fetch members", error);
      setMembers([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers(query, union, page);
  }, [page]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchMembers(query, union, 1);
  };

  const handleCorrectionSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/correction-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) throw new Error("Submission failed");
    } catch (error) {
      console.error("Correction submission failed", error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950">
      
      {/* Hero Header Section */}
      <div className="relative bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full -mr-64 -mt-64 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
              <Users className="size-3" />
              Member Directory
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white font-serif tracking-tight">
              আমাদের সদস্য তালিকা
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
               ঢাকাস্থ দেবহাটা উপজেলা সমিতির সকল নিবন্ধিত সদস্যদের খুঁজুন এবং আমাদের ক্রমবর্ধমান পরিবারের সাথে যুক্ত থাকুন।
            </p>
          </div>

          {/* Elegant Search Bar */}
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-700">
              <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <Input 
                    placeholder="নাম, পেশা বা আইডি দিয়ে খুঁজুন..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full h-14 pl-12 rounded-2xl border-none bg-slate-50 dark:bg-slate-900 focus-visible:ring-primary/20 text-lg font-medium"
                  />
                </div>
                <div className="w-full md:w-56 relative">
                  <Filter className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-slate-400 pointer-events-none" />
                  <select 
                    value={union} 
                    onChange={(e) => setUnion(e.target.value)}
                    className="w-full h-14 pl-10 pr-4 rounded-2xl border-none bg-slate-50 dark:bg-slate-900 text-sm font-bold focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">সব ইউনিয়ন</option>
                    {UNIONS.map((u) => (
                      <option key={u.value} value={u.value}>{u.bn} ইউনিয়ন</option>
                    ))}
                  </select>
                </div>
                <Button type="submit" className="h-14 px-8 rounded-2xl font-bold text-lg shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                   খুঁজুন
                </Button>
              </form>
            </div>
            
            <div className="flex justify-center gap-8 mt-6">
               <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                  <div className="size-2 rounded-full bg-emerald-500" />
                  সঠিক তথ্য নিশ্চিত করুন
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-500 font-bold">
                  <div className="size-2 rounded-full bg-primary" />
                  সদস্যপদ যাচাই করুন
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[400px] bg-white dark:bg-slate-900 animate-pulse rounded-[2rem] border border-slate-100 dark:border-slate-800" />
            ))}
          </div>
        ) : (
          <>
            {/* Show Total Union Count */}
            {meta && meta.pagination && (
              <div className="flex justify-between items-center mb-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-3xl shadow-sm">
                <div className="text-slate-600 dark:text-slate-400 font-bold text-lg flex items-center gap-2">
                  <Users className="size-5 text-primary" />
                  {union !== "all" 
                    ? <><span className="text-primary">{UNIONS.find(u => u.value === union)?.bn || union}</span> ইউনিয়নের সর্বমোট </> 
                    : "সর্বমোট "} 
                  <span className="text-3xl text-slate-900 dark:text-white mx-1 font-black">{meta.pagination.total}</span> জন সদস্য
                </div>
              </div>
            )}
            {members && members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member) => (
                  <MemberCard 
                    key={member.id} 
                    member={member} 
                    onCorrect={(id) => setSelectedMember(member)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-[3rem] border border-dashed border-slate-200 dark:border-slate-800">
                <div className="size-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                   <Users className="size-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-2">কোন সদস্য পাওয়া যায়নি</h3>
                <p className="text-slate-500 font-medium italic">অনুগ্রহ করে ভিন্ন কিছু দিয়ে খুঁজুন।</p>
                <Button variant="link" onClick={() => { setQuery(""); setUnion("all"); fetchMembers("", "all", 1); }} className="mt-4 text-primary font-bold">
                   সব সদস্য দেখুন <ArrowRight className="size-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Premium Pagination */}
            {meta && meta.pagination && meta.pagination.pageCount > 1 && (
              <div className="mt-20 flex justify-center items-center gap-6">
                <Button 
                  variant="outline" 
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-xl h-12 w-12 p-0 border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft className="size-6" />
                </Button>
                <div className="flex items-center justify-center gap-2 flex-wrap max-w-2xl">
                  {[...Array(meta.pagination.pageCount)].map((_, idx) => {
                    const p = idx + 1;
                    return (
                      <Button
                        key={p}
                        variant={page === p ? "default" : "outline"}
                        onClick={() => setPage(p)}
                        className={`rounded-[14px] h-12 w-12 p-0 shadow-sm text-lg font-black transition-all hover:-translate-y-1 ${
                          page === p 
                            ? "bg-primary text-white shadow-primary/30" 
                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-primary hover:border-primary/50"
                        }`}
                      >
                       {p}
                      </Button>
                    );
                  })}
                </div>

                <Button 
                  variant="outline" 
                  disabled={page === meta.pagination.pageCount}
                  onClick={() => setPage(page + 1)}
                  className="rounded-xl h-12 w-12 p-0 border-slate-200 dark:border-slate-800 hover:bg-primary hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight className="size-6" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {selectedMember && (
        <CorrectionModal 
          memberId={selectedMember.id}
          memberName={selectedMember.name}
          onClose={() => setSelectedMember(null)}
          onSubmit={handleCorrectionSubmit}
        />
      )}
    </div>
  );
}
