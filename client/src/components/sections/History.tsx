import Link from "next/link";
import { ScrollText, ArrowRight } from "lucide-react";

export function History() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold animate-in fade-in slide-in-from-left-4">
              <ScrollText className="size-4" />
              <span>দেবহাটার গৌরবোজ্জ্বল ইতিহাস</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 dark:text-white leading-tight">
              সুন্দরবনের অববাহিকায় অবস্থিত <br className="hidden md:block" />
              <span className="text-primary italic">ঐতিহ্যবাহী দেবহাটা</span>
            </h2>

            <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                সুন্দরবনের অববাহিকায় অবস্থিত, ইছামতি বিধৌত ছায়াঘন শ্যামনয়নাভিরাম দেবহাটা উপজেলা। পাখির কুজন মুখরিত, ইতিহাস এবং ঐতিহ্যের পাদপীঠ দেবহাটা উপজেলা। 
              </p>
              <p>
                উপমহাদেশের প্রখ্যাত চিকিৎসক ডাঃ বিধান চন্দ্র রায়েরও পৈতৃক নিবাস ছিল সাতক্ষীরার অজপাড়াগাঁ দেবহাটার টাউনশ্রীপুর গ্রামে। প্রায় ১৫০ বছর আগে দেবহাটার টাউনশ্রীপুর গ্রামে প্রতিষ্ঠিত হয়েছিল দেবহাটা পৌরসভা। ব্রিটিশ শাসনামলে টাউনশ্রীপুরকে বলা হতো এ অঞ্চলের বধিষ্ণু অঞ্চল। ১৮ জমিদারের বাস ছিল এই গ্রামে।
              </p>
            </div>

            <div className="pt-4">
              <Link href="/history">
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-2xl hover:bg-primary/90 hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 group">
                  আরও দেখুন
                  <ArrowRight className="size-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-8 border-white dark:border-slate-900 shadow-2xl">
               <img 
                src="/images/image.png" 
                alt="Debhata History" 
                className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white/90 font-serif italic text-lg leading-relaxed">
                  "পাখির কুজন মুখরিত, ইতিহাস এবং ঐতিহ্যের পাদপীঠ দেবহাটা উপজেলা।"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
