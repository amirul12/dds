import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
const toBnNumber = (n: number | string) => 
  n?.toString().replace(/\d/g, d => bnDigits[parseInt(d)]) || "";

interface DonorCardProps {
  name: string;
  designation?: string;
  location?: string;
  amount: number;
  image?: { url: string; alternativeText?: string };
  message?: string;
  rank?: number;
}

export function DonorCard({ name, designation, location, amount, image, message, rank }: DonorCardProps) {
  const imageUrl = getStrapiMedia(image?.url || null);
  
  const rankBadge = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <Card className="overflow-hidden rounded-xl shadow-md border-primary/10 hover:shadow-lg transition-shadow bg-card relative">
      {rankBadge && (
        <div className="absolute top-4 right-4 text-3xl z-10 drop-shadow-md">
          {rankBadge}
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative size-24 mb-4 rounded-full overflow-hidden ring-4 ring-primary/5 ring-offset-2">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={image?.alternativeText || name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground uppercase">
                {name ? name[0] : "?"}
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-bold font-serif text-primary mb-1">{name}</h3>
          
          {(designation || location) && (
            <p className="text-sm text-muted-foreground mb-3">
              {designation}{designation && location ? ", " : ""}{location}
            </p>
          )}

          <div className="bg-primary/5 px-4 py-2 rounded-full mb-4">
            <span className="text-lg font-bold text-primary">
              {toBnNumber(amount)} টাকা
            </span>
          </div>

          {message && (
            <p className="text-sm italic text-muted-foreground/80 line-clamp-3">
              "{message}"
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
