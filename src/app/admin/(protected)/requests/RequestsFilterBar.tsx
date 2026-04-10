"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";

interface Props {
  statuses: string[];
  currentStatus: string;
  currentSearch: string;
  currentSort: string;
}

const SORT_OPTIONS = [
  { value: "createdAt_desc", label: "Newest first" },
  { value: "createdAt_asc", label: "Oldest first" },
  { value: "name_asc", label: "Name A–Z" },
  { value: "status_asc", label: "Status" },
];

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(255,255,255,0.09)",
  color: "#f2efe9",
};

export function RequestsFilterBar({ statuses, currentStatus, currentSearch, currentSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`);
      });
    },
    [router, pathname, searchParams],
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search — full width on mobile */}
      <input
        type="text"
        defaultValue={currentSearch}
        placeholder="Search name, email, event…"
        className="w-full sm:flex-1 rounded-xl px-4 py-2.5 text-sm outline-none"
        style={inputStyle}
        onChange={(e) => updateParams({ search: e.target.value })}
      />

      {/* Status + sort — side by side on mobile */}
      <div className="flex gap-3">
        <select
          value={currentStatus}
          onChange={(e) => updateParams({ status: e.target.value })}
          className="flex-1 sm:flex-none rounded-xl px-3 py-2.5 text-sm outline-none"
          style={inputStyle}
        >
          {statuses.map((s) => (
            <option key={s} value={s} style={{ background: "#111113" }}>
              {s === "ALL" ? "All statuses" : s.charAt(0) + s.slice(1).toLowerCase()}
            </option>
          ))}
        </select>

        <select
          value={currentSort}
          onChange={(e) => updateParams({ sort: e.target.value })}
          className="flex-1 sm:flex-none rounded-xl px-3 py-2.5 text-sm outline-none"
          style={inputStyle}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value} style={{ background: "#111113" }}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
