"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Reveal from "./Reveal";

const experiences = [
  {
    title: "Private Dining",
    description: "An intimate setting for celebrations and business gatherings, with personalized menus curated by our executive chef.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
  },
  {
    title: "Chef's Table",
    description: "Witness culinary artistry up close. A multi-course tasting journey with wine pairings in our open kitchen.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd4c7ccaa?w=800&q=80",
  },
];

function ExperienceCard({
  experience,
  index,
}: {
  experience: (typeof experiences)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y: index % 2 === 0 ? y : undefined, scale }}
      className="group relative overflow-hidden"
    >
      <div className="relative aspect-[4/5] overflow-hidden md:aspect-[3/4]">
        <img
          src={experience.image}
          alt={experience.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        <div className="absolute inset-0 bg-sindhu-terracotta/0 transition-colors duration-500 group-hover:bg-sindhu-terracotta/10" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
        <p className="mb-2 text-[10px] tracking-[0.3em] text-sindhu-terracotta">0{index + 1}</p>
        <h3 className="font-display text-xl font-light text-sindhu-text md:text-3xl">
          {experience.title}
        </h3>
        <p className="mt-2 text-sm font-light leading-relaxed text-sindhu-text-light md:mt-3 md:max-h-0 md:overflow-hidden md:transition-all md:duration-500 md:group-hover:max-h-24">
          {experience.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end md:gap-8">
          <div>
            <Reveal>
              <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-terracotta">BEYOND DINING</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl font-light text-sindhu-text md:text-6xl">
                The Sindhu
                <span className="gold-gradient-text block">Experience</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-sm text-sm font-light leading-relaxed text-sindhu-text/50">
              More than a meal — an immersive journey through culture, flavor, and hospitality
            </p>
          </Reveal>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 md:gap-12">
          {experiences.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.15}>
              <ExperienceCard experience={exp} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
