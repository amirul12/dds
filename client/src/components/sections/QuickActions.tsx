"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Bell, Calendar, Briefcase, Book, Phone } from "lucide-react";
import type { QuickActionsProps } from "@/types";

function getIcon(iconName: string, className: string) {
  switch (iconName) {
    case "users": return <Users className={className} />;
    case "bell": return <Bell className={className} />;
    case "calendar": return <Calendar className={className} />;
    case "briefcase": return <Briefcase className={className} />;
    case "book": return <Book className={className} />;
    case "phone": return <Phone className={className} />;
    default: return <Users className={className} />;
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions?.map((action, idx) => (
            <motion.div 
              key={action.id || idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={action.href}
                className="group flex flex-col p-8 rounded-2xl border bg-card hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all h-full"
              >
                <div className={`size-16 ${action.color || "bg-primary/10 text-primary"} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                  {getIcon(action.icon, "size-8")}
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
