import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MerchForm } from "@/components/admin/MerchForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMerchPage({ params }: PageProps) {
  const { id } = await params;
  const item = await prisma.merchItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/admin/merch" className="text-xs mb-2 inline-block" style={{ color: "rgba(242,239,233,0.4)" }}>
          ← Back to Merch
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Edit Item</h1>
        <p className="text-sm mt-1" style={{ color: "rgba(242,239,233,0.45)" }}>{item.name}</p>
      </div>
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <MerchForm
          mode="edit"
          initial={{
            id: item.id,
            name: item.name,
            price: item.price,
            description: item.description ?? "",
            image: item.image ?? "",
            category: item.category ?? "",
            inStock: item.inStock,
            isVisible: item.isVisible,
          }}
        />
      </div>
    </div>
  );
}
