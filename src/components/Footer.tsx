"use client";

import Reveal from "./Reveal";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-sindhu-smoke/50">
      <div className="section-padding !py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
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
                <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-sindhu-cream/40">
                  Where every meal is a celebration of heritage, crafted with passion
                  and served with warmth. Experience the finest Indian cuisine.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-6 flex gap-4">
                  {[Instagram, Facebook, Twitter].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-sindhu-cream/40 transition-all hover:border-sindhu-gold hover:text-sindhu-gold"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h4 className="mb-6 text-xs tracking-widest text-sindhu-gold">QUICK LINKS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-3">
                  {["About", "Menu", "Experience", "Gallery", "Reservations"].map((link) => (
                    <li key={link}>
                      <a
                        href={`#${link.toLowerCase()}`}
                        className="text-sm font-light text-sindhu-cream/40 transition-colors hover:text-sindhu-gold"
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
                <h4 className="mb-6 text-xs tracking-widest text-sindhu-gold">HOURS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-3 text-sm font-light text-sindhu-cream/40">
                  <li>Monday — Closed</li>
                  <li>Tuesday – Thursday</li>
                  <li className="text-sindhu-cream/60">5:00 PM – 10:00 PM</li>
                  <li>Friday – Sunday</li>
                  <li className="text-sindhu-cream/60">5:00 PM – 11:00 PM</li>
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
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
