"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { StrapiImage } from "@/components/custom/strapi-image";
import { CheckCircle, Phone, MapPin, Briefcase, User } from "lucide-react";
import { cn, getStrapiURL } from "@/lib/utils";

interface Member {
  id: number;
  name: string;
  membershipType?: "Life" | "General";
  overallSerial?: string;
  thanaSerial?: string;
  fatherName?: string;
  motherName?: string;
  dob?: string;
  village?: string;
  union: string;
  permanentAddress?: string;
  presentAddress?: string;
  email?: string;
  phone?: string;
  education?: string;
  bloodGroup?: string;
  nid?: string;
  presentJob?: string;
  presentWorkplace?: string;
  designation?: string;
  organizations?: string;
  isVerified: boolean;
  photo?: { url: string; alternativeText?: string };
}

export function MemberCard({ member, onCorrect }: { member: Member; onCorrect: (id: number) => void }) {
  return (
    <div className="group relative bg-card text-card-foreground rounded-2xl border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col h-full bg-gradient-to-br from-white to-slate-50/50 dark:from-slate-900 dark:to-slate-900/50">
      
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-primary/10 transition-colors" />

      {/* Verified badge */}
      {member.isVerified && (
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-500/10 backdrop-blur-md border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
          <CheckCircle className="w-3.5 h-3.5" />
          যাচাইকৃত
        </div>
      )}

      {/* Header with photo & Basic Info */}
      <div className="p-6 pb-4 flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-muted border-2 border-white dark:border-slate-800 shadow-lg relative group-hover:scale-105 transition-transform duration-500">
          {member.photo?.url ? (
            <StrapiImage
              src={member.photo.url}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <User className="w-10 h-10 text-primary/40" />
            </div>
          )}
        </div>

        {/* Name block */}
        <div className="min-w-0 flex-1 pt-1">
          <div className="flex flex-wrap gap-1.5 mb-1.5">
             {member.membershipType === "Life" && (
               <span className="bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 text-[10px] uppercase font-black px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800 tracking-wider shadow-sm">
                 আজীবন সদস্য
               </span>
             )}
             {member.membershipType === "General" && (
               <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-400 text-[10px] uppercase font-black px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 tracking-wider shadow-sm">
                 সাধারণ সদস্য
               </span>
             )}
             {member.overallSerial && (
               <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-md border border-primary/20 shadow-sm">
                 ID: {member.overallSerial}
               </span>
             )}
             {member.thanaSerial && (
               <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                 থানা সিরিয়াল: {member.thanaSerial}
               </span>
             )}
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white font-serif leading-tight line-clamp-2 transition-colors group-hover:text-primary">
            {member.name}
          </h3>
          {member.designation && (
            <p className="text-sm font-medium text-primary/80 mt-1 line-clamp-1">{member.designation}</p>
          )}
        </div>
      </div>

      {/* Details Grid */}
      <div className="px-6 space-y-3.5 text-sm flex-1">
        
        {/* Father's Name */}
        {member.fatherName && (
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <User className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">পিতার নাম</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">{member.fatherName}</span>
            </div>
          </div>
        )}

        {/* Location / Village */}
        {(member.village || member.union) && (
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">ঠিকানা</span>
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {member.village && <span>{member.village}</span>}
                {member.village && member.union && <span>, </span>}
                {member.union && <span>{member.union} ইউনিয়ন</span>}
              </span>
            </div>
          </div>
        )}

        {/* Job / Company */}
        {member.presentJob && (
          <div className="flex items-start gap-3 text-slate-600 dark:text-slate-400">
            <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary/60" />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 dark:text-slate-500">কর্মস্থল</span>
              <span className="font-medium text-slate-800 dark:text-slate-200 line-clamp-1">{member.presentJob}</span>
            </div>
          </div>
        )}

        {/* Blood Group & Phone (Mini row) */}
        <div className="flex items-center gap-6 pt-1">
          {member.bloodGroup && (
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-xs font-black">{member.bloodGroup}</span>
              </div>
              <span className="text-xs font-bold text-slate-500">রক্তের গ্রুপ</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 p-6 pt-0 flex gap-3">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 rounded-xl font-bold bg-white dark:bg-slate-900 border-primary/20 hover:border-primary hover:bg-primary/5 transition-all"
          onClick={() => onCorrect(member.id)}
        >
          সংশোধন করুন
        </Button>
        {member.phone && (
          <Button
            variant="default"
            size="sm"
            className="flex-1 rounded-xl font-bold shadow-lg shadow-primary/20"
            asChild
          >
            <a href={`tel:${member.phone}`} className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              কল করুন
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
