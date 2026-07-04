import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderPageClient from "@/components/OrderPageClient";
import { getMenu, getSiteSettings } from "@/lib/cms";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata() {
  const site = await getSiteSettings();
  return buildMetadata(site, {
    title: `Order Online | ${site.name}`,
    description: `Order your favourite dishes from ${site.name} for pickup or delivery.`,
    alternates: { canonical: `${site.url}/order` },
  });
}

export default async function OrderPage() {
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
            ORDER ONLINE
          </p>
          <h1 className="font-display text-4xl font-light text-sindhu-cream md:text-6xl">
            Taste <span className="gold-gradient-text">Sindhu</span> at Home
          </h1>
          <p className="mt-4 max-w-lg text-sm font-light text-sindhu-cream/50">
            Select your favourites for pickup or delivery. Minimum order may apply
            for delivery within the {site.name} service area.
          </p>
        </div>
      </div>
      <OrderPageClient categories={categories} />
      <Footer site={site} />
    </main>
  );
}
