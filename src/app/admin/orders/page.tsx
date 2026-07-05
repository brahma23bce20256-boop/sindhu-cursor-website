import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ShoppingBag } from "lucide-react";

export default async function AdminOrders() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-sindhu-text">Live Orders</h1>
        <p className="text-sindhu-text-light mt-1">Manage and track customer orders in real-time.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
        <div className="flex flex-col items-center justify-center py-16 text-center text-sindhu-text-light">
          <ShoppingBag size={48} className="mb-4 opacity-20" />
          <p className="text-lg font-bold text-sindhu-text">No active orders</p>
          <p className="text-sm mt-2">When customers place orders, they will appear here instantly.</p>
        </div>
      </div>
    </div>
  );
}
