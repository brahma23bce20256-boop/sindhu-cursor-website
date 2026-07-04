import { NextResponse } from "next/server";
import { getSiteSettings } from "@/lib/cms";
import type { ReservationPayload } from "@/lib/cms/types";
import { saveJsonFile, sendNotificationEmail } from "@/lib/storage";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ReservationPayload;
    const { name, email, date, time, guests, message } = body;

    if (!name?.trim() || !email?.trim() || !date || !time || !guests) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const reservation = {
      id: `res_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      date,
      time,
      guests,
      message: message?.trim() ?? "",
      createdAt: new Date().toISOString(),
      status: "pending",
    };

    await saveJsonFile("reservations.json", reservation);

    const site = await getSiteSettings();
    const emailBody = [
      "New reservation request — Sindhu",
      "",
      `Name: ${reservation.name}`,
      `Email: ${reservation.email}`,
      `Date: ${reservation.date}`,
      `Time: ${reservation.time}`,
      `Guests: ${reservation.guests}`,
      message ? `Notes: ${reservation.message}` : "",
      "",
      `Reference: ${reservation.id}`,
    ]
      .filter(Boolean)
      .join("\n");

    await sendNotificationEmail(
      `New Reservation — ${reservation.name} (${reservation.date})`,
      emailBody,
      site.contact.reservationEmail
    );

    return NextResponse.json({
      success: true,
      id: reservation.id,
      message:
        "Your reservation request has been received. We will confirm shortly.",
    });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
