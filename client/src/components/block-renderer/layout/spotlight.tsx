"use client";
import React, { useState } from "react";
import type { SpotlightProps } from "@/types";
import { cn } from "@/lib/utils";
import { StrapiImage } from "@/components/custom/strapi-image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, X, ZoomIn } from "lucide-react";

export function Spotlight(data: Readonly<SpotlightProps>) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  if (!data) return null;
  const { heading, subHeading, description, ctaText, ctaHref, image, theme, reverse } = data;

  const themeConfig = {
    primary: "bg-primary/5 border-primary/10 text-slate-900",
    secondary: "bg-secondary/5 border-secondary/10 text-slate-900",
    dark: "bg-slate-900 text-white border-slate-800",
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={cn(
            "relative rounded-[40px] overflow-hidden border shadow-2xl",
            themeConfig[theme || "primary"]
          )}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />

          <div className={cn(
            "relative z-10 grid md:grid-cols-2 gap-0 items-stretch min-h-[500px]",
            reverse ? "md:flex-row-reverse" : ""
          )}>
            {/* Content side */}
            <div className={cn(
                "p-8 md:p-16 flex flex-col justify-center items-start gap-8",
                reverse ? "md:order-last" : "md:order-first"
            )}>
              <div className="flex flex-col gap-4">
                {subHeading && (
                  <div className="flex items-center gap-2">
                    <div className="h-px w-8 bg-primary/50" />
                    <span className="text-primary font-bold tracking-widest uppercase text-xs">
                      {subHeading}
                    </span>
                  </div>
                )}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.1]">
                  {heading}
                </h2>
              </div>
              
              {description && (
                <p className={cn(
                    "text-xl leading-relaxed",
                    theme === 'dark' ? "text-slate-400" : "text-slate-600"
                )}>
                  {description}
                </p>
              )}

              {ctaText && ctaHref && (
                <Link
                  href={ctaHref}
                  className="group flex items-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-full font-bold transition-all hover:shadow-xl hover:-translate-y-1 active:scale-95 text-lg"
                >
                  {ctaText}
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </Link>
              )}
            </div>

            {/* Image side */}
            <div 
                className={cn(
                    "relative min-h-[400px] md:min-h-full overflow-hidden flex items-center justify-center p-6 group cursor-zoom-in",
                    theme === 'dark' ? "bg-slate-950/50" : "bg-white/50"
                )}
                onClick={() => setIsFullScreen(true)}
            >
              <div className="relative w-full h-full min-h-[350px]">
                <StrapiImage
                    src={image.url}
                    alt={image.name}
                    fill
                    className="object-contain transition-all duration-1000 group-hover:scale-105 drop-shadow-2xl"
                />
              </div>
              
              {/* Zoom pill */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/30 flex items-center gap-2 text-xs font-bold text-white shadow-lg pointer-events-none">
                <ZoomIn className="w-4 h-4" />
                Full View
              </div>

              {/* Overlay for glass look */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-30" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Full Screen Preview Modal */}
      <AnimatePresence>
        {isFullScreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsFullScreen(false)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-colors"
                onClick={(e) => {
                    e.stopPropagation();
                    setIsFullScreen(false);
                }}
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <StrapiImage
                src={image.url}
                alt={image.name}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
