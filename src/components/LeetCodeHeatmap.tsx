"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, Trophy, Zap } from "lucide-react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface Week {
  days: (Contribution | null)[];
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["", "Mon", "", "Wed", "", "Fri", ""];

// LeetCode-themed palette: empty = paper-white, filled = orange/yellow shades
const CELL_COLORS = [
  { bg: "#f1f5f9", border: "#cbd5e1" },   // 0 – empty (slate-100 / slate-300)
  { bg: "#ffedd5", border: "#fed7aa" },   // 1 – light orange (orange-100 / orange-200)
  { bg: "#fed7aa", border: "#fdbb2d" },   // 2 – medium yellow-orange
  { bg: "#f97316", border: "#ea580c" },   // 3 – deep orange-500 / orange-600
  { bg: "#c2410c", border: "#7c2d12" },   // 4 – dark ink-orange (orange-700 / orange-900)
];

function buildWeeks(contributions: Contribution[]): {
  weeks: Week[];
  monthLabels: { label: string; weekIndex: number }[];
} {
  if (!contributions.length) return { weeks: [], monthLabels: [] };

  const firstDate = new Date(contributions[0].date + "T00:00:00");
  const startDay  = firstDate.getDay();
  const weeks: Week[] = [];
  let currentWeek: (Contribution | null)[] = new Array(startDay).fill(null);

  for (const contrib of contributions) {
    if (currentWeek.length === 7) { 
      weeks.push({ days: currentWeek }); 
      currentWeek = []; 
    }
    currentWeek.push(contrib);
  }
  while (currentWeek.length < 7) currentWeek.push(null);
  weeks.push({ days: currentWeek });

  const monthLabels: { label: string; weekIndex: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.days.find((d) => d !== null);
    if (!firstReal) return;
    const m = new Date(firstReal.date + "T00:00:00").getMonth();
    if (m !== lastMonth) { 
      monthLabels.push({ label: MONTHS[m], weekIndex: wi }); 
      lastMonth = m; 
    }
  });

  return { weeks, monthLabels };
}

interface TooltipState {
  visible: boolean; x: number; y: number; date: string; count: number;
}

interface Props {
  submissionCalendarString?: string;
  streak?: number;
  totalActiveDays?: number;
}

