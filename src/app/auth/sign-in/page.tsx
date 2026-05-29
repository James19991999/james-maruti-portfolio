"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#051424] text-[#d4e4fa] flex flex-col architectural-grid">
      {/* Header */}
      <header className="border-b border-white/10 h-16 flex items-center px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#adc6ff]">arrow_back</span>
          <span className="font-['Hanken_Grotesk'] font-bold text-lg text-[#adc6ff] tracking-tight">James Maruti</span>
        </Link>
      </header>

      {/* Auth Card */}
      <main className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-md bg-[#0d1c2d] border border-[#424754] rounded-xl p-8 md:p-10 shadow-2xl">
          <div className="mb-10">
            <h1 className="font-['Hanken_Grotesk'] text-2xl md:text-3xl font-semibold text-[#d4e4fa] mb-2">
              Secure Access
            </h1>
            <p className="text-[#c2c6d6] font-['Hanken_Grotesk']">
              Enter your credentials to manage architectural blueprints and project data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">
                EMAIL ADDRESS
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                placeholder="james@example.com"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-[#ffb4ab] font-['Hanken_Grotesk'] text-sm bg-[#93000a]/20 border border-[#93000a] rounded-lg px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#adc6ff] text-[#002e6a] font-['Hanken_Grotesk'] font-semibold py-3 rounded-lg hover:bg-[#d8e2ff] transition-colors disabled:opacity-50"
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>

            <div className="relative flex items-center gap-4">
              <div className="flex-1 h-px bg-[#424754]" />
              <span className="font-mono text-[10px] tracking-widest text-[#8c909f]">OR</span>
              <div className="flex-1 h-px bg-[#424754]" />
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 border border-[#424754] bg-[#122131] text-[#d4e4fa] font-['Hanken_Grotesk'] py-3 rounded-lg hover:bg-[#1c2b3c] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </form>

          <p className="text-center text-[#c2c6d6] font-['Hanken_Grotesk'] mt-8 text-sm">
            No account?{" "}
            <Link href="/auth/sign-up" className="text-[#adc6ff] hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
