import { ScrollText, Calendar, MapPin, Landmark, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { StrapiImage } from "@/components/custom/strapi-image";

export default function HistoryPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img
            src="/artifacts/debhata_history_hero_1773393890191.png"
            alt="History of Debhata"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
        </div>
        
        <div className="container relative z-10 text-center text-white px-4">
          <div className="mb-6 inline-flex p-3 rounded-2xl bg-white/10 backdrop-blur-md animate-in zoom-in duration-500">
            <Landmark className="size-8 text-secondary" />
          </div>
          <h1 className="text-4xl md:text-7xl font-serif font-bold mb-6 animate-in slide-in-from-bottom-10 duration-700">
            দেবহাটার ইতিহাস
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
            পাখির কুজন মুখরিত, ইতিহাস এবং ঐতিহ্যের পাদপীঠ দেবহাটা উপজেলা।
          </p>
        </div>
      </section>

      {/* Breadcrumbs / Back Link */}
      <div className="container py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all font-bold">
          <ArrowLeft className="size-5" />
          হোম পেজে ফিরুন
        </Link>
      </div>

      {/* Content Section */}
      <section className="pb-24 pt-8">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-16 shadow-2xl relative overflow-hidden">
               {/* Decorative background element */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 size-80 bg-primary/5 rounded-full blur-3xl" />
               <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-80 bg-secondary/5 rounded-full blur-3xl" />

               <div className="relative z-10">
                <div className="flex items-center gap-4 mb-12 text-primary">
                  <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <ScrollText className="size-7" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold">একটি সমৃদ্ধ জনপদ</h2>
                </div>

                <div className="prose prose-xl dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-extra-relaxed space-y-8 font-serif">
                  <p>
                    সুন্দরবনের অববাহিকায় অবস্থিত, ইছামতি বিধৌত ছায়াঘন শ্যামনয়নাভিরাম দেবহাটা উপজেলা। পাখির কুজন মুখরিত, ইতিহাস এবং ঐতিহ্যের পাদপীঠ দেবহাটা উপজেলা।
                  </p>

                  <p>
                    উপমহাদেশের প্রখ্যাত চিকিৎসক ডাঃ বিধান চন্দ্র রায়েরও পৈতৃক নিবাস ছিল সাতক্ষীরার অজপাড়াগাঁ দেবহাটার টাউনশ্রীপুর গ্রামে। প্রায় ১৫০ বছর আগে দেবহাটার টাউনশ্রীপুর গ্রামে প্রতিষ্ঠিত হয়েছিল দেবহাটা পৌরসভা। ব্রিটিশ শাসনামলে টাউনশ্রীপুরকে বলা হতো এ অঞ্চলের বধিষ্ণু অঞ্চল। ১৮ জমিদারের বাস ছিল এই গ্রামে। কিন্তু কালের বিবর্তনে সব কিছু হারিয়ে গেছে।
                  </p>

                  <div className="my-12 p-8 bg-slate-50 dark:bg-slate-900 rounded-3xl border-l-8 border-primary italic">
                    <p className="mb-0">
                      "ভারত বাংলাদেশের মধ্য দিয়ে বয়ে চলা ইছামতি নদী সাতক্ষীরা উপজেলার সীমান্তঘেঁষা হাড়দ্দার পাশ দিয়ে ছুটে চলেছে বঙ্গপোসাগর অভিমুখে।"
                    </p>
                  </div>

                  <p>
                    ব্রিটিশ শাসনামলে এ অঞ্চলে মানুষের আনাগোনা ছিল কলকাতায়। ইছামতি নদীর তীরঘেষা টাউনশ্রীপুর, সুশীলগাঁতী ও দেবহাটা পাশাপাশি তিনটি গ্রাম। ইছামতির ওপারে ভারতের হাসনাবাদ রেল স্টেশন। যার কারনে ব্রিটিশ শাসনামলে এ অঞ্চলে মানুষের দ্বিতীয় ঠিকানা ছিল কলকাতা। একসময়ের দেবহাটা গ্রাম এখন উপজেলা সদর। কিন্তু টাউনশ্রীপুর এখন পৌরসভা থেকে এক অনুন্নত গ্রামে রুপ নিয়েছে।
                  </p>

                  <p>
                    সাতক্ষীরা শহর থেকে প্রায় ৪০ কিলোমিটার দূরে ইছামতি নদীর তীরঘেসা গ্রাঁমটির নাম টাউনশ্রীপুর। ডাঃ বিধান চন্দ্র রায়ের জন্মের আগেই ব্রিটিশ সরকার ১৮৬৭ সালে দেবহাটাকে পৌরসাভা ঘোষণা করে। আর এই পৌরসাভার কার্যালয় ছিল দেবহাটা টাউনশ্রীপুর গ্রামে। ঐ সময় বিভাগীয় শহর খুলনাতেও পৌরসভা প্রতিষ্ঠিত হয়নি।
                  </p>

                  <p>
                    ভারতের সেনাবাহিনীর সেনাপ্রধান শঙ্কর রায় চৌধুরী। ভারতের সেনাপ্রধানের দায়িত্ব পালনকালেই ১৯৯৭ সালে শঙ্কর রায় চৌধুরী তাঁর জন্ম ভিটা টাউনশ্রীপুর গ্রামে এসেছিলেন। পাকিস্তান সরকার সম্ভবত ১৯৫০-১৯৫১ সালে টাউনশ্রীপুর পৌরসভা বিলুপ্ত ঘোষনা করে। পাকিস্তান সরকারের এ সিদ্ধান্তের বিরুদ্ধে রাওয়ালপিন্ডি হাই হাইকোর্টে মামলা করেছিলেন জমিদার অনীল স্বর্ণকার। কিন্তু দেবহাটা টাউনশ্রীপু্রে আর পৌরসাভা ফিরে আসেনি।
                  </p>

                  <p>
                    ১৮ জমিদারের বাস দেবহাটা টাউনশ্রীপু্র ও সুশীলগাঁতী গ্রামে। জমিদারদের কেউ কেউ ছিলেন অত্যচারী, আবার কেউ কেউ ছিলেন মানবদরদী। আবার কোনো কোনো জমিদার সমাজে কিছু অবদানও রেখে গেছেন। দেবহাটার টাউনশ্রীপুরে জমিদারদের বিশাল অট্টালিকা, পূজা মন্দির ও থিয়েটার রুমের এখন আর কোন অস্তিত্ব নেই। ব্রিটিশ আমলের আধাপাঁকা রাস্তা এখন পিচঢালা পথ।
                  </p>
                </div>
              </div>
            </div>

            {/* Historical Landmarks or Quick Facts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Calendar className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold">পৌরসভার ইতিহাস</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  ১৮৬৭ সালে ব্রিটিশ সরকার দেবহাটাকে পৌরসভা ঘোষণা করে, যা তৎকালীন সময়ে খুলনা বিভাগের অন্যতম প্রাচীন পৌরসভা ছিল।
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-secondary/5 border border-secondary/10">
                <div className="flex items-center gap-4 mb-4">
                  <div className="size-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                    <MapPin className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold">ভৌগোলিক অবস্থান</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  ইছামতি নদীর তীরে অবস্থিত এই জনপদটি কলকাতার অত্যন্ত নিকটে হওয়ায় ঐতিহাসিকভাবে বাণিজ্যিক গুরুত্ব বহন করত।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
