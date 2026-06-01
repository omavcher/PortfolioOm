"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Loader2, AlertCircle, Flame, Zap } from "lucide-react";

interface Contribution {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionData {
  total: { lastYear: number };
  contributions: Contribution[];
}

interface Week {
  days: (Contribution | null)[];
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["", "Mon", "", "Wed", "", "Fri", ""];

// Paper-theme palette: empty = paper-white, filled = ink shades of black/slate
const CELL_COLORS = [
  { bg: "#f1f5f9", border: "#cbd5e1" },   // 0 – empty (slate-100 / slate-300)
  { bg: "#bbf7d0", border: "#86efac" },   // 1 – green-200 / green-300
  { bg: "#4ade80", border: "#22c55e" },   // 2 – green-400 / green-500
  { bg: "#16a34a", border: "#15803d" },   // 3 – green-600 / green-700
  { bg: "#14532d", border: "#052e16" },   // 4 – green-900 / green-950 (ink-dark)
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
    if (currentWeek.length === 7) { weeks.push({ days: currentWeek }); currentWeek = []; }
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
    if (m !== lastMonth) { monthLabels.push({ label: MONTHS[m], weekIndex: wi }); lastMonth = m; }
  });

  return { weeks, monthLabels };
}

interface TooltipState {
  visible: boolean; x: number; y: number; date: string; count: number;
}

interface Props {
  username?: string;
  dark?: boolean;
}

export default function GitHubHeatmap({ username = "omavcher" }: Props) {
  const [data, setData]       = useState<ContributionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState>({ visible: false, x: 0, y: 0, date: "", count: 0 });
  const containerRef          = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoading(true); setError(false);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json() as Promise<ContributionData>; })
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, [username]);

  const { weeks, monthLabels } = data ? buildWeeks(data.contributions) : { weeks: [], monthLabels: [] };

  const streak = (() => {
    if (!data) return 0;
    const sorted = [...data.contributions].reverse();
    let s = 0;
    for (const c of sorted) { if (c.count > 0) s++; else break; }
    return s;
  })();

  const bestDay = data?.contributions.reduce(
    (best, c) => (c.count > best.count ? c : best),
    { date: "", count: 0, level: 0 as const }
  );

  const handleCellEnter = (e: React.MouseEvent, contrib: Contribution) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({ visible: true, x: e.clientX - rect.left, y: e.clientY - rect.top - 56, date: contrib.date, count: contrib.count });
  };
  const handleCellLeave = () => setTooltip((t) => ({ ...t, visible: false }));

  const formatDate = (d: string) => {
    if (!d) return "";
    return new Date(d + "T00:00:00").toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
  };

  return (
    <div className="w-full select-none">

      {/* ─── Stat chips row ─── */}
      {!loading && !error && data && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          {/* Total */}
          <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
            <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Last Year</div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {data.total.lastYear.toLocaleString()}
            </div>
            <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">contributions</div>
          </div>

          {/* Streak */}
          <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
            <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 flex items-center gap-1">
              <Flame size={8} /> Streak
            </div>
            <div className="text-2xl font-black tracking-tight leading-none" style={{ color: streak > 7 ? "#16a34a" : "#1a1a1a" }}>
              {streak}
            </div>
            <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">days active</div>
          </div>

          {/* Best day */}
          <div className="border-2 border-black bg-white p-3 paper-shadow-sm">
            <div className="font-mono text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 flex items-center gap-1">
              <Zap size={8} /> Peak Day
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              {bestDay?.count ?? 0}
            </div>
            <div className="font-mono text-[7px] uppercase text-slate-400 mt-0.5">in a day</div>
          </div>
        </motion.div>
      )}

      {/* ─── Loading / Error ─── */}
      <div ref={containerRef} className="relative">
        {loading && (
          <div className="flex items-center justify-center py-16 gap-2 font-mono text-xs uppercase tracking-widest text-slate-400">
            <Loader2 size={14} className="animate-spin text-green-500" />
            Fetching live data...
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center py-12 gap-2 font-mono text-xs text-red-500 uppercase tracking-wider">
            <AlertCircle size={14} />
            Couldn&apos;t reach the API — try refreshing
          </div>
        )}

        {/* ─── Heatmap grid ─── */}
        {!loading && !error && weeks.length > 0 && (
          <>
            {/* Tooltip — paper card style */}
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
                  <span className="text-green-600 font-black">{tooltip.count}</span>
                  <span className="text-slate-500"> contribution{tooltip.count !== 1 ? "s" : ""} on</span>
                  <br />
                  <span className="text-slate-800">{formatDate(tooltip.date)}</span>
                  {/* Arrow */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-full border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-black" />
                </motion.div>
              )}
            </AnimatePresence>

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
                                width: 11, height: 11,
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

            {/* ─── Legend + peak ─── */}
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
                  Peak: <span className="text-green-600 font-black">{bestDay.count} contributions</span>
                  {" · "}{formatDate(bestDay.date)}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
