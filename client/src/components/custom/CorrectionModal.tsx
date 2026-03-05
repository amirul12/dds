"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CorrectionModalProps {
  memberId: number;
  memberName: string;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export function CorrectionModal({ memberId, memberName, onClose, onSubmit }: CorrectionModalProps) {
  const [formData, setFormData] = useState({
    submittedBy: "",
    phone: "",
    wrongInfo: "",
    correctInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit({ ...formData, member: memberId });
      setIsSuccess(true);
    } catch (error) {
      alert("দুঃখিত, তথ্য জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-background rounded-xl p-8 max-w-md w-full text-center">
          <div className="size-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">ধন্যবাদ!</h2>
          <p className="text-muted-foreground mb-6">
            আপনার সংশোধনী অনুরোধটি সফলভাবে জমা হয়েছে। অ্যাডমিন এটি যাচাই করে আপডেট করবেন।
          </p>
          <Button onClick={onClose} className="w-full">বন্ধ করুন</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-background rounded-xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-primary text-primary-foreground flex justify-between items-center">
          <h2 className="text-xl font-bold font-serif">তথ্য সংশোধন করুন</h2>
          <button onClick={onClose} className="hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          <div className="bg-muted p-3 rounded text-sm mb-4">
            <p className="font-semibold">সদস্যের নাম: {memberName}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="submittedBy">আপনার নাম *</Label>
              <Input 
                id="submittedBy" 
                required 
                value={formData.submittedBy}
                onChange={(e) => setFormData({...formData, submittedBy: e.target.value})}
                placeholder="নাম লিখুন"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">আপনার ফোন নম্বর *</Label>
              <Input 
                id="phone" 
                required 
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="01XXXXXXXXX"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wrongInfo">ভুল তথ্যটি লিখুন</Label>
            <Textarea 
              id="wrongInfo" 
              rows={2}
              value={formData.wrongInfo}
              onChange={(e) => setFormData({...formData, wrongInfo: e.target.value})}
              placeholder="বর্তমানে কি ভুল আছে লিখুন"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="correctInfo">সঠিক তথ্যটি লিখুন *</Label>
            <Textarea 
              id="correctInfo" 
              required 
              rows={3}
              value={formData.correctInfo}
              onChange={(e) => setFormData({...formData, correctInfo: e.target.value})}
              placeholder="সঠিক তথ্য কি হবে লিখুন"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">বাতিল</Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "জমা হচ্ছে..." : "জমা দিন"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
