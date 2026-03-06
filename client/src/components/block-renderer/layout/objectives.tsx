import React from "react";
import { MarkdownText } from "../../custom/markdown-text";

interface ObjectivesProps {
  title?: string;
  content: string;
}

export function Objectives({ title, content }: Readonly<ObjectivesProps>) {
  if (!content) return null;

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          {title && (
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary relative inline-block pb-4">
                {title}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary/20 rounded-full" />
              </h2>
            </div>
          )}

          <div className="bg-background p-8 md:p-12 rounded-3xl border border-primary/10 shadow-sm transition-shadow">
            <div className="prose prose-slate dark:prose-invert max-w-none prose-p:leading-loose prose-p:text-lg text-muted-foreground">
              <MarkdownText content={content} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
