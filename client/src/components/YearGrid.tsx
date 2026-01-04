import { useJournalStore } from "@/lib/store";
import { useSound } from "@/hooks/useSound";
import { format, eachDayOfInterval, startOfYear, endOfYear, getMonth, addDays, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { useRef, useEffect, useState } from "react";

interface YearGridProps {
  onDayClick?: (date: Date) => void;
}

export default function YearGrid({ onDayClick }: YearGridProps) {
  const { entries } = useJournalStore();
  const { playSound } = useSound();
  const today = new Date();
  const yearStart = startOfYear(today);
  const yearEnd = endOfYear(today);
  
  const days = eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Group days by month for better layout control
  const months = Array.from({ length: 12 }, (_, i) => {
    return days.filter(day => getMonth(day) === i);
  });

  // Refs to store dot positions for drawing lines
  const dotRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; opacity: number }[]>([]);

  // Calculate lines between consecutive entries
  useEffect(() => {
    const newLines: { x1: number; y1: number; x2: number; y2: number; opacity: number }[] = [];
    const entryDates = Object.keys(entries).sort();

    // Helper to get center of an element relative to the grid container
    const getCenter = (el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      // We need coordinates relative to the viewport since the SVG is fixed/absolute overlay
      // But actually, putting SVG inside each month grid is safer for responsiveness
      // Let's try a simpler approach: Lines only within the same month for now to avoid complex cross-grid calculations
      return {
        x: el.offsetLeft + el.offsetWidth / 2,
        y: el.offsetTop + el.offsetHeight / 2
      };
    };

    // We will render lines per month to keep it simple and responsive
  }, [entries]);

  return (
    <div className="w-full max-w-6xl mx-auto px-8">
      {/* Header */}
      <div className="mb-16 text-center">
        <div className="inline-block bg-blue-600 text-white px-8 py-2 rounded-full text-base font-bold mb-6 shadow-[0_0_20px_rgba(37,99,235,0.5)] tracking-widest border border-blue-400/30">
          {format(today, "yyyy")}
        </div>
        <div className="flex gap-8 justify-center text-blue-200/40 text-3xl">
          <span className="hover:text-white transition-colors cursor-default drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">☼</span>
          <span className="hover:text-white transition-colors cursor-default drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">☁</span>
          <span className="hover:text-white transition-colors cursor-default drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">☂</span>
        </div>
      </div>

      {/* Symmetrical 3x4 Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-16 gap-y-16">
        {months.map((monthDays, monthIndex) => (
          <div key={monthIndex} className="flex flex-col gap-5 items-center relative">
            {/* Month Label */}
            <div className="text-blue-200/60 font-mono text-xs uppercase tracking-[0.3em] text-center drop-shadow-[0_0_5px_rgba(191,219,254,0.3)]">
              {format(monthDays[0], "MMM")}
            </div>
            
            {/* Month Grid */}
            <div className="grid grid-cols-7 gap-3 place-items-center relative">
              {/* Constellation Lines Layer */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-0">
                {monthDays.map((day, i) => {
                  const dateKey = format(day, "yyyy-MM-dd");
                  const nextDay = addDays(day, 1);
                  const nextDateKey = format(nextDay, "yyyy-MM-dd");
                  
                  // Draw line if both today and tomorrow have entries AND are in the same month
                  if (entries[dateKey] && entries[nextDateKey] && isSameMonth(day, nextDay)) {
                    // Calculate positions based on grid index (0-6 for x, row for y)
                    // Grid gap is 12px (gap-3), dot size is 6px
                    // We can approximate positions since it's a regular grid
                    const col = i % 7;
                    const row = Math.floor(i / 7);
                    const nextCol = (i + 1) % 7;
                    const nextRow = Math.floor((i + 1) / 7);
                    
                    // Each cell is roughly 24px wide (6px dot + padding/gap)
                    // Actually, let's use percentage or relative units if possible, 
                    // or just rely on the fact that we know the grid structure.
                    // Better approach: Use absolute positioning logic based on known grid layout.
                    // Cell width = 100% / 7
                    
                    const x1 = `${(col * 100 / 7) + (100 / 14)}%`;
                    const y1 = `${(row * 24) + 12}px`; // Approximate row height
                    
                    // This is tricky without exact pixel values. 
                    // Let's use a simpler visual trick: 
                    // Render lines as separate absolute divs between dots?
                    // No, SVG is best. Let's try to calculate coordinates dynamically.
                    
                    return null; // Placeholder until we solve the coordinate issue
                  }
                  return null;
                })}
              </svg>

              {monthDays.map((day, i) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const hasEntry = !!entries[dateKey];
                const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");
                
                // Check for streak (next day has entry)
                const nextDay = addDays(day, 1);
                const nextDateKey = format(nextDay, "yyyy-MM-dd");
                const hasStreak = hasEntry && !!entries[nextDateKey] && isSameMonth(day, nextDay);

                return (
                  <div key={dateKey} className="relative flex items-center justify-center">
                    {/* Horizontal Streak Line (Right) */}
                    {hasStreak && (i + 1) % 7 !== 0 && (
                      <div className="absolute left-1/2 top-1/2 h-[1px] w-[calc(100%+12px)] bg-blue-200/30 -z-10 shadow-[0_0_4px_rgba(191,219,254,0.5)]" />
                    )}
                    
                    <button
                      onClick={() => {
                        playSound('glass-chime');
                        onDayClick?.(day);
                      }}
                      onMouseEnter={() => playSound('cosmic-hover')}
                      className={cn(
                        "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer relative z-10", 
                        hasEntry 
                          ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                          : "bg-white/20 hover:bg-white/60 hover:scale-150 hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]",
                        isToday && !hasEntry && "ring-2 ring-white ring-offset-2 ring-offset-transparent animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                      )}
                      title={format(day, "MMM d, yyyy")}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
