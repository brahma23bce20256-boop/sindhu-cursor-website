"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import OrderPromo from "@/components/OrderPromo";
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
  const text = "BIRYANI LOVERS · VIT-AP · MANDADAM · AMARAVATI · PURE VEG TOO · ";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={ref} className="overflow-hidden border-y border-sindhu-gold/10 bg-sindhu-maroon/20 py-4 md:py-5">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="mx-4 font-display text-lg font-light tracking-[0.15em] text-sindhu-gold/30 sm:mx-8 sm:text-2xl md:text-4xl"
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
      quote: "Best biryani near VIT-AP! We order every Friday after labs — always hot, always loaded with flavour.",
      author: "Rahul K.",
      role: "CSE, VIT-AP · 3rd Year",
    },
    {
      quote: "Started with their chicken biryani, now I'm hooked on paneer 65 too. Mandadam delivery is super quick.",
      author: "Sneha M.",
      role: "Amaravati Resident",
    },
  ];

  return (
    <section className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <p className="mb-8 text-center text-xs tracking-[0.35em] text-sindhu-saffron">
          WHAT STUDENTS SAY
        </p>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="glass-card border-sindhu-gold/10 p-6 sm:p-8"
            >
              <div className="mb-4 font-display text-4xl text-sindhu-gold/25">&ldquo;</div>
              <p className="text-base font-light leading-relaxed text-sindhu-cream/80 md:text-lg">
                {t.quote}
              </p>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-medium text-sindhu-gold">{t.author}</p>
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
      <OrderPromo categories={menuCategories} />
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
