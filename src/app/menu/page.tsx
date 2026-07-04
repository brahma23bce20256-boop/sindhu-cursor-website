import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MenuPageClient from "@/components/MenuPageClient";
import { getMenu, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata() {
  const site = await getSiteSettings();
  return buildMetadata(site, {
    title: `Menu | ${site.name}`,
    description: `Explore the full culinary collection at ${site.name} — starters, mains, breads, desserts and more.`,
    alternates: { canonical: `${site.url}/menu` },
  });
}

export default async function MenuPage() {
  const [categories, site] = await Promise.all([
    getMenu().then((m) => m.categories),
    getSiteSettings(),
  ]);

  return (
    <main>
      <Navbar />
      <div className="section-padding !pb-0 !pt-24 md:!pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <Link
            href="/"
            className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-xs tracking-widest text-sindhu-cream/50 active:text-sindhu-gold md:hover:text-sindhu-gold"
          >
            <ArrowLeft size={14} />
            BACK TO HOME
          </Link>
          <p className="mb-3 text-xs tracking-[0.4em] text-sindhu-gold">
            CULINARY COLLECTION
          </p>
          <h1 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
            Our <span className="gold-gradient-text">Menu</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light text-sindhu-cream/50">
            {site.description}
          </p>
        </div>
      </div>
      <MenuPageClient categories={categories} />
      <Footer site={site} />
    </main>
  );
}
