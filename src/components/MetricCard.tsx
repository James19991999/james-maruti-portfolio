import type { ReactNode } from "react";

type MetricCardProps = {
  icon: string;
  label: string;
  value: string | number;
  sublabel?: string;
  accent?: boolean;
};

export default function MetricCard({ icon, label, value, sublabel, accent }: MetricCardProps) {
  return (
    <div
      className={`p-8 rounded-xl border flex flex-col gap-4 transition-transform duration-300 hover:-translate-y-1 ${
        accent
          ? "bg-[#131b2e] border-transparent text-white"
          : "bg-[#f8f9ff] border-[#c6c6cd]/30 text-[#0d1c2e]"
      }`}
    >
      <span
        className={`material-symbols-outlined text-3xl ${accent ? "text-[#fd9e70]" : "text-[#45464d]"}`}
      >
        {icon}
      </span>
      <div>
        <p
          className={`font-mono text-[10px] tracking-[0.2em] mb-1 ${
            accent ? "text-[#c6c6cd]" : "text-[#45464d]"
          }`}
        >
          {label}
        </p>
        <p className={`font-['Hanken_Grotesk'] text-4xl font-bold ${accent ? "text-[#fd9e70]" : "text-[#000000]"}`}>
          {value}
        </p>
        {sublabel && (
          <p className={`font-mono text-[10px] tracking-widest mt-1 opacity-60`}>{sublabel}</p>
        )}
      </div>
    </div>
  );
}
