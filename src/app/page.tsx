import TopBar from "@/components/TopBar";
import BottomNav from "@/components/BottomNav";
import Image from "next/image";

const PORTRAIT_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAm9WjW2i2s5Ix0FOfat2jiL78GFS-jgrJYLgzeIjxvZfKypAgqD_yjNsfXteeldZUrq7a5t0bkK-upXvgh5yOaAPtUMKNTeaAkYzAaClkO1gjBrQp6lPm3KsjtswhCnAUAgRCsHbk9Hu6Nq7EbWHX6nb7mnKjzEaUZ5Y9aablHmYrU1yvjwReparnfRiIFYp6gHRTscErC3xDt1xaxo_iFy0xKzS6Nmk4LxyjuUL-fQLV7Zfus8V-VQBE1TuGP6v_y5YMjh6cniCnV";
const WORKSPACE_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBtid6auET4w0K1VEvNikbV836b4tea92HGYx1IOh_I10X4NfyNh2JruDPHkqVbbFUgaeUk-9RaN4WBJe1Lqi57NN_7A8BiQSF1AAGIOBWBpcvgvW00kcxukTYJ6nCWQUEw8dv1kdUrM6HeJ2BZRkiFUT2iAperC5OLLdThQ2iN3Zs6pUOSJ5H1d2ne6mWN5QDvKzYGHS7XK2FdMYOSLQdxW-k03NnB8o0zZigSSYC6B4z7oEhan-f9sT77VRUAss6ZtWNBk4WF6cW1";

const SERVICES = [
  {
    icon: "design_services",
    title: "User Experience Design (UED)",
    desc: "End-to-end UX research, wire-framing, prototyping and validation for web and mobile products.",
    wide: true,
  },
  {
    icon: "code",
    title: "Frontend Architecture",
    desc: "React, Next.js, TypeScript — performant, accessible frontends.",
    wide: false,
  },
  {
    icon: "php",
    title: "WordPress Design",
    desc: "Custom high-performance WordPress ecosystems.",
    wide: false,
  },
  {
    icon: "bar_chart",
    title: "Business Analytics",
    desc: "Translating data into actionable design pivots.",
    wide: false,
  },
  {
    icon: "search",
    title: "Advanced SEO",
    desc: "Technical optimization for search engine dominance.",
    wide: false,
  },
];

const TIMELINE = [
  {
    title: "Website/Graphic Designer",
    company: "JG Creative Tech Solution",
    desc: "Improved site speed by 40%, 25% increase in visibility.",
    period: "Nov 2025 – Present",
    accent: true,
  },
  {
    title: "Graphic Designer / Digital Marketer",
    company: "JayGraphics Family",
    desc: "Created 60+ custom assets with a 95% satisfaction rate.",
    period: "Feb 2025 – Nov 2025",
    accent: false,
  },
  {
    title: "Financial Advisor",
    company: "Prudential plc",
    desc: "Strategic financial planning and risk assessment.",
    period: "Feb 2025 – Apr 2025",
    accent: false,
  },
  {
    title: "Graphic Designer",
    company: "Phloem Media",
    desc: "",
    period: "May 2024 – Dec 2024",
    accent: false,
  },
];

const SKILLS = [
  { label: "React", variant: "primary" },
  { label: "Next.js", variant: "primary" },
  { label: "TypeScript", variant: "outline" },
  { label: "TailwindCSS", variant: "outline" },
  { label: "WordPress", variant: "secondary" },
  { label: "Webflow", variant: "secondary" },
  { label: "SEO Optimization", variant: "surface" },
  { label: "Graphic Design", variant: "surface" },
  { label: "Data Analysis", variant: "surface" },
];

