import React from "react";
import { getNotices } from "@/data/loaders";
import { NoticeCard } from "@/components/custom/NoticeCard";

export default async function NoticePage() {
  const response = await getNotices(20);
  const notices = response.data;

  return (
    <div className="container py-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-10 border-b pb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">বিজ্ঞপ্তি বোর্ড</h1>
          <p className="text-muted-foreground">সমিতির সাম্প্রতিক সকল আপডেট এবং ঘোষণা এখানে পাবেন।</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {notices.length > 0 ? (
          notices.map((notice: any) => (
            <NoticeCard key={notice.id} notice={notice} />
          ))
        ) : (
          <div className="col-span-full text-center py-20 bg-muted rounded-xl text-muted-foreground italic">
            বর্তমানে কোন বিজ্ঞপ্তি উপলব্ধ নেই।
          </div>
        )}
      </div>
    </div>
  );
}
