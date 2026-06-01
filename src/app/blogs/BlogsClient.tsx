"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { Calendar, ArrowRight, Search, X } from "lucide-react";
import type { PostMeta } from "@/lib/mdx";

const TAG_ACCENT: Record<string, string> = {
  nodejs:                "#16a34a",
  redis:                 "#dc2626",
  mongodb:               "#059669",
  "system-design":       "#2563eb",
  performance:           "#d97706",
  backend:               "#475569",
  databases:             "#7c3aed",
  javascript:            "#ca8a04",
  ai:                    "#9333ea",
  employment:            "#e11d48",
  "software-engineering":"#0284c7",
  "cost-analysis":       "#ea580c",
  "future-of-work":      "#7c3aed",
};

function tagAccent(tag: string) {
  return TAG_ACCENT[tag] || "#64748b";
}

const FALLBACK_COVER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%230f172a'/%3E%3Ccircle cx='200' cy='225' r='120' fill='%231e293b'/%3E%3Ccircle cx='600' cy='225' r='80' fill='%231e293b'/%3E%3C/svg%3E";

export default function BlogsClient({ posts }: { posts: PostMeta[] }) {
  const [search, setSearch]     = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(posts.flatMap((p) => p.tags)));

  const filtered = posts.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchTag = !activeTag || p.tags.includes(activeTag);
    return matchSearch && matchTag;
  });

  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px] pb-24" style={{ backgroundColor: "#fafaf7" }}>

      {/* ── Hero header ──────────────────────────────────────────────────── */}
      <div className="border-b-2 border-black px-4 sm:px-6 md:px-12 lg:px-24 pt-10 sm:pt-14 pb-10">
        <div className="max-w-5xl mx-auto">
          <div className="section-label mb-4">Writing</div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="section-heading">Technical<br />Blogs</h1>
            <p className="font-mono text-[10px] sm:text-[11px] text-slate-400 uppercase tracking-widest sm:text-right max-w-xs leading-relaxed">
              Deep dives on backend engineering,<br className="hidden sm:block" /> system design & AI infrastructure.
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-8 sm:py-12">
        <div className="max-w-5xl mx-auto">

          {/* ── Search + filter ─────────────────────────────────────────── */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border-2 border-black pl-10 pr-10 py-3 font-mono text-sm focus:outline-none bg-white transition-all"
                style={{ boxShadow: "2px 2px 0 #000" }}
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black">
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Tag filter pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTag(null)}
                className={`px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider border-2 transition-all ${
                  !activeTag ? "bg-black text-white border-black" : "border-black bg-white hover:bg-slate-50"
                }`}
              >
                All ({posts.length})
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className="px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider border-2 transition-all"
                  style={{
                    backgroundColor: activeTag === tag ? tagAccent(tag) : "white",
                    borderColor: tagAccent(tag),
                    color: activeTag === tag ? "white" : tagAccent(tag),
                  }}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Count */}
          <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-6">
            {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            {search && ` · matching "${search}"`}
            {activeTag && ` · tagged "${activeTag}"`}
          </p>

          {/* ── Posts grid — YouTube-style 16:9 thumbnail cards ─────────── */}
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="border-2 border-dashed border-slate-300 p-16 text-center"
              >
                <p className="font-mono text-sm text-slate-400">No articles found.</p>
              </motion.div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                layout
              >
                {filtered.map((post, i) => (
                  <motion.article
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.07 }}
                    className="flex flex-col"
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="group flex flex-col border-2 border-black bg-white overflow-hidden hover:-translate-y-1.5 transition-transform duration-200"
                      style={{ boxShadow: "4px 4px 0 #000" }}
                    >
                      {/* ── 16:9 Thumbnail (padding-top trick = bulletproof) ── */}
                      <div className="relative w-full overflow-hidden border-b-2 border-black" style={{ paddingTop: "56.25%" }}>
                        <img
                          src={post.cover || FALLBACK_COVER}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        {/* Read-time badge — top-right like YT duration chip */}
                        <span
                          className="absolute top-2 right-2 px-1.5 py-0.5 font-mono text-[9px] font-black text-white uppercase tracking-wider"
                          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
                        >
                          {post.readTime}
                        </span>
                        {/* Tag accent bar at bottom of thumbnail */}
                        <div
                          className="absolute bottom-0 left-0 right-0 h-1"
                          style={{ backgroundColor: post.tags[0] ? tagAccent(post.tags[0]) : "#64748b" }}
                        />
                      </div>

                      {/* ── Card content below thumbnail ── */}
                      <div className="flex flex-col flex-1 p-4 gap-3">
                        {/* Date */}
                        <span className="flex items-center gap-1 font-mono text-[8px] font-black uppercase tracking-wider text-slate-400">
                          <Calendar size={9} />
                          {post.date
                            ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "—"}
                        </span>

                        {/* Title */}
                        <h2 className="text-sm sm:text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1">
                          {post.excerpt}
                        </p>

                        {/* Footer: tags + arrow */}
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="px-1.5 py-0.5 font-mono text-[7px] font-black uppercase border"
                                style={{
                                  borderColor: tagAccent(t) + "60",
                                  color: tagAccent(t),
                                  backgroundColor: tagAccent(t) + "12",
                                }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                          <ArrowRight
                            size={14}
                            className="shrink-0 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all"
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
