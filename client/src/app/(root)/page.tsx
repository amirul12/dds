import { getNotices, getLandingPage } from "@/data/loaders";
import { LatestNotices } from "@/components/sections/LatestNotices";
import { BlockRenderer } from "@/components/block-renderer";

export default async function Home() {
  const [noticesResponse, landingPageResponse] = await Promise.all([
    getNotices(3),
    getLandingPage()
  ]);

  const notices = noticesResponse?.data || [];
  const blocks = landingPageResponse?.data?.blocks || [];

  return (
    <div className="flex flex-col w-full">
      {/* Dynamic Strapi Blocks (Hero, Stats, Quick Actions, etc) */}
      <BlockRenderer blocks={blocks} />

      {/* Keeps the LatestNotices section pulling from Strapi notice collection directly */}
      <LatestNotices notices={notices} />
      
      {/* Footer-CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
        </div>
        <div className="container relative z-10 space-y-8">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">আপনি কি এখনও সমিতির সদস্য হননি?</h2>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">সাতক্ষীরা জেলার আমাদের দেবহাটা উপজেলার প্রিয় মানুষদের সাথে যুক্ত হতে আজই নিবন্ধন করুন।</p>
          <div className="flex justify-center gap-4">
            <button className="px-8 py-4 bg-secondary text-secondary-foreground font-bold rounded-full hover:scale-105 transition-transform shadow-xl">সদস্য আবেদন ফর্ম</button>
            <button className="px-8 py-4 border border-white/30 rounded-full hover:bg-white/10 transition-all font-bold">পরিচালনা পর্ষদ</button>
          </div>
        </div>
      </section>
    </div>
  );
}
