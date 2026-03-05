"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface Member {
  id: number;
  name: string;
  fatherName?: string;
  union: string;
  phone?: string;
  serialNumber?: string;
  isVerified: boolean;
  role?: string;
  location?: string;
}

export function MemberCard({ member, onCorrect }: { member: Member; onCorrect: (id: number) => void }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg border shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden">
      {member.isVerified && (
        <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-bl font-bold uppercase">
          Verified
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xl font-bold text-primary leading-tight font-serif">
            {member.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            সিরিয়াল নং: {member.serialNumber || "N/A"}
          </p>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        {member.fatherName && (
          <p>
            <span className="font-semibold">পিতা/স্বামী:</span> {member.fatherName}
          </p>
        )}
        <p>
          <span className="font-semibold">ইউনিয়ন:</span> {member.union}
        </p>
        {member.location && (
          <p>
            <span className="font-semibold">বাসস্থান:</span> {member.location}
          </p>
        )}
        {member.role && (
          <p className="inline-block bg-secondary text-secondary-foreground px-2 py-0.5 rounded text-[12px] font-medium mt-1">
            {member.role}
          </p>
        )}
      </div>

      <div className="mt-5 pt-4 border-t flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 text-xs border-primary text-primary hover:bg-primary hover:text-white"
          onClick={() => onCorrect(member.id)}
        >
          সংশোধন করুন
        </Button>
        {member.phone && (
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1 text-xs"
            asChild
          >
            <a href={`tel:${member.phone}`}>কল করুন</a>
          </Button>
        )}
      </div>
    </div>
  );
}
