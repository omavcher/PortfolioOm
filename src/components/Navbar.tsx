"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, User, FileText, Code2, BookOpen, FlaskConical,
  Newspaper, Github, Mic, Rocket, Mail,
  Menu, X, ChevronDown, Cpu, Layers,
  Linkedin, Instagram, Zap, ExternalLink, ArrowRight,
} from "lucide-react";

// ── Nav structure ────────────────────────────────────────────────────────────

const PRIMARY_NAV = [
  { label: "Home",     href: "/",        icon: <Home size={11} /> },
  { label: "About",    href: "/about",   icon: <User size={11} /> },
  { label: "Resume",   href: "/resume",  icon: <FileText size={11} /> },
  { label: "Projects", href: "/projects",icon: <Code2 size={11} /> },
];

const MORE_GROUPS = [
  {
    title: "Deep Dives",
    accent: "#2563eb",
    items: [
      { label: "Case Studies", href: "/case-studies", icon: <FlaskConical size={13} />, desc: "Architecture breakdowns" },
      { label: "Research",     href: "/research",     icon: <Layers size={13} />,       desc: "Technical papers & notes" },
      { label: "Blogs",        href: "/blogs",        icon: <Newspaper size={13} />,    desc: "Thoughts & write-ups" },
    ],
  },
  {
    title: "Socials",
    accent: "#059669",
    items: [
      { label: "LinkedIn",  href: "https://linkedin.com/in/omawchar",      icon: <Linkedin size={13} />,  desc: "Connect with me" },
      { label: "GitHub",    href: "https://github.com/omavcher",           icon: <Github size={13} />,    desc: "See my code" },
      { label: "LeetCode",  href: "https://leetcode.com/u/omavcher/",      icon: <Code2 size={13} />,     desc: "1396+ solved" },
      { label: "Instagram", href: "https://www.instagram.com/omawchar07/", icon: <Instagram size={13} />, desc: "Personal feed" },
    ],
  },
  {
    title: "Connect",
    accent: "#d97706",
    items: [
      { label: "Contact", href: "/contact", icon: <Mail size={13} />, desc: "Let's work together" },
    ],
  },
];

const ALL_NAV = [
  ...PRIMARY_NAV,
  ...MORE_GROUPS.flatMap((g) => g.items),
];

// ── Component ────────────────────────────────────────────────────────────────

