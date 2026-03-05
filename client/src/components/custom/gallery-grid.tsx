"use client";

import React, { useState } from "react";
import { StrapiImage } from "@/components/custom/strapi-image";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import type { GalleryItem } from "@/types";

export function GalleryGrid({ items }: { items: any[] }) {
  const [selectedImage, setSelectedImage] = useState<any | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card 
              className="overflow-hidden group cursor-zoom-in border-border hover:shadow-2xl transition-all duration-500 rounded-2xl"
              onClick={() => setSelectedImage(item)}
            >
              <div className="relative aspect-square w-full overflow-hidden bg-muted">
                {item.image ? (
                  <>
                    <StrapiImage
                      src={item.image.url}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/20 backdrop-blur-md p-3 rounded-full border border-white/30 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-white font-bold text-lg leading-tight mb-1">
                        {item.title}
                      </h3>
                      {item.date && (
                        <p className="text-white/70 text-sm">
                          {new Date(item.date).toLocaleDateString("bn-BD", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/20 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X className="w-8 h-8 text-white" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full h-full max-w-7xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <StrapiImage
                src={selectedImage.image.url}
                alt={selectedImage.title}
                fill
                className="object-contain drop-shadow-2xl"
              />
              
              {/* Info Overlay in Full Screen */}
              <div className="absolute bottom-0 inset-x-0 p-8 text-center bg-gradient-to-t from-black/60 to-transparent">
                <h2 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h2>
                {selectedImage.date && (
                  <p className="text-white/70">
                    {new Date(selectedImage.date).toLocaleDateString("bn-BD", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
