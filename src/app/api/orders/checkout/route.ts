import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { items, totalAmount } = await req.json();

    // 1. Check if we are online
    const systemSettings = await prisma.systemSetting.findUnique({
      where: { key: "IS_ONLINE" }
    });
    if (systemSettings?.value === "false") {
      return NextResponse.json({ error: "Restaurant is currently offline" }, { status: 400 });
    }

    // 2. Validate items exist and are available
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of items) {
      const dbItem = await prisma.menuItem.findUnique({ where: { id: item.id } });
      if (!dbItem || !dbItem.isAvailable) {
        return NextResponse.json({ error: `Item ${item.name} is no longer available` }, { status: 400 });
      }
    }

    // 3. We need a user to tie this order to. Since it's guest checkout (no auth required right now),
    // we'll either need a guest user or allow orders without users.
    // Wait, the Prisma schema says `Order` must have `userId`.
    // Let's create a generic "Guest" user if none exists, or fetch it.
    let guestUser = await prisma.user.findUnique({ where: { email: "guest@sindhu.com" } });
    if (!guestUser) {
      guestUser = await prisma.user.create({
        data: {
          email: "guest@sindhu.com",
          password: "guest_password_placeholder",
          name: "Guest Customer",
        }
      });
    }

    // 4. Create the draft order with PENDING_CONFIRMATION
    const order = await prisma.order.create({
      data: {
        userId: guestUser.id,
        totalAmount: totalAmount,
        status: "PENDING_CONFIRMATION",
        items: {
          create: items.map((i: any) => ({
            menuItemId: i.id,
            quantity: i.quantity,
            price: i.price,
          }))
        }
      }
    });

    return NextResponse.json({ orderId: order.id, tokenNumber: order.tokenNumber });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process checkout" },
      { status: 500 }
    );
  }
}
