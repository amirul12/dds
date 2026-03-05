import React from "react";
import { getCommitteeMembers } from "@/data/loaders";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default async function SmaranikaPage() {
  const response = await getCommitteeMembers("Smaranika");
  const editorialBoard = response.data;

  return (
    <div className="container py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">স্মরণিকা প্রকল্প</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto italic font-serif">
          "স্মৃতির পাতায় দেবহাটা" - আমাদের আসন্ন স্মরণিকার জন্য আপনার লেখা ও বিজ্ঞাপন জমা দিন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Editorial Board */}
        <div>
          <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-3">
             সম্পাদকীয় পর্ষদ
            <div className="h-[1px] bg-primary/20 flex-1" />
          </h2>
          <div className="space-y-6">
            {editorialBoard.length > 0 ? (
              editorialBoard.map((member: any) => (
                <div key={member.id} className="flex items-center gap-4 bg-muted/50 p-4 rounded-lg border">
                   <div className="size-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-xl">
                    {member.name[0]}
                   </div>
                   <div>
                     <h4 className="font-bold">{member.name}</h4>
                     <p className="text-sm text-primary">{member.designation}</p>
                   </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic">সম্পাদকীয় পর্ষদ শীঘ্রই ঘোষণা করা হবে।</p>
            )}
          </div>

          <div className="mt-12 bg-primary/5 p-8 rounded-2xl border-2 border-primary/10">
            <h3 className="text-xl font-bold mb-4 font-serif text-primary">বিজ্ঞপ্তি ও সময়সীমা</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <span className="text-primary font-bold">লেখা জমার শেষ তারিখ:</span>
                <span>৩০শে মে, ২০২৪</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">বিজ্ঞাপন জমার শেষ তারিখ:</span>
                <span>১৫ই জুন, ২০২৪</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">প্রকাশনা উৎসব:</span>
                <span>আগস্ট ২০২৪</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Ad Submission Form */}
        <div id="ad-form">
          <form className="bg-card border-4 border-double border-primary/20 rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-serif font-bold text-center mb-6">বিজ্ঞাপন দিতে চান?</h3>
            <p className="text-center text-muted-foreground text-sm mb-8">
              স্মরণিকায় আপনার প্রতিষ্ঠান বা ব্যক্তিগত বিজ্ঞাপন দিয়ে গৌরবময় এই প্রকাশনার অংশ হোন।
            </p>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">প্রতিষ্ঠান/বিজ্ঞাপনদাতার নাম *</Label>
                <Input id="orgName" required />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">যোগাযোগকারী ব্যক্তির নাম *</Label>
                  <Input id="contact" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">ফোন নম্বর *</Label>
                  <Input id="phone" type="tel" placeholder="01XXXXXXXXX" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="adSize">বিজ্ঞাপনের সাইজ *</Label>
                <select id="adSize" className="w-full h-10 px-3 rounded-md border bg-background">
                  <option>পুরো পাতা (কালার)</option>
                  <option>পুরো পাতা (সাদা-কালো)</option>
                  <option>অর্ধেক পাতা</option>
                  <option>এক-চতুর্থাংশ পাতা</option>
                  <option>ব্যাক কভার</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="msg">বার্তা বা বিশেষ অনুরোধ</Label>
                <Textarea id="msg" rows={4} placeholder="কোন বিশেষ নির্দেশনা থাকলে লিখুন..." />
              </div>

              <div className="pt-4">
                <Button size="lg" className="w-full font-bold">বিজ্ঞাপনের অনুরোধ জমা দিন</Button>
                <p className="text-[10px] text-center text-muted-foreground mt-4 italic">
                  * জমা দেওয়ার পর আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
