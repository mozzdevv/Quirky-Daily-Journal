import React from 'react';
import { cn } from '@/lib/utils';
import { useJournalStore } from '@/lib/store';
import { format, eachDayOfInterval, startOfYear, endOfYear, isSameDay } from 'date-fns';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface YearGridProps {
  year?: number;
  onDayClick: (date: Date) => void;
}

export default function YearGrid({ year = new Date().getFullYear(), onDayClick }: YearGridProps) {
  const entries = useJournalStore((state) => state.entries);
  
  const days = React.useMemo(() => {
    return eachDayOfInterval({
      start: startOfYear(new Date(year, 0, 1)),
      end: endOfYear(new Date(year, 0, 1))
    });
  }, [year]);

  const today = new Date();

  return (
    <div className="w-full">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(12px,1fr))] gap-2 sm:gap-3 md:gap-4 justify-items-center">
        <div className="flex flex-wrap justify-center gap-x-3 gap-y-3 max-w-3xl mx-auto">
          {days.map((day: Date) => {
            const dateKey = format(day, 'yyyy-MM-dd');
            const entry = entries[dateKey];
            const isToday = isSameDay(day, today);
            const isFuture = day > today;
            
            // Determine plant image based on entry
            // We have 18 images in total (set1_1 to set1_9, set2_1 to set2_9)
            let plantImage = null;
            if (entry) {
              const setNum = entry.plantId <= 9 ? 1 : 2;
              const imgNum = entry.plantId <= 9 ? entry.plantId : entry.plantId - 9;
              plantImage = `/images/plants/set${setNum}_${imgNum}.png`;
            }

            return (
              <Tooltip key={dateKey}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => !isFuture && onDayClick(day)}
                    disabled={isFuture}
                    className={cn(
                      "relative w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center transition-all duration-300",
                      !entry && !isFuture && "hover:scale-110 cursor-pointer",
                      isFuture && "opacity-30 cursor-default",
                      isToday && !entry && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-full"
                    )}
                  >
                    {entry ? (
                      <div className="w-full h-full animate-in zoom-in duration-500">
                        <img 
                          src={plantImage!} 
                          alt="Planted memory" 
                          className="w-full h-full object-contain drop-shadow-sm filter sepia-[0.2] contrast-[1.1]"
                        />
                      </div>
                    ) : (
                      <div className={cn(
                        "w-2 h-2 rounded-full transition-colors duration-300",
                        isToday ? "bg-primary" : "bg-muted-foreground/30"
                      )} />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p className="font-display text-lg">{format(day, 'MMM do')}</p>
                  {entry && <p className="text-xs max-w-[150px] truncate font-sans">{entry.text}</p>}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </div>
      </div>
    </div>
  );
}
