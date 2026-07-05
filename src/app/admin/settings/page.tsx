import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, Power } from "lucide-react";
import { prisma } from "@/lib/prisma";

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  // Get current status
  const systemSettings = await prisma.systemSetting.findUnique({
    where: { key: "IS_ONLINE" }
  });
  
  const isOnline = systemSettings?.value === "true";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-sindhu-text">System Settings</h1>
        <p className="text-sindhu-text-light mt-1">Manage global restaurant controls and configurations.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-sindhu-border/30 shadow-sm max-w-2xl">
        <div className="flex items-start gap-6">
          <div className={`p-4 rounded-full ${isOnline ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            <Power size={32} />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-bold text-sindhu-text mb-2">
              Restaurant Status: {isOnline ? 'ONLINE' : 'OFFLINE'}
            </h2>
            <p className="text-sm text-sindhu-text-light mb-6">
              Toggle this switch to completely pause incoming orders. When offline, customers will see a message that the restaurant is not accepting orders.
            </p>
            
            <button className={`px-6 py-3 rounded-xl font-bold tracking-widest text-sm shadow-md transition-colors ${isOnline ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'}`}>
              {isOnline ? 'TAKE RESTAURANT OFFLINE' : 'BRING RESTAURANT ONLINE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
