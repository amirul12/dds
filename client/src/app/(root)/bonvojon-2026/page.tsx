import React, { Suspense } from "react";
import { DonorList } from "@/components/donor/donor-list";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "বনভোজন-২০২৬ | দেবহাটা উপজেলা সমিতি",
  description: "দেবহাটা উপজেলা সমিতি আয়োজিত বনভোজন ২০২৬-এর অনুদান ও অবদানকারীদের তালিকা",
};

export default function BonvojonPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary py-24 sm:py-32">
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 border-4 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-8 border-white rounded-full" />
        </div>

        <div className="container relative z-10 text-center">
          <div className="mx-auto max-w-3xl">
            <h1 className="text-5xl font-serif font-bold tracking-tight text-white mb-6 animate-in slide-in-from-bottom duration-700">
              বনভোজন ২০২৬
            </h1>
            <p className="text-xl leading-relaxed text-white/80 font-medium">
              দেবহাটা উপজেলা সমিতি, ঢাকা-এর বার্ষিক বনভোজন ও মিলনমেলা সফল করার লক্ষ্যে আপনার মহতী অনুদান ও সহযোগিতার তালিকা। 
            </p>
          </div>
        </div>
      </div>

      <div className="container py-20">
        {/* Event Announcement */}
        <div className="mb-16 bg-gradient-to-br from-primary/10 via-primary/5 to-background border-2 border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-lg relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="animate-pulse">📢</span>
              <span>বিশেষ ঘোষণা</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6">
              দেবহাটা উপজেলা সমিতির উদ্যোগে
            </h2>

            <div className="space-y-4 mb-8">
              <p className="text-xl md:text-2xl font-bold text-gray-800">
                বাৎসরিক মিলনমেলা-২০২৬ এবং প্রথম স্মরনিকা "ইছামতি" এর মোড়ক উন্মোচন
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-lg">
                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-bold">১০ এপ্রিল ২০২৬ (শুক্রবার)</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>"লাজপল্লী" হেমায়েতপুর, ঢাকা-আরিচা মহাসড়ক, সাভার</span>
                </div>
              </div>
            </div>

            <div className="inline-block bg-white/50 backdrop-blur-sm border border-primary/20 rounded-2xl px-6 py-4">
              <p className="text-sm font-medium text-gray-600">
                সকলকে সাদর আমন্ত্রণ জানাচ্ছে দেবহাটা উপজেলা সমিতি
              </p>
            </div>
          </div>
        </div>

        <Suspense fallback={<BonvojonLoading />}>
          <DonorList />
        </Suspense>
      </div>
      
      {/* Footer Decoration */}
      <div className="py-20 bg-muted/30">
        <div className="container text-center">
          <p className="text-muted-foreground font-medium italic">
            "আপনার ক্ষুদ্র অনুদান আমাদের এই মিলনমেলাকে করতে পারে আনন্দমুখর"
          </p>
        </div>
      </div>
    </main>
  );
}

function BonvojonLoading() {
  return (
    <div className="space-y-16">
      <div className="h-64 rounded-3xl bg-muted animate-pulse" />
      <div className="space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-80 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
