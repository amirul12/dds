import React from "react";
import { cn } from "@/lib/utils";
import { MarkdownText } from "../../custom/markdown-text";

interface ObjectiveItem {
  id: number;
  content: string;
}

interface ObjectivesProps {
  title?: string;
  items: ObjectiveItem[];
}

export function Objectives({ title, items }: Readonly<ObjectivesProps>) {
  if (!items || items.length === 0) return null;

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-background p-6 rounded-2xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow flex gap-4"
              >
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold flex-shrink-0 mt-1">
                  {String.fromCharCode(2433 + index)} {/* Bengali characters 0-based offset 2433 = 'ক' in some fonts, or just use index */}
                  {/* Better: use a helper or just index in Bengali */}
                  {["ক", "খ", "গ", "ঘ", "ঙ", "চ", "ছ", "জ", "ঝ", "ঞ", "ট", "ঠ", "ড", "ঢ", "ণ"][index] || (index + 1)}
                </div>
                <div className="flex-1 text-muted-foreground prose prose-slate max-w-none prose-p:leading-relaxed prose-p:m-0">
                  <MarkdownText content={item.content} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
