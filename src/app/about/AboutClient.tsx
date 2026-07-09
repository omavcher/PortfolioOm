"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Download, Github, Linkedin, ArrowRight, ExternalLink,
  Cpu, Heart, Zap, Globe, MapPin, Calendar,
  GraduationCap, Briefcase, Trophy, Star, Mail,
  Terminal, Database, Cloud, Brain, CheckCircle2,
  Code2, Layers, Award, Flame, Users, BarChart3,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { val: "550K+", label: "Users on HeartEcho", icon: <Users size={14} className="text-blue-600" />, accent: "#2563eb" },
  { val: "1,396", label: "LeetCode Rating",    icon: <Flame size={14} className="text-red-600" />, accent: "#dc2626" },
  { val: "~28%",  label: "Page Load Cut",       icon: <BarChart3 size={14} className="text-emerald-600" />, accent: "#059669" },
  { val: "AIR 11",label: "National AI Rank",    icon: <Trophy size={14} className="text-amber-600" />, accent: "#d97706" },
  { val: "3",     label: "Internships",         icon: <Briefcase size={14} className="text-purple-600" />, accent: "#7c3aed" },
];

const EXPERIENCE = [
  {
    role: "Software Development Engineer Intern",
    company: "Bluestock Fintech",
    location: "Remote",
    duration: "Apr 2025 – May 2025",
    accent: "#2563eb",
    bullets: [
      "Implemented 3 backend features in Node.js and React for a live fintech application, each reviewed and merged to the production branch within a 2-week Agile sprint cycle.",
      "Integrated OAuth 2.0 authentication, reducing manual login friction for users; enforced Git branching conventions that cut merge conflicts across a 5-person team.",
    ],
    skills: ["Node.js", "React", "OAuth 2.0", "Git", "Agile"],
  },
  {
    role: "Front-End Developer Intern",
    company: "Next24tech",
    location: "Remote",
    duration: "Jul 2024 – Aug 2024",
    accent: "#059669",
    bullets: [
      "Rebuilt 4 client-facing pages using React.js and Tailwind CSS, reducing average page load time by ~28% as measured by Lighthouse performance scores.",
      "Delivered accessible, cross-browser UI components in collaboration with a 6-person team across 3 concurrent client projects, all shipped on schedule.",
    ],
    skills: ["React.js", "Tailwind CSS", "Lighthouse", "Accessibility"],
  },
  {
    role: "C++ & DSA Intern",
    company: "Internship Studio",
    location: "Remote",
    duration: "Mar 2024 – Apr 2024",
    accent: "#d97706",
    bullets: [
      "Built a CLI-based Room Allotment & Booking System in C++ — supporting room booking, host assignment, time-slot scheduling, chair-count configuration, and real-time room status queries across customizable parameters.",
      "Implemented scheduling engine using a priority queue for overlapping bookings and a hash map for O(1) room status lookups; resolves conflicts across 6 configurable parameters without collision.",
    ],
    skills: ["C++", "DSA", "Priority Queue", "Hash Map", "CLI"],
  },
];

