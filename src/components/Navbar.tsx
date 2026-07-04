"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const homeLinks = [
  { label: "About", href: "/#about" },
  { label: "Order", href: "/orders" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Find Us", href: "/#location" },
];

const mobileLinks = homeLinks;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOrders = pathname === "/orders";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lines } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const closeMobileMenu = () => setMobileOpen(false);

  const resolveHref = (href: string) => {
    if (href.startsWith("/#") && !isHome) return href;
    if (href.startsWith("/#")) return href.slice(1);
    return href;
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen || !isHome
            ? "bg-sindhu-bg-alt/95 backdrop-blur-xl border-b border-sindhu-border py-3 md:py-4 shadow-sm"
            : "bg-transparent py-4 md:py-8"
        }`}
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12">
          <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sindhu-terracotta/50 bg-sindhu-terracotta/10 transition-colors group-hover:border-sindhu-terracotta sm:h-10 sm:w-10">
              <span className="font-display text-base font-bold text-sindhu-terracotta sm:text-lg">S</span>
            </div>
            <span className="truncate font-display text-xl font-bold tracking-[0.12em] text-sindhu-terracotta sm:text-2xl">
              SINDHU
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {homeLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className={`relative text-sm font-bold tracking-widest transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sindhu-terracotta after:transition-all hover:after:w-full ${
                  link.href === "/orders" && isOrders
                    ? "text-sindhu-terracotta"
                    : "text-sindhu-text-light hover:text-sindhu-terracotta"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            
            <Link
              href="/orders"
              className="relative flex items-center gap-2 rounded-xl bg-sindhu-terracotta px-5 py-2.5 text-xs font-bold tracking-widest text-white transition-all hover:bg-[#c9633e]"
            >
              <ShoppingBag size={16} />
              CART
              {lines.length > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-sindhu-sage text-[10px] text-white">
                  {lines.length}
                </span>
              )}
            </Link>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <Link
              href="/orders"
              className="relative flex items-center justify-center rounded-full p-2 text-sindhu-terracotta bg-sindhu-terracotta/10"
            >
              <ShoppingBag size={20} />
              {lines.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-sindhu-sage text-[9px] font-bold text-white">
                  {lines.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="touch-target flex items-center justify-center text-sindhu-text"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-sindhu-bg-alt/98 backdrop-blur-xl md:hidden"
            style={{
              paddingTop: "max(5rem, calc(env(safe-area-inset-top) + 4rem))",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="flex flex-1 flex-col items-center justify-center gap-1 px-6">
              {mobileLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="w-full max-w-xs"
                >
                  <Link
                    href={resolveHref(link.href)}
                    onClick={closeMobileMenu}
                    className="flex min-h-[48px] items-center justify-center font-display text-2xl font-bold tracking-widest text-sindhu-text active:text-sindhu-terracotta"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: mobileLinks.length * 0.06 }}
                className="mt-4 w-full max-w-xs"
              >
                <Link
                  href="/orders"
                  onClick={closeMobileMenu}
                  className="flex min-h-[52px] items-center justify-center rounded-xl bg-sindhu-terracotta text-sm font-bold tracking-wide text-white"
                >
                  ORDER BIRYANI NOW
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

