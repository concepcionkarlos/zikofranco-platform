/**
 * POST /api/admin/requests/[id]/email
 * Sends an email reply from the admin to the client and logs it.
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }

    await resend.emails.send({
      from: "ZikoFranco <booking@zikofranco.com>",
      to: lead.email,
      subject: subject.trim(),
      text: body.trim(),
    });

    await prisma.$transaction([
      prisma.emailLog.create({
        data: {
          leadId: id,
          subject: subject.trim(),
          body: body.trim(),
        },
      }),
      prisma.leadActivity.create({
        data: {
          leadId: id,
          type: "EMAIL_SENT",
          content: `Email sent: "${subject.trim()}"`,
        },
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Admin email error:", err);
    return NextResponse.json(
      { ok: false, error: "Failed to send email" },
      { status: 500 },
    );
  }
}
