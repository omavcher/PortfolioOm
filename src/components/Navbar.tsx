"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, FileText, Code2, BookOpen, FlaskConical,
  Newspaper, Github, Mic, Rocket, Mail,
  Menu, X, ChevronDown, Cpu, Layers,
  Linkedin, Instagram,
} from "lucide-react";

// ── Nav structure ────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { label: "Home",     href: "/",        icon: <Home size={12} /> },
  { label: "About",    href: "/about",   icon: <User size={12} /> },
  { label: "Resume",   href: "/resume",  icon: <FileText size={12} /> },
  { label: "Projects", href: "/projects",icon: <Code2 size={12} /> },
];

const MORE_GROUPS = [
  {
    title: "Deep Dives",
    items: [
      { label: "Case Studies", href: "/case-studies", icon: <FlaskConical size={12} /> },
      { label: "Research",     href: "/research",     icon: <Layers size={12} /> },
      { label: "Blogs",        href: "/blogs",        icon: <Newspaper size={12} /> },
    ],
  },
  {
    title: "Socials",
    items: [
      { label: "LinkedIn",  href: "https://linkedin.com/in/omawchar",   icon: <Linkedin size={12} /> },
      { label: "GitHub",    href: "https://github.com/omavcher",        icon: <Github size={12} /> },
      { label: "LeetCode",  href: "https://leetcode.com/u/omavcher/",   icon: <Code2 size={12} /> },
      { label: "Instagram", href: "https://www.instagram.com/omawchar07/", icon: <Instagram size={12} /> },
    ],
  },
  {
    title: "Connect",
    items: [
      { label: "Contact", href: "/contact", icon: <Mail size={12} /> },
    ],
  },
];

const ALL_NAV = [
  ...PRIMARY_NAV,
  ...MORE_GROUPS.flatMap((g) => g.items),
];

// ── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname  = usePathname();
  const [mobileOpen,    setMobileOpen]    = useState(false);
  const [moreOpen,      setMoreOpen]      = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Detect scroll for navbar shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  // Close more dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setMoreOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ════════════════════════════════════════
          DESKTOP — floating pill
      ════════════════════════════════════════ */}
      <nav
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[110] items-center gap-0.5 px-2 py-1.5 font-mono text-[10px] font-black uppercase tracking-wide transition-all duration-300 ${
          scrolled
            ? "bg-white border-2 border-black shadow-[4px_4px_0_0_#000]"
            : "bg-white border-2 border-black"
        }`}
        style={{ borderRadius: "999px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-slate-800 transition-colors mr-1"
          style={{ borderRadius: "999px" }}
        >
          <Cpu size={11} />
          <span className="tracking-widest">OA</span>
        </Link>

        {/* Primary links */}
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all ${
              isActive(item.href)
                ? "bg-black text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-black"
            }`}
            style={{ borderRadius: "999px" }}
          >
            {item.icon}
            {item.label}
          </Link>
        ))}

        {/* More dropdown */}
        <div ref={moreRef} className="relative">
          <button
            onClick={() => setMoreOpen((o) => !o)}
            className={`flex items-center gap-1.5 px-3 py-1.5 transition-all ${
              moreOpen ? "bg-black text-white" : "text-slate-600 hover:bg-slate-100 hover:text-black"
            }`}
            style={{ borderRadius: "999px" }}
          >
            More
            <motion.span
              animate={{ rotate: moreOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              <ChevronDown size={9} />
            </motion.span>
          </button>

          <AnimatePresence>
            {moreOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full mt-3 right-0 bg-white border-2 border-black shadow-[4px_4px_0_0_#000] z-50 overflow-hidden"
                style={{ width: "320px" }}
              >
                <div className="p-3 grid grid-cols-3 gap-1">
                  {MORE_GROUPS.map((group) => (
                    <div key={group.title}>
                      <p className="font-mono text-[7px] font-black uppercase tracking-[0.25em] text-slate-400 px-2 py-1 mb-1">
                        {group.title}
                      </p>
                      {group.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`flex items-center gap-1.5 px-2 py-2 text-[9px] font-black uppercase tracking-wide transition-all rounded ${
                            isActive(item.href)
                              ? "bg-black text-white"
                              : "text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          {item.icon}
                          <span className="leading-tight">{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="border-t-2 border-black bg-slate-50 px-4 py-2 flex items-center justify-between">
                  <span className="font-mono text-[7px] uppercase tracking-widest text-slate-400">Om Avchar · 2026</span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          MOBILE — top bar + slide-in drawer
      ════════════════════════════════════════ */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-[110] bg-white border-b-2 border-black flex items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-mono font-black text-sm uppercase tracking-wider">
          <div className="w-7 h-7 bg-black flex items-center justify-center">
            <Cpu size={13} className="text-white" />
          </div>
          Om Avchar
        </Link>

        <div className="flex items-center gap-2">
          {/* Active page label */}
          {pathname !== "/" && (
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-400 hidden xs:block">
              {ALL_NAV.find((n) => isActive(n.href))?.label ?? ""}
            </span>
          )}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[80vw] max-w-[300px] bg-white border-l-2 border-black z-[105] flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black bg-black text-white shrink-0">
                <div className="flex items-center gap-2">
                  <Cpu size={14} />
                  <span className="font-mono font-black text-xs uppercase tracking-widest">Menu</span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-7 h-7 border border-slate-700 flex items-center justify-center hover:bg-slate-800 transition-all"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Nav groups */}
              <div className="flex-1 overflow-y-auto py-3">
                {/* Primary */}
                <div className="px-3 mb-2">
                  <p className="font-mono text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 px-2 py-1 mb-1">
                    Main
                  </p>
                  {PRIMARY_NAV.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 font-mono text-[10px] font-black uppercase tracking-wider transition-all ${
                        isActive(item.href)
                          ? "bg-black text-white"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}
                </div>

                <div className="mx-3 border-t border-dashed border-slate-200 my-2" />

                {/* More groups */}
                {MORE_GROUPS.map((group) => (
                  <div key={group.title} className="px-3 mb-1">
                    <p className="font-mono text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 px-2 py-1 mb-1">
                      {group.title}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        className={`flex items-center gap-3 px-3 py-2 font-mono text-[9px] font-black uppercase tracking-wider transition-all ${
                          isActive(item.href)
                            ? "bg-black text-white"
                            : "text-slate-600 hover:bg-slate-100"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="border-t-2 border-black bg-slate-50 px-5 py-4 shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Available · Nagpur</span>
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                </div>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/omavcher"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border-2 border-black font-mono text-[8px] font-black uppercase hover:bg-black hover:text-white transition-all"
                  >
                    <Github size={11} /> GitHub
                  </a>
                  <Link
                    href="/resume"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-black text-white font-mono text-[8px] font-black uppercase hover:bg-slate-800 transition-all"
                  >
                    <FileText size={11} /> Resume
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}