export default function Navbar() {
  const pathname      = usePathname();
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [moreOpen,    setMoreOpen]    = useState(false);
  const [scrolled,    setScrolled]    = useState(false);
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
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-[110] items-center gap-0.5 px-2 py-1.5 font-mono text-[10px] font-black uppercase tracking-wide transition-all duration-300 ${
          scrolled
            ? "bg-white border-2 border-black shadow-[5px_5px_0_0_#000]"
            : "bg-white border-2 border-black shadow-[3px_3px_0_0_rgba(0,0,0,0.15)]"
        }`}
        style={{ borderRadius: "999px" }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white hover:bg-slate-800 transition-colors mr-1 group"
          style={{ borderRadius: "999px" }}
        >
          <motion.span
            className="flex"
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.4 }}
          >
            <Cpu size={11} />
          </motion.span>
          <span className="tracking-widest">OA</span>
        </Link>

        {/* Primary links */}
        {PRIMARY_NAV.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 transition-all duration-200 ${
              isActive(item.href)
                ? "bg-black text-white"
                : "text-slate-600 hover:bg-slate-100 hover:text-black"
            }`}
            style={{ borderRadius: "999px" }}
          >
            {item.icon}
            {item.label}
            {isActive(item.href) && (
              <motion.span
                layoutId="nav-active-pill"
                className="absolute inset-0 bg-black -z-10 rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
          </Link>
        ))}

        {/* Divider */}
        <span className="w-px h-4 bg-slate-200 mx-0.5" />

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
                className="absolute top-full mt-3 right-0 bg-white border-2 border-black shadow-[5px_5px_0_0_#000] z-50 overflow-hidden"
                style={{ width: "360px" }}
              >
                {/* Grid */}
                <div className="p-3 grid grid-cols-3 gap-3">
                  {MORE_GROUPS.map((group) => (
                    <div key={group.title}>
                      <div className="flex items-center gap-1.5 mb-2 px-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: group.accent }}
                        />
                        <p className="font-mono text-[7px] font-black uppercase tracking-[0.25em] text-slate-400">
                          {group.title}
                        </p>
                      </div>
                      <div className="space-y-0.5">
                        {group.items.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            target={item.href.startsWith("http") ? "_blank" : undefined}
                            rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                            className={`flex items-start gap-2 px-2 py-2 text-[9px] font-black uppercase tracking-wide transition-all rounded-sm group ${
                              isActive(item.href)
                                ? "bg-black text-white"
                                : "text-slate-700 hover:bg-slate-100"
                            }`}
                          >
                            <span className="mt-0.5 shrink-0">{item.icon}</span>
                            <span className="flex flex-col leading-tight">
                              <span className="flex items-center gap-1">
                                {item.label}
                                {item.href.startsWith("http") && (
                                  <ExternalLink size={7} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                )}
                              </span>
                              <span className="text-[7px] font-normal normal-case tracking-normal text-slate-400 group-hover:text-slate-500">
                                {item.desc}
                              </span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer strip */}
                <div className="border-t-2 border-black bg-black px-4 py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="font-mono text-[7px] uppercase tracking-widest text-slate-400">
                      Available · Nagpur, India
                    </span>
                  </div>
                  <Link
                    href="/contact"
                    className="flex items-center gap-1 font-mono text-[7px] font-black uppercase tracking-wider text-white hover:text-amber-400 transition-colors"
                  >
                    Hire Me <ArrowRight size={8} />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <span className="w-px h-4 bg-slate-200 mx-0.5" />

        {/* Hire CTA */}
        <Link
          href="/contact"
          className="flex items-center gap-1.5 px-3 py-1.5 bg-black text-white font-mono text-[10px] font-black uppercase tracking-wide hover:bg-slate-800 transition-all group ml-0.5"
          style={{ borderRadius: "999px" }}
        >
          <Zap size={9} className="group-hover:text-amber-400 transition-colors" />
          Hire Me
        </Link>
      </motion.nav>

      {/* ════════════════════════════════════════
          MOBILE — top bar
      ════════════════════════════════════════ */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-[110] bg-white border-b-2 border-black">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2.5 font-mono font-black text-sm uppercase tracking-wider">
            <div className="w-7 h-7 bg-black flex items-center justify-center shadow-[2px_2px_0_0_#6366f1]">
              <Cpu size={13} className="text-white" />
            </div>
            <span>Om Avchar</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Active page breadcrumb */}
            {pathname !== "/" && (
              <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 px-2 py-1 rounded-sm">
                <span className="w-1 h-1 bg-black rounded-full" />
                <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">
                  {ALL_NAV.find((n) => isActive(n.href))?.label ?? ""}
                </span>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-9 h-9 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-[2px_2px_0_0_#000] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {mobileOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <X size={15} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="flex"
                  >
                    <Menu size={15} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Active page underline indicator */}
        {pathname !== "/" && (
          <motion.div
            layoutId="mobile-page-indicator"
            className="h-[2px] bg-black"
            style={{
              width: `${((ALL_NAV.findIndex((n) => isActive(n.href)) + 1) / ALL_NAV.length) * 100}%`,
            }}
          />
        )}
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
              className="md:hidden fixed inset-0 bg-black/70 z-[100] backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
              className="md:hidden fixed top-0 right-0 bottom-0 w-[82vw] max-w-[320px] bg-white border-l-2 border-black z-[105] flex flex-col"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 py-4 border-b-2 border-black bg-black text-white shrink-0">
                <div className="flex items-center gap-2.5">
                  <div className="w-6 h-6 border border-slate-700 flex items-center justify-center">
                    <Cpu size={11} />
                  </div>
                  <div>
                    <p className="font-mono font-black text-[10px] uppercase tracking-widest">Om Avchar</p>
                    <p className="font-mono text-[7px] text-slate-400 uppercase tracking-wide">Backend Engineer</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-7 h-7 border border-slate-700 flex items-center justify-center hover:bg-slate-800 hover:border-slate-600 transition-all"
                  aria-label="Close menu"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Nav groups */}
              <div className="flex-1 overflow-y-auto py-3 no-scrollbar">
                {/* Primary */}
                <div className="px-3 mb-1">
                  <p className="font-mono text-[7px] font-black uppercase tracking-[0.3em] text-slate-400 px-2 py-1 mb-1">
                    Main
                  </p>
                  {PRIMARY_NAV.map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: i * 0.05, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 font-mono text-[10px] font-black uppercase tracking-wider transition-all border-l-2 mb-0.5 ${
                          isActive(item.href)
                            ? "bg-black text-white border-black"
                            : "text-slate-700 hover:bg-slate-50 border-transparent hover:border-slate-300"
                        }`}
                      >
                        <span className={isActive(item.href) ? "text-white" : "text-slate-400"}>
                          {item.icon}
                        </span>
                        {item.label}
                        {isActive(item.href) && (
                          <span className="ml-auto w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <div className="mx-5 border-t-2 border-dashed border-slate-100 my-3" />

                {/* More groups */}
                {MORE_GROUPS.map((group, gi) => (
                  <div key={group.title} className="px-3 mb-3">
                    <div className="flex items-center gap-1.5 px-2 py-1 mb-1">
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: group.accent }}
                      />
                      <p className="font-mono text-[7px] font-black uppercase tracking-[0.3em] text-slate-400">
                        {group.title}
                      </p>
                    </div>
                    {group.items.map((item, i) => (
                      <motion.div
                        key={item.label}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: (PRIMARY_NAV.length + gi * 3 + i) * 0.05, duration: 0.2 }}
                      >
                        <Link
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                          className={`flex items-center gap-3 px-3 py-2 font-mono text-[9px] font-black uppercase tracking-wider transition-all border-l-2 mb-0.5 group ${
                            isActive(item.href)
                              ? "bg-black text-white border-black"
                              : "text-slate-600 hover:bg-slate-50 border-transparent hover:border-slate-200"
                          }`}
                        >
                          <span className={isActive(item.href) ? "text-white" : "text-slate-400"}>
                            {item.icon}
                          </span>
                          <span className="flex-1">{item.label}</span>
                          {item.href.startsWith("http") && (
                            <ExternalLink size={8} className="opacity-30 group-hover:opacity-70 transition-opacity" />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Drawer footer */}
              <div className="border-t-2 border-black bg-slate-50 px-5 py-4 shrink-0">
                {/* Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                    <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">
                      Available · Nagpur
                    </span>
                  </div>
                  <span className="font-mono text-[7px] text-slate-300 uppercase tracking-widest">2026</span>
                </div>

                {/* CTA buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://github.com/omavcher"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 border-2 border-black font-mono text-[8px] font-black uppercase tracking-wide hover:bg-black hover:text-white transition-all shadow-[2px_2px_0_0_#000] hover:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                  >
                    <Github size={11} />
                    GitHub
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-black text-white font-mono text-[8px] font-black uppercase tracking-wide hover:bg-slate-800 transition-all shadow-[2px_2px_0_0_rgba(0,0,0,0.4)] hover:shadow-none"
                  >
                    <Zap size={11} />
                    Hire Me
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