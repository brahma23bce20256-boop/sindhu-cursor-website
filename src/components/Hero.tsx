"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&q=80"
          alt="Sindhu Restaurant Interior"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-sindhu-charcoal/60 via-sindhu-charcoal/40 to-sindhu-charcoal" />
        <div className="absolute inset-0 bg-gradient-to-r from-sindhu-charcoal/80 via-transparent to-sindhu-charcoal/80" />
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-8 h-32 w-px bg-gradient-to-b from-transparent via-sindhu-gold/30 to-transparent md:left-16" />
      <div className="absolute top-1/4 right-8 h-32 w-px bg-gradient-to-b from-transparent via-sindhu-gold/30 to-transparent md:right-16" />

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-6 text-xs font-light tracking-[0.4em] text-sindhu-gold md:text-sm"
        >
          FINE DINING · INDIAN CUISINE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-6xl font-light leading-none tracking-wide text-sindhu-cream md:text-8xl lg:text-9xl"
        >
          SINDHU
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-8 h-px w-24 bg-gradient-to-r from-transparent via-sindhu-gold to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-md text-base font-light leading-relaxed text-sindhu-cream/70 md:text-lg"
        >
          Where ancient flavors dance with modern artistry,
          creating an unforgettable culinary journey
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#reserve"
            className="group relative overflow-hidden bg-sindhu-gold px-10 py-4 text-xs font-medium tracking-widest text-sindhu-charcoal transition-all hover:bg-sindhu-gold-light"
          >
            <span className="relative z-10">RESERVE YOUR TABLE</span>
          </a>
          <a
            href="#menu"
            className="border border-sindhu-cream/20 px-10 py-4 text-xs font-medium tracking-widest text-sindhu-cream transition-all hover:border-sindhu-gold hover:text-sindhu-gold"
          >
            EXPLORE MENU
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] text-sindhu-cream/40">SCROLL</span>
          <ChevronDown size={16} className="text-sindhu-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
