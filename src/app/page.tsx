"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Menu from "@/components/Menu";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Reservations from "@/components/Reservations";
import Footer from "@/components/Footer";

function MarqueeBanner() {
  const text = "AUTHENTIC FLAVORS · PREMIUM INGREDIENTS · UNFORGETTABLE EXPERIENCES · ";
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div ref={ref} className="overflow-hidden border-y border-white/5 bg-sindhu-smoke py-6">
      <motion.div style={{ x }} className="flex whitespace-nowrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 font-display text-3xl font-light tracking-[0.3em] text-sindhu-gold/20 md:text-5xl"
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
        <div className="grid gap-12 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="glass-card p-10"
            >
              <div className="mb-6 font-display text-5xl text-sindhu-gold/30">&ldquo;</div>
              <p className="font-display text-xl font-light italic leading-relaxed text-sindhu-cream/80 md:text-2xl">
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

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <MarqueeBanner />
      <About />
      <Menu />
      <MarqueeBanner />
      <Experience />
      <Gallery />
      <Testimonials />
      <Reservations />
      <Footer />
    </main>
  );
}
