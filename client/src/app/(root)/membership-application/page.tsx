import React from "react";
import { MembershipForm } from "@/components/forms/MembershipForm";

export const metadata = {
  title: "সদস্য পদের আবেদন | দেবহাটা উপজেলা সমিতি-ঢাকা",
  description: "দেবহাটা উপজেলা সমিতি-ঢাকা এর আজীবন বা সাধারণ সদস্য হওয়ার জন্য অনলাইনে আবেদন করুন।",
};

export default function MembershipApplicationPage() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-900/50 py-16 md:py-24">
      <div className="container">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4">
             <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm tracking-widest uppercase">
               Join Our Community
             </div>
             <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black text-slate-800 dark:text-white leading-[1.2]">
               সমিতির সদস্যপদের আবেদন
             </h1>
             <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
               দেবহাটা উপজেলা সমিতি-ঢাকা এর অংশীদার হতে এবং আমাদের সামাজিক উন্নয়নমূলক কর্মকাণ্ডে যুক্ত হতে আজই সদস্য হওয়ার আবেদন করুন।
             </p>
          </div>

          <MembershipForm />

          {/* Guidelines Section */}
          <div className="bg-slate-100 dark:bg-slate-800/30 p-10 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-inner">
             <h3 className="text-2xl font-serif font-bold mb-6 flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="size-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               সদস্য পদের নিয়মাবলী ও তথ্যঃ
             </h3>
             <ul className="space-y-4 text-slate-700 dark:text-slate-300">
                <li className="flex gap-4">
                  <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>আজীবন সদস্য হওয়ার জন্য এককালীন নির্ধারিত ফি প্রদান করতে হবে।</span>
                </li>
                <li className="flex gap-4">
                  <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>সাধারণ সদস্য হওয়ার জন্য বাৎসরিক নির্ধারিত ফি প্রদান বাধ্যতামূলক।</span>
                </li>
                <li className="flex gap-4">
                  <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>অনলাইনে আবেদন জমা হওয়ার পর পরিচালনা পর্ষদ তা যাচাই করবেন এবং আপনার সাথে কথা বলে সদস্যপদ চূড়ান্ত করবেন।</span>
                </li>
                <li className="flex gap-4">
                  <div className="size-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>সদস্যপদ ফি এবং অন্যান্য তথ্যের জন্য আমাদের হেল্পলাইন নম্বরে যোগাযোগ করুন।</span>
                </li>
             </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
