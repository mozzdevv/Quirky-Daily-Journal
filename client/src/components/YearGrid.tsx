import { useJournalStore } from "@/lib/store";
import { format, eachDayOfInterval, startOfYear, endOfYear, getMonth } from "date-fns";
import { cn } from "@/lib/utils";

interface YearGridProps {
  onDayClick?: (date: Date) => void;
}

export default function YearGrid({ onDayClick }: YearGridProps) {
  const { entries } = useJournalStore();
  const today = new Date();
  const yearStart = startOfYear(today);
  const yearEnd = endOfYear(today);
  
  const days = eachDayOfInterval({ start: yearStart, end: yearEnd });

  // Group days by month for better layout control
  const months = Array.from({ length: 12 }, (_, i) => {
    return days.filter(day => getMonth(day) === i);
  });

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
          <div key={monthIndex} className="flex flex-col gap-5 items-center">
            {/* Month Label */}
            <div className="text-blue-200/60 font-mono text-xs uppercase tracking-[0.3em] text-center drop-shadow-[0_0_5px_rgba(191,219,254,0.3)]">
              {format(monthDays[0], "MMM")}
            </div>
            
            {/* Month Grid */}
            <div className="grid grid-cols-7 gap-3 place-items-center">
              {monthDays.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const hasEntry = !!entries[dateKey];
                const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

                return (
                  <button
                    key={dateKey}
                    onClick={() => onDayClick?.(day)}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer", // Reduced size to 6px (w-1.5)
                      hasEntry 
                        ? "bg-white scale-125 shadow-[0_0_10px_rgba(255,255,255,0.8)]" 
                        : "bg-white/20 hover:bg-white/60 hover:scale-150 hover:shadow-[0_0_8px_rgba(255,255,255,0.4)]",
                      isToday && !hasEntry && "ring-2 ring-white ring-offset-2 ring-offset-transparent animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    )}
                    title={format(day, "MMM d, yyyy")}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
