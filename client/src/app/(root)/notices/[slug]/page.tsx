import React from "react";
import { getNoticeBySlug } from "@/data/loaders";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button } from "@/components/ui/button";

export default async function NoticeDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const response = await getNoticeBySlug(slug);
  const notice = response.data?.[0];

  if (!notice) notFound();

  const date = notice.publishedAt ? new Date(notice.publishedAt) : new Date();
  const formattedDate = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);

  return (
    <article className="container py-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 inline-block ${notice.isUrgent ? 'bg-destructive text-destructive-foreground' : 'bg-secondary text-secondary-foreground'}`}>
          {notice.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
          {notice.title}
        </h1>
        <div className="flex items-center text-muted-foreground text-sm border-b pb-6">
          <span>প্রকাশিত: {formattedDate}</span>
        </div>
      </div>

      <div className="rich-text prose prose-lg dark:prose-invert max-w-none mb-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {notice.content}
        </ReactMarkdown>
      </div>

      {notice.attachment && notice.attachment.length > 0 && (
        <div className="bg-muted p-6 rounded-xl border border-dashed border-primary/20">
          <h3 className="text-lg font-bold mb-4 font-serif">সংযুক্ত ফাইলসমূহ:</h3>
          <div className="space-y-3">
            {notice.attachment.map((file: any) => (
              <div key={file.id} className="flex items-center justify-between bg-background p-3 rounded border shadow-sm">
                <span className="text-sm font-medium truncate max-w-[200px] md:max-w-md">{file.name}</span>
                <Button variant="outline" size="sm" asChild>
                  <a href={process.env.STRAPI_BASE_URL + file.url} target="_blank" rel="noopener noreferrer">
                    ডাউনলোড করুন
                  </a>
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-12 pt-8 border-t flex flex-wrap gap-4">
        <Button variant="outline" className="gap-2" asChild>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.CLIENT_URL + '/notices/' + slug)}`} target="_blank">
            ফেসবুকে শেয়ার করুন
          </a>
        </Button>
      </div>
    </article>
  );
}
