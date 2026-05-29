"use client";
import { useState } from "react";
import TopBar from "@/components/TopBar";
import { submitContact } from "@/lib/firestore";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true); setError("");
    try {
      await submitContact(form);
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <TopBar />
      <div className="min-h-screen bg-[#051424] text-[#d4e4fa] pt-16 architectural-grid">
        <main className="max-w-[1280px] mx-auto px-5 py-20 grid md:grid-cols-2 gap-16 items-start">
          {/* Left — info */}
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#f2bc8e] mb-4">GET IN TOUCH</p>
            <h1 className="font-['Hanken_Grotesk'] text-4xl md:text-5xl font-bold text-[#d4e4fa] mb-6 leading-tight">
              Let&apos;s Build Something Precise
            </h1>
            <p className="font-['Hanken_Grotesk'] text-lg text-[#c2c6d6] leading-relaxed mb-12">
              Whether you have a complex system to architect, a brand to design, or a digital presence to scale — I&apos;m ready to engage with precision.
            </p>

            <div className="space-y-6">
              {[
                { icon: "mail", label: "EMAIL", value: "james@jgcreativetech.com" },
                { icon: "location_on", label: "LOCATION", value: "Nairobi, Kenya" },
                { icon: "schedule", label: "AVAILABILITY", value: "Open to opportunities" },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#f2bc8e]/10 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#f2bc8e] text-base">{icon}</span>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] text-[#8c909f]">{label}</p>
                    <p className="font-['Hanken_Grotesk'] text-[#d4e4fa]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-[#0d1c2d] border border-[#424754] rounded-xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 gap-6 text-center">
                <div className="w-16 h-16 rounded-full bg-[#34A853]/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-[#34A853]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <h2 className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#d4e4fa]">Message Sent</h2>
                <p className="text-[#c2c6d6] font-['Hanken_Grotesk']">I&apos;ll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="px-6 py-2.5 border border-[#424754] text-[#d4e4fa] rounded-lg hover:bg-[#1c2b3c] transition-colors font-['Hanken_Grotesk']">
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-8">SEND MESSAGE</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { label: "YOUR NAME", key: "name", type: "text", placeholder: "James Doe" },
                    { label: "EMAIL ADDRESS", key: "email", type: "email", placeholder: "you@example.com" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">{label}</label>
                      <input
                        type={type}
                        value={form[key as keyof typeof form]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        required
                        placeholder={placeholder}
                        className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block font-mono text-[10px] tracking-[0.2em] text-[#c2c6d6] mb-2">MESSAGE</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      required
                      rows={5}
                      placeholder="Describe your project or inquiry..."
                      className="w-full bg-[#122131] border border-[#424754] rounded-lg px-4 py-3 text-[#d4e4fa] font-['Hanken_Grotesk'] focus:outline-none focus:border-[#adc6ff] transition-colors resize-none"
                    />
                  </div>
                  {error && <p className="text-[#ffb4ab] font-['Hanken_Grotesk'] text-sm">{error}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2 bg-[#adc6ff] text-[#002e6a] font-['Hanken_Grotesk'] font-semibold py-3 rounded-lg hover:bg-[#d8e2ff] transition-colors disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-base">send</span>
                    {sending ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
