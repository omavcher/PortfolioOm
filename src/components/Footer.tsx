import Link from "next/link";
import { Github, Linkedin, Code, Heart, MapPin, Mail, ArrowUpRight, Zap } from "lucide-react";

const NAV_COLS = [
  {
    title: "Work",
    links: [
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Case Studies", href: "/case-studies" },
    ],
  },
  {
    title: "Writing",
    links: [
      { label: "Blogs", href: "/blogs" },
      { label: "Research", href: "/research" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "Resume", href: "/resume" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIALS = [
  { icon: <Github size={15} />, href: "https://github.com/omavcher", label: "GitHub" },
  { icon: <Linkedin size={15} />, href: "https://linkedin.com/in/omawchar", label: "LinkedIn" },
  { icon: <Code size={15} />, href: "https://leetcode.com/u/omavcher/", label: "LeetCode" },
  { icon: <Mail size={15} />, href: "mailto:omavchar@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t-2 border-black">

      {/* ── Top CTA bar ── */}
      <div className="border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-1">Available for</p>
            <h3 className="handwritten text-2xl sm:text-3xl font-bold text-white leading-tight">
              Internships · Freelance · Collaboration
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 shrink-0">
            <a href="mailto:omavchar@gmail.com"
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-black font-mono font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 transition-all">
              <Mail size={12} /> Email Me
            </a>
            <Link href="/resume"
              className="flex items-center justify-center gap-2 px-5 py-2.5 border border-slate-700 font-mono font-black text-[9px] uppercase tracking-widest text-slate-300 hover:text-white hover:border-white transition-all">
              <ArrowUpRight size={12} /> Resume
            </Link>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-10 sm:py-14">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand column */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="handwritten text-2xl font-bold text-white mb-2">Om Avchar</h4>
            <p className="font-mono text-[9px] text-slate-500 leading-relaxed mb-1">
              Backend Engineer · AI Builder<br />System Designer
            </p>
            <p className="font-mono text-[9px] text-slate-600 flex items-center gap-1 mb-5">
              <MapPin size={9} /> Nagpur, Maharashtra
            </p>

            {/* Socials */}
            <div className="flex gap-2 flex-wrap">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-8 h-8 border border-slate-700 flex items-center justify-center text-slate-500 hover:text-white hover:border-white transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav link columns */}
          {NAV_COLS.map((col) => (
            <div key={col.title}>
              <h5 className="font-mono text-[8px] font-black uppercase tracking-[0.3em] text-slate-600 mb-4">
                {col.title}
              </h5>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="font-mono text-[10px] text-slate-400 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1 group">
                      <span className="w-1 h-1 rounded-full bg-slate-700 group-hover:bg-white transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Stats bar ── */}
        <div className="mt-10 sm:mt-12 py-6 border-y border-slate-800 grid grid-cols-3 gap-4 text-center">
          {[
            { val: "550K+", label: "Users Served" },
            { val: "3,769+", label: "GitHub Commits" },
            { val: "5+", label: "Hackathon Wins" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-lg sm:text-2xl font-black text-white">{s.val}</div>
              <div className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-slate-600 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Bottom row ── */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[8px] text-slate-700 uppercase tracking-widest text-center sm:text-left">
            © 2026 Om Avchar · Built in Nagpur 🇮🇳
          </p>
          <p className="font-mono text-[8px] text-slate-700 uppercase tracking-widest flex items-center gap-1.5">
            Made with <Heart size={9} className="text-red-500" /> using Next.js + MDX
          </p>
        </div>
      </div>
    </footer>
  );
}