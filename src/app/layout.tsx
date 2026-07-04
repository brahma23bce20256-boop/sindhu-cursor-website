import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
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

export const metadata: Metadata = {
  title: "Sindhu | Fine Dining Restaurant",
  description:
    "Experience the art of Indian cuisine at Sindhu — where tradition meets innovation in an atmosphere of refined elegance.",
  keywords: ["restaurant", "fine dining", "Indian cuisine", "Sindhu"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable}`}>
      <body className="font-body grain">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
