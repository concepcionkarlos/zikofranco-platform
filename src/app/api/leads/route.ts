/**
 * src/app/api/leads/route.ts
 * POST /api/leads
 *
 * Qué hace:
 * - Recibe lead del formulario
 * - Valida campos mínimos
 * - Guarda el lead en Neon usando Prisma
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  eventType: string;
  budgetRange?: string;
  message?: string;
};

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
