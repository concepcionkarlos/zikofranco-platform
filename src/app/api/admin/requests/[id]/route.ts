/**
 * GET    /api/admin/requests/[id]  — full lead detail
 * PATCH  /api/admin/requests/[id]  — update status or internalNotes
 * DELETE /api/admin/requests/[id]  — permanently delete request
 */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { LeadStatus } from "@prisma/client";

const VALID_STATUSES = new Set<string>([
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "NEGOTIATING",
  "CONFIRMED",
  "REJECTED",
  "ARCHIVED",
]);

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const lead = await prisma.lead.findUnique({
      where: { id },
      include: {
        activities: { orderBy: { createdAt: "desc" } },
        emailLogs: { orderBy: { sentAt: "desc" } },
      },
    });

    if (!lead) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ ok: true, data: lead });
  } catch (err) {
    console.error("Request detail error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = (await req.json()) as {
      status?: string;
      internalNotes?: string;
    };

    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { ok: false, error: "Not found" },
        { status: 404 },
      );
    }

    const updateData: { status?: LeadStatus; internalNotes?: string } = {};
    const activities: { type: string; content: string }[] = [];

    if (body.status && VALID_STATUSES.has(body.status)) {
      const newStatus = body.status as LeadStatus;
      if (newStatus !== existing.status) {
        updateData.status = newStatus;
        activities.push({
          type: "STATUS_CHANGE",
          content: `Status changed from ${existing.status} to ${newStatus}`,
        });
      }
    }

    if (typeof body.internalNotes === "string") {
      updateData.internalNotes = body.internalNotes;
      if (body.internalNotes !== existing.internalNotes) {
        activities.push({ type: "NOTE_ADDED", content: "Internal notes updated" });
      }
    }

    const [lead] = await prisma.$transaction([
      prisma.lead.update({ where: { id }, data: updateData }),
      ...activities.map((a) =>
        prisma.leadActivity.create({ data: { leadId: id, ...a } }),
      ),
    ]);

    return NextResponse.json({ ok: true, data: lead });
  } catch (err) {
    console.error("Request update error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const existing = await prisma.lead.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ ok: false, error: "Not found" }, { status: 404 });
    }
    await prisma.lead.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Request delete error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
