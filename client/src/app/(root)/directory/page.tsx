"use client";

import React, { useState, useEffect } from "react";
import { getMemberDirectory } from "@/data/loaders";
import { MemberCard } from "@/components/custom/MemberCard";
import { CorrectionModal } from "@/components/custom/CorrectionModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UNIONS = [
  "Debhata",
  "Kulya",
  "Parulia",
  "Sakhra",
  "Nalta",
  "Debhata Sadar"
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
    <div className="container py-10">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">আমাদের সদস্য তালিকা</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          ঢাকাস্থ দেবহাটা উপজেলা সমিতির সকল নিবন্ধিত সদস্যদের খুঁজুন এবং আপনার তথ্য সঠিক আছে কিনা যাচাই করুন।
        </p>
      </div>

      <div className="bg-muted p-6 rounded-xl mb-10 shadow-inner">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input 
              placeholder="নাম, পিতার নাম বা সিরিয়াল দিয়ে খুঁজুন..." 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-background"
            />
          </div>
          <div className="w-full md:w-64">
            <select 
              value={union} 
              onChange={(e) => setUnion(e.target.value)}
              className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">সব ইউনিয়ন</option>
              {UNIONS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
          <Button type="submit">খুঁজুন</Button>
        </form>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : (
        <>
          {members && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <MemberCard 
                  key={member.id} 
                  member={member} 
                  onCorrect={(id) => setSelectedMember(member)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted rounded-xl">
              <p className="text-muted-foreground italic">কোন সদস্য খুঁজে পাওয়া যায়নি।</p>
            </div>
          )}

          {meta && meta.pagination && meta.pagination.pageCount > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              <Button 
                variant="outline" 
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                পূর্ববর্তী
              </Button>
              <div className="flex items-center px-4 font-medium">
                পৃষ্ঠা {page} / {meta.pagination.pageCount}
              </div>
              <Button 
                variant="outline" 
                disabled={page === meta.pagination.pageCount}
                onClick={() => setPage(page + 1)}
              >
                পরবর্তী
              </Button>
            </div>
          )}
        </>
      )}

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
