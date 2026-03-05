"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

export function Hero({ bannerImage }: { bannerImage: string }) {
  return (
    <section className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center p-6">
      <Image
        src={bannerImage}
        alt="Samiti Banner"
        fill
        priority
        className="object-cover brightness-[0.4]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-background/90" />
      
      <div className="container relative z-10 text-center space-y-8">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md border border-secondary/30">
            ঐতিহ্য ও ভ্রাতৃত্বের বন্ধন
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
            ঢাকাস্থ দেবহাটা উপজেলা সমিতি
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/80 mt-6 font-light drop-shadow-md">
            সাতক্ষীরা জেলার দেবহাটা উপজেলার ঢাকাস্থ বাসিন্দাদের এক মিলনমেলার ঠিকানা। সম্প্রীতি ও সেবার লক্ষ্যে আমরা অবিচল।
          </p>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mt-10"
        >
          <Button size="lg" className="h-14 px-8 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full shadow-lg hover:shadow-secondary/20 transition-all hover:scale-105" asChild>
            <Link href="/directory">সদস্য তালিকা দেখুন</Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/30 text-white hover:bg-white/10 rounded-full backdrop-blur-sm transition-all hover:scale-105" asChild>
            <Link href="/events">পরবর্তী অনুষ্ঠান</Link>
          </Button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
