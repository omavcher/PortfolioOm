"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import {
  fadeUp, fadeIn, slideLeft, slideRight, scaleUp, popIn, clipReveal, stampIn, drawLine,
  staggerContainer, staggerFast, staggerNormal, staggerSlow, sectionHeader,
  VIEWPORT_ONCE, VIEWPORT_REPEAT, VIEWPORT_LAZY, VIEWPORT_EARLY,
} from "@/lib/motion";
import Link from "next/link";
import GitHubHeatmap from "@/components/GitHubHeatmap";
import LeetCodeHeatmap from "@/components/LeetCodeHeatmap";
import LeetCodeStatsCard from "@/components/LeetCodeStatsCard";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import {
  Heart, Code2, Download, Cpu, ExternalLink,
  Github, Linkedin, Code, Trophy, Globe,
  BookOpen, X, Send, CheckCircle2, AlertCircle,
  Loader2, ArrowRight, Sparkles, Terminal, Zap, Users,
  Database, Cloud, Brain, ChevronRight, Star, Award,
  Calendar, Building2, Layers, MapPin, Mail,
} from "lucide-react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: "pocketmind",
    title: "PocketMind",
    subtitle: "Offline-First Personal AI",
    desc: "A premium, offline-first personal AI assistant mobile application that runs high-performance LLMs entirely on-device. OCR and document querying (RAG) in a 100% private environment.",
    tags: ["Flutter", "Dart", "C++", "Android", "Firebase", "Google ML Kit"],
    logo: null,
    liveUrl: "https://github.com/omavcher/PortfolioOm/releases/download/v1.0.0/pocketmind.apk",
    githubUrl: null,
    caseStudy: null,
    stat: { label: "Offline & Private", value: "100%" },
    accent: "bg-violet-50 border-violet-200",
    accentColor: "text-violet-600",
    isMobile: true,
  },
  {
    id: "heartecho",
    title: "HeartEcho",
    subtitle: "AI Companion Platform",
    desc: "Scaled to 550,000+ users. Custom Priority Queue, Emotional Cache (sub-12ms), Nginx load balancing with sticky sessions.",
    tags: ["Next.js", "Node.js", "OpenAI", "Redis", "Nginx", "MongoDB"],
    logo: "https://www.heartecho.in/heartechor.png",
    liveUrl: "https://www.heartecho.in",
    githubUrl: "https://github.com/omavcher/heartecho",
    caseStudy: null,
    stat: { label: "Users Served", value: "550K+" },
    accent: "bg-pink-50 border-pink-200",
    accentColor: "text-pink-600",
    isMobile: false,
  },
  {
    id: "paperxify",
    title: "PaperXify",
    subtitle: "AI EdTech Engine",
    desc: "Converts 8-hour YouTube lectures into structured PDF notes in 7-8 seconds using parallel LLM pipelines and Google Drive API.",
    tags: ["MERN", "GenAI", "Google Drive API", "Puppeteer"],
    logo: null,
    liveUrl: null,
    githubUrl: "https://github.com/omavcher/yt-notes",
    caseStudy: null,
    stat: { label: "Generation Time", value: "~7s" },
    accent: "bg-red-50 border-red-200",
    accentColor: "text-red-600",
    isMobile: false,
  },
  {
    id: "social-manager",
    title: "Social Manager",
    subtitle: "Autonomous AI SaaS",
    desc: "Real-time trend analysis on Instagram and X to generate brand-specific content. Fully autonomous multi-platform orchestration.",
    tags: ["Node.js", "AI Agents", "Kafka", "Redis"],
    logo: null,
    liveUrl: null,
    githubUrl: null,
    caseStudy: null,
    stat: { label: "Platforms", value: "2+" },
    accent: "bg-emerald-50 border-emerald-200",
    accentColor: "text-emerald-600",
    isMobile: false,
  },
];

const EXPERIENCE = [
  {
    role: "Software Development Engineer Intern",
    company: "Bluestock Fintech",
    location: "Remote",
    duration: "Apr 2025 – May 2025",
    metric: { val: "3", label: "Features shipped to prod" },
    bullets: [
      "Implemented 3 backend features in Node.js and React for a live fintech application, each reviewed and merged to the production branch within a 2-week Agile sprint cycle.",
      "Integrated OAuth 2.0 authentication, reducing manual login friction for users; enforced Git branching conventions that cut merge conflicts across a 5-person team.",
    ],
    skills: ["Node.js", "React", "OAuth 2.0", "Git", "Agile"],
    accent: "#2563eb",
    accentColor: "border-l-blue-500",
    tagBg: "bg-blue-50",
    icon: <Code2 size={16} className="text-blue-600" />,
  },
  {
    role: "Front-End Developer Intern",
    company: "Next24tech",
    location: "Remote",
    duration: "Jul 2024 – Aug 2024",
    metric: { val: "~28%", label: "Page load reduction" },
    bullets: [
      "Rebuilt 4 client-facing pages using React.js and Tailwind CSS, reducing average page load time by ~28% as measured by Lighthouse performance scores.",
      "Delivered accessible, cross-browser UI components in collaboration with a 6-person team across 3 concurrent client projects, all shipped on schedule.",
    ],
    skills: ["React.js", "Tailwind CSS", "Lighthouse", "Accessibility"],
    accent: "#059669",
    accentColor: "border-l-emerald-500",
    tagBg: "bg-emerald-50",
    icon: <Globe size={16} className="text-emerald-600" />,
  },
  {
    role: "C++ & DSA Intern",
    company: "Internship Studio",
    location: "Remote",
    duration: "Mar 2024 – Apr 2024",
    metric: { val: "O(1)", label: "Room lookup complexity" },
    bullets: [
      "Built a CLI-based Room Allotment & Booking System in C++ as the internship capstone — supporting room booking, host assignment, time-slot scheduling, chair-count configuration, and real-time room status queries across customizable room parameters.",
      "Implemented the scheduling engine using a priority queue to handle overlapping booking requests and a hash map for O(1) room status lookups; resolves conflicts across 6 configurable parameters without collision.",
    ],
    skills: ["C++", "DSA", "Priority Queue", "Hash Map", "CLI"],
    accent: "#d97706",
    accentColor: "border-l-orange-500",
    tagBg: "bg-orange-50",
    icon: <Terminal size={16} className="text-orange-600" />,
  },
];

const EDUCATION = [
  {
    degree: "B.Tech — Computer Science & Engineering",
    school: "Govindrao Wanjari College of Engineering & Technology",
    shortSchool: "GWCET, Nagpur",
    year: "2023 – 2027",
    status: "Pursuing",
    desc: "Specializing in distributed systems, algorithms, and AI. Active in college hackathon club. Building real-world projects alongside coursework.",
    image: "/gwcet.jpg",
    accentColor: "#2563eb",
    statusColor: "bg-blue-100 text-blue-800",
    tag: "B.Tech",
  },
  {
    degree: "HSC — Science (PCM)",
    school: "KGBV Junior College",
    shortSchool: "Amravati University",
    year: "2021 – 2023",
    status: "Completed",
    desc: "Graduated with distinction. Discovered programming during free periods and built first small web experiments.",
    image: "/au.png",
    accentColor: "#d97706",
    statusColor: "bg-amber-100 text-amber-800",
    tag: "HSC",
  },
  {
    degree: "SSC — Secondary School Certificate",
    school: "The New Era High School, Jalgaon-Jamod",
    shortSchool: "SSC Board, Maharashtra",
    year: "2019 – 2021",
    status: "Completed",
    desc: "School foundation years. First exposure to computers and logical thinking that sparked a lifelong interest in technology.",
    image: "/ssc-sc.png",
    accentColor: "#16a34a",
    statusColor: "bg-emerald-100 text-emerald-800",
    tag: "SSC",
  },
];

