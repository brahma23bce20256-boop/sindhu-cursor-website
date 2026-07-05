"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
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
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-sindhu-bg">
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1920&q=80"
          alt="Sindhu Biryani"
          className="h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-sindhu-bg" />
      </motion.div>

      <motion.div
        style={{
          opacity: contentOpacity,
          y: contentY,
          paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
          paddingBottom: "max(6rem, env(safe-area-inset-bottom))",
        }}
        className="relative z-10 flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-24 text-center sm:px-6"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[10px] font-bold tracking-widest text-white backdrop-blur-md sm:text-xs"
        >
          NEAR VIT-AP · MANDADAM · AMARAVATI
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-3 text-[10px] font-bold tracking-[0.3em] text-white/80 sm:text-xs"
        >
          BIRYANI · STARTERS · VEG · MORE
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-yatra text-5xl leading-none tracking-wider text-white sm:text-6xl md:text-8xl lg:text-9xl drop-shadow-md"
        >
          SINDHU
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="my-6 h-px w-20 bg-gradient-to-r from-transparent via-sindhu-terracotta to-transparent sm:my-8 sm:w-24"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="max-w-sm text-sm font-medium leading-relaxed text-white/90 sm:max-w-md sm:text-base drop-shadow-sm"
        >
          Started with one legendary biryani. Now the go-to spot for VIT-AP students
          and Amaravati locals craving real flavour — fast delivery, fair prices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-8 flex w-full max-w-sm flex-col items-stretch gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4"
        >
          <Link
            href="/orders"
            className="rounded-xl bg-sindhu-terracotta px-8 py-4 text-center text-xs font-bold tracking-widest text-white shadow-lg active:bg-[#c9633e] sm:px-10 md:hover:bg-[#c9633e]"
          >
            ORDER BIRYANI NOW
          </Link>
          <a
            href="#about"
            className="rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-8 py-4 text-center text-xs font-bold tracking-widest text-white transition-all active:bg-white/20 sm:px-10 md:hover:bg-white/20"
          >
            OUR STORY
          </a>
        </motion.div>
      </motion.div>

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
          <span className="text-[10px] font-bold tracking-[0.3em] text-sindhu-text-light/50">SCROLL</span>
          <ChevronDown size={16} className="text-sindhu-terracotta/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
