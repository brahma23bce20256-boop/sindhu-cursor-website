import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { name, phoneNumber } = await req.json();

    if (!name || !phoneNumber) {
      return NextResponse.json({ error: "Name and Phone Number are required" }, { status: 400 });
    }

    // Check if phone number is unique
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber }
    });

    if (existingUser && existingUser.email !== session.user.email) {
      return NextResponse.json({ error: "This phone number is already registered to another account." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { email: session.user.email },
      data: { name, phoneNumber }
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}
