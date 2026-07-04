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
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden">
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

      {/* Decorative Elements — desktop only */}
      <div className="absolute top-1/4 left-8 hidden h-32 w-px bg-gradient-to-b from-transparent via-sindhu-gold/30 to-transparent md:block md:left-16" />
      <div className="absolute top-1/4 right-8 hidden h-32 w-px bg-gradient-to-b from-transparent via-sindhu-gold/30 to-transparent md:block md:right-16" />

      {/* Content */}
      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
          paddingBottom: "max(6rem, env(safe-area-inset-bottom))",
        }}
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 text-center sm:px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-4 text-[10px] font-light tracking-[0.25em] text-sindhu-gold sm:mb-6 sm:text-xs sm:tracking-[0.4em] md:text-sm"
        >
          FINE DINING · INDIAN CUISINE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-5xl font-light leading-none tracking-wide text-sindhu-cream sm:text-6xl md:text-8xl lg:text-9xl"
        >
          SINDHU
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="my-6 h-px w-20 bg-gradient-to-r from-transparent via-sindhu-gold to-transparent sm:my-8 sm:w-24"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-xs text-sm font-light leading-relaxed text-sindhu-cream/70 sm:max-w-md sm:text-base md:text-lg"
        >
          Where ancient flavors dance with modern artistry,
          creating an unforgettable culinary journey
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <a
            href="#reserve"
            className="bg-sindhu-gold px-8 py-4 text-center text-xs font-medium tracking-widest text-sindhu-charcoal transition-all active:bg-sindhu-gold-light sm:px-10 md:hover:bg-sindhu-gold-light"
          >
            RESERVE YOUR TABLE
          </a>
          <a
            href="#menu"
            className="border border-sindhu-cream/20 px-8 py-4 text-center text-xs font-medium tracking-widest text-sindhu-cream transition-all active:border-sindhu-gold active:text-sindhu-gold sm:px-10 md:hover:border-sindhu-gold md:hover:text-sindhu-gold"
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
        className="absolute left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        style={{ bottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
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