export default function HomePage() {
  return (
    <>
      <TopBar />
      <main className="pt-16 pb-24 overflow-x-hidden">

        {/* ── Hero ── */}
        <section id="intro" className="px-5 py-12 md:py-16 flex flex-col items-center text-center">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-[#fd9e70] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity rounded-full" />
            <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#c6c6cd] p-1 bg-[#f8f9ff]">
              <img
                src={PORTRAIT_URL}
                alt="James Maruti – Professional portrait"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
          <div className="max-w-2xl mx-auto animate-fadeInUp">
            <h1 className="font-['Hanken_Grotesk'] text-[40px] md:text-[64px] font-bold text-[#000000] leading-tight tracking-tight mb-4">
              James Maruti
            </h1>
            <p className="font-mono text-xs tracking-[0.2em] text-[#944a23] mb-6 uppercase">
              UI/UX, Web &amp; Mobile Design
            </p>
            <p className="font-['Hanken_Grotesk'] text-xl text-[#45464d] mb-8 leading-relaxed">
              Architecting Scalable Systems and Technical Precision | Helping Ventures Scale with Clean Code &amp; Advanced SEO.
            </p>
            <div className="flex flex-wrap justify-center gap-8 py-6 border-y border-[#c6c6cd]/20">
              <div className="flex flex-col items-center">
                <span className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#000000]">5,486</span>
                <span className="font-mono text-[10px] tracking-widest text-[#45464d]">FOLLOWERS</span>
              </div>
              <div className="w-px h-10 bg-[#c6c6cd]/30 hidden sm:block" />
              <div className="flex flex-col items-center">
                <span className="font-['Hanken_Grotesk'] text-2xl font-semibold text-[#000000]">500+</span>
                <span className="font-mono text-[10px] tracking-widest text-[#45464d]">CONNECTIONS</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── About / Blueprint ── */}
        <section className="px-5 py-16 bg-[#eff4ff]">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#944a23] mb-4">THE BLUEPRINT</h2>
              <h3 className="font-['Hanken_Grotesk'] text-3xl font-semibold text-[#000000] mb-6">
                Bridging Technical Architecture and Human Experience
              </h3>
              <div className="space-y-4 font-['Inter'] text-lg text-[#45464d]">
                <p>
                  With a foundation in media psychology and communication, I approach digital design
                  as the construction of an ecosystem rather than just a visual layer.
                </p>
                <p>
                  I specialize in building bridges between complex backend architectures and intuitive
                  human interfaces, ensuring that every pixel serves a psychological and functional purpose.
                </p>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl border border-[#c6c6cd]/30 bg-white p-2 aspect-video">
              <img
                src={WORKSPACE_URL}
                alt="Clean minimalist high-tech workspace with dual monitors showing UI blueprints"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </section>

        {/* ── Services (Bento) ── */}
        <section id="expertise" className="px-5 py-20 max-w-[1280px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#944a23] mb-2">SERVICES</h2>
            <h3 className="font-['Hanken_Grotesk'] text-3xl font-semibold text-[#000000]">Precision-Driven Capabilities</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Wide card */}
            <div className="md:col-span-2 p-8 bg-[#d5e3fc] border border-[#c6c6cd]/30 rounded-xl flex flex-col justify-between group hover:-translate-y-1 transition-transform duration-300">
              <span className="material-symbols-outlined text-4xl text-[#944a23] mb-6 group-hover:scale-110 transition-transform">design_services</span>
              <div>
                <h4 className="font-['Hanken_Grotesk'] text-2xl font-semibold mb-2">User Experience Design (UED)</h4>
                <p className="text-[#45464d] font-['Inter']">End-to-end UX research, wire-framing, prototyping and validation for web and mobile products.</p>
              </div>
            </div>
            {/* Frontend */}
            <div className="p-8 bg-[#f8f9ff] border border-[#c6c6cd]/30 rounded-xl hover:border-[#944a23] transition-colors group hover:-translate-y-1 duration-300">
              <span className="material-symbols-outlined text-4xl text-[#45464d] mb-6 group-hover:text-[#944a23] transition-colors">code</span>
              <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-2">Frontend Architecture</h4>
              <p className="text-[#45464d] font-['Inter'] text-sm">React, Next.js, TypeScript — performant, accessible frontends.</p>
            </div>
            <div className="p-8 bg-[#f8f9ff] border border-[#c6c6cd]/30 rounded-xl hover:border-[#944a23] transition-colors group hover:-translate-y-1 duration-300">
              <span className="material-symbols-outlined text-4xl text-[#45464d] mb-6 group-hover:text-[#944a23] transition-colors">public</span>
              <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-2">WordPress Design</h4>
              <p className="text-[#45464d] font-['Inter'] text-sm">Custom high-performance WordPress ecosystems.</p>
            </div>
            <div className="p-8 bg-[#f8f9ff] border border-[#c6c6cd]/30 rounded-xl hover:border-[#944a23] transition-colors group hover:-translate-y-1 duration-300">
              <span className="material-symbols-outlined text-4xl text-[#45464d] mb-6 group-hover:text-[#944a23] transition-colors">bar_chart</span>
              <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-2">Business Analytics</h4>
              <p className="text-[#45464d] font-['Inter'] text-sm">Translating data into actionable design pivots.</p>
            </div>
            <div className="p-8 bg-[#f8f9ff] border border-[#c6c6cd]/30 rounded-xl hover:border-[#944a23] transition-colors group hover:-translate-y-1 duration-300">
              <span className="material-symbols-outlined text-4xl text-[#45464d] mb-6 group-hover:text-[#944a23] transition-colors">search</span>
              <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold mb-2">Advanced SEO</h4>
              <p className="text-[#45464d] font-['Inter'] text-sm">Technical optimization for search engine dominance.</p>
            </div>
          </div>
        </section>

        {/* ── Stats Bar ── */}
        <section id="stats" className="px-5 py-16 bg-[#000000] text-white">
          <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row justify-around items-center gap-12 text-center">
            <div>
              <span className="block font-['Hanken_Grotesk'] text-[64px] font-bold text-[#fd9e70] leading-none">40%</span>
              <p className="font-mono text-[10px] tracking-[0.2em] opacity-70 mt-2">SITESPEED IMPROVEMENT</p>
            </div>
            <div className="w-20 h-px md:w-px md:h-20 bg-white opacity-20" />
            <div>
              <span className="block font-['Hanken_Grotesk'] text-[64px] font-bold text-[#fd9e70] leading-none">95%</span>
              <p className="font-mono text-[10px] tracking-[0.2em] opacity-70 mt-2">SATISFACTION RATE</p>
            </div>
            <div className="w-20 h-px md:w-px md:h-20 bg-white opacity-20" />
            <div>
              <span className="block font-['Hanken_Grotesk'] text-[64px] font-bold text-[#fd9e70] leading-none">60+</span>
              <p className="font-mono text-[10px] tracking-[0.2em] opacity-70 mt-2">CUSTOM ASSETS</p>
            </div>
          </div>
        </section>

        {/* ── Career Timeline ── */}
        <section id="career" className="px-5 py-24 max-w-[1280px] mx-auto">
          <div className="mb-16">
            <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#944a23] mb-2">CAREER TIMELINE</h2>
            <h3 className="font-['Hanken_Grotesk'] text-3xl font-semibold text-[#000000]">Experience Path</h3>
          </div>
          <div className="relative space-y-12">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-[#c6c6cd]/30 -translate-x-1/2" />
            {TIMELINE.map((item, i) => {
              const isEven = i % 2 === 0;
              return (
                <div key={i} className="relative flex flex-col md:flex-row items-start md:items-center group">
                  <div className={`md:w-1/2 ${isEven ? "md:pr-12 md:text-right order-2 md:order-1" : "order-1"}`}>
                    {isEven && (
                      <>
                        <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#000000]">{item.title}</h4>
                        <p className="font-mono text-[10px] tracking-widest text-[#944a23] mb-2">{item.company}</p>
                        {item.desc && <p className="text-[#45464d] font-['Inter']">{item.desc}</p>}
                        <span className="inline-block mt-2 font-mono text-[10px] tracking-widest px-3 py-1 bg-[#dce9ff] rounded-full">{item.period}</span>
                      </>
                    )}
                  </div>
                  <div
                    className={`absolute left-6 md:left-1/2 w-3 h-3 rounded-full transform -translate-x-1/2 z-10 border-4 border-[#f8f9ff] group-hover:scale-150 transition-transform ${
                      item.accent ? "bg-[#944a23]" : "bg-[#000000]"
                    } order-1 md:order-2`}
                  />
                  <div className={`md:w-1/2 ${isEven ? "order-3" : "md:pl-12 order-3"}`}>
                    {!isEven && (
                      <>
                        <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#000000]">{item.title}</h4>
                        <p className="font-mono text-[10px] tracking-widest text-[#944a23] mb-2">{item.company}</p>
                        {item.desc && <p className="text-[#45464d] font-['Inter']">{item.desc}</p>}
                        <span className="inline-block mt-2 font-mono text-[10px] tracking-widest px-3 py-1 bg-[#dce9ff] rounded-full">{item.period}</span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Education & Skills ── */}
        <section className="px-5 py-24 bg-[#eff4ff]">
          <div className="max-w-[1280px] mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#944a23] mb-8">EDUCATION</h2>
              <div className="p-8 bg-[#f8f9ff] rounded-xl border border-[#c6c6cd]/30">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-4xl text-[#000000]">school</span>
                  <div>
                    <h4 className="font-['Hanken_Grotesk'] text-xl font-semibold text-[#000000]">Moi University</h4>
                    <p className="text-[#45464d] font-['Inter'] text-lg">Bachelor of Arts in Linguistics, Media and Communication</p>
                    <p className="font-mono text-[10px] tracking-widest text-[#944a23] mt-2">2019 – 2023</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#944a23] mb-8">TECHNICAL STACK</h2>
              <div className="flex flex-wrap gap-3">
                {SKILLS.map(({ label, variant }) => (
                  <span
                    key={label}
                    className={`px-4 py-2 font-mono text-[10px] tracking-widest rounded-full flex items-center gap-2 ${
                      variant === "primary"
                        ? "bg-[#000000] text-white"
                        : variant === "secondary"
                        ? "bg-[#944a23] text-white"
                        : variant === "outline"
                        ? "bg-[#f8f9ff] border border-[#000000] text-[#000000]"
                        : "bg-[#d5e3fc] text-[#000000]"
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="px-5 py-16 text-center border-t border-[#c6c6cd]/20">
          <h2 className="font-mono text-[10px] tracking-[0.4em] text-[#000000] mb-6">JAMES MARUTI</h2>
          <p className="font-['Inter'] text-[#45464d] max-w-md mx-auto mb-8">
            Architecting the future of human-centric digital interfaces through technical precision and media psychology.
          </p>
          <div className="flex justify-center gap-6">
            <a href="mailto:james@example.com" aria-label="Email" className="material-symbols-outlined text-[#45464d] hover:text-[#944a23] transition-colors">mail</a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener" className="material-symbols-outlined text-[#45464d] hover:text-[#944a23] transition-colors">link</a>
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener" className="material-symbols-outlined text-[#45464d] hover:text-[#944a23] transition-colors">hub</a>
          </div>
        </footer>
      </main>
      <BottomNav />
    </>
  );
}
