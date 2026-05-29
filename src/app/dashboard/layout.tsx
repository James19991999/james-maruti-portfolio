"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/auth/sign-in");
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#051424] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="material-symbols-outlined text-5xl text-[#adc6ff] animate-spin">settings</span>
          <p className="font-mono text-xs tracking-widest text-[#c2c6d6]">LOADING SYSTEM...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-[#051424]">
      <Sidebar />
      <div className="flex-1 md:ml-64 flex flex-col">
        {children}
      </div>
    </div>
  );
}