const PROJECTS = [
  {
    name: "PocketMind",
    tagline: "Offline-First Personal AI",
    url: "Download APK",
    href: "https://github.com/omavcher/PortfolioOm/releases/download/v1.0.0/pocketmind.apk",
    accent: "#8b5cf6",
    stack: ["Flutter", "Dart", "C++ (llama.cpp)", "Google ML Kit", "Firebase", "SharedPreferences"],
    metric: { val: "100%", label: "Offline & Private" },
    bullets: [
      "Integrated fllama (a Flutter port of llama.cpp C++ bindings) to run quantized GGUF language models directly on mobile devices with context limits up to 4096 tokens, optimized parameters, and offline generation.",
      "Built a secure, custom native platform channel (com.pocketmind.app/storage) to bridge Dart with native Android storage API, providing real-time diagnostics (Free vs Total space) to prevent model download overhead.",
      "Designed a zero-loss background analytics buffering system using SharedPreferences, queuing client usage logs locally and batch syncing with Cloud Firestore and Google Sheets macros once internet connection is restored.",
    ],
  },
  {
    name: "HeartEcho",
    tagline: "AI Companion Platform",
    url: "heartecho.in",
    href: "https://heartecho.in",
    accent: "#2563eb",
    stack: ["Next.js", "Node.js", "OpenAI API", "MongoDB", "Redis", "TypeScript"],
    metric: { val: "550K+", label: "Registered users" },
    bullets: [
      "Designed a two-tier traffic routing system using Priority Queues and a custom Load Balancer to separate free-tier and premium API calls — required by the constraint of a single shared OpenAI rate limit across 550,000+ users.",
      "Implemented a Redis-backed caching layer ('Emotional Cache') that stores per-user conversation context as structured embeddings, reducing redundant LLM inference calls and cutting average response latency by ~40% under peak load (1,000–3,000 DAU).",
      "Architected the message queue to decouple real-time chat from background memory writes, enabling the system to sustain throughput without blocking on database I/O.",
    ],
  },
  {
    name: "PaperXify",
    tagline: "AI EdTech Engine",
    url: "paperxify.com",
    href: "https://paperxify.com",
    accent: "#059669",
    stack: ["MERN Stack", "Google Drive API", "Openrouter API", "Custom PDF Engine"],
    metric: { val: "7–8s", label: "8-hr video to PDF" },
    bullets: [
      "Built a multi-modal pipeline that transcribes, chunks, and summarizes YouTube video content into structured PDF notes in 7–8 seconds for an 8-hour video — achieved by parallelizing transcript segmentation with async worker threads rather than sequential processing.",
      "Implemented a 'Deep Note' generation mode that runs a secondary Gemini API pass to produce visual aids and diagrams (10–16 sec total); the added pass is only triggered on explicit user request to keep base latency low.",
      "Integrated Google Drive API for cloud storage and delivery, with a custom PDF rendering engine that formats structured output into student-ready notes without a third-party PDF library.",
    ],
  },
  {
    name: "Autonomous Social Media Manager",
    tagline: "SaaS Automation Tool",
    url: null,
    href: null,
    accent: "#7c3aed",
    stack: ["Node.js", "TypeScript", "Instagram Graph API", "X API", "Cron Jobs", "MongoDB"],
    metric: { val: "~96", label: "Trend checks/day" },
    bullets: [
      "Built a scheduled content pipeline using cron-based workers that poll Instagram and X trend APIs every 15 minutes, generate brand-specific post copy via LLM, and queue posts for automated publishing — processing ~96 trend checks per day with no manual triggers.",
      "Designed the backend to be stateless across workers, with MongoDB storing trend history and generated content; this allowed horizontal scaling without coordination overhead.",
    ],
  },
];

const HONORS = [
  { title: "Winner — AI Innovation Expo", org: "GWCET, Nagpur", year: "2026", accent: "#2563eb", type: "Trophy" },
  { title: "All India Rank 11", org: "Raccoon AI Challenge, NIT Rourkela", year: "2025", accent: "#d97706", type: "Award" },
  { title: "Finalist — CodeRed", org: "Solutions 2k25, AIT Pune", year: "2025", accent: "#059669", type: "Finalist" },
  { title: "Semi-Finalist — ET-AI Hackathon", org: "The Economic Times", year: "2026", accent: "#ea580c", type: "Finalist" },
  { title: "C++ & DSA Certification", org: "Internship Studio (ID: ISCDST268937)", year: "2024", accent: "#7c3aed", type: "Cert" },
];

const SKILLS = [
  { cat: "Languages",      accent: "#6366f1", items: ["C++", "JavaScript", "TypeScript", "Bash/Shell"] },
  { cat: "Backend",        accent: "#2563eb", items: ["Node.js", "Express.js", "WebSockets", "REST APIs", "Microservices"] },
  { cat: "Frontend",       accent: "#db2777", items: ["React.js", "Next.js", "Redux", "Tailwind CSS", "Framer Motion"] },
  { cat: "Databases",      accent: "#059669", items: ["MongoDB", "SQL", "Redis (cache + pub/sub)"] },
  { cat: "AI & GenAI",     accent: "#9333ea", items: ["Openrouter API", "Gemini API", "Ollama", "RAG Pipelines", "Multi-Modal"] },
  { cat: "Cloud & DevOps", accent: "#d97706", items: ["AWS (EC2)", "Docker", "Cloudflare", "Git", "GitHub"] },
  { cat: "Architecture",   accent: "#0891b2", items: ["Distributed Systems", "Load Balancing", "High-Concurrency", "System Design"] },
  { cat: "CS Fundamentals",accent: "#dc2626", items: ["DSA (C++)", "LeetCode 1396", "OOP", "OS", "DBMS", "Computer Networks"] },
];

