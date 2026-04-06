"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiMedia } from "@/lib/utils";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

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
  isAnonymous?: boolean;
  facebookUrl?: string;
  linkedinUrl?: string;
}

export function DonorCard({ name, designation, location, amount, image, message, rank, isAnonymous, facebookUrl, linkedinUrl }: DonorCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const finalName = isAnonymous ? "একজন শুভানুধ্যায়ী" : name;
  const finalDesignation = isAnonymous ? "দাতা" : (designation || "দাতা");
  const finalImage = isAnonymous ? null : image;
  const imageUrl = getStrapiMedia(finalImage?.url || null);
  const socialLink = isAnonymous ? null : (linkedinUrl || facebookUrl || null);
  
  const rankBadge = rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : null;

  return (
    <>
      <Card className="overflow-hidden rounded-[2rem] shadow-sm border-primary/20 bg-[#f8faf9] relative min-h-[320px] transition-all hover:shadow-md">
        {rankBadge && (
          <div className="absolute top-4 right-4 text-3xl z-10 drop-shadow-md">
            {rankBadge}
          </div>
        )}
        <CardContent className="p-8 flex flex-col items-center">
          {/* Image Frame Container */}
          <div 
            className="group relative w-full aspect-[4/5] max-w-[200px] mb-6 bg-white p-2 shadow-[0_4px_10px_rgba(0,0,0,0.1)] border border-gray-200 cursor-zoom-in overflow-hidden"
            onClick={() => setIsOpen(true)}
          >
            <div className="relative w-full h-full border-2 border-primary/60 overflow-hidden bg-muted">
              {imageUrl ? (
                <>
                  <Image
                    src={imageUrl}
                    alt={finalImage?.alternativeText || finalName}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-8 h-8 text-white scale-75 group-hover:scale-100 transition-transform" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground/30 bg-muted/50">
                  {finalName ? finalName[0] : "?"}
                </div>
              )}
            </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center space-y-1">
            <h4 className="text-xl font-bold font-serif text-primary">
              {finalDesignation}
            </h4>
            {socialLink ? (
              <a 
                href={socialLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block group/link"
              >
                <h3 className="text-lg font-medium font-serif text-gray-700 group-hover/link:text-primary transition-colors cursor-pointer">
                  {finalName}
                </h3>
              </a>
            ) : (
              <h3 className="text-lg font-medium font-serif text-gray-700">
                {finalName}
              </h3>
            )}
            
            <div className="mt-4 pt-2 border-t border-primary/10">
              <span className="text-md font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">
                {toBnNumber(amount)} টাকা
              </span>
            </div>

            {message && !isAnonymous && (
              <p className="text-xs italic text-muted-foreground mt-2 line-clamp-2">
                "{message}"
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Lightbox / Description Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setIsOpen(false)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 z-[2100] bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 aspect-square relative bg-muted">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={finalName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl font-bold text-muted-foreground/20">
                    {finalName[0]}
                  </div>
                )}
              </div>

              {/* Info Side */}
              <div className="w-full md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-white to-primary/5">
                <div className="mb-6">
                  <span className="text-primary font-bold text-lg border-b-2 border-primary/20 pb-1 uppercase tracking-wider">
                    {finalDesignation}
                  </span>
                  {socialLink ? (
                    <a href={socialLink} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                      <h2 className="text-4xl font-serif font-bold text-gray-800 mt-4">
                        {finalName}
                      </h2>
                    </a>
                  ) : (
                    <h2 className="text-4xl font-serif font-bold text-gray-800 mt-4">
                      {finalName}
                    </h2>
                  )}
                  <div className="mt-4 text-2xl font-bold text-primary">
                    {toBnNumber(amount)} টাকা
                  </div>
                </div>

                {message && !isAnonymous && (
                  <div className="relative mt-8">
                    <div className="absolute -top-4 -left-6 text-6xl text-primary/10 font-serif">"</div>
                    <p className="text-xl italic text-gray-600 font-serif leading-relaxed relative z-10 pl-2">
                      {message}
                    </p>
                    <div className="absolute -bottom-10 -right-2 text-6xl text-primary/10 font-serif">"</div>
                  </div>
                )}
                
                {!message && !isAnonymous && (
                  <p className="text-gray-400 italic mt-8">আমাদের বনভোজন ২০২৬-এ আপনার অবদানের জন্য ধন্যবাদ।</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
