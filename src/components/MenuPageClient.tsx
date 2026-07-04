"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Reveal from "./Reveal";
import type { MenuCategory } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";

const tagLabels: Record<string, string> = {
  vegetarian: "Veg",
  spicy: "Spicy",
  bestseller: "Popular",
};

interface MenuPageClientProps {
  categories: MenuCategory[];
}

export default function MenuPageClient({ categories }: MenuPageClientProps) {
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? "");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) {
          setActiveCategory(visible.target.id.replace("menu-", ""));
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5] }
    );

    categories.forEach((cat) => {
      const el = sectionRefs.current[cat.id];
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Sticky category nav — mobile-first */}
      <div
        className="sticky z-30 border-b border-white/5 bg-sindhu-charcoal/95 backdrop-blur-xl"
        style={{ top: "calc(4rem + env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-3 scrollbar-none sm:px-6 md:px-12 md:justify-center md:gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollToCategory(cat.id)}
              className={`shrink-0 px-4 py-2.5 text-[10px] tracking-widest transition-colors sm:text-xs ${
                activeCategory === cat.id
                  ? "bg-sindhu-gold text-sindhu-charcoal"
                  : "text-sindhu-cream/60 active:text-sindhu-gold md:hover:text-sindhu-gold"
              }`}
            >
              {cat.title.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="section-padding !pt-8">
        <div className="mx-auto max-w-7xl">
          {categories.map((category, catIndex) => (
            <section
              key={category.id}
              id={`menu-${category.id}`}
              ref={(el) => {
                sectionRefs.current[category.id] = el;
              }}
              className="scroll-mt-36 mb-16 md:mb-24"
            >
              <Reveal delay={catIndex * 0.05}>
                <div className="mb-8 flex items-end justify-between border-b border-white/10 pb-4 md:mb-10 md:pb-6">
                  <div>
                    <h2 className="font-display text-2xl font-light text-sindhu-cream md:text-4xl">
                      {category.title}
                    </h2>
                    <p className="mt-1 text-xs tracking-widest text-sindhu-gold/60">
                      {category.subtitle}
                    </p>
                  </div>
                  <span className="font-display text-4xl font-light text-white/5 md:text-5xl">
                    0{catIndex + 1}
                  </span>
                </div>
              </Reveal>

              <div className="grid gap-4 md:gap-1">
                {category.items.map((item, itemIndex) => (
                  <Reveal key={item.id} delay={itemIndex * 0.03}>
                    <div className="group glass-card p-4 md:border-0 md:bg-transparent md:p-0 md:py-6 md:transition-colors md:hover:border-sindhu-gold/20 md:border-b md:border-white/5">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-start justify-between gap-2 md:block">
                            <h3 className="font-display text-lg font-light text-sindhu-cream md:text-2xl md:group-hover:text-sindhu-gold">
                              {item.name}
                            </h3>
                            <span className="shrink-0 font-display text-base text-sindhu-gold md:hidden">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm font-light leading-relaxed text-sindhu-cream/40">
                            {item.description}
                          </p>
                          {item.tags && item.tags.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {item.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="border border-sindhu-gold/20 px-2 py-0.5 text-[9px] tracking-widest text-sindhu-gold/70"
                                >
                                  {tagLabels[tag] ?? tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="hidden items-center gap-4 md:flex">
                          <div className="h-px w-12 bg-sindhu-gold/20 transition-all group-hover:w-20 group-hover:bg-sindhu-gold/40" />
                          <span className="font-display text-lg text-sindhu-gold">
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>
          ))}

          <Reveal>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/order"
                className="min-h-[48px] bg-sindhu-gold px-10 py-4 text-center text-xs font-medium tracking-widest text-sindhu-charcoal active:bg-sindhu-gold-light md:hover:bg-sindhu-gold-light"
              >
                ORDER ONLINE
              </Link>
              <Link
                href="/#reserve"
                className="min-h-[48px] border border-sindhu-gold/30 px-10 py-4 text-center text-xs tracking-widest text-sindhu-gold active:bg-sindhu-gold active:text-sindhu-charcoal md:hover:bg-sindhu-gold md:hover:text-sindhu-charcoal"
              >
                RESERVE A TABLE
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
