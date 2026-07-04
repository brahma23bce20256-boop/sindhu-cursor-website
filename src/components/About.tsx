"use client";

import Reveal from "./Reveal";
import ParallaxImage from "./ParallaxImage";

export default function About() {
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
            <div className="absolute -bottom-8 -right-4 glass-card p-8 md:-right-8">
              <p className="font-display text-4xl font-light text-sindhu-gold">15+</p>
              <p className="mt-1 text-xs tracking-widest text-sindhu-cream/60">YEARS OF EXCELLENCE</p>
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
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              {[
                { number: "50+", label: "Signature Dishes" },
                { number: "4.9", label: "Guest Rating" },
                { number: "3", label: "Award Wins" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl font-light text-sindhu-gold">{stat.number}</p>
                  <p className="mt-1 text-[10px] tracking-widest text-sindhu-cream/40">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
