"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import LocationMap from "@/components/LocationMap";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";
import type { GalleryImage, MenuCategory, SiteSettings } from "@/lib/cms/types";

interface HomePageClientProps {
  site: SiteSettings;
  menuCategories: MenuCategory[];
  galleryImages: GalleryImage[];
}

function MarqueeBanner() {
  const text = "AUTHENTIC FLAVORS · PREMIUM INGREDIENTS · UNFORGETTABLE EXPERIENCES · ";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={ref} className="overflow-hidden border-y border-white/5 bg-sindhu-smoke py-4 md:py-6">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="mx-4 font-display text-xl font-light tracking-[0.2em] text-sindhu-gold/20 sm:mx-8 sm:text-3xl sm:tracking-[0.3em] md:text-5xl"
          >
            {text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: "An extraordinary dining experience. Every dish was a masterpiece of flavor and presentation.",
      author: "Priya Sharma",
      role: "Food Critic, Culinary Times",
    },
    {
      quote: "Sindhu has redefined what Indian fine dining can be. Simply breathtaking.",
      author: "James Morrison",
      role: "Michelin Guide Inspector",
    },
  ];

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 md:gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-card p-6 sm:p-8 md:p-10"
            >
              <div className="mb-4 font-display text-4xl text-sindhu-gold/30 md:mb-6 md:text-5xl">&ldquo;</div>
              <p className="font-display text-lg font-light italic leading-relaxed text-sindhu-cream/80 md:text-2xl">
                {t.quote}
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="text-sm font-medium text-sindhu-cream">{t.author}</p>
                <p className="mt-1 text-xs text-sindhu-cream/40">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomePageClient({
  site,
  menuCategories,
  galleryImages,
}: HomePageClientProps) {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <About stats={site.stats} />
      <Menu categories={menuCategories} />
      <MarqueeBanner />
      <Experience />
      <Gallery images={galleryImages} />
      <Testimonials />
      <LocationMap site={site} />
      <Reservations site={site} />
      <Footer site={site} />
    </main>
  );
}
