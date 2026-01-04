import { useJournalStore } from "@/lib/store";
import { format, eachDayOfInterval, startOfYear, endOfYear, getMonth } from "date-fns";
import { cn } from "@/lib/utils";

export default function YearGrid() {
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
    <div className="w-full max-w-5xl mx-auto px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <div className="inline-block bg-primary text-primary-foreground px-6 py-1.5 rounded-full text-sm font-bold mb-4 shadow-lg shadow-primary/20">
          {format(today, "yyyy")}
        </div>
        <div className="flex gap-6 justify-center text-primary/40 text-2xl">
          <span className="hover:text-primary transition-colors cursor-default">☼</span>
          <span className="hover:text-primary transition-colors cursor-default">☁</span>
          <span className="hover:text-primary transition-colors cursor-default">☂</span>
        </div>
      </div>

      {/* Desktop Grid Layout */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-12">
        {months.map((monthDays, monthIndex) => (
          <div key={monthIndex} className="flex flex-col gap-4">
            {/* Month Label */}
            <div className="text-primary/40 font-mono text-xs uppercase tracking-[0.2em] text-center">
              {format(monthDays[0], "MMM")}
            </div>
            
            {/* Month Grid */}
            <div className="grid grid-cols-7 gap-3 place-items-center">
              {monthDays.map((day) => {
                const dateKey = format(day, "yyyy-MM-dd");
                const hasEntry = !!entries[dateKey];
                const isToday = format(day, "yyyy-MM-dd") === format(today, "yyyy-MM-dd");

                return (
                  <div
                    key={dateKey}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all duration-300 cursor-default",
                      hasEntry 
                        ? "bg-primary scale-125 shadow-[0_0_8px_rgba(0,0,170,0.3)]" 
                        : "bg-primary/10 hover:bg-primary/30",
                      isToday && !hasEntry && "ring-1 ring-primary ring-offset-2 ring-offset-background animate-pulse"
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
