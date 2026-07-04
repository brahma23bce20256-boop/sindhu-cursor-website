"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const galleryImages = [
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80", alt: "Biryani dish", span: "col-span-2 row-span-1 md:col-span-2 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&q=80", alt: "Indian curry", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80", alt: "Naan bread", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80", alt: "Tandoori chicken", span: "col-span-1 row-span-1 md:row-span-2" },
  { src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80", alt: "Spices", span: "col-span-1 row-span-1" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80", alt: "Gourmet plating", span: "col-span-2 row-span-1" },
];

function GalleryItem({ image, index }: { image: (typeof galleryImages)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={`${image.span} group relative min-h-[160px] overflow-hidden rounded-sm md:min-h-0 md:rounded-none`}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="h-full w-full object-cover transition-transform duration-700 md:group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-sindhu-charcoal/0 transition-colors duration-500 md:group-hover:bg-sindhu-charcoal/30" />
      <div className="absolute inset-0 hidden items-center justify-center opacity-0 transition-opacity duration-500 md:flex md:group-hover:opacity-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-sindhu-gold/50">
          <span className="text-lg text-sindhu-gold">+</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-16">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-gold">VISUAL FEAST</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
              Gallery
            </h2>
          </Reveal>
        </div>

        <div className="grid auto-rows-[minmax(160px,1fr)] grid-cols-2 gap-2 sm:gap-3 md:auto-rows-[250px] md:grid-cols-4 md:gap-4">
          {galleryImages.map((image, i) => (
            <GalleryItem key={image.alt} image={image} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
