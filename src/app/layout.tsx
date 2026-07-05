import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Yatra_One } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/context/CartContext";
import NextAuthProvider from "@/components/NextAuthProvider";
import { getSiteSettings } from "@/lib/cms";
import { buildMetadata, buildRestaurantJsonLd } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-outfit",
  display: "swap",
});

const yatra = Yatra_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-yatra",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSiteSettings();
  return buildMetadata(site);
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const site = await getSiteSettings();
  const jsonLd = buildRestaurantJsonLd(site);

  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${yatra.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body grain">
        <NextAuthProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </CartProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