export default function LeetCodeHeatmap({ 
  submissionCalendarString = "{}", 
  streak = 0, 
  totalActiveDays = 0 
}: Props) {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, date: "", count: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const calendar = JSON.parse(submissionCalendarString || "{}");
      
      // Map timestamps to YYYY-MM-DD
      const countMap: Record<string, number> = {};
      for (const [timestampStr, count] of Object.entries(calendar)) {
        const timestampMs = parseInt(timestampStr, 10) * 1000;
        const date = new Date(timestampMs);
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;
        countMap[dateStr] = (countMap[dateStr] || 0) + (count as number);
      }

      // Generate past 365 days
      const list: Contribution[] = [];
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 365);

      const curr = new Date(startDate);
      while (curr <= endDate) {
        const yyyy = curr.getFullYear();
        const mm = String(curr.getMonth() + 1).padStart(2, "0");
        const dd = String(curr.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}-${mm}-${dd}`;

        const count = countMap[dateStr] || 0;
        let level: 0 | 1 | 2 | 3 | 4 = 0;
        if (count > 0) {
          if (count <= 2) level = 1;
          else if (count <= 4) level = 2;
          else if (count <= 7) level = 3;
          else level = 4;
        }

        list.push({ date: dateStr, count, level });
        curr.setDate(curr.getDate() + 1);
      }

      setContributions(list);
    } catch (e) {
      console.error("Failed to parse LeetCode calendar JSON:", e);
    }
  }, [submissionCalendarString]);

  const { weeks, monthLabels } = buildWeeks(contributions);

  const bestDay = contributions.reduce(
    (best, c) => (c.count > best.count ? c : best),
    { date: "", count: 0, level: 0 as const }
  );

  const handleCellEnter = (e: React.MouseEvent, contrib: Contribution) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ 
      visible: true, 
      x: e.clientX - rect.left, 
      y: e.clientY - rect.top - 56, 
      date: contrib.date, 
      count: contrib.count 
    });
  };
  const handleCellLeave = () => setTooltip((t) => ({ ...t, visible: false }));

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", { 
      weekday: "short", 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  const totalSubmissionsInYear = contributions.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="w-full select-none">
      {/* ─── Stat chips row ─── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-3 mb-6"
      >
        {/* Total submissions past year */}
        <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
          <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Past Year</div>
          <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
            {totalSubmissionsInYear}
          </div>
          <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">submissions</div>
        </div>

        {/* Streak */}
        <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
          <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 flex items-center gap-1">
            <Flame size={8} className="text-orange-500 fill-orange-500 animate-pulse" /> Streak
          </div>
          <div className="text-2xl font-black tracking-tight leading-none" style={{ color: streak > 0 ? "#ea580c" : "#1a1a1a" }}>
            {streak}
          </div>
          <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">days streak</div>
        </div>

        {/* Total Active Days */}
        <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
          <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 flex items-center gap-1">
            <Trophy size={8} className="text-amber-500" /> Active Days
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
            {totalActiveDays}
          </div>
          <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">total active</div>
        </div>
      </motion.div>

      {/* ─── Heatmap grid ─── */}
      <div ref={containerRef} className="relative">
        <AnimatePresence>
          {tooltip.visible && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.96 }}
              transition={{ duration: 0.1 }}
              className="absolute z-50 pointer-events-none bg-white border-2 border-black px-3 py-2 font-mono text-[9px] font-bold whitespace-nowrap"
              style={{ left: tooltip.x, top: tooltip.y, transform: "translateX(-50%)", boxShadow: "3px 3px 0 #000" }}
            >
              <span className="text-orange-600 font-black">{tooltip.count}</span>
              <span className="text-slate-500"> submission{tooltip.count !== 1 ? "s" : ""} on</span>
              <br />
              <span className="text-slate-800">{formatDate(tooltip.date)}</span>
              {/* Arrow */}
              <div className="absolute left-1/2 -translate-x-1/2 top-full border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-black" />
            </motion.div>
          )}
        </AnimatePresence>

        {weeks.length > 0 ? (
          <div className="overflow-x-auto no-scrollbar pb-2">
            <div className="inline-flex gap-0 min-w-max">
              {/* Day labels */}
              <div className="flex flex-col mr-2" style={{ paddingTop: "22px", gap: "2px" }}>
                {DAYS.map((d, i) => (
                  <div key={i} className="h-[11px] flex items-center font-mono text-[7px] font-bold uppercase tracking-wider w-6 text-slate-400">
                    {d}
                  </div>
                ))}
              </div>

              <div>
                {/* Month labels */}
                <div className="flex h-[20px] mb-0.5">
                  {weeks.map((_, wi) => {
                    const ml = monthLabels.find((m) => m.weekIndex === wi);
                    return (
                      <div key={wi} className="font-mono text-[7px] font-black uppercase tracking-wider leading-none text-slate-500"
                        style={{ width: 12, marginRight: 2 }}>
                        {ml?.label ?? ""}
                      </div>
                    );
                  })}
                </div>

                {/* Week columns */}
                <div className="flex" style={{ gap: 2 }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} className="flex flex-col" style={{ gap: 2 }}>
                      {week.days.map((day, di) => {
                        const c = day ? CELL_COLORS[day.level] : null;
                        return (
                          <div
                            key={di}
                            onMouseEnter={day ? (e) => handleCellEnter(e, day) : undefined}
                            onMouseLeave={day ? handleCellLeave : undefined}
                            style={{
                              width: 11,
                              height: 11,
                              borderRadius: 2,
                              backgroundColor: c ? c.bg : "transparent",
                              border: c ? `1px solid ${c.border}` : "none",
                              cursor: day ? "pointer" : "default",
                              transition: "transform 0.1s",
                            }}
                            className={day ? "hover:scale-125 hover:z-10" : ""}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 font-mono text-xs text-slate-400 uppercase tracking-widest">
            Generating heatmap...
          </div>
        )}

        {/* ─── Legend ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-5 gap-3">
          <div className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
            <span>Less</span>
            {CELL_COLORS.map((c, i) => (
              <div key={i} style={{ width: 11, height: 11, borderRadius: 2, backgroundColor: c.bg, border: `1px solid ${c.border}` }} />
            ))}
            <span>More</span>
          </div>

          {bestDay && bestDay.count > 0 && (
            <div className="font-mono text-[8px] font-bold uppercase tracking-wider text-slate-400">
              Peak: <span className="text-orange-600 font-black">{bestDay.count} submissions</span>
              {" · "}{formatDate(bestDay.date)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
