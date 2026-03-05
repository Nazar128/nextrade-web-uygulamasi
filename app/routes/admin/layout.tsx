import { Sidebar } from "@/components/Sidebar";
import AdminGuard from "@/components/AdminGuard";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />
      <main className="flex-1 ml-80 overflow-y-auto">
        {children}
      </main>
    </div>
    </AdminGuard>
  );
}