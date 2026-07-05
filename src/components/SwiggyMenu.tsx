"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { ShoppingBag, Plus, Minus, Search, ChevronRight, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import type { MenuCategory, MenuItem } from "@/lib/cms/types";

interface SwiggyMenuProps {
  categories: MenuCategory[];
}

export default function SwiggyMenu({ categories }: SwiggyMenuProps) {
  const router = useRouter();
  const { lines, total, addItem, updateQuantity } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id || "");
  const [isCheckingOut, setIsCheckingOut] = useState(false);
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
      // Adjusted offset for mobile vs desktop headers
      const offset = window.innerWidth < 768 ? 140 : 100;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleCheckout = async () => {
    if (lines.length === 0 || isCheckingOut) return;
    setIsCheckingOut(true);

    try {
      const res = await fetch("/api/orders/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: lines.map((l) => ({ id: l.item.id, name: l.item.name, quantity: l.quantity, price: l.item.price })),
          totalAmount: total + Math.round(total * 0.05),
        }),
      });

      const data = await res.json();
      if (res.ok && data.orderId) {
        router.push(`/checkout/${data.orderId}`);
      } else {
        alert(data.error || "Checkout failed");
        setIsCheckingOut(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to checkout");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-0 sm:px-6 lg:px-8 bg-white min-h-[100dvh]">
      <div className="flex flex-col gap-0 md:flex-row md:items-start lg:gap-10 pt-0 md:pt-10">
        
        {/* Left Sidebar - Categories (Sticky on PC) */}
        <div className="hidden md:sticky md:top-32 md:block md:w-56 lg:w-64 shrink-0 border-r border-sindhu-border/50 h-[calc(100vh-140px)] overflow-y-auto pr-6 scrollbar-none">
          <ul className="flex flex-col space-y-4">
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => scrollToCategory(cat.id)}
                  className={`w-full text-left flex items-center justify-between text-base font-bold transition-all ${
                    activeCategory === cat.id
                      ? "text-sindhu-terracotta"
                      : "text-sindhu-text-light hover:text-sindhu-terracotta"
                  }`}
                >
                  {cat.title}
                  {activeCategory === cat.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-sindhu-terracotta"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Category Nav (Sticky Top) */}
        <div className="sticky top-[72px] z-40 w-full overflow-x-auto bg-white px-4 py-3 shadow-sm md:hidden scrollbar-none border-b border-sindhu-border/50">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => scrollToCategory(cat.id)}
                className={`whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold shadow-sm transition-all ${
                  activeCategory === cat.id
                    ? "bg-sindhu-terracotta text-white border border-sindhu-terracotta"
                    : "bg-white border border-sindhu-border text-sindhu-text-light"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Middle Column - Menu Items (List format) */}
        <div className="flex-1 w-full max-w-3xl pb-32 md:pb-12 bg-white">
          {categories.map((category) => (
            <section
              key={category.id}
              id={category.id}
              ref={(el) => {
                categoryRefs.current[category.id] = el;
              }}
              className="scroll-mt-40 md:scroll-mt-32 pt-6 md:pt-0"
            >
              <h2 className="px-4 md:px-0 mb-2 text-2xl font-bold text-sindhu-text tracking-tight">{category.title}</h2>
              <div className="flex flex-col divide-y divide-sindhu-border/60">
                {category.items.map((item, index) => {
                  const cartLine = lines.find((l) => l.item.id === item.id);
                  const quantity = cartLine ? cartLine.quantity : 0;

                  return (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      key={item.id} 
                      className="flex justify-between gap-4 p-4 md:px-0 md:py-10 bg-white group"
                    >
                      {/* Left: Item Info */}
                      <div className="flex-1 pr-2">
                        <div className="mb-2 flex items-center gap-2">
                          {/* Veg/Non-Veg icon matching Swiggy */}
                          <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-sm border-2 ${
                            item.tags?.includes("vegetarian") ? "border-sindhu-sage" : "border-red-600"
                          }`}>
                            <span className={`h-2.5 w-2.5 rounded-full ${
                              item.tags?.includes("vegetarian") ? "bg-sindhu-sage" : "bg-red-600"
                            }`} />
                          </span>
                          
                          {/* Bestseller Badge */}
                          {item.tags?.includes("bestseller") && (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-[#E56353] tracking-wide uppercase">
                              <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#E56353] text-white text-[8px]">★</span>
                              Bestseller
                            </span>
                          )}
                        </div>
                        <h3 className="text-[17px] font-bold text-sindhu-text md:text-xl leading-snug">{item.name}</h3>
                        <p className="mt-1 text-[15px] font-semibold text-sindhu-text md:text-lg">₹{item.price}</p>
                        <p className="mt-3 line-clamp-3 text-[13px] text-sindhu-text-light/70 leading-relaxed md:text-[15px]">
                          {item.description}
                        </p>
                      </div>

                      {/* Right: Image & Floating Button */}
                      <div className="relative shrink-0 flex flex-col items-center justify-start mt-2">
                        {item.image ? (
                          <div className="relative h-32 w-32 md:h-[156px] md:w-[156px] overflow-hidden rounded-2xl bg-sindhu-bg shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                        ) : (
                          <div className="relative h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-sindhu-bg-alt/50 border border-dashed border-sindhu-border flex items-center justify-center">
                            <span className="text-[10px] text-sindhu-text-light/40 uppercase tracking-widest font-bold">No Image</span>
                          </div>
                        )}
                        
                        {/* Swiggy-style overlapping button */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 w-full flex justify-center">
                          {quantity === 0 ? (
                            <button
                              onClick={() => addItem(item)}
                              className="flex h-9 w-[90px] md:h-10 md:w-[110px] items-center justify-center rounded-lg border border-[#e5e6e6] bg-white font-extrabold text-[#1ba672] shadow-sm uppercase tracking-wider text-[13px] md:text-[15px] hover:shadow-md transition-shadow"
                            >
                              ADD
                            </button>
                          ) : (
                            <div className="flex h-9 w-[90px] md:h-10 md:w-[110px] items-center justify-between rounded-lg border border-[#e5e6e6] bg-white text-[#1ba672] shadow-sm font-extrabold text-[13px] md:text-[15px] overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, quantity - 1)}
                                className="flex h-full w-1/3 items-center justify-center bg-white hover:bg-[#1ba672]/10"
                              >
                                <Minus size={16} strokeWidth={3} />
                              </button>
                              <span className="flex-1 text-center bg-white">{quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, quantity + 1)}
                                className="flex h-full w-1/3 items-center justify-center bg-white hover:bg-[#1ba672]/10"
                              >
                                <Plus size={16} strokeWidth={3} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Right Sidebar - Cart (Sticky on PC) */}
        <div className="hidden lg:sticky lg:top-32 lg:block lg:w-[320px] shrink-0">
          <div className="rounded-2xl border border-sindhu-border/50 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden">
            <div className="px-6 py-5 border-b border-sindhu-border/50">
              <h3 className="text-xl font-bold text-sindhu-text flex items-center gap-2">
                Cart
                {lines.length > 0 && <span className="bg-sindhu-terracotta text-white text-[11px] px-2 py-0.5 rounded-full">{lines.length}</span>}
              </h3>
            </div>
            
            {lines.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="mb-4 text-sindhu-border">
                  <ShoppingBag size={64} strokeWidth={1} />
                </div>
                <h4 className="font-bold text-sindhu-text mb-1">Cart is empty</h4>
                <p className="text-sm text-sindhu-text-light/60">Good food is always cooking! Go ahead, order some yummy items from the menu.</p>
              </div>
            ) : (
              <div className="flex flex-col h-[calc(100vh-320px)] max-h-[600px]">
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 scrollbar-none">
                  {lines.map((line) => (
                    <div key={line.item.id} className="flex justify-between items-start text-sm gap-2">
                      <div className="w-3/5 flex flex-col">
                        <div className="flex items-start gap-2">
                          <span className={`mt-1 flex h-3 w-3 shrink-0 items-center justify-center rounded-sm border ${
                              line.item.tags?.includes("vegetarian")
                                ? "border-sindhu-sage"
                                : "border-red-600"
                            }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${
                              line.item.tags?.includes("vegetarian") ? "bg-sindhu-sage" : "bg-red-600"
                            }`} />
                          </span>
                          <span className="font-semibold text-sindhu-text leading-tight">{line.item.name}</span>
                        </div>
                        <span className="ml-5 mt-1 text-xs text-sindhu-text-light font-medium">₹{line.item.price}</span>
                      </div>
                      
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="flex h-7 w-16 items-center justify-between rounded border border-[#1ba672]/30 bg-white text-[#1ba672]">
                          <button
                            onClick={() => updateQuantity(line.item.id, line.quantity - 1)}
                            className="flex h-full w-1/3 items-center justify-center hover:bg-[#1ba672]/10"
                          >
                            <Minus size={12} strokeWidth={2.5} />
                          </button>
                          <span className="font-bold text-xs">{line.quantity}</span>
                          <button
                            onClick={() => updateQuantity(line.item.id, line.quantity + 1)}
                            className="flex h-full w-1/3 items-center justify-center hover:bg-[#1ba672]/10"
                          >
                            <Plus size={12} strokeWidth={2.5} />
                          </button>
                        </div>
                        <span className="w-10 text-right font-bold text-sindhu-text">
                          ₹{line.item.price * line.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-sindhu-border/50 p-6 bg-sindhu-bg-alt/30">
                  <div className="flex justify-between text-sm mb-2 text-sindhu-text-light font-medium">
                    <span>Item Total</span>
                    <span>₹{total}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-4 text-sindhu-text-light font-medium">
                    <span>Taxes & Charges</span>
                    <span>₹{Math.round(total * 0.05)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-sindhu-text mb-5 border-t border-dashed border-sindhu-border pt-4">
                    <span>To Pay</span>
                    <span>₹{total + Math.round(total * 0.05)}</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    disabled={isCheckingOut}
                    className="w-full bg-[#1ba672] text-white rounded-xl py-3.5 font-bold hover:bg-[#158e61] transition-colors flex items-center justify-between px-6 shadow-md shadow-[#1ba672]/20 disabled:opacity-70"
                  >
                    <span className="text-sm font-semibold">{isCheckingOut ? "Processing..." : "Checkout"}</span>
                    {isCheckingOut ? <Loader2 size={16} className="animate-spin" /> : <span className="flex items-center gap-1 text-sm">{total + Math.round(total * 0.05)} <ChevronRight size={16} /></span>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Floating Cart (Sticky Bottom) - Exact Swiggy Green Bar style */}
      {lines.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50 md:hidden">
          <div className="flex items-center justify-between rounded-xl bg-[#60B246] px-5 py-3.5 text-white shadow-xl shadow-[#60B246]/30">
            <div className="flex flex-col">
              <span className="text-[11px] font-medium tracking-wide opacity-90 uppercase">
                {lines.length} {lines.length === 1 ? 'ITEM' : 'ITEMS'}
              </span>
              <span className="flex items-center gap-2 text-[15px] font-bold">
                ₹{total + Math.round(total * 0.05)}
                <span className="text-[10px] font-normal opacity-80 uppercase tracking-widest">Plus Taxes</span>
              </span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="flex items-center gap-1 text-[15px] font-bold tracking-wide disabled:opacity-70"
            >
              {isCheckingOut ? "Processing..." : "View Cart"} {!isCheckingOut && <ChevronRight size={18} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
