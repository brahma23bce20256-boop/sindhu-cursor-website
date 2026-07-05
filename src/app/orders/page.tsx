import { getMenu } from "@/lib/cms";
import SwiggyMenu from "@/components/SwiggyMenu";
import { getSiteSettings } from "@/lib/cms";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  
  if (session?.user && !(session.user as any).phoneNumber) {
    redirect("/onboarding");
  }

  const menu = await getMenu();
  const site = await getSiteSettings();

  return (
    <main className="min-h-screen bg-sindhu-bg flex flex-col pt-20">
      <div className="flex-grow">
        <SwiggyMenu categories={menu.categories} />
      </div>
    </main>
  );
}
