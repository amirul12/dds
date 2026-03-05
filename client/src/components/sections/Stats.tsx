"use client";

import React from "react";
import { motion } from "framer-motion";
import type { StatsProps } from "@/types";

export function Stats(data: Readonly<StatsProps>) {
  if (!data) return null;
  const { stats } = data;

  return (
    <section className="py-16 relative bg-primary overflow-hidden">
      <div className="absolute top-0 right-0 size-96 bg-secondary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 size-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
      
      <div className="container relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats?.map((stat, idx) => (
            <motion.div 
              key={stat.id || idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="text-center group"
            >
              <div className="text-4xl mb-4 transform transition-transform group-hover:scale-110">{stat.icon}</div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-serif">{stat.value}</div>
              <div className="text-sm md:text-base text-white/70 font-medium uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
