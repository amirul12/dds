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
