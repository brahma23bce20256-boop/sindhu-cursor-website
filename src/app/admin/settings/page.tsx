import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { prisma } from "@/lib/prisma";

export default async function AdminSettings() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }

  // Get current status
  const systemSettings = await prisma.systemSetting.findMany({
    where: {
      key: { in: ["IS_ONLINE", "OFFLINE_MESSAGE"] }
    }
  });
  
  const settingsMap = systemSettings.reduce((acc, curr) => {
    acc[curr.key] = curr.value;
    return acc;
  }, {} as Record<string, string>);

  const isOnline = settingsMap["IS_ONLINE"] !== "false";
  const offlineMessage = settingsMap["OFFLINE_MESSAGE"] || "Orders are closed for now .. come back soon";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-sindhu-text">System Settings</h1>
        <p className="text-sindhu-text-light mt-1">Manage global restaurant controls and configurations.</p>
      </div>

      <SettingsForm initialIsOnline={isOnline} initialMessage={offlineMessage} />
    </div>
  );
}
