import React from "react";
import Link from "next/link";

interface Notice {
  id: number;
  title: string;
  slug: string;
  category: string;
  publishedAt: string;
  isUrgent?: boolean;
}

export function NoticeCard({ notice }: { notice: Notice }) {
  const date = notice.publishedAt ? new Date(notice.publishedAt) : new Date();
  
  const formattedDate = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  return (
    <div className={`p-6 rounded-xl border-2 transition-all hover:scale-[1.02] ${notice.isUrgent ? 'border-destructive bg-destructive/5' : 'border-border bg-card'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${notice.isUrgent ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {notice.category}
        </span>
        <span className="text-xs text-muted-foreground">
          {formattedDate}
        </span>
      </div>
      
      <h3 className="text-xl font-bold mb-4 font-serif leading-tight group">
        <Link href={`/notices/${notice.slug}`} className="hover:text-primary transition-colors">
          {notice.title}
        </Link>
      </h3>
      
      <div className="mt-auto">
        <Link 
          href={`/notices/${notice.slug}`} 
          className="text-primary font-semibold text-sm flex items-center gap-2 group"
        >
          বিস্তারিত পড়ুন 
          <svg xmlns="http://www.w3.org/2000/svg" className="size-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
