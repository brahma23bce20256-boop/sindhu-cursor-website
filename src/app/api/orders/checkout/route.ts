import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

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

    // 3. Authenticate the user. If they are logged in, use their ID.
    // Otherwise, use a generic "Guest" user.
    const session = await getServerSession(authOptions);
    let orderUserId = "";

    if (session?.user?.id) {
      orderUserId = session.user.id;
    } else {
      let guestUser = await prisma.user.findUnique({ where: { email: "guest@sindhu.com" } });
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            email: "guest@sindhu.com",
            name: "Guest Customer",
          }
        });
      }
      orderUserId = guestUser.id;
    }

    // 4. Create the draft order with PENDING_CONFIRMATION
    const order = await prisma.order.create({
      data: {
        userId: orderUserId,
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
