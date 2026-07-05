"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, UtensilsCrossed, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Live Orders", href: "/admin/orders", icon: ShoppingBag },
    { name: "Menu Items", href: "/admin/menu", icon: UtensilsCrossed },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-sindhu-bg flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-sindhu-border/30 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-sindhu-border/30">
          <Link href="/" className="font-display text-2xl font-bold text-sindhu-text tracking-wider">
            SINDHU<span className="text-sindhu-terracotta text-sm align-top ml-1">ADMIN</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? "bg-sindhu-terracotta/10 text-sindhu-terracotta font-bold" 
                    : "text-sindhu-text-light hover:bg-sindhu-border/30 hover:text-sindhu-text font-medium"
                }`}
              >
                <Icon size={18} />
                <span className="text-sm tracking-wide">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sindhu-border/30">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sindhu-text-light hover:bg-red-50 hover:text-red-600 transition-all font-medium"
          >
            <LogOut size={18} />
            <span className="text-sm tracking-wide">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile Header */}
        <div className="md:hidden bg-white border-b border-sindhu-border/30 p-4 flex justify-between items-center sticky top-0 z-10">
          <span className="font-display text-xl font-bold text-sindhu-text">SINDHU</span>
          <button className="p-2 bg-sindhu-terracotta/10 text-sindhu-terracotta rounded-lg">Menu</button>
        </div>
        <div className="p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
