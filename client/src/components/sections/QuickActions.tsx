"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Bell, Calendar, Briefcase, Book, Phone, UserPlus } from "lucide-react";
import type { QuickActionsProps } from "@/types";

function getIcon(iconName: string, className: string) {
  const name = iconName.toLowerCase();
  switch (name) {
    case "users": return <Users className={className} />;
    case "bell": return <Bell className={className} />;
    case "calendar": return <Calendar className={className} />;
    case "briefcase": return <Briefcase className={className} />;
    case "book": return <Book className={className} />;
    case "phone": return <Phone className={className} />;
    case "membership": case "userplus": return <UserPlus className={className} />;
    default: return <Users className={className} />;
  }
}

function getColor(colorName: string) {
  const name = colorName?.toLowerCase() || "primary";
  switch (name) {
    case "blue": return "bg-blue-100 text-blue-600";
    case "amber": return "bg-amber-100 text-amber-600";
    case "green": return "bg-emerald-100 text-emerald-600";
    case "rose": return "bg-rose-100 text-rose-600";
    case "purple": return "bg-purple-100 text-purple-600";
    case "emerald": return "bg-teal-100 text-teal-600";
    default: return "bg-primary/10 text-primary";
  }
}

export function QuickActions(data: Readonly<QuickActionsProps>) {
  if (!data) return null;
  const { title, actions } = data;

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-primary mb-4">{title || "দ্রুত সংযোগ"}</h2>
          <div className="size-2 bg-secondary mx-auto rounded-full" />
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {actions?.map((action, idx) => (
            <motion.div 
              key={action.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col items-center text-center p-5 md:p-8 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all h-full"
              >
                <div className={`size-12 md:size-16 ${getColor(action.color)} rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {getIcon(action.icon, "size-6 md:size-8")}
                </div>
                <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-3 font-serif group-hover:text-primary transition-colors leading-tight">{action.title}</h3>
                <p className="hidden md:block text-muted-foreground leading-relaxed text-sm md:text-base">{action.desc}</p>
                <div className="mt-auto pt-4 flex items-center text-primary font-bold text-xs md:text-sm gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                  বিস্তারিত 
                  <svg className="size-3 md:size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
