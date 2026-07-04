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
    title: `Menu & Order | ${site.name}`,
    description: `Order biryani, starters & veg food from ${site.name}. Delivery to VIT-AP, Mandadam & Amaravati.`,
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
      <div className="section-padding !pb-0 !pt-24 md:!pt-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-12">
          <Link
            href="/"
            className="mb-5 inline-flex min-h-[44px] items-center gap-2 text-xs tracking-widest text-sindhu-cream/50 active:text-sindhu-gold md:hover:text-sindhu-gold"
          >
            <ArrowLeft size={14} />
            BACK TO HOME
          </Link>

          <div className="rounded-xl border border-sindhu-gold/15 bg-gradient-to-br from-sindhu-maroon/30 to-sindhu-smoke/80 p-5 sm:p-8">
            <p className="mb-2 text-xs tracking-[0.35em] text-sindhu-saffron">
              MENU & ORDER
            </p>
            <h1 className="font-display text-3xl font-light text-sindhu-cream sm:text-4xl md:text-5xl">
              Pick Your <span className="gold-gradient-text">Biryani</span> & More
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-sindhu-cream/55">
              Full menu below — tap + to add items. Delivery to{" "}
              {site.serviceAreas?.slice(0, 3).join(", ") ?? "VIT-AP & Amaravati"}.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(site.serviceAreas ?? ["VIT-AP", "Mandadam", "Amaravati"]).map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-sindhu-gold/20 bg-sindhu-gold/10 px-3 py-1 text-[10px] tracking-wide text-sindhu-gold"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <OrderPageClient categories={categories} site={site} />
      <Footer site={site} />
    </main>
  );
}
