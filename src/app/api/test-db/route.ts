import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@sindhu.com' }
    });
    if (!user) return NextResponse.json({ error: "User not found" });
    if (!user.password) return NextResponse.json({ error: "User has no password" });
    
    const isValid = await bcrypt.compare('admin123', user.password);
    return NextResponse.json({ user, isValid });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, stack: error.stack });
  }
}
