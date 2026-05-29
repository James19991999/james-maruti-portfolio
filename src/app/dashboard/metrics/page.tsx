"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { subscribeToMetrics, upsertMetrics } from "@/lib/firestore";
import MetricCard from "@/components/MetricCard";

const DEFAULTS = { sitespeedImprovement: 40, satisfactionRate: 95, customAssets: 60, followers: 5486, connections: 500 };

export default function MetricsPage() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState(DEFAULTS);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    return subscribeToMetrics(user.uid, (m) => {
      if (m) { const d = m as typeof DEFAULTS; setMetrics(d); setForm(d); }
    });
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    await upsertMetrics(user.uid, form as Record<string, unknown>);
    setSaving(false); setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    setEditing(false);
  };

  return (
    <main className="flex-1 p-6 md:p-10 text-[#d4e4fa]">
      <div className="mb-10 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-1">DASHBOARD</p>
          <h1 className="font-['Hanken_Grotesk'] text-3xl font-bold text-[#d4e4fa]">Metrics</h1>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#adc6ff] text-[#002e6a] font-['Hanken_Grotesk'] font-semibold rounded-lg hover:bg-[#d8e2ff] transition-colors"
        >
          <span className="material-symbols-outlined text-base">{editing ? "save" : "edit"}</span>
          {saving ? "Saving..." : saved ? "Saved!" : editing ? "Save Changes" : "Edit Metrics"}
        </button>
      </div>

      {editing ? (
        <div className="bg-[#0d1c2d] border border-[#424754] rounded-xl p-8">
          <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-6">EDIT METRICS</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Object.entries(form).map(([key, val]) => (
              <div key={key}>
                <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}
                </label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                  className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-8">
            <button onClick={handleSave} disabled={saving}
              className="px-6 py-2.5 bg-[#adc6ff] text-[#002e6a] font-['Hanken_Grotesk'] font-semibold rounded-lg hover:bg-[#d8e2ff] transition-colors disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button onClick={() => setEditing(false)}
              className="px-6 py-2.5 border border-[#424754] text-[#d4e4fa] font-['Hanken_Grotesk'] rounded-lg hover:bg-[#1c2b3c] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard icon="speed" label="SITESPEED IMPROVEMENT" value={`${metrics.sitespeedImprovement}%`} accent />
          <MetricCard icon="thumb_up" label="SATISFACTION RATE" value={`${metrics.satisfactionRate}%`} />
          <MetricCard icon="palette" label="CUSTOM ASSETS" value={`${metrics.customAssets}+`} />
          <MetricCard icon="group" label="FOLLOWERS" value={Number(metrics.followers).toLocaleString()} />
          <MetricCard icon="hub" label="CONNECTIONS" value={`${metrics.connections}+`} />
        </div>
      )}
    </main>
  );
}
