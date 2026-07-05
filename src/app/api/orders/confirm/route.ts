import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { orderId, action } = await req.json();

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    if (action === "CONFIRM") {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: "PENDING" } // Moves to active Live Orders
      });
      return NextResponse.json({ success: true, order });
    } else if (action === "CANCEL") {
      await prisma.order.delete({
        where: { id: orderId }
      });
      return NextResponse.json({ success: true, deleted: true });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to process order confirmation" },
      { status: 500 }
    );
  }
}
