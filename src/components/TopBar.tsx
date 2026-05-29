"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TopBar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isPortfolio = pathname === "/" || pathname === "/portfolio";

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f8f9ff]/80 backdrop-blur-md border-b border-[#c6c6cd]/30 h-16">
      <div className="flex justify-between items-center px-5 h-full w-full max-w-[1280px] mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#000000]">architecture</span>
          <span className="font-mono text-xs tracking-[0.2em] font-medium text-[#000000]">JAMES MARUTI</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#expertise" className="font-mono text-xs tracking-widest text-[#45464d] hover:text-[#000000] transition-colors">
            EXPERTISE
          </Link>
          <Link href="/#career" className="font-mono text-xs tracking-widest text-[#45464d] hover:text-[#000000] transition-colors">
            CAREER
          </Link>
          <Link href="/#stats" className="font-mono text-xs tracking-widest text-[#45464d] hover:text-[#000000] transition-colors">
            STATS
          </Link>
          <Link href="/contact" className="font-mono text-xs tracking-widest text-[#45464d] hover:text-[#000000] transition-colors">
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="font-mono text-xs tracking-widest px-4 py-2 bg-[#000000] text-white rounded hover:opacity-80 transition-opacity"
              >
                DASHBOARD
              </Link>
              <button
                onClick={logout}
                className="font-mono text-xs tracking-widest text-[#45464d] hover:text-[#000000] transition-colors"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className="font-mono text-xs tracking-widest px-4 py-2 border border-[#000000] text-[#000000] rounded hover:bg-[#000000] hover:text-white transition-colors"
            >
              SIGN IN
            </Link>
          )}
          <span className="material-symbols-outlined text-[#000000] cursor-pointer hover:opacity-70 transition-opacity" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified
          </span>
        </div>
      </div>
    </header>
  );
}
