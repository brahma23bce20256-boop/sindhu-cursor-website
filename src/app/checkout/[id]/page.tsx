"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/cms/types";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export default function CheckoutPreviewPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { clearCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(30);
  const [status, setStatus] = useState<"pending" | "confirmed" | "cancelled">("pending");
  const [order, setOrder] = useState<{ tokenNumber: number, totalAmount: number } | null>(null);

  useEffect(() => {
    // Fetch order details
    fetch(`/api/orders/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.order) setOrder(data.order);
      })
      .catch(console.error);
  }, [params.id]);

  useEffect(() => {
    if (status !== "pending") return;

    if (timeLeft <= 0) {
      handleCancel("Time expired");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, status]);

  const handleConfirm = async () => {
    try {
      setStatus("confirmed");
      await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: params.id, action: "CONFIRM" }),
      });
      clearCart();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = async (reason?: string) => {
    try {
      setStatus("cancelled");
      await fetch("/api/orders/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: params.id, action: "CANCEL" }),
      });
      if (reason !== "Time expired") {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (status === "confirmed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sindhu-bg p-6">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-xl">
          <CheckCircle2 size={64} className="text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-sindhu-text mb-2">Order Confirmed!</h1>
          
          {order && (
            <div className="bg-sindhu-terracotta/10 rounded-xl p-6 my-6 border border-sindhu-terracotta/30">
              <p className="text-sm font-bold text-sindhu-terracotta tracking-widest uppercase mb-1">YOUR TOKEN NUMBER</p>
              <p className="text-5xl font-display font-bold text-sindhu-text">#{order.tokenNumber}</p>
            </div>
          )}

          <p className="text-sindhu-text-light mb-8">Your token number has been secured. Our chefs are starting on your order.</p>
          <button 
            onClick={() => router.push("/")}
            className="w-full bg-sindhu-terracotta text-sindhu-charcoal py-4 rounded-xl font-bold tracking-widest"
          >
            RETURN TO MENU
          </button>
        </div>
      </div>
    );
  }

  if (status === "cancelled") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sindhu-bg p-6">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center shadow-xl">
          <XCircle size={64} className="text-red-500 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-sindhu-text mb-2">Order Cancelled</h1>
          <p className="text-sindhu-text-light mb-8">Your order was cancelled because time expired or you chose to cancel.</p>
          <button 
            onClick={() => router.push("/")}
            className="w-full border-2 border-sindhu-text text-sindhu-text py-4 rounded-xl font-bold tracking-widest"
          >
            RETURN TO MENU
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-sindhu-bg p-6">
      <div className="bg-white p-8 rounded-2xl max-w-md w-full shadow-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-sindhu-terracotta/20 mb-4">
            <Clock size={32} className="text-sindhu-terracotta" />
          </div>
          <h1 className="text-3xl font-display font-bold text-sindhu-text mb-2">Confirm Order</h1>
          <p className="text-sindhu-text-light">Please confirm your order before the timer runs out to secure your token.</p>
        </div>

        {order && (
          <div className="bg-sindhu-bg-alt p-6 rounded-xl border border-sindhu-border/30 mb-6 text-center">
            <p className="text-sm font-bold text-sindhu-text-light tracking-widest uppercase mb-1">RESERVED TOKEN</p>
            <p className="text-4xl font-display font-bold text-sindhu-text">#{order.tokenNumber}</p>
            <div className="mt-4 pt-4 border-t border-sindhu-border/50 flex justify-between items-center">
              <span className="text-sm text-sindhu-text-light">Total Amount (COD)</span>
              <span className="font-bold text-sindhu-text">{formatPrice(order.totalAmount)}</span>
            </div>
          </div>
        )}

        <div className="bg-sindhu-bg-alt p-6 rounded-xl border border-sindhu-border/30 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-bold text-sindhu-text-light tracking-widest">TIME REMAINING</span>
            <span className="text-2xl font-bold text-sindhu-terracotta">{timeLeft}s</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-sindhu-terracotta h-2 rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleConfirm}
            className="w-full bg-sindhu-terracotta text-sindhu-charcoal py-4 rounded-xl font-bold tracking-widest"
          >
            CONFIRM ORDER
          </button>
          <button 
            onClick={() => handleCancel()}
            className="w-full border-2 border-sindhu-border text-sindhu-text-light py-4 rounded-xl font-bold tracking-widest hover:bg-gray-50"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}
