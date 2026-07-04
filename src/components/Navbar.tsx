"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const homeLinks = [
  { label: "About", href: "/#about" },
  { label: "Order", href: "/order" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Find Us", href: "/#location" },
];

const mobileLinks = homeLinks;

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOrder = pathname === "/order";
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
            ? "bg-sindhu-charcoal/95 backdrop-blur-xl border-b border-sindhu-gold/10 py-3 md:py-4"
            : "bg-transparent py-4 md:py-8"
        }`}
        style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 md:px-12">
          <Link href="/" className="group flex min-w-0 items-center gap-2 sm:gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-sindhu-gold/50 bg-sindhu-gold/10 transition-colors group-hover:border-sindhu-gold sm:h-10 sm:w-10">
              <span className="font-display text-base font-semibold text-sindhu-gold sm:text-lg">S</span>
            </div>
            <span className="truncate font-display text-xl font-light tracking-[0.12em] text-sindhu-cream sm:text-2xl">
              SINDHU
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {homeLinks.map((link) => (
              <Link
                key={link.href}
                href={resolveHref(link.href)}
                className={`relative text-sm font-light tracking-widest transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sindhu-gold after:transition-all hover:after:w-full ${
                  link.href === "/order" && isOrder
                    ? "text-sindhu-gold"
                    : "text-sindhu-cream/70 hover:text-sindhu-gold"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            ))}
            <Link
              href={isHome ? "#reserve" : "/#reserve"}
              className="border border-sindhu-gold/50 px-5 py-2.5 text-xs font-medium tracking-widest text-sindhu-gold transition-all hover:bg-sindhu-gold hover:text-sindhu-charcoal"
            >
              CONTACT
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              href="/order"
              className={`rounded-full px-3 py-2 text-[10px] font-semibold tracking-wide ${
                isOrder
                  ? "bg-sindhu-gold text-sindhu-charcoal"
                  : "border border-sindhu-gold/40 text-sindhu-gold"
              }`}
            >
              ORDER
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="touch-target flex items-center justify-center text-sindhu-cream"
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
            className="fixed inset-0 z-40 flex flex-col bg-sindhu-charcoal/98 backdrop-blur-xl md:hidden"
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
                    className="flex min-h-[48px] items-center justify-center font-display text-2xl font-light tracking-widest text-sindhu-cream active:text-sindhu-gold"
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
                  href="/order"
                  onClick={closeMobileMenu}
                  className="flex min-h-[52px] items-center justify-center bg-sindhu-gold text-sm font-semibold tracking-wide text-sindhu-charcoal"
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
