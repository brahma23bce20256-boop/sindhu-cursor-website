import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";
import type { OrderPayload } from "@/lib/cms/types";
import { formatPrice } from "@/lib/cms/types";
import { saveJsonFile, sendNotificationEmail } from "@/lib/storage";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderPayload;
    const { name, email, phone, type, address, notes, items } = body;

    if (!name?.trim() || !phone?.trim() || !type) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!items?.length) {
      return NextResponse.json(
        { error: "Your cart is empty." },
        { status: 400 }
      );
    }

    if (type === "delivery" && !address?.trim()) {
      return NextResponse.json(
        { error: "Please provide a delivery address." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = {
      id: `ord_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      type,
      address: address?.trim() ?? "",
      notes: notes?.trim() ?? "",
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    await saveJsonFile("orders.json", order);

    const site = await getSiteSettings();
    const itemLines = items
      .map(
        (i) =>
          `  ${i.quantity}x ${i.name} — ${formatPrice(i.price * i.quantity)}`
      )
      .join("\n");

    const emailBody = [
      "New online order — Sindhu",
      "",
      `Name: ${order.name}`,
      `Email: ${order.email}`,
      `Phone: ${order.phone}`,
      `Type: ${order.type}`,
      order.address ? `Address: ${order.address}` : "",
      "",
      "Items:",
      itemLines,
      "",
      `Total: ${formatPrice(total)}`,
      notes ? `Notes: ${order.notes}` : "",
      "",
      `Reference: ${order.id}`,
    ]
      .filter(Boolean)
      .join("\n");

    await sendNotificationEmail(
      `New Order — ${order.name} (${formatPrice(total)})`,
      emailBody,
      site.contact.orderEmail
    );

    return NextResponse.json({
      success: true,
      id: order.id,
      total,
      message: "Your order has been placed. We will confirm shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
