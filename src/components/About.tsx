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
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        <div className="relative">
          <Reveal direction="left">
            <div className="relative aspect-[4/5] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80"
                alt="Chef preparing dishes"
                className="h-full w-full"
                speed={0.2}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sindhu-charcoal/40 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 w-fit glass-card p-6 md:absolute md:-bottom-8 md:-right-8 md:mt-0 md:p-8">
              <p className="font-display text-3xl font-light text-sindhu-gold md:text-4xl">{stats.years}</p>
              <p className="mt-1 text-[10px] tracking-widest text-sindhu-cream/60">YEARS OF EXCELLENCE</p>
            </div>
          </Reveal>
        </div>

        <div className="lg:pl-8">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-gold">OUR STORY</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light leading-tight text-sindhu-cream md:text-5xl lg:text-6xl">
              A Legacy of
              <span className="gold-gradient-text block">Culinary Art</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="ornament-line my-8" />
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mb-6 text-base font-light leading-relaxed text-sindhu-cream/60">
              Named after the sacred river that nourished ancient civilizations, Sindhu
              embodies the flow of tradition through generations of masterful cooking.
              Our kitchen is a canvas where time-honored recipes meet contemporary
              techniques.
            </p>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mb-10 text-base font-light leading-relaxed text-sindhu-cream/60">
              Every dish tells a story — of spice routes and royal kitchens, of family
              gatherings and festive celebrations. We invite you to become part of
              this continuing narrative.
            </p>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 sm:gap-8 sm:pt-8">
              {[
                { number: stats.dishes, label: "Signature Dishes" },
                { number: stats.rating, label: "Guest Rating" },
                { number: stats.awards, label: "Award Wins" },
              ].map((stat) => (
                <div key={stat.label} className="text-center sm:text-left">
                  <p className="font-display text-2xl font-light text-sindhu-gold sm:text-3xl">{stat.number}</p>
                  <p className="mt-1 text-[9px] leading-tight tracking-widest text-sindhu-cream/40 sm:text-[10px]">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