const VALUES = [
  { icon: <Cpu size={18} className="text-blue-600" />, title: "Systems Thinker", desc: "I think in distributed systems — queues, caches, consistency. Every feature decision flows from architecture.", accent: "#2563eb" },
  { icon: <Zap size={18} className="text-orange-600" />, title: "Performance Obsessed", desc: "Sub-second response times aren't a luxury. From database indexing to CDN strategy, I optimize everything.", accent: "#d97706" },
  { icon: <Heart size={18} className="text-red-500" />, title: "Builder at Heart", desc: "I build real products used by real people. HeartEcho reaching 550K users validated that obsession.", accent: "#dc2626" },
  { icon: <Globe size={18} className="text-emerald-600" />, title: "Open to Learn", desc: "Actively reading distributed systems papers, whitepapers from Google & Meta, and studying production postmortems.", accent: "#059669" },
];

const STICKERS = [
  {
    id: "leetcode-2026",
    name: "LeetCode 50 Days Badge 2026!",
    description: "SOLVING PROBLEMS 50+ DAYS IN 2026",
    image: "/badges/leetcode_2026_50days_badge.png",
    initialRotation: -3,
    left: "15%",
    top: "15%",
    sizeClass: "w-[90px] sm:w-[115px] md:w-[130px]",
  },
  {
    id: "leetcode-100-2026",
    name: "LeetCode 100 Days Badge 2026!",
    description: "SOLVING PROBLEMS 100+ DAYS IN 2026",
    image: "/badges/leetcode_2026_100days_badge.png",
    initialRotation: 2,
    left: "40%",
    top: "15%",
    sizeClass: "w-[90px] sm:w-[115px] md:w-[130px]",
  },
  {
    id: "leetcode-june-2026",
    name: "LeetCode June Challenge 2026!",
    description: "LEETCODE JUNE CHALLENGE 2026",
    image: "/badges/leetcode_june_2026.png",
    initialRotation: 5,
    left: "65%",
    top: "15%",
    sizeClass: "w-[90px] sm:w-[115px] md:w-[130px]",
  }
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AboutClient() {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    setResetKey(prev => prev + 1);
  };



  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px]" style={{ backgroundColor: "#fafaf7" }}>

      {/* ══════════════════════════════════════════
          § HERO — name, title, photo, summary
      ══════════════════════════════════════════ */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-24 pt-10 sm:pt-16 pb-12 border-b-2 border-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10 lg:gap-16 items-start">

            {/* LEFT — copy */}
            <div>
              <div className="section-label mb-4">About Me</div>
              <h1 className="section-heading mb-2">Om<br />Avchar</h1>

              {/* Subtitle row */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-5 font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span className="flex items-center gap-1"><Code2 size={9} /> Backend Engineer</span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1"><Database size={9} /> Distributed Systems</span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1"><Brain size={9} /> Scalable AI Infrastructure</span>
              </div>

              {/* Contact meta */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-6 font-mono text-[8px] text-slate-400 uppercase tracking-wide">
                <span className="flex items-center gap-1"><MapPin size={8} /> Nagpur, India</span>
                <span className="flex items-center gap-1"><Mail size={8} /> omawchar07@gmail.com</span>
                <span className="flex items-center gap-1"><GraduationCap size={8} /> B.Tech CSE · GWCET · Class of 2027</span>
              </div>

              {/* Professional summary */}
              <div className="border-2 border-black bg-white p-5 sm:p-6 mb-6" style={{ boxShadow: "3px 3px 0 #000" }}>
                <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Professional Summary</div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-3">
                  Computer Science Engineering student with a primary focus on <strong className="text-slate-900">backend systems, distributed architecture, and production-grade AI infrastructure.</strong> Designed and shipped Node.js microservices, high-concurrency queuing systems, and multi-modal GenAI pipelines deployed to real users at scale.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Proficient in <strong className="text-slate-900">C++, JavaScript, TypeScript</strong> and cloud-native tooling (AWS, Docker, CI/CD). Competitive programmer with <strong className="text-slate-900">LeetCode Rating 1,396</strong> and recognition at national-level hackathons including NIT Rourkela and AIT Pune.
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <a href="/Om_Avchar_Resume_A.pdf" target="_blank"
                  className="btn-primary text-xs px-4 py-2.5">
                  <Download size={13} /> Download Resume
                </a>
                <a href="https://github.com/omavcher" target="_blank" rel="noreferrer"
                  className="btn-outline text-xs px-4 py-2.5">
                  <Github size={13} /> GitHub
                </a>
                <a href="https://linkedin.com/in/omawchar" target="_blank" rel="noreferrer"
                  className="btn-outline text-xs px-4 py-2.5">
                  <Linkedin size={13} /> LinkedIn
                </a>
              </div>
            </div>

            {/* RIGHT — photo card */}
            <div className="flex flex-col items-center gap-5">
              <motion.div
                initial={{ rotate: 4 }} animate={{ rotate: -1.5 }}
                transition={{ duration: 2.5 }}
                className="bg-white border-2 border-black p-3 w-52 sm:w-64"
                style={{ boxShadow: "4px 4px 0 #000" }}
              >
                <div className="aspect-square border-2 border-black overflow-hidden">
                  <img src="/my.avif" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105" alt="Om Avchar" />
                </div>
                <p className="handwritten text-xl text-center mt-3 font-bold italic">Om Avchar</p>
                <p className="font-mono text-[8px] text-center text-slate-400 uppercase tracking-widest mt-0.5">Nagpur, India · 2026</p>
              </motion.div>

              {/* Open to work badge */}
              <div className="border-2 border-black bg-emerald-400 px-4 py-2 font-mono text-[9px] font-black uppercase tracking-widest -rotate-1"
                style={{ boxShadow: "2px 2px 0 #000" }}>
                ● Open to Internships
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § STATS TICKER
      ══════════════════════════════════════════ */}
      <section className="border-b-2 border-black bg-black py-0">
        <div className="overflow-x-auto no-scrollbar">
          <div className="flex">
            {[...STATS, ...STATS].map((s, i) => (
              <div key={i} className="flex items-center gap-3 px-7 py-4 shrink-0 border-r border-slate-800">
                <div className="w-6 h-6 flex items-center justify-center shrink-0">{s.icon}</div>
                <div>
                  <div className="font-black text-white text-base leading-tight" style={{ color: s.accent }}>{s.val}</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-500">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § SCRAPBOOK ARENA
      ══════════════════════════════════════════ */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-2">Scrapbook</div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
            <div>
              <h2 className="section-heading mb-1 text-2xl sm:text-4xl">
                My Arena
              </h2>
              <p className="font-mono text-[9px] uppercase tracking-wider text-slate-400">
                Drag badges anywhere. Click RESET ARENA to return them!
              </p>
            </div>
          </div>

          {/* Arena Board */}
          <div 
            className="border-2 border-black bg-white rounded-none relative overflow-visible select-none cursor-default flex flex-col"
            style={{ 
              boxShadow: "4px 4px 0 #000",
            }}
          >
            {/* Board Header */}
            <div className="border-b-2 border-black bg-zinc-100 px-4 py-2 flex items-center justify-between font-mono text-[10px] font-black uppercase tracking-wider text-black">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 border border-black shadow-[1px_1px_0_#000]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 border border-black shadow-[1px_1px_0_#000]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black shadow-[1px_1px_0_#000]"></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Terminal size={10} />
                <span>INTERACTIVE BADGES ARENA</span>
              </div>
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 border-2 border-black bg-yellow-300 hover:bg-black hover:text-white px-2 py-0.5 transition-colors cursor-pointer text-[9px] font-black shadow-[1px_1px_0_#000] hover:shadow-none translate-y-[0px] active:translate-y-[1px]"
              >
                RESET ARENA
              </button>
            </div>

            {/* Board Content Area */}
            <div 
              ref={arenaRef}
              className="relative w-full h-[220px] sm:h-[260px] md:h-[280px] overflow-visible"
              style={{ 
                backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
                backgroundSize: "20px 20px"
              }}
            >
              {/* Draggable Stickers */}
              {STICKERS.map((sticker) => {
                const isActive = activeStickerId === sticker.id;

                return (
                  <motion.div
                    key={`${sticker.id}-${resetKey}`}
                    drag
                    dragConstraints={arenaRef}
                    dragElastic={0.5}
                    dragMomentum={true}
                    dragTransition={{
                      power: 0.08,
                      timeConstant: 150,
                    }}
                    dragSnapToOrigin={false}
                    whileDrag={{ scale: 1.12, rotate: 3, zIndex: 100 }}
                    whileHover={{ scale: 1.06, rotate: sticker.initialRotation + 1, zIndex: 50 }}
                    initial={{ 
                      scale: 0.3,
                      opacity: 0,
                      x: 0, 
                      y: 0, 
                      rotate: 0
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      rotate: sticker.initialRotation
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15
                    }}
                    style={{
                      position: "absolute",
                      left: sticker.left,
                      top: sticker.top,
                      cursor: "grab",
                      willChange: "transform",
                    }}
                    className={`touch-none flex flex-col items-center group ${sticker.sizeClass}`}
                    onMouseEnter={() => setActiveStickerId(sticker.id)}
                    onMouseLeave={() => setActiveStickerId(null)}
                    onTapStart={() => setActiveStickerId(sticker.id)}
                  >
                    <div className="relative w-full flex flex-col items-center">
                      {/* Sticker Shadow - lifts when hovered or dragged */}
                      <div className="absolute inset-0 bg-black/5 blur-[4px] rounded-full scale-90 translate-y-1.5 transition-all duration-300 group-hover:translate-y-3 group-hover:scale-95 group-hover:bg-black/10 group-active:translate-y-4 group-active:scale-100 group-active:bg-black/15 group-active:blur-[6px]" />
                      
                      {/* Sticker Image */}
                      <img 
                        src={sticker.image} 
                        alt={sticker.name}
                        decoding="async"
                        className="w-full h-auto select-none pointer-events-none transition-all duration-300 group-hover:rotate-2"
                        style={{
                          WebkitUserDrag: "none",
                        } as React.CSSProperties & { WebkitUserDrag?: "none" | "element" | "auto" | "inherit" }}
                      />

                      {/* Hover Floating Card Tooltip (Neo-brutalist theme) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
                            animate={{ opacity: 1, y: 0, scale: 1, rotate: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9, rotate: -2 }}
                            transition={{ type: "spring", stiffness: 350, damping: 20 }}
                            className="absolute top-[105%] z-50 w-[180px] sm:w-[220px] bg-yellow-50 border-2 border-black text-black p-3 rounded-none shadow-[3px_3px_0_#000] pointer-events-none text-left font-mono"
                          >
                            <div className="flex items-center gap-1.5 border-b border-black/20 pb-1 mb-1.5">
                              <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
                              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">
                                BADGE INFO
                              </span>
                            </div>
                            <h4 className="text-[10px] font-black uppercase tracking-tight text-slate-900 leading-snug mb-1">
                              {sticker.name}
                            </h4>
                            <p className="text-[9px] font-medium text-slate-700 leading-normal lowercase first-letter:uppercase">
                              {sticker.description}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § CORE VALUES
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Philosophy</div>
          <h2 className="section-heading mb-10 sm:mb-12">What Drives<br />My Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 border-black bg-white p-5 sm:p-6 flex gap-4 hover:-translate-y-1 transition-transform"
                style={{ borderLeftWidth: "4px", borderLeftColor: v.accent, boxShadow: "3px 3px 0 #000" }}
              >
                <div className="w-10 h-10 border-2 border-black flex items-center justify-center shrink-0"
                  style={{ backgroundColor: v.accent + "15" }}>{v.icon}</div>
                <div>
                  <h3 className="font-black text-slate-900 mb-1 text-base">{v.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § EXPERIENCE
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Work History</div>
          <div className="flex items-end justify-between mb-10 sm:mb-12 gap-4">
            <h2 className="section-heading">Internship<br />Experience</h2>
            <span className="hidden sm:block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">{EXPERIENCE.length} Roles</span>
          </div>

          <div className="border-2 border-black bg-white" style={{ boxShadow: "4px 4px 0 #000" }}>
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={i < EXPERIENCE.length - 1 ? "border-b-2 border-black" : ""}
              >
                {/* Accent top stripe */}
                <div className="h-1" style={{ backgroundColor: exp.accent }} />

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">{exp.role}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="font-mono text-[9px] font-black uppercase tracking-wider" style={{ color: exp.accent }}>{exp.company}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300" />
                        <span className="font-mono text-[8px] text-slate-400 uppercase">{exp.location}</span>
                      </div>
                    </div>
                    <span className="self-start shrink-0 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider text-white"
                      style={{ backgroundColor: exp.accent }}>
                      {exp.duration}
                    </span>
                  </div>

                  <div className="border-t border-dashed border-slate-200 mb-4" />

                  <ul className="space-y-3 mb-4">
                    {exp.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: bi === 0 ? exp.accent : exp.accent + "55" }} />
                        <p className="text-slate-600 text-sm leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((s) => (
                      <span key={s} className="px-2 py-0.5 border font-mono text-[8px] font-black uppercase"
                        style={{ borderColor: exp.accent + "50", color: exp.accent, backgroundColor: exp.accent + "08" }}>
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § PROJECTS
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Engineering</div>
          <div className="flex items-end justify-between mb-10 sm:mb-12 gap-4">
            <h2 className="section-heading">Key<br />Projects</h2>
            <Link href="/projects" className="hidden sm:flex btn-primary text-xs px-4 py-2.5 shrink-0">
              All Projects <ArrowRight size={12} />
            </Link>
          </div>

          <div className="space-y-6">
            {PROJECTS.map((proj, i) => (
              <motion.div
                key={proj.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="border-2 border-black bg-white group hover:-translate-y-1 transition-transform"
                style={{ boxShadow: `4px 4px 0 ${proj.accent}` }}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-5 sm:p-6 pb-0">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg sm:text-xl font-black text-slate-900">{proj.name}</h3>
                      {proj.href && (
                        <a href={proj.href} target="_blank" rel="noreferrer"
                          className="flex items-center gap-1 font-mono text-[8px] font-black uppercase tracking-wide"
                          style={{ color: proj.accent }}>
                          <ExternalLink size={10} /> {proj.url}
                        </a>
                      )}
                    </div>
                    <p className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-400">{proj.tagline}</p>
                  </div>
                  {/* Metric */}
                  <div className="shrink-0 text-right">
                    <div className="text-2xl font-black" style={{ color: proj.accent }}>{proj.metric.val}</div>
                    <div className="font-mono text-[7px] uppercase tracking-[0.2em] text-slate-400">{proj.metric.label}</div>
                  </div>
                </div>

                {/* Stack */}
                <div className="px-5 sm:px-6 py-3 flex flex-wrap gap-1.5">
                  {proj.stack.map((s) => (
                    <span key={s} className="px-2 py-0.5 border font-mono text-[8px] font-black uppercase"
                      style={{ borderColor: proj.accent + "40", color: proj.accent, backgroundColor: proj.accent + "08" }}>
                      {s}
                    </span>
                  ))}
                </div>

                {/* Bullets */}
                <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-dashed border-slate-200 pt-4">
                  <ul className="space-y-3">
                    {proj.bullets.map((b, bi) => (
                      <li key={bi} className="flex items-start gap-3">
                        <span className="font-mono text-[9px] font-black shrink-0 mt-0.5" style={{ color: proj.accent }}>0{bi + 1}</span>
                        <p className="text-slate-600 text-sm leading-relaxed">{b}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § EDUCATION
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Academic</div>
          <h2 className="section-heading mb-10">Education</h2>

          <div className="border-2 border-black bg-white" style={{ boxShadow: "4px 4px 0 #2563eb" }}>
            <div className="h-1 bg-blue-600" />
            <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-5">
              <div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
                  Bachelor of Technology — Computer Science & Engineering
                </h3>
                <p className="font-mono text-[10px] font-black uppercase tracking-wider text-blue-600 mb-1">
                  Dr. Babasaheb Ambedkar Technological University (DBATU)
                </p>
                <p className="font-mono text-[9px] text-slate-500 uppercase tracking-wide mb-4">
                  GWCET, Nagpur  ·  Expected: May 2027
                </p>
                <div className="border-t border-dashed border-slate-200 pt-4">
                  <p className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-400 mb-2">Relevant Coursework</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Operating Systems", "Database Management Systems", "Computer Networks", "Data Structures & Algorithms", "Object-Oriented Design"].map((c) => (
                      <span key={c} className="px-2 py-0.5 border border-blue-200 bg-blue-50 font-mono text-[8px] font-black uppercase text-blue-700">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between gap-4">
                <div className="px-4 py-2 bg-black text-white font-mono text-[8px] font-black uppercase tracking-widest whitespace-nowrap">
                  2023 – 2027
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § SKILLS
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Capabilities</div>
          <div className="flex items-end justify-between mb-10 gap-4">
            <h2 className="section-heading">Technical<br />Skills</h2>
            <span className="hidden sm:block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
              {SKILLS.reduce((a, c) => a + c.items.length, 0)}+ Technologies
            </span>
          </div>

          <div className="border-2 border-black bg-white" style={{ boxShadow: "4px 4px 0 #000" }}>
            {SKILLS.map((cat, ci) => (
              <motion.div
                key={cat.cat}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: ci * 0.05, duration: 0.4 }}
                className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0 p-4 sm:p-5 ${ci < SKILLS.length - 1 ? "border-b-2 border-black" : ""}`}
              >
                {/* Label column */}
                <div className="flex items-center gap-2 sm:w-44 sm:shrink-0">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.accent }} />
                  <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em]" style={{ color: cat.accent }}>
                    {cat.cat}
                  </span>
                </div>
                {/* Divider */}
                <div className="hidden sm:block w-px bg-slate-200 mr-5 self-stretch" />
                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span key={item} className="px-2.5 py-1 font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wide border border-slate-200 bg-slate-50 text-slate-700">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § HONORS
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Recognition</div>
          <h2 className="section-heading mb-10">Honors &<br />Awards</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {HONORS.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-2 border-black bg-white p-4 hover:-translate-y-1 transition-transform"
                style={{ borderTopWidth: "4px", borderTopColor: h.accent, boxShadow: "3px 3px 0 #000" }}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="font-mono text-[7px] font-black uppercase tracking-widest px-2 py-0.5 border"
                    style={{ color: h.accent, borderColor: h.accent + "50" }}>{h.type}</span>
                  <span className="font-mono text-[8px] font-black text-slate-400 uppercase">{h.year}</span>
                </div>
                <h3 className="font-black text-slate-900 text-sm leading-snug mb-1">{h.title}</h3>
                <p className="font-mono text-[8px] uppercase tracking-wide" style={{ color: h.accent }}>{h.org}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § CTA / CONTACT
      ══════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 px-4 sm:px-6 md:px-12 lg:px-24 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Get in touch */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="border-2 border-black bg-black text-white p-7 sm:p-10"
              style={{ boxShadow: "4px 4px 0 #2563eb" }}
            >
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Let's Connect</p>
              <h2 className="handwritten text-3xl sm:text-4xl font-bold mb-3">Want to build<br />something?</h2>
              <p className="font-mono text-xs text-slate-400 mb-7 leading-relaxed">
                Open to internships, collaborations, and interesting engineering problems.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/#contact" className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-mono font-black text-[9px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                  Get In Touch <ArrowRight size={12} />
                </Link>
                <Link href="/projects" className="flex items-center gap-2 px-5 py-2.5 border border-slate-600 text-white font-mono font-black text-[9px] uppercase tracking-widest hover:border-white transition-all">
                  See My Work
                </Link>
              </div>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="border-2 border-black bg-white p-7 sm:p-10"
              style={{ boxShadow: "4px 4px 0 #000" }}
            >
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-5">Contact & Links</p>
              <div className="space-y-3">
                {[
                  { icon: <Mail size={13} />, label: "Email", val: "omawchar07@gmail.com", href: "mailto:omawchar07@gmail.com" },
                  { icon: <Github size={13} />, label: "GitHub", val: "github.com/omavcher", href: "https://github.com/omavcher" },
                  { icon: <Linkedin size={13} />, label: "LinkedIn", val: "linkedin.com/in/omawchar", href: "https://linkedin.com/in/omawchar" },
                  { icon: <Globe size={13} />, label: "Portfolio", val: "This site ↗", href: "/" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 p-3 border border-slate-100 hover:border-black transition-all group">
                    <div className="w-8 h-8 border-2 border-black flex items-center justify-center shrink-0 bg-slate-50 group-hover:bg-black group-hover:text-white transition-all">
                      {link.icon}
                    </div>
                    <div>
                      <div className="font-mono text-[8px] uppercase tracking-widest text-slate-400">{link.label}</div>
                      <div className="font-mono text-[10px] font-black text-slate-800 group-hover:text-black">{link.val}</div>
                    </div>
                    <ExternalLink size={9} className="ml-auto text-slate-300 group-hover:text-black" />
                  </a>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

    </div>
  );
}
