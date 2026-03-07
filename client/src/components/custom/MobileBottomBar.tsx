"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, UserPlus, Bell, Phone, Info, MoreHorizontal, X, MessageSquare, Newspaper, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const primaryItems = [
  {
    icon: Home,
    label: "হোম",
    href: "/",
  },
  {
    icon: Info,
    label: "পরিচিতি",
    href: "/about",
  },
  {
    icon: Users,
    label: "ডিরেক্টরি",
    href: "/directory",
  },
  {
    icon: UserPlus,
    label: "আবেদন",
    href: "/membership-application",
  },
];

const secondaryItems = [
  {
    icon: Bell,
    label: "বিজ্ঞপ্তি",
    href: "/notices",
  },
  {
    icon: Phone,
    label: "যোগাযোগ",
    href: "/contact",
  },
  {
    icon: Calendar,
    label: "ইভেন্ট",
    href: "/events",
  },
];

export function MobileBottomBar() {
  const pathname = usePathname();
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // Close more menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close more menu on path change
  useEffect(() => {
    setIsMoreOpen(false);
  }, [pathname]);

  return (
    <>
      {/* More Menu Overlay */}
      <AnimatePresence>
        {isMoreOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMoreOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
            />
            <motion.div
              ref={moreMenuRef}
              initial={{ opacity: 0, y: 100, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 100, scale: 0.95 }}
              className="fixed bottom-20 right-4 z-[56] w-56 p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl md:hidden"
            >
              <div className="grid grid-cols-1 gap-1">
                {secondaryItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl transition-all duration-200",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                      )}
                    >
                      <Icon className="size-5" />
                      <span className="font-bold text-sm tracking-tight">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Bottom Bar */}
      <div className="fixed bottom-0 left-0 z-[60] w-full h-16 pb-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 md:hidden shadow-[0_-5px_20px_-10px_rgba(0,0,0,0.1)]">
        <div className="grid h-full w-full grid-cols-5 mx-auto px-1">
          {primaryItems.map((item) => {
            const isActive = pathname === item.href && !isMoreOpen;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center relative transition-all duration-300 active:scale-90 group",
                  isActive ? "text-primary" : "text-slate-500 dark:text-slate-400"
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 mb-0.5 transition-all duration-300",
                    isActive ? "scale-110" : "group-hover:scale-110 group-hover:text-primary"
                  )}
                />
                <span className={cn(
                  "text-[8px] font-bold tracking-tight transition-all duration-300",
                  isActive ? "text-primary" : "group-hover:text-primary"
                )}>
                  {item.label}
                </span>
              </Link>
            );
          })}
          
          {/* More Toggle */}
          <button
            onClick={() => setIsMoreOpen(!isMoreOpen)}
            className={cn(
              "flex flex-col items-center justify-center relative transition-all duration-300 active:scale-90 group",
              isMoreOpen ? "text-primary" : "text-slate-500 dark:text-slate-400"
            )}
          >
            <div className="relative">
              {isMoreOpen ? (
                <X className="w-5 h-5 mb-0.5 transition-all duration-300 scale-110" />
              ) : (
                <MoreHorizontal className="w-5 h-5 mb-0.5 transition-all duration-300 group-hover:scale-110 group-hover:text-primary" />
              )}
            </div>
            <span className={cn(
              "text-[8px] font-bold tracking-tight transition-all duration-300",
              isMoreOpen ? "text-primary" : "group-hover:text-primary"
            )}>
              {isMoreOpen ? "বন্ধ করুন" : "আরও"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
