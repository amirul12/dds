import React from "react";
import { getDonors } from "@/data/loaders";
import { DonorCard } from "./donor-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heart } from "lucide-react";

export async function DonorList() {
  const response = await getDonors();
  const donors = response?.data || [];

  if (donors.length === 0) {
    return (
      <div className="text-center py-20 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/30">
        <Heart className="mx-auto size-12 text-muted-foreground mb-4 opacity-30" />
        <p className="text-xl font-serif text-muted-foreground">এখনও কোনো অনুদান জমা পড়েনি</p>
        <p className="text-sm text-muted-foreground mt-2">আপনিই হোন আমাদের সমাপনী বনভোজনের প্রথম দাতা</p>
      </div>
    );
  }

  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const toBnNumber = (n: number | string) => 
    n.toString().replace(/\d/g, d => bnDigits[parseInt(d)]);

  const totalAmount = donors.reduce((sum, donor) => {
    const amount = donor.attributes?.amount ?? donor.amount ?? 0;
    return sum + amount;
  }, 0);
  const topDonors = donors.slice(0, 3);
  const remainingDonors = donors.slice(3);

  return (
    <div className="space-y-16">
      {/* Summary Section */}
      <div className="bg-primary/5 rounded-3xl p-8 md:p-12 text-center border border-primary/10 shadow-sm relative overflow-hidden group">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 size-64 bg-primary/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />
        
        <div className="relative z-10">
          <h2 className="text-2xl font-serif font-bold text-primary mb-6">মোট অনুদান সংগৃহীত</h2>
          <div className="text-5xl md:text-6xl font-bold text-primary tracking-tight mb-8">
            {toBnNumber(totalAmount)} <span className="text-2xl md:text-3xl font-serif">টাকা</span>
          </div>
          
          <Button asChild size="lg" className="rounded-full px-12 h-14 text-lg font-bold shadow-xl hover:scale-105 transition-transform active:scale-95">
            <Link href="/membership-application">আপনিও অনুদান দিন</Link>
          </Button>
        </div>
      </div>

      {/* Top 3 Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-serif font-bold text-primary shrink-0">শীর্ষ তিন দাতা</h2>
          <div className="h-[2px] bg-primary/20 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topDonors.map((donor, idx) => {
            const props = donor.attributes || donor;
            return (
              <DonorCard 
                key={donor.id} 
                {...props}
                rank={idx + 1} 
              />
            );
          })}
        </div>
      </div>

      {/* Remaining Donors Section */}
      {remainingDonors.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-serif font-bold text-primary shrink-0">সকল দাতা</h2>
            <div className="h-[2px] bg-primary/20 w-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {remainingDonors.map((donor) => {
              const props = donor.attributes || donor;
              return (
                <DonorCard key={donor.id} {...props} />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
