"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Download, ExternalLink, ZoomIn, ZoomOut,
  FileText, ChevronLeft, Printer
} from "lucide-react";
import Link from "next/link";

const PDF_URL = "/Om_Avchar_Resume_A.pdf";

export default function ResumeClient() {
  const [zoom, setZoom] = useState(100);

  const zoomIn  = () => setZoom((z) => Math.min(z + 10, 150));
  const zoomOut = () => setZoom((z) => Math.max(z - 10, 60));
  const reset   = () => setZoom(100);

  return (
    /**
     * pt-[56px]  → clears mobile navbar (full-width bar ~52-56px tall)
     * md:pt-[72px] → clears desktop pill navbar (top-5 + ~44px height ≈ 64px, give 8px gap)
     */
    <div
      className="min-h-screen pt-[56px] md:pt-[72px]"
      style={{ backgroundColor: "#f0f0ec" }}
    >

      {/* ── Action bar — sticky directly under the navbar ── */}
      {/*
        Mobile:   sticks at top-[56px] (right below mobile nav bar)
        Desktop:  sticks at top-[68px] (right below floating pill nav)
      */}
      <div className="sticky top-[56px] md:top-[68px] z-[89] bg-white border-b-2 border-black">
        <div className="flex items-center gap-2 px-4 sm:px-6 py-2 flex-wrap">

          {/* Back */}
          <Link
            href="/"
            className="flex items-center gap-1 font-mono text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors shrink-0"
          >
            <ChevronLeft size={11} /> Home
          </Link>

          <div className="hidden sm:block w-px h-4 bg-slate-200 shrink-0" />

          {/* File info */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-6 h-6 bg-black flex items-center justify-center shrink-0">
              <FileText size={11} className="text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-mono font-black text-[9px] sm:text-[10px] uppercase tracking-widest leading-tight truncate">
                Om Avchar — Resume
              </p>
              <p className="hidden sm:block font-mono text-[7px] text-slate-400 uppercase tracking-wider leading-tight">
                Om_Avchar_Resume_A.pdf · A4 Format
              </p>
            </div>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center border-2 border-black shrink-0">
            <button
              onClick={zoomOut}
              disabled={zoom <= 60}
              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-30"
              aria-label="Zoom out"
            >
              <ZoomOut size={11} />
            </button>
            <button
              onClick={reset}
              className="px-2 h-7 font-mono text-[8px] font-black uppercase border-x-2 border-black hover:bg-slate-100 transition-colors min-w-[44px] text-center"
              aria-label="Reset zoom"
            >
              {zoom}%
            </button>
            <button
              onClick={zoomIn}
              disabled={zoom >= 150}
              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 transition-colors disabled:opacity-30"
              aria-label="Zoom in"
            >
              <ZoomIn size={11} />
            </button>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <a
              href={PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 h-7 px-3 border-2 border-black font-mono text-[8px] font-black uppercase hover:bg-slate-100 transition-all"
            >
              <ExternalLink size={9} /> Open
            </a>
            <a
              href={PDF_URL}
              download="Om_Avchar_Resume.pdf"
              className="flex items-center gap-1 h-7 px-3 bg-black text-white font-mono text-[8px] font-black uppercase hover:bg-slate-800 transition-all"
            >
              <Download size={9} /> Download
            </a>
          </div>
        </div>
      </div>

      {/* ── PDF viewer ── */}
      <div className="py-8 sm:py-10 px-3 sm:px-6 flex flex-col items-center">

        {/* Live status */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 flex items-center gap-2 font-mono text-[8px] uppercase tracking-widest text-slate-500"
        >
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          Live PDF · Rendered in browser
          <span className="hidden sm:inline">· A4 (210 × 297 mm)</span>
        </motion.div>

        {/* A4 paper shell */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative"
          style={{
            width: `min(${zoom * 8}px, 96vw)`,
            transition: "width 0.2s ease",
          }}
        >
          {/* Paper stack shadow layers */}
          <div className="absolute bg-slate-400 opacity-25" style={{ inset: 0, transform: "translate(8px, 10px)" }} />
          <div className="absolute bg-slate-300 opacity-35" style={{ inset: 0, transform: "translate(4px, 5px)" }} />

          {/* A4 card — 210:297 exact ratio */}
          <div
            className="relative bg-white border-2 border-black overflow-hidden"
            style={{ aspectRatio: "210 / 297", zIndex: 2 }}
          >
            <iframe
              src={`${PDF_URL}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
              className="w-full h-full"
              title="Om Avchar Resume"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Bottom CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a href={PDF_URL} download="Om_Avchar_Resume.pdf" className="btn-primary text-xs px-5 py-2.5">
            <Download size={13} /> Download PDF
          </a>
          <a href={PDF_URL} target="_blank" rel="noreferrer" className="btn-outline text-xs px-5 py-2.5">
            <ExternalLink size={13} /> Open Full Screen
          </a>
         
        </motion.div>

        {/* Fallback */}
        <p className="mt-4 font-mono text-[8px] text-slate-400 uppercase tracking-widest text-center">
          PDF not showing?{" "}
          <a href={PDF_URL} target="_blank" rel="noreferrer" className="underline hover:text-black transition-colors">
            Open directly
          </a>
        </p>
      </div>
    </div>
  );
}
