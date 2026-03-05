import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold text-primary mb-4">আমাদের সাথে যোগাযোগ করুন</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          আপনার যেকোনো জিজ্ঞাসা বা পরামর্শের জন্য নিচের ফর্মটি পূরণ করুন অথবা সরাসরি ফোনে যোগাযোগ করুন।
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <form className="bg-card border rounded-2xl p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">আপনার নাম</Label>
                <Input id="name" placeholder="নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">ফোন নম্বর</Label>
                <Input id="phone" placeholder="01XXXXXXXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">বিষয়</Label>
              <Input id="subject" placeholder="কি বিষয়ে লিখতে চান" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">বার্তা</Label>
              <Textarea id="message" rows={5} placeholder="আপনার বার্তা লিখুন..." />
            </div>
            <Button size="lg" className="w-full md:w-auto px-12">পাঠিয়ে দিন</Button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-serif font-bold mb-6">যোগাযোগের ঠিকানা</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="size-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">ঢাকা অফিস:</p>
                  <p className="text-sm opacity-90">হাউস #১০, রোড #০৫, ব্লক #এ, বনশ্রী, রামপুরা, ঢাকা-১২১৯।</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="size-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold">জরুরী যোগাযোগ:</p>
                  <div className="space-y-1 mt-1">
                    <a href="tel:01711000000" className="block text-sm hover:underline">সভাপতি: 01711-000000</a>
                    <a href="tel:01711111111" className="block text-sm hover:underline">সাধারণ সম্পাদক: 01711-111111</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full bg-muted rounded-2xl overflow-hidden border">
            {/* Placeholder for Google Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9023403816484!2d90.4285!3d23.7508!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ1JzAyLjkiTiA5MMKwMjUnNDIuNiJF!5e0!3m2!1sen!2sbd!4v1625567890123!5m2!1sen!2sbd" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
