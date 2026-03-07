"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function MobileNavbar({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const overflow = isOpen ? "hidden" : "auto";
    document.documentElement.style.overflow = overflow;
  }, [isOpen]);

  useEffect(() => {
    const closeHamburgerNavigation = () => setIsOpen(false);
    window.addEventListener("orientationchange", closeHamburgerNavigation);
    window.addEventListener("resize", closeHamburgerNavigation);

    return () => {
      window.removeEventListener("orientationchange", closeHamburgerNavigation);
      window.removeEventListener("resize", closeHamburgerNavigation);
    };
  }, []);

  const menuOverlay = isOpen && (
    <div
      className="fixed inset-0 z-[999] size-full overflow-hidden bg-black/60 backdrop-blur-md animate-in fade-in duration-300 md:hidden"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="relative z-[1000] w-full pt-28 h-full overflow-auto"
        onClick={() => setIsOpen(false)} // Close menu when any link inside is clicked
        role="button"
        tabIndex={0}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button className="md:hidden relative" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="size-8" /> : <Menu className="size-8" />}
      </button>
      {mounted && createPortal(menuOverlay, document.body)}
    </>
  );
}