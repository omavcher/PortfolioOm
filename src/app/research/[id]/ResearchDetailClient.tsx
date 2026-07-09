"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft, FileText, FlaskConical,
  Target, ChevronDown, ChevronUp,
  Calendar, Tag, Presentation, Globe
} from "lucide-react";
import type { ResearchPaper } from "../data";

type Paper = ResearchPaper;


function FaqItem({ q, a, accent }: { q: string; a: string; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-2 border-black bg-white" style={{ boxShadow: "2px 2px 0 #000" }}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 p-4 sm:p-5 text-left"
      >
        <span className="font-black text-slate-900 text-sm leading-snug">{q}</span>
        <span className="shrink-0 mt-0.5">
          {open
            ? <ChevronUp size={16} style={{ color: accent }} />
            : <ChevronDown size={16} className="text-slate-400" />
          }
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            key="ans"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-dashed border-slate-200 pt-3">
              <p className="text-slate-600 text-sm leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResearchDetailClient({ paper }: { paper: Paper }) {
  const [pdfVisible, setPdfVisible] = useState(false);

  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px]" style={{ backgroundColor: "#fafaf7" }}>



      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pb-24 pt-8 sm:pt-10">

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/research"
            className="inline-flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-black transition-colors mb-7"
          >
            <ArrowLeft size={12} /> All Papers
          </Link>
        </motion.div>

        {/* ── Paper header ──────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: paper.accent }}
            >
              <FlaskConical size={9} /> {paper.status}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider border-2 border-black text-slate-700">
              <Calendar size={9} /> {paper.year}
            </span>
            {paper.tags.slice(0, 3).map((t) => (
              <span key={t}
                className="flex items-center gap-1 px-2.5 py-1 font-mono text-[7px] font-black uppercase border tracking-wider"
                style={{ borderColor: paper.accent + "60", color: paper.accent, backgroundColor: paper.accent + "0e" }}
              >
                <Tag size={7} /> {t}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-2">
            {paper.title}
          </h1>
          <p className="font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4" style={{ color: paper.accent }}>
            {paper.subtitle}
          </p>

          {paper.authors && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[9px] sm:text-[10px] text-slate-500 font-mono border-t border-dashed border-slate-200 pt-4">
              {paper.authors.map((a, ai) => (
                <span key={ai} className="flex items-center gap-1.5">
                  <span className="font-black text-slate-700">{a.name}</span>
                  {ai < (paper.authors?.length ?? 0) - 1 && <span className="text-slate-300">·</span>}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* ── Main content grid ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">

          {/* LEFT — main content */}
          <div className="space-y-8">

            {/* Abstract */}
            <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5" style={{ backgroundColor: paper.accent }} />
                <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Abstract</h2>
              </div>
              <div className="border-2 border-black bg-white p-5 sm:p-6" style={{ boxShadow: "3px 3px 0 #000" }}>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">{paper.abstract}</p>
              </div>
            </motion.section>


            {/* Full Paper Section */}
            {paper.fullPaper && (
              <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-5" style={{ backgroundColor: paper.accent }} />
                  <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Full Paper View</h2>
                </div>
                
                <div className="border-2 border-black bg-white p-6 sm:p-8 md:p-10 space-y-8 text-slate-800" style={{ boxShadow: "4px 4px 0 #000", fontFamily: "Georgia, serif" }}>
                  
                  {/* Authors List in Full Paper Header */}
                  <div className="text-center pb-6 border-b border-black">
                    <h3 className="font-sans font-black text-lg sm:text-xl text-slate-905 uppercase tracking-tight mb-4 leading-snug">
                      {paper.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-[10px] font-sans text-slate-600 mt-4">
                      {paper.authors?.map((author, index) => (
                        <div key={index} className="space-y-0.5 border border-dashed border-slate-200 p-2 bg-slate-50 text-center">
                          <p className="font-bold text-slate-950">{author.name}</p>
                          <p className="text-[9px] text-slate-500 font-mono italic">{author.role}</p>
                          <p className="text-[8px] leading-tight text-slate-500">{author.affiliation}</p>
                          <p className="text-[9px] font-mono text-blue-600 mt-1">{author.email}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Section 1: Introduction */}
                  <div className="space-y-3">
                    <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-900">
                      I. INTRODUCTION
                    </h4>
                    {paper.fullPaper.introduction.map((p, index) => (
                      <p key={index} className="text-[12px] leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Section 2: Literature Review */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-900">
                      II. LITERATURE REVIEW
                    </h4>
                    {paper.fullPaper.literatureReview.map((sub, index) => (
                      <div key={index} className="space-y-2">
                        <h5 className="font-sans font-bold text-[11px] text-slate-950 pl-4 border-l-2 border-slate-300">
                          {sub.title}
                        </h5>
                        {sub.content.map((p, pi) => (
                          <p key={pi} className="text-[12px] leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Section 3: Proposed Conceptual Framework */}
                  <div className="space-y-4">
                    <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-900">
                      III. PROPOSED CONCEPTUAL FRAMEWORK
                    </h4>
                    {paper.fullPaper.proposedConcept.map((sub, index) => (
                      <div key={index} className="space-y-2">
                        <h5 className="font-sans font-bold text-[11px] text-slate-950 pl-4 border-l-2 border-slate-300">
                          {sub.title}
                        </h5>
                        {sub.content.map((p, pi) => (
                          <p key={pi} className="text-[12px] leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                            {p}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Section 4: Conclusion */}
                  <div className="space-y-3">
                    <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-900">
                      IV. CONCLUSION
                    </h4>
                    {paper.fullPaper.conclusion.map((p, index) => (
                      <p key={index} className="text-[12px] leading-relaxed text-justify" style={{ textIndent: "1.5rem" }}>
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* References */}
                  <div className="space-y-3 pt-6 border-t border-dashed border-slate-200">
                    <h4 className="font-sans font-black text-xs uppercase tracking-wide text-slate-900">
                      REFERENCES
                    </h4>
                    <ol className="list-none space-y-2.5 text-[10px] font-sans text-slate-600">
                      {paper.fullPaper.references.map((ref, index) => (
                        <li key={index} className="flex gap-2 items-start">
                          <span className="shrink-0 font-bold">[{index + 1}]</span>
                          <span className="text-justify leading-snug">{ref}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                </div>
              </motion.section>
            )}

            {/* Outcomes */}
            <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5" style={{ backgroundColor: paper.accent }} />
                <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Key Outcomes</h2>
              </div>
              <div className="border-2 border-black bg-white" style={{ boxShadow: "3px 3px 0 #000" }}>
                {paper.outcomes.map((outcome, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-4 sm:p-5 ${i < paper.outcomes.length - 1 ? "border-b border-dashed border-slate-200" : ""}`}
                  >
                    <div
                      className="w-5 h-5 shrink-0 flex items-center justify-center mt-0.5 font-mono text-[8px] font-black text-white"
                      style={{ backgroundColor: paper.accent }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="text-slate-700 text-sm leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* FAQ */}
            <motion.section initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5" style={{ backgroundColor: paper.accent }} />
                <h2 className="font-mono text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-3">
                {paper.faq.map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} accent={paper.accent} />
                ))}
              </div>
            </motion.section>

          </div>

          {/* RIGHT — sidebar */}
          <aside className="lg:sticky lg:top-24 self-start space-y-5">

            {/* Paper Cover Thumbnail */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="border-2 border-black bg-white p-2"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <div className="relative w-full overflow-hidden border border-slate-200">
                <img
                  src={paper.cover}
                  alt={paper.title}
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>

            {/* Key Findings */}
            <motion.div
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
              className="border-2 border-black bg-white"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-black" style={{ backgroundColor: paper.accent + "12" }}>
                <Target size={11} style={{ color: paper.accent }} />
                <span className="font-mono text-[8px] font-black uppercase tracking-[0.18em]" style={{ color: paper.accent }}>Key Findings</span>
              </div>
              <div className="divide-y divide-dashed divide-slate-200">
                {paper.keyFindings.map((f, i) => (
                  <div key={i} className="px-4 py-4 flex items-center justify-between gap-3">
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-wide leading-tight">{f.label}</span>
                    <span className="font-black text-xl shrink-0" style={{ color: paper.accent }}>{f.val}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Tags full */}
            <motion.div
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
              className="border-2 border-black bg-white p-4"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">Topics Covered</p>
              <div className="flex flex-wrap gap-1.5">
                {paper.tags.map((t) => (
                  <span key={t}
                    className="px-2 py-1 font-mono text-[8px] font-black uppercase border"
                    style={{ borderColor: paper.accent + "50", color: paper.accent, backgroundColor: paper.accent + "0a" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
              className="border-2 border-black bg-white p-4 space-y-2"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">Actions</p>
              {paper.pdfUrl ? (
                <a href={paper.pdfUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-3 font-mono text-[9px] font-black uppercase tracking-wider text-white transition-all"
                  style={{ backgroundColor: paper.accent }}>
                  <FileText size={12} /> Download PDF
                </a>
              ) : (
                <div className="flex items-center gap-2 w-full px-4 py-3 border border-dashed border-slate-300 font-mono text-[9px] font-black uppercase text-slate-400">
                  <FileText size={12} /> PDF Coming Soon
                </div>
              )}
              {paper.presentationUrl && (
                <a href={paper.presentationUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-3 border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                  style={{ boxShadow: "2px 2px 0 #000" }}>
                  <Presentation size={12} /> View Slides
                </a>
              )}
              {paper.journalUrl && (
                <a href={paper.journalUrl} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2 w-full px-4 py-3 border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                  style={{ boxShadow: "2px 2px 0 #000" }}>
                  <Globe size={12} /> View Journal
                </a>
              )}
              <Link href="/#contact"
                className="flex items-center gap-2 w-full px-4 py-3 border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                Discuss This Paper
              </Link>
            </motion.div>

            {/* Back to all */}
            <Link href="/research"
              className="flex items-center justify-center gap-2 w-full border-2 border-black bg-white py-3 font-mono text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all"
              style={{ boxShadow: "2px 2px 0 #000" }}>
              <ArrowLeft size={11} /> All Papers
            </Link>
          </aside>

        </div>
      </div>
    </div>
  );
}
