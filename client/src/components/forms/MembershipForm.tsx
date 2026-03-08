"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, Phone, Mail, MapPin, Briefcase, Camera, CheckCircle, GraduationCap, Calendar, Heart, Fingerprint } from "lucide-react";

const UNIONS = [
  { value: "Debhata", bn: "দেবহাটা" },
  { value: "Kulya", bn: "কুল্যা" },
  { value: "Parulia", bn: "পারুলিয়া" },
  { value: "Sakhipur", bn: "সখিপুর" },
  { value: "Nawapara", bn: "নওয়াপাড়া" }
];

export function MembershipForm() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const data: any = Object.fromEntries(formData.entries());
    
    // Handle photo upload if exists
    let photoId = null;
    const photoFile = fileInputRef.current?.files?.[0];
    
    try {
      if (photoFile) {
        const photoFormData = new FormData();
        photoFormData.append("files", photoFile);
        
        const uploadResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`, {
          method: "POST",
          body: photoFormData,
        });
        
        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          photoId = uploadData[0].id;
        }
      }

      const submissionData = {
        ...data,
        photo: photoId,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/membership-applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: submissionData }),
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
      <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-emerald-100 dark:border-emerald-900/30 max-w-2xl mx-auto px-10">
        <div className="size-24 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
          <CheckCircle className="size-12" />
        </div>
        <h2 className="text-4xl font-serif font-black text-slate-800 dark:text-white mb-6">আবেদন সফল হয়েছে!</h2>
        <p className="text-slate-600 dark:text-slate-400 text-xl mb-10 leading-relaxed">
          আপনার সদস্যপদ আবেদনটি আমরা গ্রহণ করেছি। আমাদের পরিচালনা পর্ষদ এটি যাচাই করে দ্রুত আপনার সাথে যোগাযোগ করবেন।
        </p>
        <Button onClick={() => window.location.href = "/"} className="rounded-full h-14 px-10 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-all">
          হোম পেজে ফিরে যান
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 p-8 md:p-16 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/50 max-w-5xl mx-auto relative overflow-hidden">
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

      <div className="space-y-16 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest border border-primary/20">
            <User className="size-3" />
            Join Our Elite Community
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 dark:text-white leading-tight">
            সদস্য হওয়ার আবেদনপত্র
          </h2>
          <div className="flex items-center justify-center gap-4 text-slate-400">
             <div className="h-px w-12 bg-slate-200" />
             <p className="text-lg italic font-medium">দেবহাটা উপজেলা সমিতি, ঢাকা</p>
             <div className="h-px w-12 bg-slate-200" />
          </div>
        </div>

        {/* Member Type Selection */}
        <div className="bg-slate-50 dark:bg-slate-800/40 p-10 rounded-[2rem] border border-slate-100 dark:border-slate-800 transition-all hover:shadow-inner">
          <Label className="text-xl font-black mb-8 block text-slate-900 dark:text-white flex items-center gap-3">
             <div className="size-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm">১</div>
             সদস্য পদের ধরণ নির্বাচন করুন *
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <label className="relative flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 group shadow-sm">
               <input type="radio" name="membershipType" value="Life" required className="size-6 accent-primary" />
               <div className="flex flex-col">
                 <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">আজীবন সদস্য</span>
                 <span className="text-sm text-slate-500">এককালীন ফি প্রযোজ্য</span>
               </div>
            </label>
            <label className="relative flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 cursor-pointer transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 group shadow-sm">
               <input type="radio" name="membershipType" value="General" className="size-6 accent-primary" />
               <div className="flex flex-col">
                 <span className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">সাধারণ সদস্য</span>
                 <span className="text-sm text-slate-500">বাৎসরিক ফি প্রযোজ্য</span>
               </div>
            </label>
          </div>
        </div>

        {/* Photo Upload Section */}
        <div className="flex flex-col items-center justify-center space-y-6 py-4">
           <div className="relative group">
              <div className="size-32 rounded-[2.5rem] bg-slate-100 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-2xl relative transition-transform duration-500 group-hover:scale-105">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <User className="size-12 text-slate-300" />
                  </div>
                )}
              </div>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 size-10 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900 hover:scale-110 transition-transform active:scale-95"
              >
                <Camera className="size-5" />
              </button>
           </div>
           <div className="text-center">
             <Label className="text-lg font-bold">প্রোফাইল ছবি আপলোড করুন</Label>
             <p className="text-sm text-slate-500 mt-1">সর্বোচ্চ ২ মেগাবাইট (JPG, PNG)</p>
           </div>
           <input 
             type="file" 
             ref={fileInputRef} 
             onChange={handlePhotoChange} 
             accept="image/*" 
             className="hidden" 
           />
        </div>

        {/* Basic Information Section */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif">ব্যক্তিগত তথ্য</h3>
             <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <User className="size-4 text-primary" /> নাম *
              </Label>
              <Input name="name" required placeholder="আপনার পূর্ণ নাম" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-primary/30 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Calendar className="size-4 text-primary" /> জন্ম তারিখ
              </Label>
              <Input name="dob" type="date" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-primary/30 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Fingerprint className="size-4 text-primary" /> এনআইডি / জন্মসনদ
              </Label>
              <Input name="nid" placeholder="NID নম্বর লিখুন" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-primary/30 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                পিতার নাম
              </Label>
              <Input name="fatherName" placeholder="পিতার পূর্ণ নাম" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-primary/30 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                মাতার নাম
              </Label>
              <Input name="motherName" placeholder="মাতার পূর্ণ নাম" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent focus:border-primary/30 transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Heart className="size-4 text-red-500" /> রক্তের গ্রুপ
              </Label>
              <select name="bloodGroup" className="flex h-14 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none font-medium appearance-none transition-all">
                <option value="">রক্তের গ্রুপ</option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Contact & Address Section */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif">যোগাযোগ ও ঠিকানা</h3>
             <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Phone className="size-4 text-primary" /> মোবাইল নম্বর *
              </Label>
              <Input name="phone" required type="tel" placeholder="01XXXXXXXXX" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Mail className="size-4 text-primary" /> ইমেইল আইডি
              </Label>
              <Input name="email" type="email" placeholder="example@mail.com" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 md:col-span-1">
              <div className="space-y-3">
                <Label className="font-bold text-slate-700 dark:text-slate-300">ইউনিয়ন *</Label>
                <select name="union" required className="flex h-14 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent px-4 py-2 text-sm focus:ring-2 focus:ring-primary/20 outline-none font-medium appearance-none">
                  <option value="">ইউনিয়ন নির্বাচন করুন</option>
                  {UNIONS.map(u => <option key={u.value} value={u.value}>{u.bn} ইউনিয়ন</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <Label className="font-bold text-slate-700 dark:text-slate-300">গ্রামের নাম</Label>
                <Input name="village" placeholder="গ্রামের নাম" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">স্থায়ী ঠিকানা</Label>
              <Input name="permanentAddress" placeholder="পূর্ণ স্থায়ী ঠিকানা" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>

            <div className="md:col-span-2 space-y-3">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <MapPin className="size-4 text-primary" /> বর্তমান ঠিকানা (ঢাকা)
              </Label>
              <Textarea name="presentAddress" placeholder="বাসা নং, রাস্তা, এলাকা, ঢাকা" className="min-h-[100px] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium resize-none p-5" />
            </div>
          </div>
        </div>

        {/* Professional Section */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
             <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif">পেশাগত ও অন্যান্য তথ্য</h3>
             <div className="h-px flex-1 bg-slate-100 dark:bg-slate-800" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="space-y-3 md:col-span-1">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <GraduationCap className="size-4 text-primary" /> শিক্ষাগত যোগ্যতা
              </Label>
              <Input name="education" placeholder="আপনার পদবী / ডিগ্রী" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            <div className="space-y-3 md:col-span-2">
              <Label className="font-bold flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Briefcase className="size-4 text-primary" /> বর্তমান চাকরি (কোম্পানি/সংস্থা)
              </Label>
              <Input name="presentJob" placeholder="কোম্পানি বা প্রতিষ্ঠানের নাম" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">বর্তমান কর্মস্থলের নাম</Label>
              <Input name="presentWorkplace" placeholder="বিভাগ / শাখা" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            <div className="space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">পদবী / পদ</Label>
              <Input name="designation" placeholder="আপনার পদবী" className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium" />
            </div>
            <div className="md:col-span-3 space-y-3">
              <Label className="font-bold text-slate-700 dark:text-slate-300">অন্যান্য সামাজিক প্রতিষ্ঠানের সাথে জড়িত থাকলে তার নাম ও পদবি</Label>
              <Textarea name="organizations" placeholder="প্রতিষ্ঠানের নাম ও আপনার অবস্থান" className="min-h-[80px] rounded-2xl bg-slate-50 dark:bg-slate-800/50 border-transparent transition-all font-medium resize-none p-5" />
            </div>
          </div>
        </div>

        {/* Final Declaration */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 p-10 rounded-[2.5rem] border border-primary/10 dark:border-primary/20 space-y-6">
          <div className="flex items-start gap-4">
             <div className="size-6 rounded-full bg-primary flex-shrink-0 mt-1" />
             <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-serif text-lg italic">
               আমি এই মর্মে অঙ্গীকার করিতেছি যে, উপরে উল্লেখিত বিবরণসমূহ সত্য এবং ঘোষণা করিতেছি যে, এই সমিতির গঠনতন্ত্র ও তার আদর্শের প্রতি শ্রদ্ধাশীল ও নিষ্ঠার সাথে মেনে চলিতে বাধ্য থাকিব।
             </p>
          </div>
          <label className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm cursor-pointer border border-primary/20 shadow-sm hover:translate-x-1 transition-transform">
             <input type="checkbox" required className="size-6 accent-primary rounded-lg" />
             <span className="text-sm font-bold text-slate-800 dark:text-white">আমি ঘোষণা করছি যে উপরের সকল তথ্য সত্য এবং আমি সমিতির নিয়মাবলী মেনে চলব। *</span>
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-6">
          <Button 
            type="submit" 
            disabled={loading} 
            className="w-full h-20 rounded-[1.5rem] text-xl font-black shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all bg-primary hover:bg-primary/90"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <div className="size-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                প্রসেসিং হচ্ছে...
              </span>
            ) : "আবেদন জমা দিন"}
          </Button>
          <p className="text-center text-slate-400 text-sm mt-6 font-medium">নির্ধারিত সকল তথ্য সতর্কতার সাথে পূরণ করুন।</p>
        </div>
      </div>
    </form>
  );
}
