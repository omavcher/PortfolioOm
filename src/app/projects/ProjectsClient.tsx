"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Globe, Lock, ArrowRight, Download } from "lucide-react";

// ── Tech Icons ────────────────────────────────────────────────────────────────

const TECH_ICONS: Record<string, string> = {
  "Next.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "Node.js":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "React":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "MongoDB":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Redis":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  "TypeScript":   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "Docker":       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "AWS":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  "Nginx":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg",
  "Socket.io":    "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg",
  "MERN":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "Kafka":        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg",
  "OpenAI":       "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
  "Puppeteer":    "https://www.vectorlogo.zone/logos/pptrdev/pptrdev-official.svg",
  "MDX":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  "Framer Motion":"https://cdn.worldvectorlogo.com/logos/framer-motion.svg",
  "Microservices":"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "Flutter":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg",
  "Dart":         "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg",
  "C++":          "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
  "Android":      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg",
  "Firebase":     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-original.svg",
  "Computer Vision": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg",
  "Generative AI": "https://cdn.worldvectorlogo.com/logos/openai-2.svg",
  "Google Play":  "https://www.vectorlogo.zone/logos/google_play/google_play-icon.svg",
};

// ── Projects ──────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    num: "01", category: "Mobile App · Generative AI", date: "2026",
    title: "TryOff", subtitle: "AI Outfit, Hair & Beard Studio",
    tagline: "Upload one photo. Try on outfits, hairstyles & beards with AI.",
    desc: "A complete AI style studio mobile app combining 4-in-1 virtual try-ons: clothing with realistic drapery and lighting, male/female hairstyle previews, beard and facial hair styling aligned to face shape, plus AI skin health analysis and a digital wardrobe.",
    features: [
      { label: "AI Virtual Outfit Try-On", detail: "Blends any outfit screenshot or photo onto user selfies with natural cloth simulation, lighting adaptation, and real-time before/after slider" },
      { label: "AI Hairstyle & Haircut Preview", detail: "Side-by-side preview of male and female haircut catalogs, fades, layers, and trending styles before committing to a cut" },
      { label: "AI Beard & Facial Hair Styler", detail: "Automated facial landmark detection aligning full beards, goatees, and stubble to jawline contours" },
      { label: "Digital Wardrobe & Skin Analyzer", detail: "Categorized virtual closet with 1-tap try-on, coupled with instant facial scan for hydration and skin health metrics" },
    ],
    stats: [{ val: "4-in-1", label: "Style Studio" }, { val: "HD/8K", label: "AI Fidelity" }, { val: "Live", label: "Google Play" }],
    tags: ["Flutter", "Android", "Computer Vision", "Generative AI", "Firebase"],
    images: [
      { src: "/projects/tryoff-2.webp", label: "AI Hairstyle Studio" },
      { src: "/projects/tryoff-3.webp", label: "AI Beard Studio" },
      { src: "/projects/tryoff-1.webp", label: "Virtual Outfit Try-On" },
    ],
    liveUrl: "https://play.google.com/store/apps/details?id=com.tryoff.tryoff", githubUrl: null,
    isPrivate: true, from: "#2a0845", to: "#0c0114", accentHex: "#a855f7", isMobile: true, isPoster: true,
  },
  {
    num: "02", category: "Mobile App · Offline AI", date: "2026",
    title: "PocketMind", subtitle: "Offline-First Personal AI",
    tagline: "AI Power. Offline. Private. Yours.",
    desc: "A premium, offline-first personal AI assistant mobile application that runs high-performance LLMs entirely on-device. It allows users to query their local documents (PDF, DOCX, Excel) and images (via OCR) in a 100% private environment without sending data to external servers.",
    features: [
      { label: "On-Device LLM Inference", detail: "Embedded fllama engine (llama.cpp port) executing quantized GGUF models on-device with optimized contexts up to 4096 tokens" },
      { label: "Smart Document RAG", detail: "Parses PDF, DOCX, and Excel formats locally to inject text dynamically into the model's chat context" },
      { label: "On-Device OCR Engine", detail: "Integrates Google ML Kit for offline image text transcription and processing directly on-device" },
      { label: "Offline-Safe Sync Queue", detail: "Buffers analytics and engagement events locally in SharedPreferences, batch syncing to Firestore and Sheets when online" },
    ],
    stats: [{ val: "100%", label: "Private/Offline" }, { val: "5+", label: "Architectures" }, { val: "0", label: "Server Cost" }],
    tags: ["Flutter", "Dart", "C++", "Android", "Firebase", "Google ML Kit"],
    images: [
      { src: "/projects/pocketmind-3.jpg", label: "chat ui" },
      { src: "/projects/pocketmind-2.jpg", label: "models" },
      { src: "/projects/pocketmind-1.jpg", label: "landing" },
    ],
    liveUrl: "https://github.com/omavcher/PortfolioOm/releases/download/v1.0.0/pocketmind.apk", githubUrl: null,
    isPrivate: true, from: "#1e0b36", to: "#0a0314", accentHex: "#8b5cf6", isMobile: true, isPoster: false,
  },
  {
    num: "03", category: "AI Platform", date: "2024 – 2026",
    title: "HeartEcho", subtitle: "AI Companion Platform",
    tagline: "An AI companion platform that scaled to 550,000+ active users",
    desc: "I built the entire backend from scratch — a custom Priority Queue for AI scheduling, Redis Emotional Cache with sub-12ms retrieval, and Nginx load balancing with sticky sessions across 4 Node.js clusters.",
    features: [
      { label: "Custom Priority Queue", detail: "Per-user AI scheduling with fairness guarantees and backpressure control" },
      { label: "Redis Emotional Cache", detail: "Hash-indexed context retrieval in <12ms, TTL-based expiry strategy" },
      { label: "Nginx Sticky Sessions", detail: "Consistent routing across 4 Node.js instances, zero session loss" },
      { label: "WebSocket Messaging",   detail: "Socket.io real-time, sub-100ms at 550K concurrent users" },
    ],
    stats: [{ val: "550K+", label: "Users" }, { val: "<12ms", label: "Latency" }, { val: "4×", label: "Clusters" }],
    tags: ["Next.js", "Node.js", "OpenAI", "Redis", "Nginx", "MongoDB", "Socket.io", "AWS"],
    images: [
      { src: "/projects/heartecho-3.png", label: "caliing" },
      { src: "/projects/heartecho-2.png", label: "chat ui" },
      { src: "/projects/heartecho-1.png", label: "landing" },
    ],
    liveUrl: "https://www.heartecho.in", githubUrl: "https://github.com/omavcher/heartecho",
    isPrivate: false, from: "#db2777", to: "#5b0e2d", accentHex: "#ec4899", isMobile: false, isPoster: false,
  },
  {
    num: "04", category: "EdTech · AI", date: "2024",
    title: "PaperXify", subtitle: "AI Note Generator",
    tagline: "8-hour YouTube lectures → structured PDF notes in under 8 seconds",
    desc: "Parallel LLM pipelines chunk transcripts and call OpenAI simultaneously. Puppeteer renders pixel-perfect PDFs with auto table of contents — entire pipeline completes in <8 seconds.",
    features: [
      { label: "Parallel LLM Pipeline", detail: "Simultaneous OpenAI calls per transcript chunk for max throughput" },
      { label: "Semantic Chunking",     detail: "Natural boundary detection for topic-aware note segmentation" },
      { label: "Puppeteer PDF Render",  detail: "Pixel-perfect formatted output with auto table of contents" },
      { label: "Google Drive API",      detail: "One-click save directly to user's cloud storage folder" },
    ],
    stats: [{ val: "~7s", label: "Gen Time" }, { val: "8 hrs", label: "Lecture" }, { val: "∞", label: "Transcripts" }],
    tags: ["MERN", "Node.js", "OpenAI", "Puppeteer", "MongoDB", "TypeScript"],
    images: [
      { src: "/projects/paperxify-3.png", label: "pricing" },
      { src: "/projects/paperxify-2.png", label: "output" },
      { src: "/projects/paperxify-1.png", label: "landing" },
    ],
    liveUrl: "https://paperxify.com", githubUrl: "https://github.com/omavcher/yt-notes",
    isPrivate: false, from: "#be123c", to: "#7f1d1d", accentHex: "#f43f5e", isMobile: false, isPoster: false,
  },
  {
    num: "05", category: "AI SaaS", date: "2025",
    title: "Social Manager", subtitle: "Autonomous Content Engine",
    tagline: "Zero human input — trend analysis, content generation, and publishing on autopilot",
    desc: "Monitors real-time trends on Instagram and X, generates brand-aligned content via AI agents, and orchestrates publishing across platforms — entirely without human intervention.",
    features: [
      { label: "Real-time Trend Analysis",  detail: "Continuous monitoring of Instagram & X for emerging viral patterns" },
      { label: "AI Agent Orchestration",    detail: "Multi-step reasoning pipeline for brand-voice-aligned content" },
      { label: "Kafka Event Bus",           detail: "Decoupled producer/consumer for reliable, ordered scheduling" },
      { label: "Multi-platform Publishing", detail: "Automated posting with platform-specific format and timing" },
    ],
    stats: [{ val: "2+", label: "Platforms" }, { val: "0", label: "Human Ops" }, { val: "24/7", label: "Autonomous" }],
    tags: ["Node.js", "Kafka", "Redis", "TypeScript", "Docker", "AWS", "Microservices"],
    images: [
      { src: "/projects/social-1.png", label: "Dashboard" },
      { src: "/projects/social-2.png", label: "Generator" },
      { src: "/projects/social-3.png", label: "Scheduler" },
    ],
    liveUrl: null, githubUrl: null,
    isPrivate: true, from: "#065f46", to: "#022c22", accentHex: "#10b981", isMobile: false, isPoster: false,
  },
  {
    num: "06", category: "Portfolio", date: "2026",
    title: "This Portfolio", subtitle: "Next.js + MDX + Paper Theme",
    tagline: "Zero-database portfolio with a custom paper design system and live GitHub integration",
    desc: "Next.js App Router + MDX for blog posts, case studies, and research. A fully custom sketchbook design system — paper textures, ink borders, handwriting fonts — with scroll-driven Framer Motion animations.",
    features: [
      { label: "Next.js App Router",   detail: "React Server Components for near-instant page loads" },
      { label: "MDX Blog Engine",      detail: "Markdown + JSX, compiled at build time — zero CMS, zero database" },
      { label: "Custom Design System", detail: "Paper texture, ink borders, Architects Daughter handwriting font" },
      { label: "Live GitHub Heatmap",  detail: "Real contribution data from public API, refreshes daily" },
    ],
    stats: [{ val: "0", label: "Databases" }, { val: "MDX", label: "Content" }, { val: "100%", label: "Custom UI" }],
    tags: ["Next.js", "TypeScript", "MDX", "Framer Motion", "Tailwind CSS"],
    images: [
      { src: "/projects/portfolio-1.png", label: "Landing" },
      { src: "/projects/portfolio-2.png",                               label: "About"  },
      { src: "/projects/portfolio-3.png",                               label: "Blog"   },
    ],
    liveUrl: null, githubUrl: "https://github.com/omavcher",
    isPrivate: false, from: "#3730a3", to: "#1e1b4b", accentHex: "#6366f1", isMobile: false, isPoster: false,
  },
];

