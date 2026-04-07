import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ShowForm } from "@/components/admin/ShowForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditShowPage({ params }: PageProps) {
  const { id } = await params;
  const show = await prisma.show.findUnique({ where: { id } });
  if (!show) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/admin/shows" className="text-xs mb-2 inline-block" style={{ color: "rgba(242,239,233,0.4)" }}>
          ← Back to Shows
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit Show</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>
          {show.venue} — {show.city}
        </p>
      </div>
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <ShowForm
          mode="edit"
          initial={{
            id: show.id,
            date: show.date.toISOString(),
            venue: show.venue,
            city: show.city,
            country: show.country,
            type: show.type,
            status: show.status,
            ticketUrl: show.ticketUrl ?? "",
          }}
        />
      </div>
    </div>
  );
}
