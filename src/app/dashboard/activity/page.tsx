"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeToActivityLogs } from "@/lib/firestore";

const ACTION_ICONS: Record<string, string> = {
  login: "login",
  logout: "logout",
  signup: "person_add",
  profile_update: "manage_accounts",
  metric_update: "bar_chart",
};

function formatMetadata(metadata: unknown): string {
  if (!metadata || typeof metadata !== "object") return "";
  const keys = Object.keys(metadata as Record<string, unknown>);
  if (keys.length === 0) return "";
  return JSON.stringify(metadata);
}

export default function ActivityPage() {
  const { user } = useAuth();
  const [logs, setLogs] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (!user) return;
    return subscribeToActivityLogs(user.uid, setLogs);
  }, [user]);

  return (
    <main className="flex-1 p-6 md:p-10 text-[#d4e4fa]">
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-1">DASHBOARD</p>
        <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#d4e4fa]">Activity Log</h1>
        <p className="text-[#c2c6d6] mt-2 font-['Hanken_Grotesk']">
          Real-time log of all account actions. Updates automatically via Firestore subscription.
        </p>
      </div>

      <div className="bg-[#0d1c2d] border border-[#424754] rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#424754] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6]">LIVE FEED</span>
        </div>

        {logs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <span className="material-symbols-outlined text-5xl text-[#424754]">history</span>
            <p className="text-[#8c909f] font-['Hanken_Grotesk']">No activity recorded yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#424754]/50">
            {logs.map((log) => {
              const ts = log.timestamp
                ? new Date((log.timestamp as { seconds: number }).seconds * 1000)
                : null;
              const icon = ACTION_ICONS[log.action as string] ?? "info";
              const meta = formatMetadata(log.metadata);
              return (
                <div key={log.id as string} className="flex items-center gap-4 px-6 py-4 hover:bg-[#122131] transition-colors">
                  <div className="w-9 h-9 rounded-full bg-[#adc6ff]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#adc6ff] text-base">{icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Hanken_Grotesk'] text-sm text-[#d4e4fa] capitalize font-medium">
                      {(log.action as string).replace(/_/g, " ")}
                    </p>
                    {meta && (
                      <p className="font-mono text-[10px] tracking-widest text-[#8c909f] mt-0.5">{meta}</p>
                    )}
                  </div>
                  <div className="text-right flex-shrink-0">
                    {ts && (
                      <>
                        <p className="font-mono text-[10px] tracking-widest text-[#8c909f]">
                          {ts.toLocaleDateString()}
                        </p>
                        <p className="font-mono text-[10px] tracking-widest text-[#424754]">
                          {ts.toLocaleTimeString()}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
