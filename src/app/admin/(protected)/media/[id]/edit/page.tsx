import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import { MediaEditForm } from "./MediaEditForm";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMediaPage({ params }: PageProps) {
  const { id } = await params;
  const item = await prisma.mediaItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <Link
          href="/admin/media"
          className="text-xs mb-3 inline-block hover:opacity-60 transition-opacity"
          style={{ color: "rgba(242,239,233,0.4)" }}
        >
          ← Media
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit Media</h1>
      </div>
      <MediaEditForm item={item} />
    </div>
  );
}
