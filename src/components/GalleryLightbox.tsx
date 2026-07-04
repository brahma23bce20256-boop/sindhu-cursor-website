"use client";

import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import type { GalleryImage } from "@/lib/cms/types";

interface GalleryLightboxProps {
  images: GalleryImage[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  activeIndex,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const isOpen = activeIndex !== null;
  const current = activeIndex !== null ? images[activeIndex] : null;

  const goPrev = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  }, [activeIndex, images.length, onNavigate]);

  const goNext = useCallback(() => {
    if (activeIndex === null) return;
    onNavigate(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  }, [activeIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, onClose, goPrev, goNext]);

  const touchStartX = useRef(0);

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col bg-sindhu-charcoal/98 backdrop-blur-xl"
          style={{
            paddingTop: "env(safe-area-inset-top)",
            paddingBottom: "env(safe-area-inset-bottom)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <span className="text-xs tracking-widest text-sindhu-cream/50">
              {(activeIndex ?? 0) + 1} / {images.length}
            </span>
            <button
              onClick={onClose}
              className="touch-target flex items-center justify-center text-sindhu-cream"
              aria-label="Close gallery"
            >
              <X size={24} />
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center justify-center px-4"
            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const diff = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(diff) > 50) {
                if (diff > 0) goPrev();
                else goNext();
              }
            }}
          >
            <button
              onClick={goPrev}
              className="absolute left-2 z-10 hidden touch-target items-center justify-center rounded-full border border-white/10 text-sindhu-cream md:flex"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>

            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative h-[50vh] w-full max-w-4xl md:h-[70vh]"
            >
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </motion.div>

            <button
              onClick={goNext}
              className="absolute right-2 z-10 hidden touch-target items-center justify-center rounded-full border border-white/10 text-sindhu-cream md:flex"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="px-4 py-4 text-center">
            <p className="font-display text-lg text-sindhu-cream md:text-xl">
              {current.caption ?? current.alt}
            </p>
            <p className="mt-3 text-[10px] tracking-widest text-sindhu-cream/30 md:hidden">
              SWIPE TO NAVIGATE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
