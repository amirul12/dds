"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RSVPForm({ eventId, eventTitle }: { eventId: number; eventTitle: string }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    union: "",
    guestCount: 1,
    foodPreference: "None",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: { ...formData, event: eventId } }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSuccess(true);
    } catch (error) {
      alert("দুঃখিত, তথ্য জমা দিতে সমস্যা হয়েছে।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 text-green-800 p-8 rounded-xl border border-green-200 text-center">
        <h3 className="text-2xl font-bold mb-2">অভিনন্দন!</h3>
        <p>আপনার রেজিস্ট্রেশন সফলভাবে সম্পন্ন হয়েছে। অনুষ্ঠানে আপনার উপস্থিতি কামনা করছি।</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 md:p-8 shadow-lg">
      <h3 className="text-2xl font-serif font-bold mb-6 border-b pb-4">রেজিস্ট্রেশন করুন</h3>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">আপনার নাম *</Label>
          <Input 
            id="name" 
            required 
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone">ফোন নম্বর *</Label>
            <Input 
              id="phone" 
              required 
              type="tel"
              placeholder="01XXXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="union">ইউনিয়ন</Label>
            <Input 
              id="union" 
              value={formData.union}
              onChange={(e) => setFormData({...formData, union: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="guestCount">অতিথি সংখ্যা</Label>
            <Input 
              id="guestCount" 
              type="number" 
              min={1} 
              max={10}
              value={formData.guestCount}
              onChange={(e) => setFormData({...formData, guestCount: parseInt(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="food">খাবার পছন্দ</Label>
            <select 
              id="food"
              className="w-full h-10 px-3 rounded-md border bg-background"
              value={formData.foodPreference}
              onChange={(e) => setFormData({...formData, foodPreference: e.target.value})}
            >
              <option value="None">প্রযোজ্য নয়</option>
              <option value="Iftar">ইফতার</option>
              <option value="Dinner">রাতের খাবার</option>
            </select>
          </div>
        </div>

        <div className="pt-4">
          <p className="text-xs text-muted-foreground mb-4 italic">
            * এই অনুষ্ঠানে যোগদানের জন্য কোন ফি প্রয়োজন নেই।
          </p>
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "জমা হচ্ছে..." : "অংশগ্রহণ নিশ্চিত করুন"}
          </Button>
        </div>
      </div>
    </form>
  );
}
