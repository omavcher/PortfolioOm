/**
 * Scroll Animation Variants — expert-grade Framer Motion presets
 * Match the neobrutalist paper-craft style of the portfolio.
 *
 * Usage:
 *   import { fadeUp, fadeIn, slideLeft, ... } from "@/lib/motion";
 *   <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
 */

import type { Variants } from "framer-motion";

// ── Base easing curves ───────────────────────────────────────────────────────
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const EASE_OUT_BACK = [0.34, 1.56, 0.64, 1] as const;
export const EASE_SPRING   = { type: "spring", stiffness: 340, damping: 28 } as const;

// ── Atomic variants ──────────────────────────────────────────────────────────

/** Classic fade + upward drift — use for text blocks and cards */
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

/** Subtle fade — use for images, backgrounds */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

/** Slides in from the left */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Slides in from the right */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
};

/** Scale up from 90% — use for cards and panels */
export const scaleUp: Variants = {
  hidden:  { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

/** Spring pop — use for badges, icons, highlights */
export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1,  transition: { type: "spring", stiffness: 440, damping: 22, mass: 0.8 } },
};

/** Clip reveal — draws in from left via clipPath */
export const clipReveal: Variants = {
  hidden:  { clipPath: "inset(0 100% 0 0)" },
  visible: { clipPath: "inset(0 0% 0 0)", transition: { duration: 0.75, ease: EASE_OUT_EXPO } },
};

/** Heading split — large text stamp effect */
export const stampIn: Variants = {
  hidden:  { opacity: 0, scale: 1.08, y: -8 },
  visible: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.5, ease: "easeOut" } },
};

/** Horizontal line draw — for decorative rules/borders */
export const drawLine: Variants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: EASE_OUT_EXPO } },
};

// ── Container variants (stagger children) ────────────────────────────────────

/** Stagger container — wrap around children that use atomic variants */
export function staggerContainer(staggerChildren = 0.1, delayChildren = 0): Variants {
  return {
    hidden:  {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

/** Tight stagger — for dense lists (chips, bullets) */
export const staggerFast: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

/** Normal stagger — for cards */
export const staggerNormal: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

/** Slow stagger — for large sections */
export const staggerSlow: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
};

// ── Section header preset ────────────────────────────────────────────────────
/** Use this on the label + heading wrapper */
export const sectionHeader: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0 } },
};

// ── Viewport config presets ──────────────────────────────────────────────────
export const VIEWPORT_ONCE    = { once: true,  margin: "-80px" } as const;
export const VIEWPORT_REPEAT  = { once: false, margin: "-80px" } as const;
export const VIEWPORT_LAZY    = { once: true,  margin: "-40px" } as const;
export const VIEWPORT_EARLY   = { once: true,  margin: "-160px"} as const;
