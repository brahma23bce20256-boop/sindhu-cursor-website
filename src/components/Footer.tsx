"use client";

import Link from "next/link";
import Reveal from "./Reveal";
import { Instagram, Facebook, Twitter } from "lucide-react";
import type { SiteSettings } from "@/lib/cms/types";
import { getSiteSettingsSync } from "@/lib/cms";

interface FooterProps {
  site?: SiteSettings;
}

const quickLinks = [
  { label: "About", href: "/#about" },
  { label: "Menu & Order", href: "/order" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Find Us", href: "/#location" },
  { label: "Contact", href: "/#reserve" },
];

export default function Footer({ site: siteProp }: FooterProps) {
  const site = siteProp ?? getSiteSettingsSync();

  const socialLinks = [
    { icon: Instagram, href: site.social.instagram, label: "Instagram" },
    { icon: Facebook, href: site.social.facebook, label: "Facebook" },
    { icon: Twitter, href: site.social.twitter, label: "Twitter" },
  ];

  return (
    <footer
      className="border-t border-sindhu-gold/10 bg-sindhu-smoke/80"
      style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
    >
      <div className="section-padding !py-12 md:!py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-4 md:gap-12">
            <div className="md:col-span-2">
              <Reveal>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sindhu-gold/40 bg-sindhu-gold/10">
                    <span className="font-display text-lg font-semibold text-sindhu-gold">S</span>
                  </div>
                  <span className="font-display text-2xl font-light tracking-[0.15em] text-sindhu-cream">
                    {site.name.toUpperCase()}
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-sindhu-cream/40 md:mt-6">
                  Biryani-first kitchen serving VIT-AP students & Amaravati locals.
                  From one pot to a full menu — always bold, always fresh.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-5 flex gap-3 md:mt-6 md:gap-4">
                  {socialLinks.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
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
                <h4 className="mb-4 text-xs tracking-widest text-sindhu-saffron md:mb-6">QUICK LINKS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-1 md:space-y-3">
                  {quickLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block py-2.5 text-sm font-light text-sindhu-cream/40 transition-colors active:text-sindhu-gold md:py-0 md:hover:text-sindhu-gold"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div>
              <Reveal>
                <h4 className="mb-4 text-xs tracking-widest text-sindhu-saffron md:mb-6">HOURS</h4>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="space-y-2 text-sm font-light text-sindhu-cream/40 md:space-y-3">
                  <li>{site.hours.weekday.days}</li>
                  <li className="text-sindhu-cream/60">{site.hours.weekday.time}</li>
                  <li>{site.hours.weekend.days}</li>
                  <li className="text-sindhu-cream/60">{site.hours.weekend.time}</li>
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-sindhu-gold/10 pt-6 text-center md:mt-16 md:flex-row md:gap-4 md:pt-8 md:text-left">
            <p className="text-xs text-sindhu-cream/30">
              © {new Date().getFullYear()} {site.name}. Near VIT-AP, Amaravati.
            </p>
            <p className="text-xs text-sindhu-cream/30">
              🍛 Biryani · Starters · Veg · More
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
