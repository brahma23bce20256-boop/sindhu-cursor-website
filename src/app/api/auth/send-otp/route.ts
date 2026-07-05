import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Verify VIT-AP domain
    if (!email.endsWith("@vitapstudent.ac.in") && email !== "admin@sindhu.com") {
      return NextResponse.json(
        { error: "Only @vitapstudent.ac.in emails are allowed." },
        { status: 403 }
      );
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Store in DB
    await prisma.otpVerification.create({
      data: {
        email,
        otp,
        expiresAt,
      },
    });

    // If SMTP details are not configured, print to console for local testing
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.warn("SMTP credentials not configured. OTP generated:", otp);
      return NextResponse.json({ 
        success: true, 
        message: "OTP generated (check server console since SMTP is not configured)" 
      });
    }

    // Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const mailOptions = {
      from: `"Sindhu Restaurant" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Your Sindhu Login OTP",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D9734E;">Welcome to Sindhu Restaurant</h2>
          <p>Your one-time password (OTP) for login is:</p>
          <h1 style="font-size: 32px; letter-spacing: 5px; color: #333;">${otp}</h1>
          <p>This code will expire in 10 minutes.</p>
          <br/>
          <p style="font-size: 12px; color: #888;">If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP generation error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
