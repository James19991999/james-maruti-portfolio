"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUserProfile } from "@/lib/firestore";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SettingsPage() {
  const { user, profile } = useAuth();
  const [displayName, setDisplayName] = useState(profile?.displayName ?? "");
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [status, setStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [saving, setSaving] = useState(false);

  const handleProfileSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateUserProfile(user.uid, { displayName });
      setStatus({ type: "success", msg: "Profile updated successfully." });
    } catch {
      setStatus({ type: "error", msg: "Failed to update profile." });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 3000);
    }
  };

  const handlePasswordChange = async () => {
    if (!user || !user.email) return;
    setSaving(true);
    try {
      const cred = EmailAuthProvider.credential(user.email, currentPw);
      await reauthenticateWithCredential(user, cred);
      await updatePassword(user, newPw);
      setCurrentPw(""); setNewPw("");
      setStatus({ type: "success", msg: "Password updated successfully." });
    } catch (e: unknown) {
      setStatus({ type: "error", msg: e instanceof Error ? e.message : "Password change failed." });
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(null), 4000);
    }
  };

  return (
    <main className="flex-1 p-6 md:p-10 text-[#d4e4fa]">
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-1">DASHBOARD</p>
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#d4e4fa]">Settings</h1>
      </div>

      {status && (
        <div className={`mb-6 px-4 py-3 rounded-lg font-['Hanken_Grotesk'] text-sm ${
          status.type === "success"
            ? "bg-[#34A853]/10 border border-[#34A853] text-[#34A853]"
            : "bg-[#93000a]/20 border border-[#ffb4ab] text-[#ffb4ab]"
        }`}>
          {status.msg}
        </div>
      )}

      <div className="space-y-8 max-w-xl">
        {/* Profile Info */}
        <section className="bg-[#0d1c2d] border border-[#424754] rounded-xl p-8">
          <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-6">PROFILE INFORMATION</h2>
          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">DISPLAY NAME</label>
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">EMAIL</label>
              <input
                value={user?.email ?? ""}
                disabled
                className="w-full bg-[#122131]/50 border border-[#424754]/50 rounded-lg px-4 py-3 text-[#8c909f] font-['Hanken_Grotesk'] cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">ROLE</label>
              <input
                value={profile?.role?.toUpperCase() ?? "USER"}
                disabled
                className="w-full bg-[#122131]/50 border border-[#424754]/50 rounded-lg px-4 py-3 text-[#8c909f] font-['Hanken_Grotesk'] cursor-not-allowed"
              />
            </div>
            <button
              onClick={handleProfileSave}
              disabled={saving}
              className="px-6 py-2.5 bg-[#adc6ff] text-[#002e6a] font-['Hanken_Grotesk'] font-semibold rounded-lg hover:bg-[#d8e2ff] transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </div>
        </section>

        {/* Change Password */}
        <section className="bg-[#0d1c2d] border border-[#424754] rounded-xl p-8">
          <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-6">CHANGE PASSWORD</h2>
          <div className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">CURRENT PASSWORD</label>
              <input
                type="password"
                value={currentPw}
                onChange={(e) => setCurrentPw(e.target.value)}
                className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">NEW PASSWORD</label>
              <input
                type="password"
                value={newPw}
                onChange={(e) => setNewPw(e.target.value)}
                className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                placeholder="min. 6 characters"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              disabled={saving || !currentPw || !newPw}
              className="px-6 py-2.5 bg-[#66411d] text-[#f2bc8e] font-['Hanken_Grotesk'] font-semibold rounded-lg hover:bg-[#7a4e23] transition-colors disabled:opacity-50"
            >
              Update Password
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
