import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { 
  TrendingUp, 
  ShoppingBag, 
  Users, 
  IndianRupee 
} from "lucide-react";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch some quick stats from database (mock values for now if DB is empty)
  const stats = [
    { name: "Total Revenue", value: "₹45,231", icon: IndianRupee, change: "+12.5%" },
    { name: "Total Orders", value: "356", icon: ShoppingBag, change: "+5.2%" },
    { name: "Active Customers", value: "24", icon: Users, change: "+2.1%" },
    { name: "Conversion Rate", value: "3.2%", icon: TrendingUp, change: "+4.1%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-sindhu-text">Dashboard Overview</h1>
        <p className="text-sindhu-text-light mt-1">Welcome back, {session.user?.name || 'Admin'}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-sindhu-terracotta/10 text-sindhu-terracotta rounded-xl flex items-center justify-center">
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-sm font-bold tracking-widest text-sindhu-text-light uppercase mb-1">{stat.name}</p>
              <p className="text-3xl font-display font-bold text-sindhu-text">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
          <h2 className="text-xl font-display font-bold text-sindhu-text mb-6">Recent Orders</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center text-sindhu-text-light">
            <ShoppingBag size={48} className="mb-4 opacity-20" />
            <p>No recent orders found.</p>
            <p className="text-sm mt-2">New orders will appear here automatically.</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
          <h2 className="text-xl font-display font-bold text-sindhu-text mb-6">Popular Items</h2>
          <div className="flex flex-col items-center justify-center py-12 text-center text-sindhu-text-light">
            <TrendingUp size={48} className="mb-4 opacity-20" />
            <p>Not enough data to determine popular items.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
