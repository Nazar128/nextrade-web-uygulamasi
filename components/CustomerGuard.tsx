"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CustomerGuard({ children }: { children: React.ReactNode }) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || (role !== "customer" && role !== "admin")) {
        router.push("/routes/login");
      }
    }
  }, [user, role, loading, router]);

  if (loading || !user || (role !== "customer" && role !== "admin")) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Yetki Kontrol Ediliyor</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}