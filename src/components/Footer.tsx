"use client";

import Reveal from "./Reveal";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer
      className="border-t border-white/5 bg-sindhu-smoke/50"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="section-padding !py-12 md:!py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-2">
              <Reveal>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sindhu-gold/40">
                    <span className="font-display text-lg font-semibold text-sindhu-gold">S</span>
                  </div>
                  <span className="font-display text-2xl font-light tracking-[0.2em] text-sindhu-cream">
                    SINDHU
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-sindhu-cream/40 md:mt-6">
                  Where every meal is a celebration of heritage, crafted with passion
                  and served with warmth. Experience the finest Indian cuisine.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-5 flex gap-3 md:mt-6 md:gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="touch-target flex items-center justify-center rounded-full border border-white/10 text-sindhu-cream/40 transition-all active:border-sindhu-gold active:text-sindhu-gold md:h-10 md:w-10 md:hover:border-sindhu-gold md:hover:text-sindhu-gold"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h4 className="mb-4 text-xs tracking-widest text-sindhu-gold md:mb-6">QUICK LINKS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-1 md:space-y-3">
                  {["About", "Menu", "Experience", "Gallery", "Reservations"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="block py-2.5 text-sm font-light text-sindhu-cream/40 transition-colors active:text-sindhu-gold md:py-0 md:hover:text-sindhu-gold"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h4 className="mb-4 text-xs tracking-widest text-sindhu-gold md:mb-6">HOURS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-2 text-sm font-light text-sindhu-cream/40 md:space-y-3">
                  <li>Monday — Closed</li>
                  <li>Tuesday – Thursday</li>
                  <li className="text-sindhu-cream/60">5:00 PM – 10:00 PM</li>
                  <li>Friday – Sunday</li>
                  <li className="text-sindhu-cream/60">5:00 PM – 11:00 PM</li>
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 text-center md:mt-16 md:flex-row md:gap-4 md:pt-8 md:text-left">
            <p className="text-xs text-sindhu-cream/30">
              © {new Date().getFullYear()} Sindhu Restaurant. All rights reserved.
            </p>
            <p className="text-xs text-sindhu-cream/30">
              Crafted with passion for culinary excellence
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
