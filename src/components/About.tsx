"use client";

import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";
import type { SiteSettings } from "@/lib/cms/types";

interface AboutProps {
  stats: SiteSettings["stats"];
}

export default function About({ stats }: AboutProps) {
  return (
    <section id="about" className="section-padding relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&q=80"
                alt="Sindhu biryani being served"
                className="h-full w-full"
                speed={0.2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sindhu-text/20 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 w-fit border border-sindhu-terracotta/30 bg-white/80 p-5 backdrop-blur-sm md:absolute md:-bottom-8 md:-right-8 md:mt-0 md:p-6">
              <p className="font-display text-2xl font-light text-sindhu-terracotta md:text-3xl">Day 1</p>
              <p className="mt-1 text-[10px] tracking-widest text-sindhu-text-light">ONE BIRYANI. ONE DREAM.</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:pl-8">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.35em] text-sindhu-terracotta">OUR STORY</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light leading-tight text-sindhu-text md:text-5xl lg:text-6xl">
              From One Pot to
              <span className="gold-gradient-text block">Your Campus Favourite</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="ornament-line my-8" />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mb-6 text-base font-light leading-relaxed text-sindhu-text-light">
              Sindhu began near Amaravati with a single biryani recipe — dum-cooked,
              packed with flavour, priced for students. Word spread across VIT-AP hostels
              and Mandadam neighbourhoods faster than we could keep up.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mb-10 text-base font-light leading-relaxed text-sindhu-text-light">
              Today we serve chicken, mutton, egg & veg biryanis plus starters, pure veg
              mains, and sides. Same bold taste, same love — just more ways to order
              your comfort food.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="grid grid-cols-3 gap-4 border-t border-sindhu-border pt-6 sm:gap-8 sm:pt-8">
              {[
                { number: stats.dishes, label: "Menu Items" },
                { number: stats.rating, label: "Student Rating" },
                { number: stats.years, label: "Years Serving" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-display text-2xl font-light text-sindhu-terracotta sm:text-3xl">{stat.number}</p>
                  <p className="mt-1 text-[9px] leading-tight tracking-widest text-sindhu-text-light/70 sm:text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
