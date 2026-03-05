"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "ঐতিহ্য ও ভ্রাতৃত্বের বন্ধন",
    subtitle: "পরিচয় ও উদ্দেশ্য (Definition)",
    desc: "ঢাকাস্থ দেবহাটা উপজেলা সমিতি একটি অলাভজনক সামাজিক সংগঠন, যার মূল কাজ হলো ঢাকাস্থ দেবহাটা প্রবাসীদের মধ্যে ভ্রাতৃত্বের বন্ধন সুদৃঢ় করা এবং পারস্পরিক সহযোগিতা বৃদ্ধি করা।",
    image: "https://images.unsplash.com/photo-1584974232704-514467d9341b?auto=format&fit=crop&q=80&w=2000",
    cta: "বিস্তারিত জানুন",
    href: "/about"
  },
  {
    title: "সেবা ও কল্যাণমূলক কার্যক্রম",
    subtitle: "আমাদের কর্মপদ্ধতি (How it Works)",
    desc: "আমরা নিয়মিত সভা, সেমিনার এবং মিলনমেলার মাধ্যমে সদস্যদের অভাব-অভিযোগ শুনি এবং সেই অনুযায়ী শিক্ষা, চিকিৎসা ও জরুরি প্রয়োজনে দ্রুত সহায়তা প্রদান করি।",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    cta: "কার্যক্রম দেখুন",
    href: "/events"
  },
  {
    title: "একটি সমৃদ্ধ দেবহাটা পরিবার",
    subtitle: "আমাদের মূল লক্ষ্য (Goal)",
    desc: "আমাদের প্রধান লক্ষ্য হলো প্রতিটি ঢাকাস্থ দেবহাটা পরিবারকে একটি শক্তশালী সামাজিক নেটওয়ার্কের আওতায় আনা এবং সকলের সম্মিলিত প্রচেষ্টায় দেবহাটার উন্নয়ন নিশ্চিত করা।",
    image: "https://images.unsplash.com/photo-1551288049-bbbda536639a?auto=format&fit=crop&q=80&w=2000",
    cta: "সদস্য হোন",
    href: "/directory"
  },
  {
    title: "সেবার অনন্য উদাহরণ",
    subtitle: "বাস্তব উদাহরণ (Examples)",
    desc: "গত এক বছরে আমরা ২০ জন রোগীকে চিকিৎসা সহায়তা দিয়েছি, ৫০ জন মেধাবী শিক্ষার্থীকে বৃত্তি প্রদান করেছি এবং একটি সফল পিকনিক ও দোয়া মাহফিল আয়োজন করেছি।",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2000",
    cta: "গ্যালারি দেখুন",
    href: "/gallery"
  }
];

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, 6000);

    return () => clearInterval(intervalId);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full overflow-hidden h-[90vh]">
      <div className="overflow-hidden h-full" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0 h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover brightness-[0.35]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-black/20" />
              
              <div className="container relative h-full flex items-center z-20">
                <AnimatePresence mode="wait">
                  {selectedIndex === index && (
                    <div className="max-w-4xl space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                      >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/20 text-secondary text-sm font-bold tracking-widest uppercase mb-4 backdrop-blur-md border border-secondary/30">
                          {slide.subtitle}
                        </span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-tight drop-shadow-2xl">
                          {slide.title}
                        </h1>
                      </motion.div>
                      
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="text-lg md:text-2xl text-white/80 max-w-2xl font-light leading-relaxed font-serif italic"
                      >
                        {slide.desc}
                      </motion.p>
                      
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="flex gap-4 pt-6"
                      >
                        <Button size="lg" className="h-14 px-8 text-lg font-bold bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full shadow-lg" asChild>
                          <Link href={slide.href}>{slide.cta}</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white/30 text-white hover:bg-white/10 rounded-full backdrop-blur-sm" asChild>
                          <Link href="/directory">সদস্য তালিকা</Link>
                        </Button>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Controls */}
      <button 
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-secondary hover:text-secondary-foreground transition-all z-30"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 size-12 rounded-full bg-white/10 text-white flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-secondary hover:text-secondary-foreground transition-all z-30"
      >
        <ChevronRight size={24} />
      </button>

      {/* Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => emblaApi?.scrollTo(idx)}
            className={`size-2.5 rounded-full transition-all ${selectedIndex === idx ? "bg-secondary w-8" : "bg-white/40 hover:bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
