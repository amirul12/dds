"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/membership-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
      });

      if (!response.ok) throw new Error("Submission failed");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("দুঃখিত, আবেদনটি পাঠানো সম্ভব হয়নি। দয়া করে আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-emerald-100 dark:border-emerald-900/30 max-w-2xl mx-auto px-6">
        <div className="size-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 dark:text-white mb-4">আবেদন সফল হয়েছে</h2>
        <p className="text-slate-600 dark:text-slate-400 text-lg mb-8">
          আপনার সদস্যপদ আবেদনটি আমরা গ্রহণ করেছি। আমাদের পরিচালনা পর্ষদ এটি যাচাই করে দ্রুত আপনার সাথে যোগাযোগ করবেন।
        </p>
        <Button onClick={() => window.location.href = "/"} variant="outline" className="rounded-full px-8">হোম পেজে ফিরে যান</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-4xl mx-auto">
      <div className="space-y-10">
        
        {/* Header Section */}
        <div className="text-center border-b pb-8 border-slate-100 dark:border-slate-800">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-2 text-wrap">আজীবন সদস্য/ সাধারণ সদস্য হওয়ার আবেদনপত্র</h2>
          <p className="text-muted-foreground italic">সভাপতি/ সাধারণ সম্পাদক, দেবহাটা উপজেলা সমিতি-ঢাকা</p>
        </div>

        {/* Introduction */}
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>মহোদয়,</p>
          <p className="mt-2 text-justify">
            বিনীত নিবেদন এই যে, আমি দেবহাটা উপজেলার বাসিন্দা এবং বর্তমানে ঢাকা প্রবাসী। আমি সমিতির উদ্দেশ্য ও লক্ষ্যকে সমর্থন ও পোষণ করে সমিতির আজীবন সদস্য/ সাধারণ সদস্য হওয়ার জন্য আবেদন করিতেছি। আমার জীবনবৃত্তান্ত নিম্নে প্রদান করা হলঃ
          </p>
        </div>

        {/* Member Type Selection */}
        <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
          <Label className="text-lg font-bold mb-4 block">সদস্য পদের ধরণ *</Label>
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center space-x-2">
              <input type="radio" id="life" name="membershipType" value="Life" required className="size-5 accent-primary cursor-pointer" />
              <Label htmlFor="life" className="text-base cursor-pointer">আজীবন সদস্য</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="radio" id="general" name="membershipType" value="General" className="size-5 accent-primary cursor-pointer" />
              <Label htmlFor="general" className="text-base cursor-pointer">সাধারণ সদস্য</Label>
            </div>
          </div>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">১। আবেদনকারীর নাম *</Label>
            <Input id="name" name="name" required placeholder="আপনার নাম লিখুন" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dob">২। জন্ম তারিখ</Label>
            <Input id="dob" name="dob" type="date" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="fatherName">৩। পিতার নাম</Label>
            <Input id="fatherName" name="fatherName" placeholder="পিতার নাম লিখুন" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="motherName">৪। মাতার নাম</Label>
            <Input id="motherName" name="motherName" placeholder="মাতার নাম লিখুন" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="permanentAddress">৫। স্থায়ী ঠিকানা</Label>
            <Textarea id="permanentAddress" name="permanentAddress" placeholder="গ্রাম, ইউনিয়ন, উপজেলা, জেলা" className="bg-slate-50 dark:bg-slate-800 border-none resize-none" rows={2} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="presentAddress">৬। বর্তমান ঠিকানা (ঢাকা)</Label>
            <Textarea id="presentAddress" name="presentAddress" placeholder="বাসা নং, রাস্তা, এলাকা, ঢাকা" className="bg-slate-50 dark:bg-slate-800 border-none resize-none" rows={2} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">৭। ফোন নম্বর *</Label>
            <Input id="phone" name="phone" required type="tel" placeholder="01XXXXXXXXX" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">৮। ইমেইল</Label>
            <Input id="email" name="email" type="email" placeholder="example@mail.com" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="education">৯। শিক্ষা (যোগ্যতা)</Label>
            <Input id="education" name="education" placeholder="আপনার শিক্ষাগত যোগ্যতা" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bloodGroup">১০। রক্তের গ্রুপ</Label>
            <select name="bloodGroup" className="flex h-12 w-full rounded-md border-none bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm focus:ring-2 focus:ring-primary outline-none">
              <option value="">রক্তের গ্রুপ নির্বাচন করুন</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="nid">১১। এনআইডি/ জন্ম সনদ নম্বর</Label>
            <Input id="nid" name="nid" placeholder="NID Number" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
          </div>
        </div>

        {/* Professional Info */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-lg font-bold mb-6 text-primary underline underline-offset-8">১২। পেশাগত বিবরণীঃ</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="jobName">প্রতিষ্ঠানের নাম</Label>
              <Input id="jobName" name="jobName" placeholder="কর্মস্থলের নাম" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="designation">পদবী</Label>
              <Input id="designation" name="designation" placeholder="আপনার পদবী" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobAddress">অফিসের ঠিকানা</Label>
              <Input id="jobAddress" name="jobAddress" placeholder="ঠিকানা" className="bg-slate-50 dark:bg-slate-800 border-none h-12" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="organizations">১৩। কোন সামাজিক প্রতিষ্ঠানের সাথে জড়িত থাকলে তার নাম ও পদবীঃ</Label>
          <Textarea id="organizations" name="organizations" placeholder="প্রতিষ্ঠানের নাম ও পদবী লিখুন" className="bg-slate-50 dark:bg-slate-800 border-none resize-none" rows={2} />
        </div>

        {/* Declaration */}
        <div className="bg-primary/5 dark:bg-primary/10 p-6 rounded-2xl space-y-4">
          <p className="text-justify text-sm italic">
            আমি এই মর্মে অঙ্গীকার করিতেছি যে, উপরে উল্লেখিত বিবরণসমূহ সত্য এবং ঘোষণা করিতেছি যে, এই সমিতির গঠনতন্ত্র ও তার আদর্শের প্রতি শ্রদ্ধাশীল ও নিষ্ঠার সাথে মেনে চলিতে বাধ্য থাকিব।
          </p>
          <div className="flex items-start space-x-3">
             <input type="checkbox" id="terms" required className="mt-1 size-4 accent-primary cursor-pointer border-slate-300 rounded" />
             <Label htmlFor="terms" className="text-sm cursor-pointer leading-tight">
               আমি ঘোষণা করছি যে উপরের সকল তথ্য সত্য এবং আমি সমিতির নিয়মাবলী মেনে চলব।
             </Label>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 flex justify-center">
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full md:w-64 h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                প্রসেসিং হচ্ছে...
              </span>
            ) : "আবেদন জমা দিন"}
          </Button>
        </div>
      </div>
    </form>
  );
}
