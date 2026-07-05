"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import GalleryLightbox from "./GalleryLightbox";
import type { GalleryImage } from "@/lib/cms/types";

interface GalleryProps {
  images: GalleryImage[];
}

function GalleryItem({
  image,
  index,
  onOpen,
}: {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.button
      ref={ref}
      type="button"
      style={{ scale, opacity }}
      onClick={() => onOpen(index)}
      className={`${image.span} group relative min-h-[160px] overflow-hidden rounded-sm text-left md:min-h-0 md:rounded-none`}
      aria-label={`View ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        className="object-cover transition-transform duration-700 md:group-hover:scale-105"
        sizes="(max-width: 768px) 50vw, 25vw"
      />
      <div className="absolute inset-0 bg-white/0 transition-colors duration-500 md:group-hover:bg-sindhu-text/10" />
      <div className="absolute inset-0 flex items-center justify-center bg-sindhu-text/5 opacity-100 md:bg-transparent md:opacity-0 md:group-hover:opacity-100 md:transition-opacity md:duration-500">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sindhu-terracotta/50 md:h-12 md:w-12">
          <span className="text-base text-sindhu-terracotta md:text-lg">+</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-terracotta">VISUAL FEAST</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-text md:text-6xl">
              Gallery
            </h2>
          </Reveal>
        </div>

        <div className="grid auto-rows-[minmax(160px,1fr)] grid-cols-2 gap-2 sm:gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
          {images.map((image, i) => (
            <GalleryItem
              key={image.id}
              image={image}
              index={i}
              onOpen={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      <GalleryLightbox
        images={images}
        activeIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
