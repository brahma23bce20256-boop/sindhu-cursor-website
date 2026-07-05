import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UtensilsCrossed } from "lucide-react";

export default async function AdminMenu() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  // Fetch categories and items
  const categories = await prisma.menuCategory.findMany({
    include: {
      items: true
    },
    orderBy: {
      id: 'asc'
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-display font-bold text-sindhu-text">Menu Management</h1>
          <p className="text-sindhu-text-light mt-1">Update prices, availability, and add new dishes.</p>
        </div>
        <button className="bg-sindhu-text text-white px-6 py-3 rounded-xl font-bold tracking-widest text-sm hover:bg-[#1f1e1d] transition-colors">
          + ADD NEW ITEM
        </button>
      </div>

      <div className="space-y-8">
        {categories.map(category => (
          <div key={category.id} className="bg-white p-6 rounded-2xl border border-sindhu-border/30 shadow-sm">
            <h2 className="text-2xl font-display font-bold text-sindhu-terracotta mb-6 border-b border-sindhu-border/30 pb-4">
              {category.title}
            </h2>
            
            <div className="space-y-4">
              {category.items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-sindhu-border/30">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-sindhu-border/20 rounded-lg flex items-center justify-center">
                      <UtensilsCrossed size={20} className="text-sindhu-text-light" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sindhu-text">{item.name}</h3>
                      <p className="text-sm text-sindhu-text-light line-clamp-1">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-sindhu-text">₹{item.price}</span>
                    <label className="flex items-center cursor-pointer">
                      <div className="relative">
                        <input type="checkbox" className="sr-only" defaultChecked={item.isAvailable} />
                        <div className={`block w-10 h-6 rounded-full ${item.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition ${item.isAvailable ? 'transform translate-x-4' : ''}`}></div>
                      </div>
                    </label>
                    <button className="text-sindhu-terracotta text-sm font-bold hover:underline">EDIT</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
