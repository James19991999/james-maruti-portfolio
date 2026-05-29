"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeToMetrics, subscribeToActivityLogs } from "@/lib/firestore";
import MetricCard from "@/components/MetricCard";

const DEFAULT_METRICS = {
  sitespeedImprovement: 40,
  satisfactionRate: 95,
  customAssets: 60,
  followers: 5486,
  connections: 500,
};

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const [metrics, setMetrics] = useState<Record<string, unknown>>(DEFAULT_METRICS);
  const [logs, setLogs] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    if (!user) return;
    const unsub1 = subscribeToMetrics(user.uid, (m) => { if (m) setMetrics(m); });
    const unsub2 = subscribeToActivityLogs(user.uid, setLogs);
    return () => { unsub1(); unsub2(); };
  }, [user]);

  return (
    <main className="flex-1 p-6 md:p-10 text-[#d4e4fa]" aria-label="Dashboard overview">
      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-1">WELCOME BACK</p>
        <h1 className="font-['Hanken_Grotesk'] text-3xl md:text-4xl font-bold text-[#d4e4fa]">
          {profile?.displayName ?? user?.email ?? "James Maruti"}
        </h1>
        <p className="text-[#c2c6d6] mt-2 font-['Hanken_Grotesk']">
          Here&apos;s your professional performance overview.
        </p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <MetricCard icon="speed" label="SITESPEED IMPROVEMENT" value={`${metrics.sitespeedImprovement}%`} accent />
        <MetricCard icon="thumb_up" label="SATISFACTION RATE" value={`${metrics.satisfactionRate}%`} />
        <MetricCard icon="palette" label="CUSTOM ASSETS" value={`${metrics.customAssets}+`} />
        <MetricCard icon="group" label="FOLLOWERS" value={Number(metrics.followers).toLocaleString()} />
        <MetricCard icon="hub" label="CONNECTIONS" value={`${metrics.connections}+`} />
        <MetricCard icon="verified" label="ROLE" value={profile?.role?.toUpperCase() ?? "USER"} sublabel="ACCESS LEVEL" />
      </div>

      {/* Activity Log */}
      <div className="bg-[#0d1c2d] border border-[#424754] rounded-xl p-6">
        <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-6">RECENT ACTIVITY</h2>
        {logs.length === 0 ? (
          <p className="text-[#8c909f] font-['Hanken_Grotesk'] text-sm">No activity logged yet.</p>
        ) : (
          <div className="space-y-3">
            {logs.map((log) => (
              <div key={log.id as string} className="flex items-center gap-4 py-3 border-b border-[#424754]/50 last:border-0">
                <div className="w-8 h-8 rounded-full bg-[#adc6ff]/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[#adc6ff] text-base">
                    {log.action === "login" ? "login" : log.action === "logout" ? "logout" : "update"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Hanken_Grotesk'] text-sm text-[#d4e4fa] capitalize">{log.action as string}</p>
                  <p className="font-mono text-[10px] tracking-widest text-[#8c909f]">
                    {log.timestamp ? new Date((log.timestamp as { seconds: number }).seconds * 1000).toLocaleString() : "Just now"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
