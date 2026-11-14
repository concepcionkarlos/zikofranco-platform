/**
 * src/app/api/leads/route.ts
 * POST /api/leads
 *
 * Qué hace:
 * - Recibe lead del formulario de booking
 * - Filtra bots (honeypot + tiempo mínimo de llenado + rate limit por IP)
 * - Valida campos y longitudes
 * - Guarda el lead en Neon usando Prisma
 * - Envía notificación a la banda y auto-respuesta al cliente (después de responder)
 */

import { NextResponse, after } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { links } from "@/content/links";

type LeadPayload = {
  fullName: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  location?: string;
  guestCount?: string;
  showFormat?: string;
  budgetRange?: string;
  message?: string;
  website?: string; // honeypot — real users never fill this
  startedAt?: number; // ms timestamp when the form was rendered
};

const NOTIFY_TO = "Zikofranco@gmail.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_FILL_MS = 3000;

// Best-effort per-instance rate limit (Fluid Compute reuses instances).
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LeadPayload>;

    // Bots: pretend success so they don't retry, but store nothing.
    const tooFast = typeof body.startedAt === "number" && Date.now() - body.startedAt < MIN_FILL_MS;
    if (clean(body.website, 200) || tooFast) {
      return NextResponse.json({ ok: true });
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const fullName = clean(body.fullName, 120);
    const email = clean(body.email, 200).toLowerCase();
    const eventType = clean(body.eventType, 60);
    const phone = clean(body.phone, 40);
    const eventDate = clean(body.eventDate, 20);
    const location = clean(body.location, 160);
    const guestCount = clean(body.guestCount, 20);
    const showFormat = clean(body.showFormat, 60);
    const budgetRange = clean(body.budgetRange, 60);
    const message = clean(body.message, 4000);

    if (!fullName || !email || !eventType) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: fullName, email, eventType" },
        { status: 400 },
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    // Event details are stored at the top of the message so they show up in the admin
    // without needing a database migration.
    const details = [
      eventDate && `Event date: ${eventDate}`,
      location && `Location: ${location}`,
      guestCount && `Guests: ${guestCount}`,
      showFormat && `Format: ${showFormat}`,
    ].filter(Boolean) as string[];
    const fullMessage = [details.join("\n"), message].filter(Boolean).join("\n\n") || null;

    const lead = await prisma.lead.create({
      data: {
        fullName,
        email,
        phone: phone || null,
        eventType,
        budgetRange: budgetRange || null,
        message: fullMessage,
        status: "NEW",
      },
    });

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);

      // Runs after the response is sent, but the function stays alive until it finishes.
      after(async () => {
        const results = await Promise.allSettled([
          resend.emails.send({
            from: "ZikoFranco Booking <booking@zikofranco.com>",
            to: NOTIFY_TO,
            replyTo: lead.email,
            subject: `New Booking Request — ${lead.eventType}${eventDate ? ` · ${eventDate}` : ""}`,
            text: [
              `New booking request received on zikofranco.com`,
              ``,
              `Name:     ${lead.fullName}`,
              `Email:    ${lead.email}`,
              `Phone:    ${lead.phone ?? "—"}`,
              `Event:    ${lead.eventType}`,
              `Date:     ${eventDate || "—"}`,
              `Location: ${location || "—"}`,
              `Guests:   ${guestCount || "—"}`,
              `Format:   ${showFormat || "—"}`,
              `Budget:   ${lead.budgetRange ?? "—"}`,
              ``,
              `Message:`,
              message || "—",
            ].join("\n"),
          }),
          resend.emails.send({
            from: "ZikoFranco <booking@zikofranco.com>",
            to: lead.email,
            replyTo: NOTIFY_TO,
            subject: "We got your booking request — ZikoFranco",
            text: [
              `Hi ${lead.fullName},`,
              ``,
              `Thanks for reaching out! We received your booking request and will get back to you within 24–48 hours with availability and pricing.`,
              ``,
              `In the meantime, check out our music:`,
              `  Spotify → ${links.spotify}`,
              `  Instagram → ${links.instagram}`,
              ``,
              `— Ziko & the band`,
              `zikofranco.com`,
            ].join("\n"),
          }),
        ]);
        results.forEach((r) => {
          if (r.status === "rejected") console.error("Lead email error:", r.reason);
        });
      });
    }

    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("❌ Lead save error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `We couldn't send your request right now. Please email us at ${NOTIFY_TO}.`,
      },
      { status: 500 },
    );
  }
}
