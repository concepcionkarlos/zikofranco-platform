/**
 * src/app/api/leads/route.ts
 * POST /api/leads
 *
 * Qué hace:
 * - Recibe lead del formulario
 * - Valida campos mínimos
 * - Guarda el lead en Neon usando Prisma
 * - Envía notificación por email a Zikofranco@gmail.com
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  eventType: string;
  budgetRange?: string;
  message?: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;

    if (!body.fullName || !body.email || !body.eventType) {
      return NextResponse.json(
        {
          ok: false,
          error: "Missing required fields: fullName, email, eventType",
        },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.trim(),
        phone: body.phone?.trim() || null,
        eventType: body.eventType.trim(),
        budgetRange: body.budgetRange?.trim() || null,
        message: body.message?.trim() || null,
        status: "NEW",
      },
    });

    // Send emails — fire and forget (don't fail the request if email fails)
    if (process.env.RESEND_API_KEY) {
      // 1. Notify Ziko
      resend.emails
        .send({
          from: "ZikoFranco Booking <booking@zikofranco.com>",
          to: "Zikofranco@gmail.com",
          subject: `New Booking Request — ${lead.eventType}`,
          text: [
            `New booking request received on zikofranco.com`,
            ``,
            `Name:    ${lead.fullName}`,
            `Email:   ${lead.email}`,
            `Phone:   ${lead.phone ?? "—"}`,
            `Event:   ${lead.eventType}`,
            `Budget:  ${lead.budgetRange ?? "—"}`,
            ``,
            `Message:`,
            lead.message ?? "—",
          ].join("\n"),
        })
        .catch((err) => console.error("Notification email error:", err));

      // 2. Auto-reply to client
      resend.emails
        .send({
          from: "ZikoFranco <booking@zikofranco.com>",
          to: lead.email,
          subject: "We got your booking request — ZikoFranco",
          text: [
            `Hi ${lead.fullName},`,
            ``,
            `Thanks for reaching out! We received your booking request and will get back to you within 24–48 hours.`,
            ``,
            `Here's a summary of what you sent:`,
            `  Event type: ${lead.eventType}`,
            `  Budget:     ${lead.budgetRange ?? "—"}`,
            ``,
            `In the meantime, listen to our music:`,
            `  Spotify → https://open.spotify.com/artist/zikofranco`,
            `  Instagram → https://www.instagram.com/zikofranco`,
            ``,
            `— Ziko & the team`,
            `zikofranco.com`,
          ].join("\n"),
        })
        .catch((err) => console.error("Auto-reply email error:", err));
    }

    return NextResponse.json({
      ok: true,
      message: "Lead saved successfully",
      leadId: lead.id,
    });
  } catch (err) {
    console.error("❌ Lead save error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error saving lead" },
      { status: 500 },
    );
  }
}
