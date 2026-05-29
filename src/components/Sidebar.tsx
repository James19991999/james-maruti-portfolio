"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { href: "/dashboard", icon: "dashboard", label: "Overview" },
  { href: "/dashboard/metrics", icon: "bar_chart", label: "Metrics" },
  { href: "/dashboard/activity", icon: "history", label: "Activity" },
  { href: "/dashboard/settings", icon: "settings", label: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  return (
    <aside className="hidden md:flex flex-col w-64 min-h-screen bg-[#131b2e] text-white border-r border-white/10 fixed top-0 left-0 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#fd9e70]">architecture</span>
          <span className="font-mono text-xs tracking-[0.2em] font-medium">JAMES MARUTI</span>
        </Link>
      </div>

      {/* User info */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#fd9e70]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#fd9e70] text-base">person</span>
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold truncate">{profile?.displayName ?? "James Maruti"}</p>
            <p className="font-mono text-[10px] tracking-widest text-white/50 truncate">
              {profile?.role?.toUpperCase() ?? "USER"}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1" aria-label="Dashboard navigation">
        {NAV.map(({ href, icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                active
                  ? "bg-[#fd9e70]/20 text-[#fd9e70]"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
              aria-current={active ? "page" : undefined}
            >
              <span className={`material-symbols-outlined text-xl ${active ? "active-nav-link" : ""}`}>
                {icon}
              </span>
              <span className="font-mono text-xs tracking-widest">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors w-full"
        >
          <span className="material-symbols-outlined text-xl">logout</span>
          <span className="font-mono text-xs tracking-widest">LOGOUT</span>
        </button>
      </div>
    </aside>
  );
}
