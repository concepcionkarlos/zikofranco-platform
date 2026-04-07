import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen" style={{ background: "#0b0b0c" }}>
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8" style={{ color: "#f2efe9" }}>
        {children}
      </main>
    </div>
  );
}
