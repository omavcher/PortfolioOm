"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  ExternalLink,
  Target,
  Tag,
  Download,
  BookOpen,
  Users,
  Calendar
} from "lucide-react";
import type { CaseStudy } from "../data";

export default function CaseStudyDetailClient({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px]" style={{ backgroundColor: "#fafaf7" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pb-24 pt-8 sm:pt-10">
        
        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-mono text-[9px] font-black uppercase tracking-widest text-slate-500 hover:text-black transition-colors mb-7"
          >
            <ArrowLeft size={12} /> All Case Studies
          </Link>
        </motion.div>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span
              className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: caseStudy.accent }}
            >
              <BookOpen size={9} /> {caseStudy.category}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 font-mono text-[8px] font-black uppercase tracking-wider border-2 border-black text-slate-700">
              <Calendar size={9} /> {caseStudy.year}
            </span>
            {caseStudy.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="flex items-center gap-1 px-2.5 py-1 font-mono text-[7px] font-black uppercase border tracking-wider"
                style={{
                  borderColor: caseStudy.accent + "60",
                  color: caseStudy.accent,
                  backgroundColor: caseStudy.accent + "0e"
                }}
              >
                <Tag size={7} /> {t}
              </span>
            ))}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight tracking-tight mb-2">
            {caseStudy.title}
          </h1>
          <p
            className="font-mono text-[10px] font-black uppercase tracking-[0.2em] mb-4"
            style={{ color: caseStudy.accent }}
          >
            {caseStudy.subtitle}
          </p>

          {/* Team / Author info */}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] text-slate-500 font-mono border-t border-dashed border-slate-200 pt-4">
            <span className="flex items-center gap-1.5">
              <Users size={11} className="text-slate-400" />
              <span className="text-slate-400 uppercase">Team:</span>
              <span className="font-black text-slate-700">{caseStudy.teamName}</span>
            </span>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400 uppercase">Members:</span>
              <span className="font-black text-slate-700">{caseStudy.teamMembers.join(", ")}</span>
            </span>
          </div>
        </motion.div>

        {/* ── Main Layout Grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start">
          
          {/* LEFT — PDF Iframe Viewer */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-2 border-b-2 border-black pb-3">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-5" style={{ backgroundColor: caseStudy.accent }} />
                <h2 className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Interactive PDF Viewer
                </h2>
              </div>
              <a
                href={caseStudy.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 font-mono text-[8px] font-black uppercase tracking-wider text-slate-500 hover:text-black transition-colors"
              >
                Open in Full Tab <ExternalLink size={10} />
              </a>
            </div>

            <div
              className="border-2 border-black bg-white p-2 relative shadow-[4px_4px_0_#000]"
            >
              {/* Responsive Container for PDF Iframe */}
              <div className="w-full relative overflow-hidden bg-slate-100 rounded-sm" style={{ minHeight: "750px" }}>
                <iframe
                  src={`${caseStudy.pdfUrl}#toolbar=0&navpanes=0`}
                  title={caseStudy.title}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                >
                  <p className="p-6 text-center text-sm text-slate-500">
                    Your browser does not support embedded PDF files. Please{" "}
                    <a href={caseStudy.pdfUrl} className="underline font-bold" target="_blank" rel="noreferrer">
                      click here to download or view the PDF
                    </a>.
                  </p>
                </iframe>
              </div>
            </div>

            {/* Mobile Fallback Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <a
                href={caseStudy.pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-black bg-white py-3 font-mono text-[9px] font-black uppercase tracking-wider hover:bg-slate-50 transition-all text-slate-800"
                style={{ boxShadow: "2px 2px 0 #000" }}
              >
                <ExternalLink size={12} /> View PDF in New Tab
              </a>
              <a
                href={caseStudy.pdfUrl}
                download
                className="flex-1 flex items-center justify-center gap-2 border-2 border-black text-white py-3 font-mono text-[9px] font-black uppercase tracking-wider transition-all"
                style={{ backgroundColor: caseStudy.accent, boxShadow: "2px 2px 0 #000" }}
              >
                <Download size={12} /> Download Offline Copy
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Sidebar Highlights & Summary */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            
            {/* Executive Summary */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="border-2 border-black bg-white"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b-2 border-black"
                style={{ backgroundColor: caseStudy.accent + "12" }}
              >
                <Target size={12} style={{ color: caseStudy.accent }} />
                <span
                  className="font-mono text-[9px] font-black uppercase tracking-[0.18em]"
                  style={{ color: caseStudy.accent }}
                >
                  Executive Summary
                </span>
              </div>
              <div className="p-4 sm:p-5">
                <p className="text-slate-600 text-xs leading-relaxed text-justify">
                  {caseStudy.desc}
                </p>
              </div>
            </motion.div>

            {/* Key Blueprint Highlights */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="border-2 border-black bg-white"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <div
                className="flex items-center gap-2 px-4 py-3 border-b-2 border-black bg-slate-50"
              >
                <span className="font-mono text-[9px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Strategic Highlights
                </span>
              </div>
              <div className="divide-y divide-dashed divide-slate-200">
                {caseStudy.highlights.map((highlight, index) => (
                  <div key={index} className="p-4 space-y-1">
                    <h4 className="font-mono text-[9px] font-black uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: caseStudy.accent }}
                      />
                      {highlight.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed pl-3 text-justify">
                      {highlight.content}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.25 }}
              className="border-2 border-black bg-white p-4 space-y-2"
              style={{ boxShadow: "3px 3px 0 #000" }}
            >
              <p className="font-mono text-[8px] font-black uppercase tracking-[0.18em] text-slate-400 mb-3">
                Case Actions
              </p>
              <a
                href={caseStudy.pdfUrl}
                download
                className="flex items-center gap-2 w-full px-4 py-3 font-mono text-[9px] font-black uppercase tracking-wider text-white transition-all justify-center"
                style={{ backgroundColor: caseStudy.accent }}
              >
                <Download size={12} /> Download PDF
              </a>
              <Link
                href="/#contact"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-black font-mono text-[9px] font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                style={{ boxShadow: "2px 2px 0 #000" }}
              >
                Discuss Blueprint
              </Link>
            </motion.div>

          </aside>

        </div>
      </div>
    </div>
  );
}
