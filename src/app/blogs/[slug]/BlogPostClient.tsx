"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState, useRef, useCallback } from "react";
import {
  ArrowLeft, Calendar, Clock, Tag, Share2,
  Github, Linkedin, List, X, ChevronRight,
} from "lucide-react";
import type { Post } from "@/lib/mdx";

// ── Helpers ──────────────────────────────────────────────────────────────────

const TAG_ACCENT: Record<string, string> = {
  nodejs:          "#16a34a",
  redis:           "#dc2626",
  mongodb:         "#059669",
  "system-design": "#2563eb",
  performance:     "#d97706",
  backend:         "#475569",
  databases:       "#7c3aed",
  javascript:      "#ca8a04",
  ai:              "#9333ea",
};
function tagAccent(tag: string) { return TAG_ACCENT[tag] || "#64748b"; }

interface TocItem { id: string; text: string; level: number; }

/** Extract ## and ### headings from raw markdown */
function extractToc(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];
  for (const line of lines) {
    const m2 = line.match(/^## (.+)/);
    const m3 = line.match(/^### (.+)/);
    if (m2) {
      const text = m2[1].trim();
      items.push({ id: slugify(text), text, level: 2 });
    } else if (m3) {
      const text = m3[1].trim();
      items.push({ id: slugify(text), text, level: 3 });
    }
  }
  return items;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 96; // navbar height buffer
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

// ── Custom heading renderers that add id attributes ───────────────────────────

function makeHeadingRenderer(tag: "h1" | "h2" | "h3" | "h4") {
  // eslint-disable-next-line react/display-name
  return ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = Array.isArray(children) ? children.join("") : String(children ?? "");
    const id = slugify(text);
    const Tag = tag;
    return <Tag id={id} {...props}>{children}</Tag>;
  };
}

const mdComponents = {
  h1: makeHeadingRenderer("h1"),
  h2: makeHeadingRenderer("h2"),
  h3: makeHeadingRenderer("h3"),
  h4: makeHeadingRenderer("h4"),
};

// ── TOC Sidebar component ─────────────────────────────────────────────────────

function TocSidebar({ items, accent }: { items: TocItem[]; accent: string }) {
  const [activeId, setActiveId] = useState<string>("");
  const [open, setOpen] = useState(false); // mobile drawer

  // Observe heading intersections
  useEffect(() => {
    if (items.length === 0) return;
    const observers: IntersectionObserver[] = [];

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-20% 0px -70% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  if (items.length === 0) return null;

  return (
    <>
      {/* ── Desktop sticky sidebar ── */}
      <aside className="hidden xl:block sticky top-24 self-start w-52 shrink-0">
        <div className="border-2 border-black bg-white" style={{ boxShadow: "3px 3px 0 #000" }}>
          <div className="flex items-center gap-2 px-3 py-2.5 border-b-2 border-black"
            style={{ backgroundColor: accent + "12" }}>
            <List size={11} style={{ color: accent }} />
            <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em]"
              style={{ color: accent }}>Contents</span>
          </div>
          <nav className="p-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className="w-full text-left flex items-start gap-2 px-2 py-1.5 transition-all rounded-sm group"
                style={{
                  paddingLeft: item.level === 3 ? "1.25rem" : "0.5rem",
                }}
              >
                <ChevronRight
                  size={9}
                  className="mt-0.5 shrink-0 transition-colors"
                  style={{ color: activeId === item.id ? accent : "#cbd5e1" }}
                />
                <span
                  className="font-mono text-[9px] font-black uppercase tracking-wide leading-tight transition-colors"
                  style={{
                    color: activeId === item.id ? accent : "#94a3b8",
                    fontWeight: activeId === item.id ? 900 : 700,
                  }}
                >
                  {item.text}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Mobile floating TOC button ── */}
      <div className="xl:hidden fixed bottom-6 right-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="w-11 h-11 border-2 border-black bg-white flex items-center justify-center"
          style={{ boxShadow: `3px 3px 0 ${accent}` }}
        >
          <List size={16} />
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="xl:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              key="drawer"
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="xl:hidden fixed right-0 top-0 bottom-0 w-72 bg-white border-l-2 border-black z-50 flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b-2 border-black"
                style={{ backgroundColor: accent + "12" }}>
                <div className="flex items-center gap-2">
                  <List size={12} style={{ color: accent }} />
                  <span className="font-mono text-[9px] font-black uppercase tracking-widest"
                    style={{ color: accent }}>Table of Contents</span>
                </div>
                <button onClick={() => setOpen(false)} className="w-7 h-7 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all">
                  <X size={11} />
                </button>
              </div>
              <nav className="p-3 overflow-y-auto flex-1">
                {items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { scrollToHeading(item.id); setOpen(false); }}
                    className="w-full text-left flex items-start gap-2 px-2 py-2 hover:bg-slate-50 transition-all"
                    style={{ paddingLeft: item.level === 3 ? "1.5rem" : "0.5rem" }}
                  >
                    <ChevronRight size={10} className="mt-0.5 shrink-0" style={{ color: activeId === item.id ? accent : "#cbd5e1" }} />
                    <span
                      className="font-mono text-[10px] font-black uppercase tracking-wide leading-snug"
                      style={{ color: activeId === item.id ? accent : "#64748b" }}
                    >
                      {item.text}
                    </span>
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BlogPostClient({ post }: { post: Post }) {
  const tocItems = extractToc(post.content);
  const primaryAccent = post.tags[0] ? tagAccent(post.tags[0]) : "#2563eb";

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, text: post.excerpt, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fafaf7" }}>

      {/* ── Cover hero — sits flush against navbar (no extra padding) ── */}
      {post.cover ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative w-full border-b-2 border-black overflow-hidden"
          style={{ paddingTop: "56px" /* exact navbar height */ }}
        >
          {/* Fixed 16:9 aspect container */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 5" }}>
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Bottom-to-paper gradient */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, #fafaf7 100%)" }}
            />
            {/* Accent stripe at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[3px]"
              style={{ backgroundColor: primaryAccent }} />
          </div>
        </motion.div>
      ) : (
        /* No cover — just add navbar clearance */
        <div style={{ paddingTop: "56px" }} className="md:pt-[80px]" />
      )}

      {/* ── Page body: sidebar + content ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-12 pb-24 pt-8 sm:pt-10 flex gap-10 xl:gap-16 items-start">

        {/* Content column */}
        <main className="flex-1 min-w-0">

          {/* Back nav */}
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-black transition-colors mb-6"
            >
              <ArrowLeft size={12} /> Back to Blogs
            </Link>
          </motion.div>

          {/* Article header */}
          <motion.header initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10 sm:mb-12">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1 px-2.5 py-1 font-mono text-[7px] font-black uppercase border-2 tracking-wider"
                  style={{ borderColor: tagAccent(t), color: tagAccent(t), backgroundColor: tagAccent(t) + "10" }}
                >
                  <Tag size={7} /> {t}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-[1.15] tracking-tight mb-3">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-5">
              {post.excerpt}
            </p>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 border-y-2 border-black py-3 font-mono text-[9px] font-black uppercase tracking-widest text-slate-400">
              {post.date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={11} />
                  {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock size={11} /> {post.readTime}
              </span>
              <button
                onClick={handleShare}
                className="ml-auto flex items-center gap-1.5 hover:text-black transition-colors"
              >
                <Share2 size={11} /> Share
              </button>
            </div>
          </motion.header>

          {/* Article body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="blog-prose"
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents as any}>
              {post.content}
            </ReactMarkdown>
          </motion.article>

          {/* Author card */}
          <div className="mt-16 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="border-2 border-black bg-black text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between"
              style={{ boxShadow: `4px 4px 0 ${primaryAccent}` }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border-2 border-white overflow-hidden shrink-0">
                  <img src="/my.avif" alt="Om Avchar" className="w-full h-full object-cover grayscale" />
                </div>
                <div>
                  <p className="font-black text-base">Om Avchar</p>
                  <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mt-0.5">
                    Backend Engineer · System Designer
                  </p>
                  <p className="font-mono text-[8px] text-slate-500 mt-1 leading-relaxed max-w-xs">
                    Writing about distributed systems, Node.js internals, and production AI infrastructure.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <a href="https://github.com/omavcher" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 border border-slate-600 px-4 py-2 font-mono text-[8px] font-black uppercase hover:border-white hover:text-white transition-all text-slate-400">
                  <Github size={11} /> GitHub
                </a>
                <a href="https://linkedin.com/in/omawchar" target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 border border-slate-600 px-4 py-2 font-mono text-[8px] font-black uppercase hover:border-white hover:text-white transition-all text-slate-400">
                  <Linkedin size={11} /> LinkedIn
                </a>
              </div>
            </motion.div>

            <Link
              href="/blogs"
              className="flex items-center justify-center gap-2 border-2 border-black bg-white py-3 font-mono text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <ArrowLeft size={12} /> All Blog Posts
            </Link>
          </div>
        </main>

        {/* TOC Sidebar */}
        <TocSidebar items={tocItems} accent={primaryAccent} />
      </div>
    </div>
  );
}
