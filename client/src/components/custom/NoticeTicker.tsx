"use client";

import React from "react";
import Link from "next/link";

interface Notice {
  id: number;
  title: string;
  slug: string;
}

export function NoticeTicker({ notices }: { notices: Notice[] }) {
  if (!notices || notices.length === 0) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden border-b border-primary-foreground/10">
      <div className="container flex items-center">
        <div className="bg-secondary text-secondary-foreground px-4 py-1 text-sm font-bold uppercase tracking-wider mr-4 shrink-0 rounded-full shadow-lg">
          জরুরী বিজ্ঞপ্তি:
        </div>
        <div className="relative flex-1 overflow-hidden h-6">
          <div className="animate-ticker absolute whitespace-nowrap">
            {notices.map((notice) => (
              <span key={notice.id} className="mx-8 hover:underline">
                <Link href={`/notices/${notice.slug}`}>
                  {notice.title}
                </Link>
              </span>
            ))}
            {/* Repeat for seamless loop */}
            {notices.map((notice) => (
              <span key={`repeat-${notice.id}`} className="mx-8 hover:underline">
                <Link href={`/notices/${notice.slug}`}>
                  {notice.title}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