const TECH_CATEGORIES = [
  {
    category: "Languages",
    accent: "#6366f1",
    icon: <Code2 size={13} />,
    color: "text-indigo-600",
    items: [
      { name: "C++",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Bash/Shell", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg" },
    ],
  },
  {
    category: "Backend",
    accent: "#2563eb",
    icon: <Database size={13} />,
    color: "text-blue-600",
    items: [
      { name: "Node.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "WebSockets",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
      { name: "REST APIs",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Microservices",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },
  {
    category: "Frontend",
    accent: "#db2777",
    icon: <Code2 size={13} />,
    color: "text-pink-600",
    items: [
      { name: "React.js",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Redux",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "Tailwind CSS",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Framer Motion", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
    ],
  },
  {
    category: "Databases",
    accent: "#059669",
    icon: <Layers size={13} />,
    color: "text-emerald-600",
    items: [
      { name: "MongoDB",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "SQL",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Redis",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg" },
    ],
  },
  {
    category: "Message Queue",
    accent: "#7c3aed",
    icon: <Zap size={13} />,
    color: "text-violet-600",
    items: [
      { name: "Priority Queues",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Worker Threads",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Cron Pipelines",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ],
  },
  {
    category: "AI & GenAI",
    accent: "#9333ea",
    icon: <Brain size={13} />,
    color: "text-purple-600",
    items: [
      { name: "Openrouter",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Gemini API",    icon: "https://www.gstatic.com/lamda/images/gemini_sparkle_aurora_33f86dc0c0257da337c63.svg" },
      { name: "Ollama",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "RAG Pipelines", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Multi-Modal",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg" },
    ],
  },
  {
    category: "Cloud & DevOps",
    accent: "#d97706",
    icon: <Cloud size={13} />,
    color: "text-amber-600",
    items: [
      { name: "AWS",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Cloudflare", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Git",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    ],
  },
  {
    category: "Architecture",
    accent: "#0891b2",
    icon: <Layers size={13} />,
    color: "text-cyan-600",
    items: [
      { name: "Distributed Systems", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      { name: "Load Balancing",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "High-Concurrency",    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "System Design",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    ],
  },
  {
    category: "Testing",
    accent: "#16a34a",
    icon: <CheckCircle2 size={13} />,
    color: "text-green-600",
    items: [
      { name: "Postman",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "API Testing",   icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    ],
  },
  {
    category: "CS Fundamentals",
    accent: "#dc2626",
    icon: <Trophy size={13} />,
    color: "text-red-600",
    items: [
      { name: "DSA (C++)",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "LeetCode 1396",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "OOP",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "OS",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "DBMS",           icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "CN",             icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    ],
  },
];

const HONORS = [
  {
    year: "2026",
    title: "Winner 🏆 AI Innovation Expo",
    event: "GWCET, Nagpur",
    org: "Best Innovative Prototype",
    desc: "Best innovative prototype and system design in the new ideas & prototype category.",
    accent: "#2563eb",
    badge: "bg-blue-600",
    type: "Trophy",
    proofImg: 'https://www.linkedin.com/posts/omavchar_proud-to-share-that-i-secured-1st-prize-in-activity-7455121802886021120-MpRg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEEJcxoBoOnvUAZQphaoLo5ZvwhhnuOO8KA',
    proofPdf: null,
    proofLabel: "Certificate on File",
  },
  {
    year: "2025",
    title: "All India Rank 11",
    event: "Raccoon AI Challenge",
    org: "NIT Rourkela",
    desc: "National level AI competition. Awarded Certificate of Excellence in Pitching.",
    accent: "#d97706",
    badge: "bg-yellow-500",
    type: "Award",
    proofImg: null,
    proofPdf: 'https://drive.google.com/file/d/1ZZiP7UsZam_hCMrj3Wlm95eIcRAeGQja/view?usp=sharing',
    proofLabel: "Certificate on File",
  },
  {
    year: "2025",
    title: "Finalist 🏆 CodeRed",
    event: "Solutions 2k25",
    org: "Army Institute of Technology, Pune",
    desc: "Reached the finals in this highly competitive national hackathon.",
    accent: "#059669",
    badge: "bg-emerald-600",
    type: "Finalist",
    proofImg: null,
    proofPdf: null,
    proofLabel: "Certificate on File",
  },
  {
    year: "2026",
    title: "Semi-Finalist",
    event: "ET-AI Hackathon",
    org: "The Economic Times",
    desc: "India's premier AI hackathon. Competed among thousands of national teams.",
    accent: "#ea580c",
    badge: "bg-orange-500",
    type: "Finalist",
    proofImg: null,
    proofPdf: "https://drive.google.com/file/d/1272jw3-IMaoPbJjI9ENWfrlD9fsIiNWN/view?usp=sharing",
    proofLabel: "Certificate on File",
  },
  {
    year: "2026",
    title: "Participant",
    event: "THE BIG BRAND THEORY",
    org: "E-Cell, IIT (BHU), Varanasi",
    desc: "National level brand case study competition organized by the Entrepreneurship Cell of IIT (BHU) in partnership with Upstox and TruScholar.",
    accent: "#1e3a8a",
    badge: "bg-blue-800",
    type: "Award",
    proofImg: null,
    proofPdf: "https://drive.google.com/file/d/1oiQTdQvxXy-XqOusvS4To7NZCqRd_r09/view?usp=sharing",
    proofLabel: "View Certificate",
  },
  {
    year: "2024",
    title: "Certification — C++ & DSA",
    event: "C++ & Data Structures",
    org: "Internship Studio",
    desc: "ID: ISCDST268937. Comprehensive training in C++ and DSA including Graphs and Trees.",
    accent: "#7c3aed",
    badge: "bg-purple-600",
    type: "Cert",
    proofImg: null,
    proofPdf: "/Om_Avchar_Resume_A.pdf",
    proofLabel: "View Resume / Cert",
  },
];

const TICKER_ITEMS = [
  "Node.js", "System Design", "Redis", "MongoDB", "AWS", "Next.js",
  "Distributed Systems", "AI Pipelines", "PostgreSQL", "Docker", "OpenAI API", "Nginx",
];

// ─── HOME STICKY PROJECTS ─────────────────────────────────────────────────────

const HOME_PROJ_GRADIENTS = [
  { from: "#1e0b36", to: "#0a0314", accent: "#8b5cf6" }, // Violet gradient for PocketMind
  { from: "#db2777", to: "#5b0e2d", accent: "#ec4899" }, // Pink gradient for HeartEcho
  { from: "#be123c", to: "#7f1d1d", accent: "#f43f5e" }, // Red gradient for PaperXify
  { from: "#065f46", to: "#022c22", accent: "#10b981" }, // Green gradient for Social Manager
];

// 3 resting positions for the stacked fan (back-left, back-right, front)
// ALL values must be numbers (px/degrees) so Framer Motion can interpolate smoothly
const FAN_SLOTS = [
  { rotate: -8, x: -80, y: 46, scale: 0.80, z: 10, shadow: "0 6px 20px rgba(0,0,0,0.35)" },
  { rotate:  6, x:  65, y: 38, scale: 0.82, z: 20, shadow: "0 8px 24px rgba(0,0,0,0.35)" },
  { rotate: -1, x:  -4, y:  0, scale: 1.00, z: 30, shadow: "0 20px 50px rgba(0,0,0,0.50)" },
];
// Entrance positions — same unit type as FAN_SLOTS (numbers = pixels/degrees)
const FAN_ENTERS = [
  { x: -220, y:  70, rotate: -30, scale: 0.55, opacity: 0 },
  { x:  220, y:  50, rotate:  30, scale: 0.55, opacity: 0 },
  { x:    0, y: -200, rotate:  0, scale: 0.55, opacity: 0 },
];
const FAN_DELAYS = [0.24, 0.15, 0.06];

const HOME_PROJ_IMAGES: Record<number, string[]> = {
  0: ["/projects/pocketmind-3.jpg", "/projects/pocketmind-2.jpg", "/projects/pocketmind-1.jpg"],
  1: ["/projects/heartecho-3.png", "/projects/heartecho-2.png", "/projects/heartecho-1.png"],
  2: ["/projects/paperxify-3.png", "/projects/paperxify-2.png", "/projects/paperxify-1.png"],
  3: ["/projects/social-1.png", "/projects/social-2.png", "/projects/social-3.png"],
};

const HOME_PROJ_LABELS: Record<number, string[]> = {
  0: ["chat ui", "models", "splash"],
  1: ["caliing", "chat ui", "landing"],
  2: ["pricing", "output", "landing"],
  3: ["dashboard", "generator", "scheduler"],
};

function HomeProjScreen({ projIdx, slotIdx }: { projIdx: number; slotIdx: number }) {
  const images = HOME_PROJ_IMAGES[projIdx];
  const imgSrc = images ? images[slotIdx] : null;

  if (!imgSrc) {
    return <div className="w-full h-full bg-slate-900" />;
  }

  return (
    <img
      src={imgSrc}
      alt={`Project ${projIdx} slot ${slotIdx}`}
      className="w-full h-full object-cover object-top"
      loading="lazy"
    />
  );
}



function getPositionIndex(si: number, topSlotIdx: number): number {
  if (si === topSlotIdx) return 2; // Always CENTER
  if (topSlotIdx === 2) return si; // 0 -> LEFT, 1 -> RIGHT
  if (topSlotIdx === 0) return si === 1 ? 1 : 0; // 1 -> RIGHT, 2 -> LEFT
  if (topSlotIdx === 1) return si === 0 ? 0 : 1; // 0 -> LEFT, 2 -> RIGHT
  return si;
}

function getFanSlotStyles(positionIdx: number, isHovered: boolean) {
  if (positionIdx === 0) { // LEFT
    return {
      rotate: isHovered ? -12 : -8,
      x: isHovered ? -100 : -80,
      y: isHovered ? 52 : 46,
      scale: 0.80,
      z: 10,
      shadow: isHovered ? "0 12px 28px rgba(0,0,0,0.4)" : "0 6px 20px rgba(0,0,0,0.35)",
    };
  }
  if (positionIdx === 1) { // RIGHT
    return {
      rotate: isHovered ? 10 : 6,
      x: isHovered ? 85 : 65,
      y: isHovered ? 44 : 38,
      scale: 0.82,
      z: 20,
      shadow: isHovered ? "0 14px 32px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.35)",
    };
  }
  // CENTER
  return {
    rotate: isHovered ? 0 : -1,
    x: -4,
    y: isHovered ? -12 : 0,
    scale: isHovered ? 1.03 : 1.00,
    z: 30,
    shadow: isHovered ? "0 30px 60px rgba(0,0,0,0.6)" : "0 20px 50px rgba(0,0,0,0.50)",
  };
}

function HomePreviewCard({
  proj,
  projIdx,
  g,
  paddingTop = "56%"
}: {
  proj: typeof PROJECTS[0];
  projIdx: number;
  g: typeof HOME_PROJ_GRADIENTS[0];
  paddingTop?: string;
}) {
  const [topSlotIdx, setTopSlotIdx] = useState(2);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl overflow-hidden"
      style={{ background: `linear-gradient(145deg, ${g.from}, ${g.to})` }}
    >
      {/* Card header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between gap-3 mb-3">
          <p className="text-white font-bold text-sm leading-snug max-w-[200px]">{proj.desc}</p>
          <div className="flex gap-1.5 shrink-0">
            {proj.liveUrl && (
              <a href={proj.liveUrl} target={proj.isMobile ? undefined : "_blank"} rel="noreferrer" download={proj.isMobile ? "pocketmind.apk" : undefined}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                {proj.isMobile ? <Download size={13} className="text-white" /> : <ArrowRight size={13} className="text-white" />}
              </a>
            )}
            {proj.githubUrl && (
              <a href={proj.githubUrl} target="_blank" rel="noreferrer"
                className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>
                <Github size={12} className="text-white" />
              </a>
            )}
          </div>
        </div>
      </div>
      {/* Fan windows */}
      <div className="px-4 pb-4 relative" style={{ paddingTop: proj.isMobile ? "105%" : paddingTop }}>
        <div className="absolute inset-0 flex items-center justify-center">
          {FAN_SLOTS.map((slot, si) => {
            const posIdx = getPositionIndex(si, topSlotIdx);
            const posStyles = getFanSlotStyles(posIdx, isHovered);
            
            return (
              <motion.div
                key={si}
                className="absolute cursor-pointer"
                style={{ width: proj.isMobile ? "48%" : "76%", zIndex: posStyles.z, willChange: "transform" }}
                initial={{ ...FAN_ENTERS[si] }}
                whileInView={{
                  x: posStyles.x,
                  y: posStyles.y,
                  opacity: 1,
                  rotate: posStyles.rotate,
                  scale: posStyles.scale,
                }}
                viewport={{ once: false, margin: "-12%" }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                  delay: isHovered || topSlotIdx !== 2 ? 0 : FAN_DELAYS[si] + 0.2
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTopSlotIdx(si);
                }}
              >
                <div className="rounded-xl overflow-hidden transition-shadow duration-300" style={{ boxShadow: posStyles.shadow, border: "1.5px solid rgba(255,255,255,0.12)" }}>
                  {proj.isMobile ? (
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
                      <div className="w-7 h-1.5 bg-black rounded-full border border-white/5" />
                      <div className="flex items-center gap-1 font-mono">
                        <span>5G</span>
                        <span>29%</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: "rgba(0,0,0,0.5)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/70" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                      <div className="ml-1.5 flex-1 rounded-sm px-1.5 py-0.5 text-[6px] font-mono text-white/25 truncate" style={{ background: "rgba(255,255,255,0.06)" }}>
                        {HOME_PROJ_LABELS[projIdx]?.[si] || "preview"}
                      </div>
                    </div>
                  )}
                  <div style={{ aspectRatio: proj.isMobile ? "9/16" : "16/9", position: "relative", overflow: "hidden" }}>
                    <HomeProjScreen projIdx={projIdx} slotIdx={si} />
                    {proj.isMobile && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-white/30 rounded-full pointer-events-none" />
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Right column detail — rich layout matching /projects page
function HomeProjDetail({ proj, idx }: { proj: typeof PROJECTS[0]; idx: number }) {
  const g = HOME_PROJ_GRADIENTS[idx % HOME_PROJ_GRADIENTS.length];

  // Feature bullets synthesised from the project tags
  const bullets = [
    { label: "Tech Stack", detail: proj.tags.slice(0, 4).join(" · ") + (proj.tags.length > 4 ? " + more" : "") },
    { label: "Key Metric", detail: `${proj.stat.value} ${proj.stat.label}` },
    { label: "Category",   detail: proj.subtitle },
  ];

  return (
    <div className="w-full">
      {/* Meta row */}
      <div className="flex items-center gap-3 mb-5">
        <span className="font-mono text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">{String(idx+1).padStart(2,"0")}</span>
        <span className="h-px flex-1 max-w-[32px] bg-slate-200"/>
        <span className="section-label" style={{ backgroundColor: g.accent }}>{proj.subtitle}</span>
      </div>

      {/* Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1.5 h-12 rounded-full shrink-0" style={{ backgroundColor: g.accent }}/>
        <h3 className="text-4xl xl:text-5xl font-black text-slate-900 tracking-tight leading-tight">{proj.title}</h3>
      </div>

      {/* Stat callout */}
      <div className="pl-[18px] mb-6">
        <div className="text-5xl font-black tracking-tight" style={{ color: g.accent }}>{proj.stat.value}</div>
        <div className="font-mono text-[9px] font-black uppercase tracking-[0.25em] text-slate-400 mt-0.5">{proj.stat.label}</div>
      </div>

      {/* Description */}
      <p className="text-slate-600 leading-relaxed mb-7 text-sm border-l-2 pl-4" style={{ borderColor: g.accent + "40" }}>
        {proj.desc}
      </p>

      {/* Feature bullets with staggered entrance */}
      <div className="space-y-4 mb-7">
        {bullets.map((b, bi) => (
          <motion.div key={b.label}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: bi * 0.08, ease: "easeOut" }}
            className="flex items-start gap-3">
            <span className="font-black text-lg leading-none mt-0.5 shrink-0" style={{ color: g.accent }}>+</span>
            <div>
              <p className="font-black text-slate-900 text-sm">{b.label}</p>
              <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{b.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-2 mb-7">
        {proj.tags.map(tag => (
          <span key={tag} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-slate-200 bg-white font-mono text-[8px] font-black uppercase tracking-wide text-slate-700 hover:border-slate-400 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: g.accent }}/>
            {tag}
          </span>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-2.5">
        {proj.liveUrl && (
          <a href={proj.liveUrl} target={proj.isMobile ? undefined : "_blank"} rel="noreferrer" download={proj.isMobile ? "pocketmind.apk" : undefined}
            className="flex items-center gap-1.5 px-5 py-2.5 font-mono text-[9px] font-black uppercase text-white hover:opacity-90 transition-opacity"
            style={{ backgroundColor: g.accent }}>
            {proj.isMobile ? <Download size={11}/> : <Globe size={11}/>}
            {proj.isMobile ? "Download APK" : "Live Site"}
          </a>
        )}
        {proj.githubUrl && (
          <a href={proj.githubUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-1.5 px-5 py-2.5 border-2 border-black font-mono text-[9px] font-black uppercase hover:bg-slate-100 transition-colors">
            <Github size={11}/> Source
          </a>
        )}
        <Link href="/projects"
          className="flex items-center gap-1.5 px-5 py-2.5 border border-slate-200 font-mono text-[9px] font-black uppercase hover:bg-slate-50 transition-colors text-slate-500">
          Full Case Study <ArrowRight size={10}/>
        </Link>
      </div>
    </div>
  );
}

// Self-contained sticky-scroll section for the homepage
function HomeStickyProjects() {
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
    <section id="projects" style={{ backgroundColor: "#fafaf7" }}>
      {/* Section header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24 pt-16 sm:pt-24 pb-8">
        <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.4 }}>
          <div className="section-label mb-3">Featured Projects</div>
          <div className="flex items-end justify-between">
            <h2 className="section-heading">What I&apos;ve<br/>Built</h2>
            <Link href="/projects" className="hidden sm:flex btn-primary text-xs px-4 py-2.5">
              All Projects <ArrowRight size={12}/>
            </Link>
          </div>

          {/* Project jump tabs — highlight active */}
          <div className="flex gap-2 mt-6 overflow-x-auto no-scrollbar pb-1">
            {PROJECTS.map((p, i) => (
              <button key={p.id}
                onClick={() => detailRefs.current[i]?.scrollIntoView({ behavior:"smooth", block:"center" })}
                className="flex items-center gap-1.5 px-3 py-1.5 border-2 font-mono text-[8px] font-black uppercase tracking-wider shrink-0 whitespace-nowrap transition-all duration-200"
                style={{
                  borderColor: i === activeIdx ? HOME_PROJ_GRADIENTS[i % HOME_PROJ_GRADIENTS.length].accent : "black",
                  background:  i === activeIdx ? HOME_PROJ_GRADIENTS[i % HOME_PROJ_GRADIENTS.length].accent : "transparent",
                  color:       i === activeIdx ? "white" : "black",
                }}>
                <span style={{ color: i === activeIdx ? "rgba(255,255,255,0.5)" : "#94a3b8" }}>{String(i+1).padStart(2,"0")}</span>
                {p.title}
                {p.liveUrl && <Globe size={7} style={{ color: i === activeIdx ? "rgba(255,255,255,0.6)" : "#10b981" }}/>}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="border-t border-slate-200" />

      {/* ── DESKTOP: paired sections — preview + details both scroll and animate together ── */}
      <div className="hidden lg:block">
        <div className="max-w-7xl mx-auto px-16">
          {PROJECTS.map((p, i) => {
            const g = HOME_PROJ_GRADIENTS[i % HOME_PROJ_GRADIENTS.length];
            const flip = i % 2 !== 0; // alternate layout each project
            const PreviewCard = (
              <motion.div
                key={`card-${p.id}`}
                initial={{ opacity: 0, x: flip ? 70 : -70, scale: 0.93 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, margin: "-12%" }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                <HomePreviewCard proj={p} projIdx={i} g={g} paddingTop="56%" />
              </motion.div>
            );            const Details = (
              <motion.div
                key={`detail-${p.id}`}
                initial={{ opacity: 0, x: flip ? -70 : 70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-12%" }}
                transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <HomeProjDetail proj={p} idx={i} />
              </motion.div>
            );

            return (
              <div
                key={p.id}
                ref={el => { detailRefs.current[i] = el; }}
                className="grid grid-cols-2 gap-12 items-center border-b border-dashed border-slate-100 last:border-none"
                style={{ minHeight: "100vh", padding: "5rem 0" }}
              >
                {flip ? <>{Details}{PreviewCard}</> : <>{PreviewCard}{Details}</>}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── MOBILE: stacked ── */}
      <div className="lg:hidden">
        {PROJECTS.map((p, i) => {
          const g = HOME_PROJ_GRADIENTS[i % HOME_PROJ_GRADIENTS.length];
          return (
            <div key={p.id} className="py-10 border-t-2 border-dashed border-slate-200 px-4 sm:px-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[8px] font-black text-slate-300 uppercase tracking-[0.25em]">{String(i+1).padStart(2,"0")}</span>
                <span className="h-px flex-1 bg-slate-200"/>
                <span className="font-mono text-[8px] uppercase text-slate-400">{p.subtitle}</span>
              </div>
              {/* Gradient card + fan */}
              <div className="mb-7">
                <HomePreviewCard proj={p} projIdx={i} g={g} paddingTop="60%" />
              </div>
              <HomeProjDetail proj={p} idx={i}/>
            </div>
          );
        })}
      </div>

      {/* Mobile CTA */}
      <div className="lg:hidden px-4 sm:px-6 pb-12 pt-4">
        <Link href="/projects" className="btn-primary w-full justify-center text-xs">
          View All Projects <ArrowRight size={12}/>
        </Link>
      </div>
    </section>
  );
}

// ─── AVATAR PIXELATED CANVAS ──────────────────────────────────────────────────

function AvatarPixelated() {
  const [isPixelated, setIsPixelated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 320, height: 400 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setCanvasSize({ width: Math.round(width), height: Math.round(height) });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="aspect-[4/5] bg-slate-100 border-2 border-black overflow-hidden relative cursor-pointer select-none group"
      onMouseEnter={() => setIsPixelated(true)}
      onMouseLeave={() => setIsPixelated(false)}
      onClick={() => setIsPixelated((prev) => !prev)}
    >
      {/* Normal Image */}
      <img
        src="./my.avif"
        className={`w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 ${
          isPixelated ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
        alt="Om Avchar"
      />

      {/* Pixelated Canvas Overlay */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          isPixelated ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {canvasSize.width > 0 && (
          <PixelatedCanvas
            src="./my.avif"
            width={canvasSize.width}
            height={canvasSize.height}
            cellSize={3}
            dotScale={0.95}
            shape="square"
            backgroundColor="#ffffff"
            dropoutStrength={0.1}
            interactive={isPixelated}
            distortionStrength={2.5}
            distortionRadius={45}
            distortionMode="swirl"
            followSpeed={0.25}
            jitterStrength={2}
            jitterSpeed={3}
            sampleAverage
            tintColor="#3b82f6"
            tintStrength={0.08}
            className="w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────

interface HomeClientProps {
  initialLeetcodeData?: any;
}

export default function HomeClient({ initialLeetcodeData }: HomeClientProps) {
  const [leetcodeData, setLeetcodeData] = useState(initialLeetcodeData);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Keep data fresh by fetching from client proxy
    fetch("/api/leetcode")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        if (data && data.matchedUser) {
          setLeetcodeData(data);
        }
      })
      .catch((err) => console.error("Client side LeetCode fetch failed:", err));
  }, []);
  const [popup, setPopup] = useState({ visible: false, message: "", type: "" });
  const [activeTool, setActiveTool] = useState(0);

  const scriptURL = "https://script.google.com/macros/s/AKfycbyqwV7NdSV01Je0qLcMOcKP9eN2XqjeYi5jl1NY-NgGE3ZfgUJOzm2CfqlJKhhWLImd/exec";

  const handleResumeDownload = () => window.open("/Om_Avchar_Resume_A.pdf", "_blank");

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const body = new FormData();
    body.append("name", formData.name);
    body.append("email", formData.email);
    body.append("message", formData.message);
    fetch(scriptURL, { method: "POST", body })
      .then(() => {
        setIsSubmitting(false);
        setPopup({ visible: true, message: "Message sent! I'll be in touch.", type: "success" });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 4000);
      })
      .catch(() => {
        setIsSubmitting(false);
        setPopup({ visible: true, message: "Failed to send. Try again.", type: "error" });
        setTimeout(() => setPopup({ visible: false, message: "", type: "" }), 4000);
      });
  };

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: "#fafaf7" }}>

      {/* ── TOAST POPUP ── */}
      <AnimatePresence>
        {popup.visible && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className={`fixed bottom-6 left-4 right-4 sm:left-auto sm:right-8 sm:w-auto z-[300] px-5 py-3 border-2 border-black paper-shadow flex items-center gap-3 font-mono text-sm font-bold ${popup.type === "success" ? "bg-emerald-50" : "bg-red-50"}`}
          >
            {popup.type === "success" ? <CheckCircle2 size={16} className="text-emerald-600 shrink-0" /> : <AlertCircle size={16} className="text-red-600 shrink-0" />}
            <span className="text-sm">{popup.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════════
          § HERO
      ══════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24 pt-24 pb-20">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left — staggered entrance */}
            <motion.div
              className="order-2 lg:order-1"
              variants={staggerNormal}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp} className="section-label mb-5 text-xs">
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Available for opportunities
                </span>
              </motion.div>

              <motion.h1
                variants={stampIn}
                className="handwritten text-[3.8rem] sm:text-[5.5rem] lg:text-[7.5rem] font-bold tracking-tighter leading-[0.85] text-slate-900 mb-5"
              >
                Om<br />Avchar
              </motion.h1>

              <motion.p variants={fadeUp} className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-[0.15em] text-blue-600 border-l-4 border-blue-600 pl-3 mb-6">
                &gt; Backend Engineer // System Designer // AI Builder
              </motion.p>

              <motion.p variants={fadeUp} className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                I build systems that <strong className="text-slate-900">scale to hundreds of thousands of users</strong>. Specializing in high-concurrency architectures, AI pipelines, and distributed infrastructure.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2 sm:gap-3 mb-8">
                <button onClick={handleResumeDownload} className="btn-primary text-xs px-4 py-2.5">
                  <Download size={13} /> Download CV
                </button>
                <a href="https://github.com/omavcher" target="_blank" rel="noreferrer" className="btn-outline text-xs px-4 py-2.5">
                  <Github size={13} /> GitHub
                </a>
                <a href="https://linkedin.com/in/omawchar" target="_blank" rel="noreferrer" className="btn-outline text-xs px-4 py-2.5">
                  <Linkedin size={13} /> LinkedIn
                </a>
              </motion.div>

              {/* Stats row — each stat pops in */}
              <motion.div variants={staggerFast} className="flex flex-wrap gap-5 sm:gap-8 font-mono border-t-2 border-dashed border-slate-200 pt-6">
                {[
                  { label: "Users Served", val: "550K+", color: "text-red-600" },
                  { 
                    label: "LeetCode Solved", 
                    val: leetcodeData?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x: any) => x.difficulty === "All")?.count?.toString() || "140", 
                    color: "text-orange-600" 
                  },
                  { label: "Hackathons Won", val: "5+", color: "text-blue-600" },
                ].map((s) => (
                  <motion.div key={s.label} variants={popIn}>
                    <div className={`text-xl sm:text-2xl font-black ${s.color}`}>{s.val}</div>
                    <div className="text-[8px] sm:text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-0.5">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — photo card floats in from right */}
            <motion.div
              className="order-1 lg:order-2 flex justify-center"
              initial={{ opacity: 0, x: 60, rotate: 8 }}
              animate={{ opacity: 1, x: 0, rotate: -1.5 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            >
              <div className="relative">
                <div className="w-56 sm:w-72 md:w-80 bg-white border-2 border-black paper-shadow p-3 sm:p-4">
                  <AvatarPixelated />
                  <div className="mt-3 text-center">
                    <p className="handwritten text-xl sm:text-2xl font-bold italic">Software Engineer</p>
                    <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-1">Nagpur, India · 2026</p>
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 3 }}
                  transition={{ delay: 0.7, duration: 0.5, type: "spring", stiffness: 300 }}
                  className="absolute -top-3 -right-3 bg-black text-white px-2.5 py-1.5 font-mono text-[8px] font-black uppercase paper-shadow"
                >
                  Open to Work
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.7, rotate: 5 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2 }}
                  transition={{ delay: 0.85, duration: 0.5, type: "spring", stiffness: 300 }}
                  className="absolute -bottom-2 -left-2 bg-emerald-400 border-2 border-black px-2.5 py-1.5 font-mono text-[8px] font-black uppercase"
                >
                  CS Student
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator — only on large screens */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase text-slate-400 tracking-widest flex-col items-center gap-2"
        >
          <div className="w-5 h-8 border-2 border-slate-400 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 12], opacity: [1, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-1.5 bg-slate-400 rounded-full"
            />
          </div>
          Scroll
        </motion.div>
      </section>

      {/* ── TICKER ── */}
      <div className="border-y-2 border-black bg-black text-white py-2.5 overflow-hidden">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="font-mono text-[10px] sm:text-xs font-black uppercase tracking-widest px-6 sm:px-8 flex items-center gap-3 sm:gap-4">
              {item}
              <span className="text-yellow-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          § ABOUT ME
      ══════════════════════════════════════════ */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">About Me</motion.div>
            <motion.h2 variants={stampIn} className="section-heading mb-10 sm:mb-14">Who I Am</motion.h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Bio — slides in from left */}
            <motion.div
              className="lg:col-span-2 paper-sheet paper-shadow p-6 sm:p-8 md:p-10 space-y-4 text-base text-slate-700 leading-relaxed"
              variants={slideLeft}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <p>
                I&apos;m a <span className="bg-emerald-100 border border-emerald-300 px-1.5 font-bold text-slate-900">Backend-heavy Full-Stack Engineer</span> and Computer Science student at GWCET, Nagpur — obsessed with building systems that <span className="bg-blue-100 border border-blue-300 px-1.5 font-bold text-slate-900">massive scale</span>.
              </p>
              <p>
                I specialize in <strong>distributed system design</strong>, high-concurrency Node.js architectures, AI pipeline engineering, and database optimization. My flagship project HeartEcho scaled from zero to <strong>550,000+ users</strong> using a custom Priority Queue + Redis Emotional Cache system I designed from scratch.
              </p>
              <p className="font-mono text-xs text-slate-500 border-l-4 border-black pl-4 leading-loose">
                &gt; Core Stack: Node.js · Redis · MongoDB · PostgreSQL · AWS · Nginx · OpenAI
              </p>
              <div className="pt-4 border-t-2 border-dashed border-slate-200 flex flex-wrap gap-3">
                <Link href="/about" className="btn-primary text-xs px-4 py-2.5">
                  Full Bio <ArrowRight size={12} />
                </Link>
                <Link href="/projects" className="btn-outline text-xs px-4 py-2.5">
                  Projects <ChevronRight size={12} />
                </Link>
              </div>
            </motion.div>

            {/* Stat cards — stagger pop in from right */}
            <motion.div
              className="grid grid-cols-2 lg:grid-cols-1 gap-3"
              variants={staggerNormal}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              {[
                { icon: <Users size={18} className="text-red-500" />, val: "550,000+", label: "Users Served", bg: "bg-red-50" },
                { icon: <Trophy size={18} className="text-yellow-500" />, val: "5+", label: "Hackathon Placements", bg: "bg-yellow-50" },
                { icon: <Code size={18} className="text-orange-500" />, val: "1,396", label: "LeetCode Rating", bg: "bg-orange-50" },
                { icon: <Sparkles size={18} className="text-blue-500" />, val: "3+", label: "Internships", bg: "bg-blue-50" },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={popIn}
                  whileHover={{ x: 3, y: -3 }}
                  className={`paper-flat paper-shadow p-4 ${stat.bg} flex items-center gap-3`}
                >
                  <div className="w-9 h-9 bg-white border-2 border-black flex items-center justify-center shrink-0">
                    {stat.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-black text-slate-900 leading-tight">{stat.val}</div>
                    <div className="text-[8px] font-mono uppercase font-bold text-slate-500 tracking-wider leading-tight mt-0.5">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § FEATURED PROJECTS  (sticky-scroll)
      ══════════════════════════════════════════ */}
      <HomeStickyProjects />

      {/* ══════════════════════════════════════════
          § EXPERIENCE LEDGER
      ══════════════════════════════════════════ */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Work</motion.div>
            <div className="flex items-end justify-between mb-10 sm:mb-14 gap-4">
              <motion.h2 variants={stampIn} className="section-heading">Experience<br />Ledger</motion.h2>
              <motion.div variants={fadeIn} className="hidden sm:block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                {EXPERIENCE.length} Internships
              </motion.div>
            </div>
          </motion.div>

          <div className="space-y-0">
            {EXPERIENCE.map((exp, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.14, delayChildren: i * 0.08 } },
                }}
                className="group relative"
              >
                {/* Main card — left and right panels slide from opposite sides */}
                <motion.div
                  className="border-2 border-black bg-white overflow-hidden transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ boxShadow: `4px 4px 0 ${exp.accent}`, marginBottom: "1.5rem" }}
                  variants={scaleUp}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">

                    {/* LEFT PANEL — accent bg, number, role, company */}
                    <div
                      className="p-5 sm:p-7 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-black"
                      style={{ backgroundColor: exp.accent + "10" }}
                    >
                      {/* Big index number */}
                      <div
                        className="text-[64px] sm:text-[80px] font-black leading-none tracking-tighter mb-4 select-none"
                        style={{ color: exp.accent + "25" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>

                      {/* Role */}
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className="w-8 h-8 border-2 border-black flex items-center justify-center shrink-0"
                            style={{ background: "white" }}
                          >
                            {exp.icon}
                          </div>
                          <span
                            className="font-mono text-[7px] sm:text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 border border-black"
                            style={{ color: exp.accent, borderColor: exp.accent + "60" }}
                          >
                            Intern
                          </span>
                        </div>

                        <h3 className="text-sm sm:text-base font-black text-slate-900 leading-snug mb-2">
                          {exp.role}
                        </h3>

                        <div className="font-mono text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-1" style={{ color: exp.accent }}>
                          {exp.company}
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[8px] text-slate-400 uppercase tracking-wide">{exp.location}</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300" />
                          <span className="font-mono text-[8px] text-slate-500 uppercase tracking-wide whitespace-nowrap">{exp.duration}</span>
                        </div>
                      </div>

                      {/* Key metric */}
                      <div className="mt-5 pt-4 border-t border-dashed" style={{ borderColor: exp.accent + "40" }}>
                        <div className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: exp.accent }}>
                          {exp.metric.val}
                        </div>
                        <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mt-0.5">
                          {exp.metric.label}
                        </div>
                      </div>
                    </div>

                    {/* RIGHT PANEL — bullets + skills */}
                    <div className="p-5 sm:p-7 flex flex-col justify-between">
                      {/* Bullets */}
                      <ul className="space-y-4 mb-6">
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: bi === 0 ? exp.accent : exp.accent + "60" }}
                            />
                            <p className="text-slate-700 text-sm leading-relaxed">{b}</p>
                          </li>
                        ))}
                      </ul>

                      {/* Skills chips */}
                      <div>
                        <div className="font-mono text-[7px] font-black uppercase tracking-[0.25em] text-slate-300 mb-2">Stack Used</div>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-2.5 py-1 font-mono text-[8px] font-black uppercase tracking-wide border-2 transition-colors"
                              style={{ borderColor: exp.accent + "50", color: exp.accent, backgroundColor: exp.accent + "08" }}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § ACADEMIC LEDGER
      ══════════════════════════════════════════ */}
      <section id="education" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Education</motion.div>
            <div className="flex items-end justify-between mb-8 sm:mb-12 gap-4">
              <motion.h2 variants={stampIn} className="section-heading">Academic<br />Ledger</motion.h2>
              <motion.div variants={popIn} className="flex items-center gap-2 font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-blue-500 animate-pulse" />
                {EDUCATION.filter(e => e.status === "Pursuing").length} Active
              </motion.div>
            </div>
          </motion.div>

          {/* Horizontal timeline — always 3 columns, shrinks on mobile */}
          <div className="relative">

            {/* Horizontal connector line behind the dots */}
            <div className="absolute top-[20px] sm:top-[24px] left-0 right-0 h-px bg-black z-0" style={{ top: "20px" }} />

            {/* 3-col grid — no responsive breakpoints, always a row */}
            <motion.div
              className="grid grid-cols-3 gap-2 sm:gap-6"
              variants={staggerNormal}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={i}
                  variants={scaleUp}
                  className="flex flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Timeline dot */}
                  <div className={`flex ${i === 0 ? "justify-start" : i === 1 ? "justify-center" : "justify-end"} mb-3 sm:mb-4 relative z-10`}>
                    <div
                      className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-black bg-white flex items-center justify-center font-mono text-[6px] sm:text-[8px] font-black uppercase"
                      style={{ boxShadow: "2px 2px 0 #000", color: edu.accentColor }}
                    >
                      {edu.tag}
                    </div>
                  </div>

                  {/* Card */}
                  <div className="border-2 border-black bg-white overflow-hidden flex flex-col" style={{ boxShadow: "3px 3px 0 #000" }}>
                    {/* Square image */}
                    <div className="relative w-full" style={{ aspectRatio: "1/1", overflow: "hidden" }}>
                      <img
                        src={edu.image}
                        alt={edu.school}
                        className="w-full h-full object-cover"
                        style={{ filter: "grayscale(15%)" }}
                      />
                      {/* Tinted overlay */}
                      <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${edu.accentColor}99 100%)` }} />
                      {/* Status pill on image */}
                      <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2">
                        <span className={`px-1.5 py-0.5 sm:px-2 sm:py-1 font-mono text-[6px] sm:text-[7px] font-black uppercase tracking-wide border border-black ${edu.statusColor}`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    {/* Card content */}
                    <div className="p-2 sm:p-4 flex flex-col gap-0.5 sm:gap-1">
                      <div className="font-black text-slate-900 text-[9px] sm:text-sm leading-tight">{edu.tag === "B.Tech" ? "B.Tech CSE" : edu.tag === "HSC" ? "HSC (PCM)" : "SSC"}</div>
                      <div className="font-mono text-[7px] sm:text-[9px] font-black uppercase tracking-wide leading-tight truncate" style={{ color: edu.accentColor }}>
                        {edu.shortSchool}
                      </div>
                      <div className="font-mono text-[6px] sm:text-[8px] text-slate-400 uppercase tracking-wider">{edu.year}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § TOOLBOX
      ══════════════════════════════════════════ */}
      <section id="toolbox" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Skills</motion.div>
            <div className="flex items-end justify-between mb-10 sm:mb-14 gap-4">
              <motion.h2 variants={stampIn} className="section-heading">My<br />Toolbox</motion.h2>
              <motion.div variants={fadeIn} className="hidden sm:block font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                {TECH_CATEGORIES.reduce((a, c) => a + c.items.length, 0)}+ Technologies
              </motion.div>
            </div>
          </motion.div>

          {/* Full skills map — rows clip-reveal one by one */}
          <motion.div
            className="border-2 border-black bg-white"
            style={{ boxShadow: "4px 4px 0 #000" }}
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {TECH_CATEGORIES.map((cat, ci) => (
              <motion.div
                key={cat.category}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: ci * 0.055, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-0 p-4 sm:p-5 ${
                  ci < TECH_CATEGORIES.length - 1 ? "border-b-2 border-black" : ""
                }`}
              >
                {/* Category label — fixed left column */}
                <div className="flex items-center gap-2 sm:w-44 sm:shrink-0 sm:pt-0.5">
                  <div
                    className="w-6 h-6 border-2 border-black flex items-center justify-center shrink-0"
                    style={{ color: cat.accent, backgroundColor: cat.accent + "12" }}
                  >
                    {cat.icon}
                  </div>
                  <span
                    className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-[0.15em] whitespace-nowrap"
                    style={{ color: cat.accent }}
                  >
                    {cat.category}
                  </span>
                </div>

                {/* Vertical divider — desktop only */}
                <div className="hidden sm:block w-px bg-black mr-5 self-stretch" />

                {/* Skill chips */}
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((tech) => (
                    <motion.div
                      key={tech.name}
                      whileHover={{ y: -2, scale: 1.05 }}
                      className="group flex items-center gap-1.5 px-2.5 py-1.5 border border-slate-200 bg-slate-50 hover:border-black hover:bg-white transition-all cursor-default"
                    >
                      <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                        />
                      </div>
                      <span className="font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wide text-slate-500 group-hover:text-slate-900 transition-colors whitespace-nowrap">
                        {tech.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* LeetCode callout */}
          <div className="mt-4 flex items-center gap-3 border-2 border-black px-4 py-3 bg-white" style={{ boxShadow: "3px 3px 0 #dc2626" }}>
            <Trophy size={14} className="text-red-600 shrink-0" />
            <p className="font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-slate-700">
              LeetCode Solved: <span className="text-red-600">
                {leetcodeData?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find((x: any) => x.difficulty === "All")?.count || 140} / {leetcodeData?.allQuestionsCount?.find((x: any) => x.difficulty === "All")?.count || 3962}
              </span>
              <span className="text-slate-400 mx-2">·</span>
              Competitive Programming
              <span className="text-slate-400 mx-2">·</span>
              DSA in C++
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          § GITHUB ACTIVITY
      ══════════════════════════════════════════ */}
      <section id="github" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">

          {/* Header row */}
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Code &amp; Commits</motion.div>
            <div className="flex items-end justify-between mb-10 sm:mb-12 gap-4">
              <motion.h2 variants={stampIn} className="section-heading">GitHub<br />Activity</motion.h2>
              <motion.a
                variants={popIn}
                href="https://github.com/omavcher" target="_blank" rel="noreferrer"
                className="hidden sm:flex btn-primary text-xs px-4 py-2.5 shrink-0">
                <Github size={12} /> Profile
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="border-2 border-black bg-white paper-shadow overflow-hidden"
          >
            {/* Card header — paper bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 border-2 border-black flex items-center justify-center bg-white">
                  <Github size={13} className="text-slate-800" />
                </div>
                <a href="https://github.com/omavcher" target="_blank" rel="noreferrer"
                  className="font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-800 hover:text-black flex items-center gap-1.5 transition-colors">
                  github.com/omavcher
                  <ExternalLink size={8} className="text-slate-400" />
                </a>
              </div>
              <div className="flex items-center gap-1.5 bg-black text-white px-2.5 py-1 font-mono text-[7px] font-black uppercase tracking-widest">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Live
              </div>
            </div>

            {/* Heatmap */}
            <div className="p-4 sm:p-6 md:p-8 bg-white overflow-x-auto no-scrollbar">
              <GitHubHeatmap username="omavcher" dark={false} />
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 py-3 border-t-2 border-dashed border-slate-200 flex items-center justify-between gap-2 flex-wrap" style={{ backgroundColor: "#fafaf7" }}>
              <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">
                github-contributions-api · refreshes daily
              </span>
              <a href="https://github.com/omavcher?tab=repositories" target="_blank" rel="noreferrer"
                className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-700 hover:text-black transition-colors flex items-center gap-1">
                Repositories <ArrowRight size={9} />
              </a>
            </div>
          </motion.div>

          {/* Mobile CTA */}
          <div className="mt-5 sm:hidden">
            <a href="https://github.com/omavcher" target="_blank" rel="noreferrer" className="btn-primary w-full justify-center text-xs">
              <Github size={13} /> View GitHub Profile
            </a>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          § LEETCODE ACTIVITY & STATS
      ══════════════════════════════════════════ */}
      {leetcodeData && leetcodeData.matchedUser && (
        <section id="leetcode" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#fafaf7" }}>
          <div className="max-w-5xl mx-auto border-t-2 border-dashed border-slate-200 pt-16 sm:pt-24">
            {/* Header row */}
            <div className="section-label mb-4">DSA &amp; Problem Solving</div>
            <div className="flex items-end justify-between mb-10 sm:mb-12 gap-4">
              <h2 className="section-heading">LeetCode<br />Activity</h2>
              <a href={`https://leetcode.com/u/${leetcodeData.matchedUser.username}/`} target="_blank" rel="noreferrer"
                className="hidden sm:flex btn-primary text-xs px-4 py-2.5 shrink-0 gap-2 font-bold" style={{ backgroundColor: "#ffa116", borderColor: "black" }}>
                <Trophy size={12} /> LeetCode Profile
              </a>
            </div>

            {/* LeetCode Stats Card */}
            <div className="mb-8">
              <LeetCodeStatsCard data={leetcodeData} />
            </div>

            {/* Heatmap Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="border-2 border-black bg-white paper-shadow overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b-2 border-black" style={{ backgroundColor: "#fafaf7" }}>
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 border-2 border-black flex items-center justify-center bg-white" style={{ borderColor: "#ffa116" }}>
                    <Trophy size={13} className="text-orange-500" />
                  </div>
                  <a href={`https://leetcode.com/u/${leetcodeData.matchedUser.username}/`} target="_blank" rel="noreferrer"
                    className="font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-800 hover:text-black flex items-center gap-1.5 transition-colors">
                    leetcode.com/{leetcodeData.matchedUser.username}
                    <ExternalLink size={8} className="text-slate-400" />
                  </a>
                </div>
                <div className="flex items-center gap-1.5 bg-black text-white px-2.5 py-1 font-mono text-[7px] font-black uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                  Live Stats
                </div>
              </div>

              {/* Heatmap */}
              <div className="p-4 sm:p-6 md:p-8 bg-white overflow-x-auto no-scrollbar">
                <LeetCodeHeatmap 
                  submissionCalendarString={leetcodeData.matchedUser.userCalendar.submissionCalendar}
                  streak={leetcodeData.matchedUser.userCalendar.streak}
                  totalActiveDays={leetcodeData.matchedUser.userCalendar.totalActiveDays}
                />
              </div>

              {/* Footer */}
              <div className="px-4 sm:px-6 py-3 border-t-2 border-dashed border-slate-200 flex items-center justify-between gap-2 flex-wrap" style={{ backgroundColor: "#fafaf7" }}>
                <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest font-bold">
                  leetcode.com/graphql · refreshes hourly
                </span>
                <a href={`https://leetcode.com/u/${leetcodeData.matchedUser.username}/`} target="_blank" rel="noreferrer"
                  className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-700 hover:text-black transition-colors flex items-center gap-1">
                  Solve Problems <ArrowRight size={9} />
                </a>
              </div>
            </motion.div>

            {/* Mobile CTA */}
            <div className="mt-5 sm:hidden">
              <a href={`https://leetcode.com/u/${leetcodeData.matchedUser.username}/`} target="_blank" rel="noreferrer" className="btn-primary w-full justify-center text-xs gap-2" style={{ backgroundColor: "#ffa116", borderColor: "black" }}>
                <Trophy size={13} /> View LeetCode Profile
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          § HONORS & AWARDS
      ══════════════════════════════════════════ */}
      <section id="honors" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#fafaf7" }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Achievements</motion.div>
            <div className="flex items-end justify-between mb-10 sm:mb-14">
              <motion.h2 variants={stampIn} className="section-heading">Honors &<br />Awards</motion.h2>
              <motion.div variants={popIn} className="hidden sm:flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
                <Award size={11} /> {HONORS.length} Achievements
              </motion.div>
            </div>
          </motion.div>

          {/* Awards list */}
          <motion.div
            className="border-2 border-black bg-white"
            style={{ boxShadow: "4px 4px 0 #000" }}
            variants={staggerNormal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {HONORS.map((item, i) => (
              <motion.div
                key={i}
                variants={slideLeft}
                className={`group relative ${
                  i < HONORS.length - 1 ? "border-b-2 border-black" : ""
                }`}
              >
                {/* Accent top bar */}
                <div className="h-1 w-full" style={{ backgroundColor: item.accent }} />

                <div className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Left — number + year badge */}
                    <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2 sm:w-24 sm:shrink-0">
                      <div
                        className="text-[40px] sm:text-[52px] font-black leading-none tracking-tighter select-none"
                        style={{ color: item.accent + "22" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <div
                        className="px-2 py-1 font-mono text-[8px] font-black uppercase tracking-wider text-white shrink-0"
                        style={{ backgroundColor: item.accent }}
                      >
                        {item.year}
                      </div>
                    </div>

                    {/* Center — title + org + desc */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2 flex-wrap mb-1">
                        <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                          {item.title}
                        </h3>
                        <span
                          className="font-mono text-[7px] font-black uppercase tracking-widest px-2 py-0.5 border shrink-0 self-start mt-0.5"
                          style={{ color: item.accent, borderColor: item.accent + "50" }}
                        >
                          {item.type}
                        </span>
                      </div>
                      <p className="font-mono text-[9px] font-black uppercase tracking-wider mb-0.5" style={{ color: item.accent }}>
                        {item.event}
                      </p>
                      <p className="font-mono text-[8px] text-slate-400 uppercase tracking-wide mb-3">@ {item.org}</p>
                      <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Right — proof button */}
                    <div className="sm:shrink-0 sm:w-36 flex sm:flex-col items-start sm:items-end gap-2">
                      {item.proofImg ? (
                        <a
                          href={item.proofImg}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 border-2 border-black font-mono text-[8px] font-black uppercase tracking-wide hover:bg-black hover:text-white transition-all"
                          style={{ boxShadow: `2px 2px 0 ${item.accent}` }}
                        >
                          <ExternalLink size={10} /> View Proof
                        </a>
                      ) : item.proofPdf ? (
                        <a
                          href={item.proofPdf}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 px-3 py-2 border-2 border-black font-mono text-[8px] font-black uppercase tracking-wide hover:bg-black hover:text-white transition-all"
                          style={{ boxShadow: `2px 2px 0 ${item.accent}` }}
                        >
                          <ExternalLink size={10} /> {item.proofLabel}
                        </a>
                      ) : (
                        <div
                          className="flex items-center gap-1.5 px-3 py-2 border border-dashed border-slate-300 font-mono text-[7px] font-black uppercase tracking-wide text-slate-400"
                        >
                          <Award size={9} /> {item.proofLabel}
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Upload CTA */}
          <motion.p
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_LAZY}
            className="mt-4 font-mono text-[8px] text-slate-400 uppercase tracking-widest text-center"
          >
            Proof images &amp; certificates — drop files in <span className="text-slate-600 font-black">/public/</span> and link via <span className="text-slate-600 font-black">proofImg</span> or <span className="text-slate-600 font-black">proofPdf</span>
          </motion.p>

        </div>
      </section>

      {/* ══════════════════════════════════════════
          § CONTACT
      ══════════════════════════════════════════ */}
      <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 md:px-12 lg:px-24" style={{ backgroundColor: "#f8fafc" }}>
        <div className="max-w-2xl mx-auto">
          <motion.div
            variants={sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            <motion.div variants={fadeUp} className="section-label mb-4">Contact</motion.div>
            <motion.h2 variants={stampIn} className="section-heading mb-3">Get In Touch</motion.h2>
            <motion.p variants={fadeUp} className="text-slate-500 font-mono text-sm mb-8 sm:mb-10">
              System design problem, AI project, internship, or just want to connect?
            </motion.p>
          </motion.div>

          {/* Quick links — stagger pop in */}
          <motion.div
            className="flex flex-wrap gap-3 mb-8"
            variants={staggerFast}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
          >
            {[
              { icon: <Mail size={12} />, label: "Email", href: "mailto:omavchar@gmail.com" },
              { icon: <Github size={12} />, label: "GitHub", href: "https://github.com/omavcher" },
              { icon: <Linkedin size={12} />, label: "LinkedIn", href: "https://linkedin.com/in/omawchar" },
            ].map((link) => (
              <motion.a
                key={link.label}
                variants={popIn}
                href={link.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-2 border-2 border-black font-mono text-[9px] font-black uppercase hover:bg-black hover:text-white transition-all">
                {link.icon} {link.label}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            variants={scaleUp}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            className="paper-sheet paper-shadow p-5 sm:p-8 bg-white"
          >
            <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-500">Name *</label>
                  <input required type="text" placeholder="Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-black px-3 py-2.5 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-500">Email *</label>
                  <input required type="email" placeholder="jane@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-black px-3 py-2.5 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all placeholder:text-slate-300"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-mono text-[8px] font-black uppercase tracking-widest text-slate-500">Message *</label>
                <textarea required rows={5} placeholder="Discuss your architecture, stack, or just say hi..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-50 border-2 border-black px-3 py-2.5 font-mono text-sm focus:bg-blue-50 focus:border-blue-600 outline-none transition-all resize-none placeholder:text-slate-300"
                />
              </div>
              <button type="submit" disabled={isSubmitting}
                className="w-full bg-black text-white py-3.5 font-mono font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-blue-700 transition-all paper-shadow disabled:bg-slate-300 disabled:cursor-not-allowed disabled:shadow-none">
                {isSubmitting
                  ? <><Loader2 size={14} className="animate-spin" /> Sending...</>
                  : <>Send Message <Send size={14} /></>
                }
              </button>
            </form>

            <div className="mt-6 pt-5 border-t-2 border-dashed border-slate-100 flex items-center justify-between font-mono text-[8px] text-slate-400 uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Available · Nagpur, India
              </span>
              <span>2026</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}