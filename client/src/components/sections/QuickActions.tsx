"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const actions = [
  { 
    title: "সদস্য তালিকা", 
    desc: "সমিতির সকল সদস্যদের সাথে পরিচিত হোন", 
    href: "/directory", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: "bg-blue-50 text-blue-600"
  },
  { 
    title: "বিজ্ঞপ্তি বোর্ড", 
    desc: "সাম্প্রতিক সংবাদ ও ঘোষণা দেখুন", 
    href: "/notices", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    color: "bg-orange-50 text-orange-600"
  },
  { 
    title: "অনুষ্ঠান ও RSVP", 
    desc: "মিলনমেলা নিশ্চিত করুন এখানে", 
    href: "/events", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: "bg-emerald-50 text-emerald-600"
  },
  { 
    title: "কমিটি", 
    desc: "আমাদের সেবার দায়িত্বে যারা আছেন", 
    href: "/committee", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "bg-purple-50 text-purple-600"
  },
  { 
    title: "স্মরণিকা প্রকল্প", 
    desc: "লেখা ও বিজ্ঞাপন জমা দিন এখনই", 
    href: "/smaranika", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    color: "bg-rose-50 text-rose-600"
  },
  { 
    title: "যোগাযোগ", 
    desc: "আমাদের ঠিকানা ও ফোনের তালিকা", 
    href: "/contact", 
    icon: (
      <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1.01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    color: "bg-amber-50 text-amber-600"
  },
];

export function QuickActions() {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">দ্রুত সংযোগ</h2>
          <div className="size-2 bg-secondary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map((action, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col p-8 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all h-full"
              >
                <div className={`size-16 ${action.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {action.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 font-serif group-hover:text-primary transition-colors">{action.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{action.desc}</p>
                <div className="mt-8 pt-6 border-t border-dashed flex items-center text-primary font-bold text-sm gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  বিস্তারিত যান 
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
