import Layout from '@/components/Layout';
import YearGrid from '@/components/YearGrid';
import { useState, useEffect } from 'react';
import { useJournalStore } from '@/lib/store';
import { useSound } from '@/hooks/useSound';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export default function Home() {
  const [isWriting, setIsWriting] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [text, setText] = useState("");
  const { entries, addEntry } = useJournalStore();
  const { playSound } = useSound();
  
  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const existingEntry = entries[dateKey];

  useEffect(() => {
    if (isWriting) {
      setText(existingEntry?.text || "");
    }
  }, [isWriting, existingEntry, selectedDate]);

  const handleDayClick = (date: Date) => {
    playSound('glass-chime');
    setSelectedDate(date);
    setIsWriting(true);
  };

  const handleSave = () => {
    if (text.trim()) {
      addEntry(dateKey, text.trim());
      playSound('glass-chime');
    }
    setIsWriting(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-700 relative">
        
        {/* View Mode: Year Grid */}
        <div className={cn(
          "transition-all duration-700 ease-in-out w-full flex justify-center",
          isWriting ? "blur-md scale-95 opacity-60 pointer-events-none" : "opacity-100 scale-100"
        )}>
          <div className="flex flex-col items-center gap-12 w-full">
            <YearGrid onDayClick={handleDayClick} />
            
            {/* Plant Memory Button (Trigger for Today) */}
            <button 
              onClick={() => handleDayClick(new Date())}
              className="group flex flex-col items-center gap-3 transition-all hover:scale-105 mt-12"
            >
              <div className="w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center text-white text-4xl font-light pb-1 group-hover:bg-white/10 group-hover:border-white/60 transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                +
              </div>
              <span className="font-mono text-blue-100 text-sm tracking-wide group-hover:text-white transition-colors shadow-black/50 drop-shadow-md">plant memory</span>
            </button>
          </div>
        </div>

        {/* Writing Mode: True Glassmorphism Overlay */}
        <div className={cn(
          "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
          !isWriting ? "opacity-0 pointer-events-none backdrop-blur-none" : "opacity-100 backdrop-blur-sm bg-black/5"
        )}>
          <div className={cn(
            "relative w-full max-w-2xl bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-3xl p-12 flex flex-col items-center transition-all duration-500 transform",
            !isWriting ? "scale-90 translate-y-8" : "scale-100 translate-y-0"
          )}>
            
            {/* Single Close Button (Top Right) */}
            <button 
              onClick={() => {
                setIsWriting(false);
                playSound('soft-click');
              }}
              className="absolute top-6 right-6 text-primary/50 hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Header Date */}
            <div className="mb-10">
              <div className="bg-primary/10 text-primary px-6 py-2 rounded-full font-mono text-sm tracking-wider">
                {format(selectedDate, "MMMM d, yyyy")}
              </div>
            </div>

            {/* Weather/Mood Selector */}
            <div className="flex gap-8 mb-12 text-primary/40 text-3xl">
              <button className="hover:text-primary hover:scale-110 transition-all">☼</button>
              <button className="hover:text-primary hover:scale-110 transition-all">☁</button>
              <button className="hover:text-primary hover:scale-110 transition-all">☂</button>
              <button className="hover:text-primary hover:scale-110 transition-all text-primary">🍎</button>
            </div>

            {/* Text Input */}
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Add a memory..."
              className="w-full h-64 bg-transparent border-none resize-none focus:ring-0 text-primary placeholder:text-primary/30 font-mono text-xl leading-relaxed text-center p-0 selection:bg-primary/20"
              autoFocus={isWriting}
              maxLength={500}
            />

            {/* Save Button */}
            <div className="mt-8">
              <button
                onClick={handleSave}
                className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-bold text-sm hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/20 tracking-wide"
              >
                plant memory
              </button>
            </div>

          </div>
        </div>

      </div>
    </Layout>
  );
}
