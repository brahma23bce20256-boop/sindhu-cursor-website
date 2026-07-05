import { getGallery, getMenu, getSiteSettings } from "@/lib/cms";
import HomePageClient from "@/components/HomePageClient";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [site, menu, gallery] = await Promise.all([
    getSiteSettings(),
    getMenu(),
    getGallery(),
  ]);

  return (
    <HomePageClient
      site={site}
      menuCategories={menu.categories}
      galleryImages={gallery.images}
    />
  );
}
