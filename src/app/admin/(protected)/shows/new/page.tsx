import Link from "next/link";
import { ShowForm } from "@/components/admin/ShowForm";

export default function NewShowPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link href="/admin/shows" className="text-xs mb-2 inline-block" style={{ color: "rgba(242,239,233,0.4)" }}>
          ← Back to Shows
        </Link>
        <h1 className="text-2xl font-bold tracking-tight">Add Show</h1>
      </div>
      <div
        className="rounded-2xl p-6"
        style={{ background: "rgba(18,18,20,0.85)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <ShowForm mode="create" />
      </div>
    </div>
  );
}
