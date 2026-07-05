import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, isAvailable, image, name, description, price } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing item id" }, { status: 400 });
    }

    const updateData: any = {};
    if (isAvailable !== undefined) updateData.isAvailable = isAvailable;
    if (image !== undefined) updateData.image = image;
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = price;

    const item = await prisma.menuItem.update({
      where: { id },
      data: updateData
    });

    return NextResponse.json({ success: true, item });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}
