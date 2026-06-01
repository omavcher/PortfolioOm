"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);

  // Measure container height for the animated line
  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setLineHeight(containerRef.current.getBoundingClientRect().height);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 60%"],
  });

  // The fill grows from 0 to full height as user scrolls through the section
  const fillHeight = useTransform(scrollYProgress, [0, 1], [0, lineHeight]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Vertical track line */}
      <div
        ref={lineRef}
        className="absolute left-6 md:left-10 top-0 bottom-0 w-[2px] bg-slate-200"
        style={{ zIndex: 0 }}
      >
        {/* Animated fill */}
        <motion.div
          style={{ height: fillHeight }}
          className="absolute top-0 left-0 w-full bg-black origin-top"
        />
      </div>

      {/* Entries */}
      <div className="space-y-0">
        {data.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative flex gap-6 md:gap-10 pb-14 md:pb-20"
          >
            {/* Dot + year label */}
            <div className="relative flex flex-col items-center shrink-0" style={{ zIndex: 1 }}>
              {/* Dot */}
              <div className="w-3 h-3 rounded-full bg-black border-2 border-white ring-2 ring-black mt-1.5" />
              {/* Year badge below dot */}
              <div className="mt-2 font-mono font-black text-[10px] uppercase tracking-widest bg-black text-white px-2 py-1 whitespace-nowrap">
                {item.title}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 pt-0.5 min-w-0">
              {item.content}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
