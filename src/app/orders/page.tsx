import { getMenu } from "@/lib/cms";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SwiggyMenu from "@/components/SwiggyMenu";
import { getSiteSettings } from "@/lib/cms";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const menu = await getMenu();
  const site = await getSiteSettings();

  return (
    <main className="min-h-screen bg-sindhu-bg flex flex-col pt-20">
      <Navbar />
      <div className="flex-grow">
        <SwiggyMenu categories={menu.categories} />
      </div>
      <Footer site={site} />
    </main>
  );
}
