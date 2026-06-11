"use client";

import React, { useEffect, useState } from "react";
import { ShieldAlert, RefreshCw } from "lucide-react";

export default function SecurityGuard() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // 1. Disable Right Click (Context Menu) quietly
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 2. Prevent Developer Shortcut Keys quietly
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) ||
        (e.metaKey && e.altKey && (e.key === "I" || e.key === "J" || e.key === "C" || e.key === "i" || e.key === "j" || e.key === "c")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "u")) ||
        (e.metaKey && (e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
      }
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    let isLaunched = false;
    let detectorInstance: any = null;

    // Load devtools-detector dynamically to prevent Next.js SSR/prerender errors
    import("devtools-detector").then((module) => {
      const { DevtoolsDetector, checkers } = module;
      
      // Use a comprehensive set of checkers to cover all edge cases
      const customDetector = new DevtoolsDetector({
        checkers: [
          checkers.elementIdChecker,
          checkers.regToStringChecker,
          checkers.functionToStringChecker,
          checkers.depRegToStringChecker,
          checkers.dateToStringChecker,
          checkers.debuggerChecker,
          checkers.performanceChecker,
          checkers.erudaChecker,
          checkers.devtoolsFormatterChecker,
          checkers.workerPerformanceChecker
        ]
      });

      detectorInstance = customDetector;
      
      // Listen for DevTools state changes
      customDetector.addListener((isOpenStatus: boolean) => {
        setIsOpen(isOpenStatus);
      });

      // Start detection loop immediately
      customDetector.launch();
      isLaunched = true;
    }).catch((err) => {
      console.error("Failed to initialize devtools-detector:", err);
    });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      if (detectorInstance && isLaunched) {
        detectorInstance.stop();
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[#fafaf7] flex items-center justify-center p-4 select-none"
      style={{
        backgroundImage: "radial-gradient(#cbd5e1 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px"
      }}
    >
      <div
        className="max-w-md w-full bg-white border-2 border-black p-6 md:p-8 relative"
        style={{ boxShadow: "4px 4px 0 #000" }}
      >
        {/* Top Header warning stripe */}
        <div className="flex items-center gap-2 bg-red-600 text-white font-mono text-[9px] font-black uppercase tracking-widest px-3 py-1.5 mb-6 border-2 border-black inline-flex">
          <ShieldAlert size={12} className="animate-pulse" />
          <span>Security Alert</span>
        </div>

        {/* Headline */}
        <h2 className="text-xl md:text-2xl font-black text-slate-900 leading-tight mb-4">
          Developer Tools Restricted
        </h2>

        {/* Sub-text */}
        <p className="text-slate-600 text-sm leading-relaxed mb-6">
          Developer tools are disabled to maintain the security and integrity of this application.
        </p>

        {/* Dashed divider */}
        <div className="border-t-2 border-dashed border-slate-200 my-6" />

        {/* Copyright notice section */}
        <h3 className="font-mono text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
          Copyright Notice
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-6 font-sans">
          The source code, design, and content of this site are protected by copyright. Unauthorized copying or republishing will result in a DMCA takedown. Your access has been logged.
        </p>

        {/* Reload button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full flex items-center justify-center gap-2 border-2 border-black bg-black text-white hover:bg-slate-100 hover:text-black font-mono text-[10px] font-black uppercase tracking-widest py-3 transition-colors"
          style={{ boxShadow: "3px 3px 0 #cbd5e1" }}
        >
          <RefreshCw size={11} />
          Reload Page
        </button>

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[9px] text-slate-400 font-mono">
          <span>&copy; 2024&ndash;2026. All rights reserved.</span>
          <a
            href="/legal"
            className="hover:text-black transition-colors flex items-center gap-1 font-bold"
          >
            Legal Terms & Conditions &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
