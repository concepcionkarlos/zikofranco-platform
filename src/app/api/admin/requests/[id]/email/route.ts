/**
 * POST /api/admin/requests/[id]/email
 * Sends an admin reply email to the client.
 *
 * Status promotion rules (on successful send only):
 *   NEW        → CONTACTED  (first contact)
 *   CONTACTED  → stays CONTACTED
 *   QUALIFIED / NEGOTIATING / CONFIRMED → no downgrade
 *   REJECTED / ARCHIVED → no change
 *
 * Also sets contactedAt (first send only) and lastContactedAt (every send).
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";
import { LeadStatus } from "@prisma/client";

const resend = new Resend(process.env.RESEND_API_KEY);

// Statuses that should be promoted to CONTACTED after a successful email send
const PROMOTE_TO_CONTACTED = new Set<LeadStatus>(["NEW"]);

// Statuses that must never be downgraded (they outrank CONTACTED)
const NO_DOWNGRADE = new Set<LeadStatus>([
  "QUALIFIED",
  "NEGOTIATING",
  "CONFIRMED",
  "REJECTED",
  "ARCHIVED",
]);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { subject, body } = (await req.json()) as {
      subject?: string;
      body?: string;
    };

    if (!subject?.trim() || !body?.trim()) {
      return NextResponse.json(
        { ok: false, error: "Subject and body are required" },
        { status: 400 },
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }

    // ── Send email first — only mutate DB on success ──────────────────────────
    await resend.emails.send({
      from: "ZikoFranco <booking@zikofranco.com>",
      to: lead.email,
      subject: subject.trim(),
      text: body.trim(),
    });

    // ── Determine status promotion ────────────────────────────────────────────
    const currentStatus = lead.status as LeadStatus;
    const shouldPromote = PROMOTE_TO_CONTACTED.has(currentStatus);
    const newStatus: LeadStatus = shouldPromote ? "CONTACTED" : currentStatus;
    const statusChanged = newStatus !== currentStatus;

    const now = new Date();

    // ── Write to DB in a single transaction ───────────────────────────────────
    await prisma.$transaction([
      // 1. Update lead — status (if promoted) + timestamps
      prisma.lead.update({
        where: { id },
        data: {
          ...(statusChanged && { status: newStatus }),
          // contactedAt: only set on first email ever
          ...(!lead.contactedAt && { contactedAt: now }),
          lastContactedAt: now,
        },
      }),

      // 2. Log the email
      prisma.emailLog.create({
        data: {
          leadId: id,
          subject: subject.trim(),
          body: body.trim(),
        },
      }),

      // 3. Activity: email sent
      prisma.leadActivity.create({
        data: {
          leadId: id,
          type: "EMAIL_SENT",
          content: `Email sent to ${lead.email}: "${subject.trim()}"`,
        },
      }),

      // 4. Activity: status change (only when promoted)
      ...(statusChanged
        ? [
            prisma.leadActivity.create({
              data: {
                leadId: id,
                type: "STATUS_CHANGE",
                content: `Status changed from ${currentStatus} to ${newStatus} (email sent)`,
              },
            }),
          ]
        : []),
    ]);

    return NextResponse.json({ ok: true, newStatus, statusChanged });
  } catch (err) {
    console.error("Admin email error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
