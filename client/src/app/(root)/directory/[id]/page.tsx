"use client";

import React, { useEffect, useState } from "react";
import { getMemberById } from "@/data/loaders";
import { StrapiImage } from "@/components/custom/strapi-image";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, ArrowLeft, Printer, MapPin, 
  Briefcase, User, Phone, Mail, GraduationCap, 
  Droplet, FileText, Calendar, Compass 
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function MemberProfilePage() {
  const params = useParams();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      if (params.id) {
        const result = await getMemberById(params.id as string);
        setMember(result?.data ? result.data : result);
      }
      setLoading(false);
    }
    fetchMember();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
        <h2 className="text-2xl font-bold mb-4">সদস্য খুঁজে পাওয়া যায়নি</h2>
        <Button asChild variant="outline">
          <Link href="/directory">
            <ArrowLeft className="mr-2 h-4 w-4" /> ফিরে যান
          </Link>
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 print:bg-white pt-24 pb-20">
      
      {/* --- WEB VIEW --- */}
      <div className="container max-w-5xl print:hidden">
        
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
            <Link href="/directory">
              <ArrowLeft className="mr-2 h-4 w-4" /> ব্যাক টু ডিরেক্টরি
            </Link>
          </Button>
          <Button onClick={handlePrint} className="rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform font-bold gap-2">
            <Printer className="h-4 w-4" /> আইডি কার্ড প্রিন্ট করুন
          </Button>
        </div>

        {/* Profile Card Main */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200/60 dark:border-slate-800 shadow-xl overflow-hidden relative">
          
          {/* Header Banner */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-primary/80 to-primary relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
            {member.membershipType === "Life" && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white font-black px-4 py-1.5 rounded-full border border-white/30 text-sm tracking-widest uppercase">
                  আজীবন সদস্য
                </div>
            )}
            {member.membershipType === "General" && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white font-black px-4 py-1.5 rounded-full border border-white/30 text-sm tracking-widest uppercase">
                  সাধারণ সদস্য
                </div>
            )}
          </div>

          <div className="px-8 pb-12">
            {/* Avatar & Title Section */}
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-end -mt-20 md:-mt-24 mb-10 relative z-10">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-[2rem] bg-white dark:bg-slate-800 p-2 shadow-2xl relative">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-slate-100 flex items-center justify-center relative">
                  {member.photo?.url ? (
                    <StrapiImage src={member.photo.url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <User className="size-20 text-slate-300" />
                  )}
                </div>
                {member.isVerified && (
                  <div className="absolute bottom-2 right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white dark:border-slate-800" title="যাচাইকৃত সদস্য">
                    <CheckCircle className="size-5" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 pb-4">
                <div className="flex flex-wrap gap-2 mb-3">
                  {member.overallSerial && (
                    <span className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-lg border border-primary/20 text-sm">
                      ID: {member.overallSerial}
                    </span>
                  )}
                  {member.thanaSerial && (
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold px-3 py-1 rounded-lg border border-slate-200 dark:border-slate-700 text-sm">
                      থানা: {member.thanaSerial}
                    </span>
                  )}
                  {member.union && (
                    <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800 text-sm">
                      {member.union}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white font-serif tracking-tight mb-2">
                  {member.name}
                </h1>
                {member.designation && (
                  <p className="text-xl font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                     <Briefcase className="size-5" />
                     {member.designation} {member.presentJob && <span>@ {member.presentJob}</span>}
                  </p>
                )}
              </div>
            </div>

            {/* Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <User className="size-5 text-primary" />
                    ব্যক্তিগত তথ্য
                  </h3>
                  <div className="space-y-4">
                    {member.fatherName && <InfoRow label="পিতার নাম" value={member.fatherName} />}
                    {member.motherName && <InfoRow label="মাতার নাম" value={member.motherName} />}
                    {member.dob && <InfoRow label="জন্ম তারিখ" value={new Date(member.dob).toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })} />}
                    {member.bloodGroup && <InfoRow label="রক্তের গ্রুপ" value={<span className="text-red-600 font-black">{member.bloodGroup}</span>} icon={<Droplet className="size-4 text-red-500" />} />}
                    {member.nid && <InfoRow label="এনআইডি" value={member.nid} icon={<FileText className="size-4 text-slate-400" />} />}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <MapPin className="size-5 text-primary" />
                    ঠিকানা ও যোগাযোগ
                  </h3>
                  <div className="space-y-4">
                    {member.phone && <InfoRow label="মোবাইল নং" value={<a href={`tel:${member.phone}`} className="hover:text-primary transition-colors">{member.phone}</a>} icon={<Phone className="size-4 text-slate-400" />} />}
                    {member.email && <InfoRow label="ইমেইল" value={<a href={`mailto:${member.email}`} className="hover:text-primary transition-colors">{member.email}</a>} icon={<Mail className="size-4 text-slate-400" />} />}
                    {member.village && <InfoRow label="গ্রাম" value={member.village} />}
                    {member.presentAddress && <InfoRow label="বর্তমান ঠিকানা" value={member.presentAddress} />}
                    {member.permanentAddress && <InfoRow label="স্থায়ী ঠিকানা" value={member.permanentAddress} />}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                    <Briefcase className="size-5 text-primary" />
                    পেশাগত তথ্য
                  </h3>
                  <div className="space-y-4">
                    {member.education && <InfoRow label="শিক্ষাগত যোগ্যতা" value={member.education} icon={<GraduationCap className="size-4 text-slate-400" />} />}
                    {member.presentJob && <InfoRow label="প্রতিষ্ঠান" value={member.presentJob} />}
                    {member.designation && <InfoRow label="পদবী" value={member.designation} />}
                    {member.presentWorkplace && <InfoRow label="কর্মস্থলের ঠিকানা" value={member.presentWorkplace} />}
                  </div>
                </div>

                {member.organizations && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                      <Compass className="size-5 text-primary" />
                      অন্যান্য সম্পৃক্ততা
                    </h3>
                    <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                      {member.organizations}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRINT VIEW (ID CARD) --- */}
      {/* Hidden usually, display block only in @media print */}
      <div className="hidden print:flex flex-col items-center justify-center min-h-[100vh] w-full bg-white m-0 p-10 gap-10">
        
        {/* Front of ID Card */}
        <div className="w-[86mm] h-[54mm] border-[0.5mm] border-slate-200 rounded-xl overflow-hidden relative shadow-md bg-white flex flex-col shrink-0">
            
            {/* Header */}
            <div className="bg-[#124b3a] text-white p-2 text-center flex flex-col items-center justify-center relative">
               <h2 className="text-[11px] font-black leading-tight tracking-wide">ঢাকাস্থ দেবহাটা উপজেলা সমিতি</h2>
               <p className="text-[7px] text-white/80 uppercase tracking-widest mt-0.5">Dhaka Debhata Upazila Samiti</p>
            </div>

            {/* Body */}
            <div className="flex-1 flex flex-row items-center px-3 py-2 gap-3 relative">
                <div className="absolute inset-0 bg-primary/5 opacity-30 z-0"></div>
                
                {/* Photo */}
                <div className="w-[22mm] h-[28mm] border-2 border-slate-200 rounded-md bg-white overflow-hidden relative z-10 flex-shrink-0">
                  {member.photo?.url ? (
                    <StrapiImage src={member.photo.url} alt={member.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                       <User className="size-8 text-slate-300" />
                    </div>
                  )}
                </div>

                {/* Info Text */}
                <div className="flex-1 z-10 space-y-1 flex flex-col justify-center">
                   <h3 className="text-[12px] font-black text-[#124b3a] leading-tight font-serif line-clamp-1">{member.name}</h3>
                   {member.designation && <p className="text-[7px] font-bold text-slate-600 uppercase tracking-wide line-clamp-1">{member.designation}</p>}
                   
                   <div className="space-y-0.5 mt-2">
                     <div className="text-[7.5px] text-slate-700 flex">
                        <span className="font-bold w-12 flex-shrink-0 text-slate-500 uppercase">M. ID</span> 
                        <span>: <span className="font-black text-rose-600">{member.overallSerial || "N/A"}</span></span>
                     </div>
                     <div className="text-[7.5px] text-slate-700 flex">
                        <span className="font-bold w-12 flex-shrink-0 text-slate-500 uppercase">Mobile</span> 
                        <span>: {member.phone || "N/A"}</span>
                     </div>
                     <div className="text-[7.5px] text-slate-700 flex">
                        <span className="font-bold w-12 flex-shrink-0 text-slate-500 uppercase">Blood</span> 
                        <span>: <span className="text-red-600 font-extrabold">{member.bloodGroup || "N/A"}</span></span>
                     </div>
                     <div className="text-[7.5px] text-slate-700 flex">
                        <span className="font-bold w-12 flex-shrink-0 text-slate-500 uppercase">Union</span> 
                        <span>: {member.union || "N/A"}</span>
                     </div>
                   </div>
                </div>

                {/* QR Code */}
                <div className="absolute right-2 bottom-3 flex flex-col items-center">
                    <div className="size-[12mm] border bg-white p-0.5 relative z-20">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(`https://debhatasamiti.com/directory/${member.documentId}`)}`} 
                        alt="Profile QR Code"
                        className="w-full h-full"
                      />
                    </div>
                    <span className="text-[5px] text-slate-400 mt-1 uppercase font-bold">Verify Profile</span>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#124b3a] text-white px-3 py-1.5 flex justify-between items-center text-[7.5px] font-black uppercase tracking-widest z-10">
               <span>{member.membershipType === 'Life' ? 'Life Member' : 'General Member'}</span>
               <span>Official Identity Card</span>
            </div>
        </div>

        {/* Back of ID Card */}
        <div className="w-[86mm] h-[54mm] border-[0.5mm] border-slate-200 rounded-xl overflow-hidden relative shadow-md bg-white flex flex-col shrink-0">
           <div className="bg-[#124b3a] p-1.5 flex justify-center border-b border-white/10">
              <img src="/images/logo.png" alt="Logo" className="h-6 w-auto bg-white rounded-full p-0.5" />
           </div>
           
           <div className="flex-1 px-4 py-3 bg-[url('/noise.png')] bg-opacity-5">
              <h4 className="text-[7px] font-black text-[#124b3a] uppercase tracking-widest border-b border-primary/20 pb-1 mb-2">Terms & Conditions</h4>
              <ul className="list-disc pl-3 text-[5.5px] text-slate-600 space-y-1 font-medium leading-tight">
                 <li>This card is property of Dhaka Debhata Upazila Samiti.</li>
                 <li>If lost, please return to the office address mentioned below.</li>
                 <li>This card is non-transferable and must be carried at all times.</li>
                 <li>Any misuse of this card may result in membership cancellation.</li>
                 <li>Verify membership status by scanning the QR code on the front.</li>
              </ul>
              
              <div className="mt-4 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                 <div>
                    <h5 className="text-[5.5px] font-bold text-slate-400 uppercase mb-0.5">Office Address</h5>
                    <p className="text-[5.5px] text-slate-700 leading-tight">House #10, Road #05, Block #A, Banasree, Rampura, Dhaka-1219.</p>
                 </div>
                 <div className="flex flex-col items-center justify-end pb-1 pr-2">
                    <div className="border-b border-slate-800 w-full mb-1"></div>
                    <span className="text-[5px] font-bold uppercase text-slate-500">Authorized Signature</span>
                 </div>
              </div>
           </div>
           
           <div className="bg-primary px-3 py-1.5 text-center text-[6px] text-white/80 font-bold uppercase">
              www.debhatasamity.org | Support: 01711-000000
           </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value, icon }: { label: string, value: React.ReactNode, icon?: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
        {icon}
        {label}
      </span>
      <span className={`text-sm font-medium text-slate-800 dark:text-slate-200 ${icon ? 'pl-5' : ''}`}>
        {value}
      </span>
    </div>
  );
}
