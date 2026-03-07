"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { motion } from "framer-motion";

export function LatestNotices({ notices }: { notices: any[] }) {
  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-16 gap-4 md:gap-6 text-center md:text-left">
          <div className="space-y-2 md:space-y-4">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-primary">সাম্প্রতিক বিজ্ঞপ্তি</h2>
            <div className="w-12 md:w-20 h-1 bg-secondary mx-auto md:mx-0 rounded-full" />
          </div>
          <Link href="/notices" className="group flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all text-sm md:text-base">
            সকল বিজ্ঞপ্তি দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {notices.map((notice, idx) => {
            const date = notice.publishedAt ? new Date(notice.publishedAt) : new Date();
            const formattedDate = new Intl.DateTimeFormat('bn-BD', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            }).format(date);

            return (
              <motion.div 
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card group p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-primary/5 flex flex-col hover:-translate-y-1 transition-all border border-slate-100 hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-4 md:mb-6">
                  <span className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-[10px] md:text-xs font-bold uppercase rounded-full tracking-wider">
                    {notice.category || "নোটিশ"}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-2xl font-bold mb-6 font-serif line-clamp-2 leading-snug group-hover:text-primary transition-colors h-[3.5em]">
                  <Link href={`/notices/${notice.slug}`}>{notice.title}</Link>
                </h3>
                
                <div className="mt-auto pt-4 md:pt-6 border-t border-slate-100 flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">প্রকাশকাল</span>
                     <span className="text-xs md:text-sm font-semibold">{formattedDate}</span>
                   </div>
                   <div className="size-8 md:size-10 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-4 md:size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
