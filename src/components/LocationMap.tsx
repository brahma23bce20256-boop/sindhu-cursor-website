"use client";

import Reveal from "./Reveal";
import type { SiteSettings } from "@/lib/cms/types";
import { ExternalLink, MapPin } from "lucide-react";

interface LocationMapProps {
  site: SiteSettings;
}

export default function LocationMap({ site }: LocationMapProps) {
  return (
    <section id="location" className="section-padding relative">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center md:mb-12">
          <Reveal>
            <p className="mb-4 text-xs tracking-[0.4em] text-sindhu-terracotta">FIND US</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-4xl font-light text-sindhu-text md:text-6xl">
              Visit <span className="gold-gradient-text">Sindhu</span>
            </h2>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="overflow-hidden border border-white/10">
            <div className="relative aspect-[4/3] w-full md:aspect-[21/9]">
              <iframe
                src={site.maps.embedUrl}
                title={`${site.name} location map`}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-sindhu-gold/20">
                <MapPin size={16} className="text-sindhu-terracotta" />
              </div>
              <div>
                <p className="text-sm font-light text-sindhu-text">
                  {site.contact.address}
                </p>
                <p className="mt-1 text-xs text-sindhu-text-light/70">
                  {site.hours.reservation}
                </p>
              </div>
            </div>
            <a
              href={site.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full min-h-[48px] items-center justify-center gap-2 border border-sindhu-terracotta/30 px-6 py-3 text-xs tracking-widest text-sindhu-terracotta transition-colors active:bg-sindhu-terracotta active:text-sindhu-charcoal sm:w-auto md:hover:bg-sindhu-terracotta md:hover:text-sindhu-charcoal"
            >
              GET DIRECTIONS
              <ExternalLink size={14} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
