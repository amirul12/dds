"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { StrapiImage } from "@/components/custom/strapi-image";
import { CheckCircle, Phone, MapPin, Briefcase, User } from "lucide-react";
import { cn, getStrapiURL } from "@/lib/utils";

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
  presentJob?: string;
  photo?: { url: string; alternativeText?: string };
}

export function MemberCard({ member, onCorrect }: { member: Member; onCorrect: (id: number) => void }) {
  return (
    <div className="group relative bg-card text-card-foreground rounded-2xl border border-border/60 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 overflow-hidden flex flex-col">
      
      {/* Verified badge */}
      {member.isVerified && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] px-2 py-0.5 rounded-full font-bold">
          <CheckCircle className="w-3 h-3" />
          যাচাইকৃত
        </div>
      )}

      {/* Header with photo */}
      <div className="p-5 pb-4 flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-muted border border-border/60 relative">
          {member.photo?.url ? (
            <StrapiImage
              src={member.photo.url}
              alt={member.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <User className="w-8 h-8 text-primary/40" />
            </div>
          )}
        </div>

        {/* Name block */}
        <div className="min-w-0 flex-1 pt-1">
          <h3 className="text-lg font-bold text-primary font-serif leading-tight line-clamp-2">
            {member.name}
          </h3>
          {member.serialNumber && (
            <p className="text-xs text-muted-foreground mt-0.5">সিরিয়াল নং: {member.serialNumber}</p>
          )}
        </div>
      </div>

      {/* Details */}
      <div className="px-5 space-y-2 text-sm flex-1">
        {member.fatherName && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <User className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
            <span><span className="font-semibold text-foreground/80">পিতা: </span>{member.fatherName}</span>
          </div>
        )}

        {member.location && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
            <span>{member.location}{member.union ? `, ${member.union}` : ""}</span>
          </div>
        )}

        {(member.presentJob || member.role) && (
          <div className="flex items-start gap-2 text-muted-foreground">
            <Briefcase className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-slate-400" />
            <span className="line-clamp-2">
              {member.role && <span className="font-medium text-foreground/80">{member.role}</span>}
              {member.role && member.presentJob && " · "}
              {member.presentJob && <span>{member.presentJob}</span>}
            </span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="mt-5 px-5 pb-5 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 text-xs border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
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
            <a href={`tel:${member.phone}`} className="flex items-center gap-1.5">
              <Phone className="w-3 h-3" />
              কল করুন
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
