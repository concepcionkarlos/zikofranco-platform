import Link from "next/link";
import { MerchForm } from "@/components/admin/MerchForm";

export default function NewMerchPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/admin/merch" className="text-xs mb-2 inline-block" style={{ color: "rgba(242,239,233,0.4)" }}>
          ← Back to Merch
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add Merch Item</h1>
      </div>
      <div
        className="rounded-2xl p-4 sm:p-6"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <MerchForm mode="create" />
      </div>
    </div>
  );
}
