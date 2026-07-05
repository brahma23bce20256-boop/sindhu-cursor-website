import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MenuManager } from "@/components/admin/MenuManager";

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

      <MenuManager initialCategories={categories} />
    </div>
  );
}
