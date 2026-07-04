"use client";

import Link from "next/link";
import { ArrowRight, Flame, Leaf, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import type { MenuCategory } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";

interface OrderPromoProps {
  categories: MenuCategory[];
}

export default function OrderPromo({ categories }: OrderPromoProps) {
  const biryaniCategory = categories.find((c) => c.id === "biryanis");
  const highlights = biryaniCategory?.items.filter((i) => i.tags?.includes("bestseller")).slice(0, 3) ?? [];

  return (
    <section id="menu" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-sindhu-maroon/10 via-transparent to-sindhu-smoke/40" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 text-center md:mb-14">
          <Reveal>
            <p className="mb-3 text-xs tracking-[0.35em] text-sindhu-saffron">
              ONE BIRYANI · NOW A FULL MENU
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
              Biryani First.{" "}
              <span className="gold-gradient-text">Everything Else Next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-5 max-w-lg text-sm font-light leading-relaxed text-sindhu-cream/55">
              We began with a single biryani that VIT-AP students couldn&apos;t stop
              ordering. Today — biryanis, starters, pure veg, and more. All on one
              order page.
            </p>
          </Reveal>
        </div>

        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          {[
            { icon: Flame, label: "Signature Biryanis", sub: "Our roots" },
            { icon: Leaf, label: "Veg Options", sub: "Paneer & more" },
            { icon: Sparkles, label: "Student Prices", sub: "From ₹99" },
          ].map(({ icon: Icon, label, sub }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="glass-card flex items-center gap-4 p-4 md:p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sindhu-gold/15 text-sindhu-gold">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-sindhu-cream">{label}</p>
                  <p className="text-xs text-sindhu-cream/40">{sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {highlights.length > 0 && (
          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06}>
                <div className="border border-sindhu-gold/15 bg-sindhu-smoke/60 p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display text-lg text-sindhu-cream">{item.name}</h3>
                    <span className="shrink-0 rounded-full bg-sindhu-gold/20 px-2 py-0.5 text-xs font-medium text-sindhu-gold">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-sindhu-cream/45">
                    {item.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal>
          <div className="flex flex-col items-center gap-4">
            <Link
              href="/order"
              className="animate-pulse-glow flex w-full max-w-md min-h-[52px] items-center justify-center gap-2 bg-sindhu-gold px-8 py-4 text-sm font-semibold tracking-wide text-sindhu-charcoal active:bg-sindhu-gold-light md:hover:bg-sindhu-gold-light"
            >
              BROWSE MENU & ORDER
              <ArrowRight size={16} />
            </Link>
            <p className="text-center text-[11px] tracking-wide text-sindhu-cream/35">
              Delivery to VIT-AP · Mandadam · Amaravati
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
