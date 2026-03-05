import { SellerSidebar } from "@/components/SellerSidebar";
import SellerGuard from "@/components/SellerGuard";

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <SellerGuard>
      <div className="flex min-h-screen bg-slate-950">
        <SellerSidebar />
        <main className="flex-1 ml-64 overflow-y-auto">
          <div className="p-8">
            {children}
          </div>
        </main>
      </div>
    </SellerGuard>
  );
}