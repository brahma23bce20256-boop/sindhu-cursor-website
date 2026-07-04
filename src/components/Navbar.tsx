"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Experience", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reserve", href: "#reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-sindhu-charcoal/90 backdrop-blur-xl border-b border-white/5 py-4"
            : "bg-transparent py-6 md:py-8"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#" className="group flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-sindhu-gold/40 transition-colors group-hover:border-sindhu-gold">
              <span className="font-display text-lg font-semibold text-sindhu-gold">S</span>
            </div>
            <span className="font-display text-2xl font-light tracking-[0.2em] text-sindhu-cream">
              SINDHU
            </span>
          </a>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-sm font-light tracking-widest text-sindhu-cream/70 transition-colors hover:text-sindhu-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-sindhu-gold after:transition-all hover:after:w-full"
              >
                {link.label.toUpperCase()}
              </a>
            ))}
            <a
              href="#reserve"
              className="border border-sindhu-gold/50 px-6 py-2.5 text-xs font-medium tracking-widest text-sindhu-gold transition-all hover:bg-sindhu-gold hover:text-sindhu-charcoal"
            >
              BOOK A TABLE
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-sindhu-cream md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-sindhu-charcoal/98 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="font-display text-3xl font-light tracking-widest text-sindhu-cream"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
