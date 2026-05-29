"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/#intro", icon: "person", label: "Intro" },
  { href: "/#expertise", icon: "architecture", label: "Expertise" },
  { href: "/#career", icon: "work_history", label: "Career" },
  { href: "/#stats", icon: "terminal", label: "Stats" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!isHome) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 bg-[#f8f9ff] border-t border-[#c6c6cd]/20 shadow-[0_-4px_12px_rgba(0,0,0,0.02)] h-16 md:hidden"
      aria-label="Mobile navigation"
    >
      {NAV.map(({ href, icon, label }) => (
        <Link
          key={label}
          href={href}
          className="flex flex-col items-center justify-center gap-0.5 text-[#45464d] pt-2"
        >
          <span className="material-symbols-outlined text-xl">{icon}</span>
          <span className="font-mono text-[10px] tracking-widest">{label}</span>
        </Link>
      ))}
    </nav>
  );
}
