"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Search, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { MenuCategory, MenuItem } from "@/lib/cms/types";

interface SwiggyMenuProps {
  categories: MenuCategory[];
}

export default function SwiggyMenu({ categories }: SwiggyMenuProps) {
  const { lines, total, addItem, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scrollspy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    Object.values(categoryRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [categories]);

  const scrollToCategory = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="mb-8 flex items-center justify-between border-b border-sindhu-border pb-6">
        <h1 className="text-3xl font-display font-bold text-sindhu-text sm:text-4xl">Order Online</h1>
        <div className="relative hidden w-64 md:block">
          <input
            type="text"
            placeholder="Search dishes..."
            className="w-full rounded-full border border-sindhu-border bg-sindhu-bg-alt py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sindhu-terracotta"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sindhu-text-light/50" size={18} />
        </div>
      </div>

      <div className="flex flex-col gap-8 md:flex-row md:items-start lg:gap-12">
        {/* Left Sidebar - Categories (Sticky) */}
        <div className="hidden md:sticky md:top-24 md:block md:w-56 lg:w-64">
          <ul className="flex flex-col space-y-1 border-r border-sindhu-border/50 pr-4">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full text-left rounded-r-full px-4 py-3 text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "border-l-4 border-sindhu-terracotta bg-sindhu-terracotta/10 text-sindhu-terracotta"
                      : "border-l-4 border-transparent text-sindhu-text-light hover:text-sindhu-terracotta"
                  }`}
                >
                  {cat.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Category Nav (Sticky Top) */}
        <div className="sticky top-20 z-40 -mx-4 overflow-x-auto bg-sindhu-bg px-4 py-3 shadow-sm md:hidden scrollbar-none">
          <div className="flex space-x-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium ${
                  activeCategory === cat.id
                    ? "bg-sindhu-terracotta text-white"
                    : "border border-sindhu-border text-sindhu-text-light"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Menu Items */}
        <div className="flex-1 space-y-12 pb-24 md:pb-0">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              className="scroll-mt-28"
            >
              <h2 className="mb-6 text-2xl font-bold text-sindhu-text">{category.title}</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                {category.items.map((item) => {
                  const cartLine = lines.find((l) => l.item.id === item.id);
                  const quantity = cartLine ? cartLine.quantity : 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-sindhu-border bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-1 flex items-center gap-2">
                            <span
                              className={`h-3 w-3 rounded-sm border ${
                                item.tags?.includes("vegetarian")
                                  ? "border-sindhu-sage bg-sindhu-sage/20"
                                  : "border-red-600 bg-red-100"
                              } flex items-center justify-center`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  item.tags?.includes("vegetarian") ? "bg-sindhu-sage" : "bg-red-600"
                                }`}
                              />
                            </span>
                            {item.tags?.includes("bestseller") && (
                              <span className="rounded bg-sindhu-saffron/20 px-1.5 py-0.5 text-[10px] font-bold text-sindhu-saffron">
                                BESTSELLER
                              </span>
                            )}
                          </div>
                          <h3 className="text-base font-bold text-sindhu-text sm:text-lg">{item.name}</h3>
                          <p className="mt-1 font-medium text-sindhu-text-light">₹{item.price}</p>
                          <p className="mt-2 line-clamp-2 text-xs text-sindhu-text-light/70 sm:text-sm">
                            {item.description}
                          </p>
                        </div>
                        {item.image && (
                          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-sindhu-bg-alt">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                        )}
                      </div>

                      {/* Add Button Area */}
                      <div className={`mt-4 flex ${item.image ? 'justify-end' : 'justify-start'}`}>
                        {quantity === 0 ? (
                          <button
                            onClick={() => addItem(item)}
                            className="relative -mt-10 mr-2 flex h-9 w-24 items-center justify-center rounded-lg border border-sindhu-border bg-white font-bold text-sindhu-sage shadow-sm hover:bg-sindhu-bg-alt z-10"
                          >
                            ADD
                            <Plus size={14} className="absolute right-2" />
                          </button>
                        ) : (
                          <div className="relative -mt-10 mr-2 flex h-9 w-24 items-center justify-between rounded-lg border border-sindhu-sage bg-white text-sindhu-sage shadow-sm z-10">
                            <button
                              onClick={() => updateQuantity(item.id, quantity - 1)}
                              className="flex h-full w-1/3 items-center justify-center hover:bg-sindhu-sage/10 rounded-l-lg"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-bold text-sm">{quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, quantity + 1)}
                              className="flex h-full w-1/3 items-center justify-center hover:bg-sindhu-sage/10 rounded-r-lg"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Right Sidebar - Cart (Sticky) */}
        <div className="hidden lg:sticky lg:top-24 lg:block lg:w-80">
          <div className="rounded-2xl border border-sindhu-border bg-white shadow-sm">
            <div className="p-5 border-b border-sindhu-border">
              <h3 className="text-xl font-bold text-sindhu-text flex items-center gap-2">
                <ShoppingBag size={20} />
                Your Cart
              </h3>
            </div>
            
            {lines.length === 0 ? (
              <div className="p-8 text-center text-sindhu-text-light/60">
                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-sindhu-bg-alt">
                  <ShoppingBag size={40} className="text-sindhu-border" />
                </div>
                <p>Your cart is empty</p>
                <p className="mt-1 text-sm">Add items from the menu to start an order</p>
              </div>
            ) : (
              <div className="flex flex-col h-[calc(100vh-280px)] max-h-[600px]">
                <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-none">
                  {lines.map((line) => (
                    <div key={line.item.id} className="flex justify-between items-start text-sm">
                      <div className="w-1/2">
                        <div className="font-medium text-sindhu-text flex items-start gap-1">
                          <span
                            className={`mt-1 h-2 w-2 rounded-sm border ${
                              line.item.tags?.includes("vegetarian")
                                ? "border-sindhu-sage bg-sindhu-sage/20"
                                : "border-red-600 bg-red-100"
                            } shrink-0`}
                          />
                          {line.item.name}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-20 items-center justify-between rounded border border-sindhu-border bg-white text-sindhu-sage">
                          <button
                            onClick={() => updateQuantity(line.item.id, line.quantity - 1)}
                            className="flex h-full w-1/3 items-center justify-center hover:bg-sindhu-sage/10 rounded-l"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="font-bold text-xs">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.item.id, line.quantity + 1)}
                            className="flex h-full w-1/3 items-center justify-center hover:bg-sindhu-sage/10 rounded-r"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="w-12 text-right font-medium text-sindhu-text-light">
                          ₹{line.item.price * line.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-sindhu-border p-5 bg-sindhu-bg-alt rounded-b-2xl">
                  <div className="flex justify-between text-sm mb-2 text-sindhu-text-light">
                    <span>Subtotal</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4 text-sindhu-text-light">
                    <span>Taxes & Fees</span>
                    <span>₹{Math.round(total * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-sindhu-text mb-6 border-t border-sindhu-border/50 pt-4">
                    <span>To Pay</span>
                    <span>₹{total + Math.round(total * 0.05)}</span>
                  </div>
                  <button className="w-full bg-sindhu-terracotta text-white rounded-xl py-3.5 font-bold hover:bg-[#c9633e] transition-colors flex items-center justify-center gap-2">
                    Checkout <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Cart (Sticky Bottom) */}
      {lines.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden border-t border-sindhu-border bg-white p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
          <div className="flex items-center justify-between mx-auto max-w-lg">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-sindhu-text-light uppercase tracking-wider">{lines.length} Items</span>
              <span className="text-lg font-bold text-sindhu-text">₹{total}</span>
            </div>
            <button className="flex items-center gap-2 rounded-xl bg-sindhu-terracotta px-6 py-3 font-bold text-white shadow-lg hover:bg-[#c9633e]">
              View Cart <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
