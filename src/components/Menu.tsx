"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import type { MenuCategory } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";

interface MenuProps {
  categories: MenuCategory[];
}

export default function Menu({ categories }: MenuProps) {
  return (
    <section id="menu" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sindhu-smoke/50 to-transparent" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 text-center md:mb-20">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-gold">CULINARY COLLECTION</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
              Our <span className="gold-gradient-text">Menu</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-sm font-light text-sindhu-cream/50">
              Each dish is crafted with premium ingredients sourced from local farms
              and authentic spices from the subcontinent
            </p>
          </Reveal>
        </div>

        <div className="grid gap-12 md:gap-24">
          {categories.map((category, catIndex) => (
            <div key={category.id}>
              <Reveal delay={catIndex * 0.1}>
                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4 md:mb-10 md:pb-6">
                  <div className="min-w-0 flex-1 pr-4">
                    <h3 className="font-display text-2xl font-light text-sindhu-cream md:text-4xl">
                      {category.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-widest text-sindhu-gold/60">{category.subtitle}</p>
                  </div>
                  <span className="shrink-0 font-display text-4xl font-light text-white/5 md:text-5xl">
                    0{catIndex + 1}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-1">
                {category.items.map((item, itemIndex) => (
                  <Reveal key={item.id} delay={itemIndex * 0.05}>
                    <div className="group flex flex-col gap-1 border-b border-white/5 py-5 transition-colors active:border-sindhu-gold/20 md:flex-row md:items-center md:justify-between md:gap-0 md:py-6 md:hover:border-sindhu-gold/20">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3 md:block">
                          <h4 className="font-display text-lg font-light text-sindhu-cream md:text-2xl md:transition-colors md:group-hover:text-sindhu-gold">
                            {item.name}
                          </h4>
                          <span className="shrink-0 font-display text-base text-sindhu-gold md:hidden">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm font-light leading-relaxed text-sindhu-cream/40">
                          {item.description}
                        </p>
                      </div>
                      <div className="ml-0 hidden items-center gap-4 md:ml-8 md:flex">
                        <div className="hidden h-px w-12 bg-sindhu-gold/20 transition-all group-hover:w-20 group-hover:bg-sindhu-gold/40 sm:block" />
                        <span className="font-display text-lg text-sindhu-gold">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 flex flex-col gap-3 sm:mt-20 sm:flex-row sm:justify-center">
            <Link
              href="/menu"
              className="inline-block w-full border border-sindhu-gold/30 px-10 py-4 text-center text-xs tracking-widest text-sindhu-gold transition-all active:bg-sindhu-gold active:text-sindhu-charcoal sm:w-auto md:hover:bg-sindhu-gold md:hover:text-sindhu-charcoal"
            >
              VIEW FULL MENU
            </Link>
            <Link
              href="/order"
              className="inline-block w-full bg-sindhu-gold px-10 py-4 text-center text-xs font-medium tracking-widest text-sindhu-charcoal active:bg-sindhu-gold-light sm:w-auto md:hover:bg-sindhu-gold-light"
            >
              ORDER ONLINE
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
