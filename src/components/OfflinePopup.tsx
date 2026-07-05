"use client";

import { useCart } from "@/context/CartContext";
import { AlertTriangle } from "lucide-react";

export function OfflinePopup() {
  const { isOnline, offlineMessage } = useCart();

  if (isOnline) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4 pb-8 sm:p-6 sm:pb-8 flex justify-center pointer-events-none">
      <div className="pointer-events-auto bg-red-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 max-w-lg w-full transform transition-all duration-500 translate-y-0 opacity-100">
        <div className="bg-white/20 p-2 rounded-full shrink-0">
          <AlertTriangle size={24} className="text-white" />
        </div>
        <div>
          <h3 className="font-display font-bold text-lg">Restaurant is Offline</h3>
          <p className="text-sm text-red-100 mt-1">{offlineMessage}</p>
        </div>
      </div>
    </div>
  );
}
