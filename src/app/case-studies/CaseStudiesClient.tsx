"use client";

import { motion } from "framer-motion";
import { FileText, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { CASE_STUDIES } from "./data";

export default function CaseStudiesClient() {
  return (
    <div className="min-h-screen bg-[#fafaf7] grid-pattern pt-28 pb-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="section-label">Case Studies</div>
          <h1 className="section-heading mt-2 mb-4">
            Deep Dives
          </h1>
          <p className="text-slate-500 font-mono text-sm max-w-xl">
            In-depth strategic analyses, blueprints, and technical breakdowns of major industry cases and system architectures.
          </p>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div
              key={cs.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="paper-flat paper-shadow border-l-4 bg-white p-6 md:p-8 hover:-translate-y-0.5 transition-transform"
              style={{ borderLeftColor: cs.accent }}
            >
              <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-start">
                
                {/* Cover Preview Image */}
                {cs.cover ? (
                  <Link
                    href={`/case-studies/${cs.id}`}
                    className="w-full aspect-[4/3] md:aspect-[3/4] overflow-hidden border-2 border-black bg-slate-100 relative block group shadow-[3px_3px_0_#000]"
                  >
                    <img
                      src={cs.cover}
                      alt={cs.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ) : (
                  <div className="w-full aspect-[4/3] md:aspect-[3/4] border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center">
                    <FileText size={24} className="text-slate-300" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
                    <span
                      className="text-white font-mono text-[9px] font-black uppercase px-2 py-0.5"
                      style={{ backgroundColor: cs.accent }}
                    >
                      {cs.year}
                    </span>
                    <BookOpen size={12} className="text-slate-400" />
                    <span className="font-mono text-[9px] text-slate-400 uppercase font-black tracking-wider">
                      {cs.category}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-[9px] text-slate-500 uppercase font-black">
                      Team {cs.teamName}
                    </span>
                    {cs.teamMembers && cs.teamMembers.length > 0 && (
                      <>
                        <span className="text-slate-300">•</span>
                        <span className="font-mono text-[9px] text-slate-500 font-bold">
                          {cs.teamMembers.join(", ")}
                        </span>
                      </>
                    )}
                  </div>

                  <Link href={`/case-studies/${cs.id}`}>
                    <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-1.5 hover:text-slate-700 transition-colors leading-tight">
                      {cs.title}
                    </h2>
                  </Link>
                  <p className="font-mono text-[9px] md:text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-4 leading-normal">
                    {cs.subtitle}
                  </p>
                  <p className="text-slate-600 text-sm leading-relaxed max-w-3xl line-clamp-3 md:line-clamp-4">
                    {cs.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                    <div className="flex flex-wrap gap-1.5">
                      {cs.tags.map((t) => (
                        <span key={t} className="tag-chip text-[9px]">
                          {t}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/case-studies/${cs.id}`}
                      className="flex items-center gap-2 bg-black text-white px-4 py-2.5 font-mono text-[9px] font-black uppercase hover:bg-slate-800 transition-all paper-shadow text-center shrink-0"
                    >
                      Read Case Study <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center border-t-2 border-dashed border-slate-200 pt-12">
          <p className="font-mono text-xs text-slate-400 uppercase tracking-widest mb-4">Interested in more?</p>
          <Link href="/blogs" className="btn-primary inline-flex">
            Read Technical Blogs <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
