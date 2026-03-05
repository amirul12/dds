"use client";

import React from "react";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { motion } from "framer-motion";

export function LatestNotices({ notices }: { notices: any[] }) {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif font-bold text-primary">সাম্প্রতিক বিজ্ঞপ্তি</h2>
            <div className="w-20 h-1.5 bg-secondary rounded-full" />
          </div>
          <Link href="/notices" className="group flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all pb-2 border-b-2 border-transparent hover:border-primary">
            সকল বিজ্ঞপ্তি দেখুন
            <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card group p-8 rounded-3xl shadow-xl shadow-black/5 flex flex-col hover:-translate-y-2 transition-transform border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="size-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-tight text-muted-foreground">
                    {notice.category}
                  </span>
                </div>
                
                <h3 className="text-2xl font-bold mb-6 font-serif line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                  <Link href={`/notices/${notice.slug}`}>{notice.title}</Link>
                </h3>
                
                <div className="mt-auto pt-6 border-t flex items-center justify-between">
                   <div className="flex flex-col">
                     <span className="text-[10px] text-muted-foreground uppercase font-bold">প্রকাশকাল</span>
                     <span className="text-sm font-medium">{formattedDate}</span>
                   </div>
                   <div className="size-10 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                      <svg xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
