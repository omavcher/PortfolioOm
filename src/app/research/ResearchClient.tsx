"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { FlaskConical, ArrowRight, BookOpen } from "lucide-react";
import { RESEARCH } from "./data";

export default function ResearchClient() {
  return (
    <div className="min-h-screen pt-[56px] md:pt-[80px] pb-24" style={{ backgroundColor: "#fafaf7" }}>

      {/* Header */}
      <div className="border-b-2 border-black px-4 sm:px-6 md:px-12 lg:px-24 pt-10 sm:pt-14 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="section-label mb-4">Research</div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h1 className="section-heading">Research<br />Papers</h1>
            <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest sm:text-right leading-relaxed max-w-xs">
              Deep technical studies on<br className="hidden sm:block" />
              distributed systems, AI infra & backend engineering.
            </p>
          </div>
        </div>
      </div>

      {/* 4:3 card grid */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-24 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {RESEARCH.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <Link
                  href={`/research/${item.id}`}
                  className="group block border-2 border-black bg-white hover:-translate-y-1 transition-transform"
                  style={{ boxShadow: "4px 4px 0 #000" }}
                >
                  {/* 4:3 cover image */}
                  <div className="relative overflow-hidden border-b-2 border-black" style={{ aspectRatio: "4 / 3" }}>
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-1" style={{ backgroundColor: item.accent }} />
                    <div
                      className="absolute top-3 left-3 px-2 py-1 font-mono text-[7px] font-black uppercase tracking-widest text-white"
                      style={{ backgroundColor: item.accent }}
                    >
                      {item.status}
                    </div>
                    <div className="absolute top-3 right-3 px-2 py-1 bg-black text-white font-mono text-[7px] font-black uppercase">
                      {item.year}
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 sm:p-5">
                    <div className="flex items-center gap-1.5 mb-2">
                      <FlaskConical size={10} style={{ color: item.accent }} />
                      <span className="font-mono text-[7px] font-black uppercase tracking-widest" style={{ color: item.accent }}>
                        Research Paper
                      </span>
                    </div>

                    <h2 className="font-black text-slate-900 text-base leading-snug mb-1 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h2>
                    <p className="font-mono text-[8px] uppercase tracking-wide text-slate-400 mb-3">{item.subtitle}</p>
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">{item.desc}</p>

                    <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
                      {item.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 font-mono text-[7px] font-black uppercase border border-slate-200 text-slate-500">
                          {t}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="px-2 py-0.5 font-mono text-[7px] font-black text-slate-400">
                          +{item.tags.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 font-mono text-[8px] font-black uppercase tracking-wider"
                      style={{ color: item.accent }}>
                      <BookOpen size={10} /> Read Paper
                      <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