// ── Placeholder screens (for missing / private images) ────────────────────────

function PlaceholderScreen({ accent, projIdx, slotIdx }: { accent: string; projIdx: number; slotIdx: number }) {
  const variant = (projIdx + slotIdx) % 3;

  if (variant === 0) return (
    <div className="w-full h-full flex flex-col" style={{ background: "#0f172a" }}>
      <div className="p-3 flex items-center gap-2 border-b border-white/5">
        <div className="w-2 h-2 rounded" style={{ background: accent + "80" }} />
        <div className="h-1.5 rounded w-14 bg-white/15" />
        <div className="ml-auto flex gap-1.5">{[1,2,3].map(n=><div key={n} className="h-1.5 rounded w-5 bg-white/10"/>)}</div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-3 px-5">
        <div className="h-2 rounded-full w-32 bg-white/20" />
        <div className="h-6 rounded-xl w-44" style={{ background: accent + "55" }} />
        <div className="h-2 rounded-full w-24 bg-white/15" />
        <div className="flex gap-2 mt-2">
          <div className="h-7 rounded-lg w-18 px-4" style={{ background: accent }} />
          <div className="h-7 rounded-lg w-14 border border-white/20" />
        </div>
      </div>
    </div>
  );

  if (variant === 1) return (
    <div className="w-full h-full p-3 flex flex-col gap-2" style={{ background: "#0f172a" }}>
      <div className="flex gap-1.5">
        {[{ v:"24/7",l:"Live"},{ v:"0ms",l:"Delay"},{ v:"∞",l:"Scale"}].map((s,i)=>(
          <div key={i} className="flex-1 rounded-lg p-2" style={{ background:accent+"20", border:`1px solid ${accent}35` }}>
            <div className="text-xs font-black" style={{ color:accent }}>{s.v}</div>
            <div className="text-[7px] text-white/35 font-mono uppercase mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
      <div className="flex-1 rounded-lg p-2.5" style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-end gap-0.5 h-full pt-2">
          {[35,60,45,80,55,72,90,65,78,50,85,60].map((h,i)=>(
            <div key={i} className="flex-1 rounded-sm" style={{ height:`${h}%`, background:`${accent}${(35+i*5).toString(16)}` }}/>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full p-3 font-mono text-[8px]" style={{ background:"#0d1117" }}>
      <div className="flex items-center gap-1 mb-2.5">
        {[`bg-red-500`,`bg-yellow-500`,`bg-green-500`].map((c,i)=><div key={i} className={`w-2 h-2 rounded-full ${c} opacity-60`}/>)}
        <span className="ml-1 text-white/20 text-[7px]">terminal</span>
      </div>
      {[{c:accent,t:"$ deploying..."},{c:"#10b981",t:"✓ Redis OK"},{c:"#10b981",t:"✓ MongoDB OK"},{c:"#3b82f6",t:"  :8080 active"},{c:"#f59e0b",t:"  Nginx proxy on"},{c:"#64748b",t:"  Ready ✓"}].map((l,i)=>(
        <div key={i} style={{color:l.c,marginBottom:"3px"}}>{l.t}</div>
      ))}
    </div>
  );
}

// ── Image slot with graceful fallback ─────────────────────────────────────────
// Keeps src state in sync with prop changes (no remount needed)

function ImageSlot({ src, label, accent, projIdx, slotIdx, isPrivate }: {
  src: string; label: string; accent: string;
  projIdx: number; slotIdx: number; isPrivate: boolean;
}) {
  const [imgSrc, setImgSrc]     = useState<string | null>(null);
  const [failed, setFailed]     = useState(false);

  // Sync whenever the src prop changes (project switched)
  useEffect(() => {
    setImgSrc(src || null);
    setFailed(false);
  }, [src]);

  if (failed || !imgSrc) {
    return <PlaceholderScreen accent={accent} projIdx={projIdx} slotIdx={slotIdx} />;
  }

  return (
    <img
      key={imgSrc}
      src={imgSrc}
      alt={label}
      className="w-full h-full object-cover object-top"
      onError={() => setFailed(true)}
    />
  );
}

// ── Fixed fan positions (NEVER re-animate, just crossfade content) ────────────

const SLOTS = [
  { rotate: "-8deg",  x: "-20%", y: "12%",  scale: 0.80, z: 10, shadow: "0 6px 20px rgba(0,0,0,0.35)" },
  { rotate:  "6deg",  x:  "16%", y: "10%",  scale: 0.82, z: 20, shadow: "0 8px 24px rgba(0,0,0,0.35)" },
  { rotate: "-1deg",  x:  "-1%", y:  "0%",  scale: 1.00, z: 30, shadow: "0 20px 50px rgba(0,0,0,0.50)" },
];

function getPositionIndex(si: number, topSlotIdx: number): number {
  if (si === topSlotIdx) return 2; // Always CENTER
  if (topSlotIdx === 2) return si; // 0 -> LEFT, 1 -> RIGHT
  if (topSlotIdx === 0) return si === 1 ? 1 : 0; // 1 -> RIGHT, 2 -> LEFT
  if (topSlotIdx === 1) return si === 0 ? 0 : 1; // 0 -> LEFT, 2 -> RIGHT
  return si;
}

function getSlotStyles(positionIdx: number, isHovered: boolean) {
  if (positionIdx === 0) { // LEFT
    return {
      rotate: isHovered ? -12 : -8,
      x: isHovered ? "-26%" : "-20%",
      y: isHovered ? "15%" : "12%",
      scale: 0.80,
      z: 10,
      shadow: isHovered ? "0 12px 28px rgba(0,0,0,0.4)" : "0 6px 20px rgba(0,0,0,0.35)",
    };
  }
  if (positionIdx === 1) { // RIGHT
    return {
      rotate: isHovered ? 10 : 6,
      x: isHovered ? "22%" : "16%",
      y: isHovered ? "13%" : "10%",
      scale: 0.82,
      z: 20,
      shadow: isHovered ? "0 14px 32px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.35)",
    };
  }
  // CENTER
  return {
    rotate: isHovered ? 0 : -1,
    x: "-1%",
    y: isHovered ? "-4%" : "0%",
    scale: isHovered ? 1.03 : 1.00,
    z: 30,
    shadow: isHovered ? "0 30px 60px rgba(0,0,0,0.6)" : "0 20px 50px rgba(0,0,0,0.50)",
  };
}

// One-time entrance animation per slot (runs once when card mounts)
const SLOT_ENTER = [
  { initial: { x: -180, y: 60,   opacity: 0, rotate: -28, scale: 0.6 }, delay: 0.25 },
  { initial: { x:  180, y: 40,   opacity: 0, rotate:  28, scale: 0.6 }, delay: 0.16 },
  { initial: { x:    0, y: -160, opacity: 0, rotate:   0, scale: 0.6 }, delay: 0.07 },
];

function StablePreviewCard({ proj, projIdx }: { proj: typeof PROJECTS[0]; projIdx: number }) {
  const [topSlotIdx, setTopSlotIdx] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setTopSlotIdx(2);
  }, [projIdx]);

  return (
    <div
      className="relative w-full overflow-visible"
      style={{ paddingTop: proj.isMobile ? (proj.isPoster ? "105%" : "110%") : "65%" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {SLOTS.map((slot, si) => {
          const enter = SLOT_ENTER[si];
          const img   = proj.images[si] ?? proj.images[0];
          const posIdx = getPositionIndex(si, topSlotIdx);
          const posStyles = getSlotStyles(posIdx, isHovered);

          return (
            // Outer motion.div: one-time enter animation (position only, runs once)
            <motion.div
              key={si}                            // stable key — never remounts
              className="absolute cursor-pointer"
              style={{ width: proj.isMobile ? (proj.isPoster ? "50%" : "48%") : "76%", zIndex: posStyles.z, willChange: "transform" }}
              initial={enter.initial}
              animate={{
                x: posStyles.x,
                y: posStyles.y,
                opacity: 1,
                rotate: posStyles.rotate,
                scale: posStyles.scale,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
                delay: isHovered || topSlotIdx !== 2 ? 0 : enter.delay
              }}
              onClick={(e) => {
                e.stopPropagation();
                setTopSlotIdx(si);
              }}
            >
              {/* Browser/Mobile chrome — stable, never animates */}
              <div
                className="rounded-xl overflow-hidden"
                style={{
                  boxShadow: posStyles.shadow,
                  border: proj.isPoster ? "1.5px solid rgba(168,85,247,0.3)" : "1.5px solid rgba(255,255,255,0.12)",
                  background: proj.isPoster ? "#080110" : undefined,
                }}
              >
                {/* Header: Notch/Traffic-lights (skipped for posters which already show phone frame) */}
                {proj.isMobile ? (
                  proj.isPoster ? null : (
                    <div className="flex items-center justify-between px-2.5 py-1 text-[5px] text-white/60 font-sans select-none"
                      style={{ backgroundColor: "rgba(0,0,0,0.85)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="flex items-center gap-1 font-mono">
                        <span>11:22</span>
                        <div className="flex gap-0.5 items-end h-1">
                          <div className="w-[0.5px] h-[0.5px] bg-white/60" />
                          <div className="w-[0.5px] h-[0.8px] bg-white/60" />
                          <div className="w-[0.5px] h-[1.2px] bg-white/60" />
                        </div>
                      </div>
                      {/* Notch */}
                      <div className="w-7 h-1.5 bg-black rounded-full border border-white/5" />
                      <div className="flex items-center gap-1 font-mono">
                        <span>5G</span>
                        <span>29%</span>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="flex items-center gap-1.5 px-3 py-2"
                    style={{ backgroundColor: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                    <div className="w-2 h-2 rounded-full bg-red-400/70" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/70" />
                    <div className="w-2 h-2 rounded-full bg-green-400/70" />
                    <div className="ml-2 flex-1 rounded-sm px-2 py-0.5 text-[6px] font-mono text-white/25 truncate"
                      style={{ backgroundColor: "rgba(255,255,255,0.06)" }}>
                      {img.label}
                    </div>
                  </div>
                )}

                {/* Image area: ONLY this crossfades when project changes */}
                <div style={{ aspectRatio: proj.isMobile ? (proj.isPoster ? "2/3" : "9/16") : "16/9", position: "relative", overflow: "hidden" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${projIdx}-${si}`}    // keyed by project: triggers crossfade
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      style={{ willChange: "opacity" }}
                    >
                      <ImageSlot
                        src={img.src}
                        label={img.label}
                        accent={proj.accentHex}
                        projIdx={projIdx}
                        slotIdx={si}
                        isPrivate={proj.isPrivate}
                      />
                    </motion.div>
                  </AnimatePresence>
                  {/* Home Indicator for Mobile (skipped if poster) */}
                  {proj.isMobile && !proj.isPoster && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/30 rounded-full pointer-events-none" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Sticky preview card (gradient crossfades, content crossfades) ──────────────

function StickyCard({ activeIdx }: { activeIdx: number }) {
  const proj = PROJECTS[activeIdx];
  const isPlayStore = proj.liveUrl?.includes("play.google.com");

  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ minHeight: "520px" }}>

      {/* ── Gradient layers: crossfade between them ── */}
      {PROJECTS.map((p, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === activeIdx ? 1 : 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})`, willChange: "opacity" }}
        />
      ))}

      {/* ── Content on top of gradient ── */}
      <div className="relative z-10">

        {/* Tagline + buttons — crossfade per project */}
        <div className="p-6 pb-2">
          <div className="flex items-start justify-between gap-3 mb-4">
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${activeIdx}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-white font-bold text-base leading-snug max-w-[260px]"
              >
                {proj.tagline}
              </motion.p>
            </AnimatePresence>

            <div className="flex gap-2 shrink-0">
              {proj.liveUrl && (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  download={isPlayStore ? undefined : (proj.isMobile ? "pocketmind.apk" : undefined)}
                  title={isPlayStore ? "View on Google Play" : (proj.isMobile ? "Download APK" : "Live Site")}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  {isPlayStore ? (
                    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M3.609 1.814L13.793 12 3.61 22.186a1.956 1.956 0 0 1-.223-.976V2.79c0-.36.08-.7.222-.976zm11.242 11.244l2.585-2.585-11.83-6.75 9.245 9.335zm0 1.884l-9.245 9.335 11.83-6.75-2.585-2.585zm2.868-2.868l3.187 1.818c.954.545.954 1.433 0 1.978l-3.187 1.818-2.122-2.122 2.122-2.122z"/>
                    </svg>
                  ) : proj.isMobile ? (
                    <Download size={14} className="text-white" />
                  ) : (
                    <ArrowRight size={14} className="text-white" />
                  )}
                </a>
              )}
              {proj.githubUrl && (
                <a href={proj.githubUrl} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                  style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                  <Github size={13} className="text-white" />
                </a>
              )}
              {proj.isPrivate && (
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full font-mono text-[8px] uppercase text-white/50"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <Lock size={8} /> Private
                </div>
              )}
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1.5">
            {PROJECTS.map((_, i) => (
              <motion.div key={i} className="rounded-full" animate={{ width: i === activeIdx ? "22px" : "6px" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                style={{ height: "3px", background: i === activeIdx ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.22)" }} />
            ))}
          </div>
        </div>

        {/* Fan screens — positions NEVER re-animate, only image content crossfades */}
        <div className="px-5 pb-5">
          <StablePreviewCard proj={proj} projIdx={activeIdx} />
        </div>
      </div>
    </div>
  );
}

// ── Project detail panel ──────────────────────────────────────────────────────

function ProjectDetail({ proj }: { proj: typeof PROJECTS[0] }) {
  const isPlayStore = proj.liveUrl?.includes("play.google.com");

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-1 h-9 rounded-full shrink-0" style={{ backgroundColor: proj.accentHex }} />
        <h2 className="text-3xl sm:text-4xl xl:text-[2.6rem] font-black text-slate-900 tracking-tight">{proj.title}</h2>
      </div>
      <p className="font-mono text-[9px] font-black uppercase tracking-widest mb-5 pl-4" style={{ color: proj.accentHex }}>
        {proj.subtitle}
      </p>
      <p className="text-slate-600 leading-relaxed mb-6 text-sm">{proj.desc}</p>

      <div className="flex gap-6 mb-6 pb-6 border-b-2 border-dashed border-slate-100">
        {proj.stats.map((s) => (
          <div key={s.label}>
            <div className="text-xl sm:text-2xl font-black text-slate-900">{s.val}</div>
            <div className="font-mono text-[7px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="space-y-3.5 mb-7">
        {proj.features.map((f, fi) => (
          <motion.div key={f.label} initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: fi * 0.06 }}
            className="flex items-start gap-3">
            <span className="font-black text-base leading-none mt-0.5 shrink-0" style={{ color: proj.accentHex }}>+</span>
            <div>
              <p className="font-black text-slate-900 text-sm">{f.label}</p>
              <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{f.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {proj.tags.map((tag) => {
          const icon = TECH_ICONS[tag];
          return (
            <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white font-mono text-[8px] font-black uppercase tracking-wide text-slate-700 hover:border-slate-400 transition-colors cursor-default">
              {icon && <img src={icon} alt="" className="w-3 h-3 object-contain shrink-0" onError={(e)=>{ e.currentTarget.style.display="none"; }} />}
              {tag}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2">
        {proj.liveUrl && (
          <a
            href={proj.liveUrl}
            target="_blank"
            rel="noreferrer"
            download={isPlayStore ? undefined : (proj.isMobile ? "pocketmind.apk" : undefined)}
            className="flex items-center gap-1.5 px-4 py-2.5 font-mono text-[9px] font-black uppercase text-white paper-shadow hover:opacity-90 transition-opacity"
            style={{ backgroundColor: proj.accentHex }}>
            {isPlayStore ? (
              <>
                <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                  <path d="M3.609 1.814L13.793 12 3.61 22.186a1.956 1.956 0 0 1-.223-.976V2.79c0-.36.08-.7.222-.976zm11.242 11.244l2.585-2.585-11.83-6.75 9.245 9.335zm0 1.884l-9.245 9.335 11.83-6.75-2.585-2.585zm2.868-2.868l3.187 1.818c.954.545.954 1.433 0 1.978l-3.187 1.818-2.122-2.122 2.122-2.122z"/>
                </svg>
                <span>Google Play</span>
              </>
            ) : proj.isMobile ? (
              <>
                <Download size={11} />
                <span>Download APK</span>
              </>
            ) : (
              <>
                <Globe size={11} />
                <span>Live Site</span>
              </>
            )}
          </a>
        )}
        {proj.githubUrl && (
          <a href={proj.githubUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 border-2 border-black font-mono text-[9px] font-black uppercase hover:bg-slate-100 transition-colors">
            <Github size={11} /> Source Code
          </a>
        )}
        {proj.isPrivate && (
          <div className="flex items-center gap-1.5 px-4 py-2.5 border border-dashed border-slate-300 font-mono text-[9px] font-black uppercase text-slate-400">
            <Lock size={10} /> Private Repository
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProjectsClient() {
  const [activeIdx, setActiveIdx] = useState(0);
  const detailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.5;
      let best = 0, bestDist = Infinity;
      detailRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect   = el.getBoundingClientRect();
        const center = window.scrollY + rect.top + rect.height / 2;
        const dist   = Math.abs(center - mid);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActiveIdx(best);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px]" style={{ backgroundColor: "#fafaf7" }}>

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 pt-10 sm:pt-14 pb-6">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <div className="section-label mb-3">Portfolio</div>
          <h1 className="section-heading mb-3">Selected<br />Projects</h1>
          <p className="font-mono text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest max-w-sm leading-relaxed">
            Real products I&apos;ve designed, built, and scaled
          </p>
        </motion.div>

        <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-1">
          {PROJECTS.map((p, i) => (
            <button key={p.num}
              onClick={() => detailRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
              className="flex items-center gap-1.5 px-3 py-1.5 border-2 font-mono text-[8px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap transition-all duration-200"
              style={{
                borderColor: i === activeIdx ? p.accentHex : "black",
                background:  i === activeIdx ? p.accentHex : "transparent",
                color:       i === activeIdx ? "white" : "black",
              }}>
              <span style={{ color: i === activeIdx ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>{p.num}</span>
              {p.title}
              {p.liveUrl   && <Globe size={7} style={{ color: i === activeIdx ? "rgba(255,255,255,0.6)" : "#10b981" }} />}
              {p.isPrivate && <Lock  size={7} style={{ color: i === activeIdx ? "rgba(255,255,255,0.5)" : "#94a3b8" }} />}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200" />

      {/* ── DESKTOP: sticky left + scrollable right ── */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-16">
          <div className="flex gap-0">

            {/* LEFT: sticky */}
            <div className="w-1/2 shrink-0 sticky top-[90px] self-start" style={{ height: "calc(100vh - 112px)" }}>
              <div className="h-full flex flex-col justify-center pr-10 py-6">
                <StickyCard activeIdx={activeIdx} />
              </div>
            </div>

            {/* RIGHT: scrollable */}
            <div className="w-1/2">
              {PROJECTS.map((p, i) => (
                <div key={p.title} ref={(el) => { detailRefs.current[i] = el; }}
                  className="flex items-center py-24 border-b border-dashed border-slate-200 last:border-none"
                  style={{ minHeight: "100vh" }}>
                  <ProjectDetail proj={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: stacked ── */}
      <div className="lg:hidden">
        {PROJECTS.map((p) => {
          const isPlay = p.liveUrl?.includes("play.google.com");
          return (
            <div key={p.title} className="py-12 border-t-2 border-dashed border-slate-200">
              <div className="px-4 sm:px-6">
                <div className="flex items-center gap-2 mb-5">
                  <span className="font-mono text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">{p.num}</span>
                  <span className="h-px flex-1 bg-slate-200" />
                  <span className="font-mono text-[8px] uppercase text-slate-400">{p.category}</span>
                  <span className="font-mono text-[7px] border border-slate-200 px-2 py-0.5 text-slate-400">{p.date}</span>
                </div>
                <div className="rounded-2xl overflow-hidden mb-8" style={{ background: `linear-gradient(145deg, ${p.from}, ${p.to})` }}>
                  <div className="p-5 pb-2">
                    <p className="text-white font-bold text-base leading-snug mb-3">{p.tagline}</p>
                    <div className="flex gap-2">
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          download={isPlay ? undefined : (p.isMobile ? "pocketmind.apk" : undefined)}
                          title={isPlay ? "View on Google Play" : (p.isMobile ? "Download APK" : "Live Site")}
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                          {isPlay ? (
                            <svg className="w-3.5 h-3.5 fill-white shrink-0" viewBox="0 0 24 24">
                              <path d="M3.609 1.814L13.793 12 3.61 22.186a1.956 1.956 0 0 1-.223-.976V2.79c0-.36.08-.7.222-.976zm11.242 11.244l2.585-2.585-11.83-6.75 9.245 9.335zm0 1.884l-9.245 9.335 11.83-6.75-2.585-2.585zm2.868-2.868l3.187 1.818c.954.545.954 1.433 0 1.978l-3.187 1.818-2.122-2.122 2.122-2.122z"/>
                            </svg>
                          ) : p.isMobile ? (
                            <Download size={12} className="text-white" />
                          ) : (
                            <ArrowRight size={12} className="text-white" />
                          )}
                        </a>
                      )}
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                          <Github size={12} className="text-white" />
                        </a>
                      )}
                      {p.isPrivate && (
                        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full font-mono text-[7px] uppercase text-white/50" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                          <Lock size={7} /> Private
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <StablePreviewCard proj={p} projIdx={PROJECTS.indexOf(p)} />
                  </div>
                </div>
                <ProjectDetail proj={p} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 lg:px-16 border-t-2 border-black mt-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div>
          <div className="section-label mb-2">More Work</div>
          <p className="text-slate-600 text-sm sm:text-base">All open-source repos on GitHub</p>
        </div>
        <a href="https://github.com/omavcher" target="_blank" rel="noreferrer"
          className="btn-primary text-xs px-5 py-3 w-full sm:w-auto justify-center">
          <Github size={13} /> GitHub Profile
        </a>
      </div>
    </div>
  );
}
