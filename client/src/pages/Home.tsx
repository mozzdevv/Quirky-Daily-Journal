import Layout from '@/components/Layout';
import YearGrid from '@/components/YearGrid';
import { useState, useEffect } from 'react';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export default function Home() {
  const [isWriting, setIsWriting] = useState(false);
  const [text, setText] = useState("");
  const { entries, addEntry } = useJournalStore();
  
  const today = new Date();
  const dateKey = format(today, "yyyy-MM-dd");
  const existingEntry = entries[dateKey];

  useEffect(() => {
    if (isWriting) {
      setText(existingEntry?.text || "");
    }
  }, [isWriting, existingEntry]);

  const handleSave = () => {
    if (text.trim()) {
      addEntry(dateKey, text.trim());
    }
    setIsWriting(false);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-700 relative">
        
        {/* View Mode: Year Grid */}
        <div className={cn(
          "transition-all duration-500 ease-in-out w-full flex justify-center",
          isWriting ? "blur-sm scale-95 opacity-50 pointer-events-none" : "opacity-100 scale-100"
        )}>
          <div className="flex flex-col items-center gap-12 w-full">
            <YearGrid />
            
            {/* Plant Memory Button (Trigger) */}
            <button 
              onClick={() => setIsWriting(true)}
              className="group flex flex-col items-center gap-3 transition-all hover:scale-105 mt-8"
            >
              <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary text-4xl font-light pb-1 group-hover:bg-primary/5 transition-colors shadow-lg shadow-primary/10">
                +
              </div>
              <span className="font-mono text-primary text-sm tracking-wide">plant memory</span>
            </button>
          </div>
        </div>

        {/* Writing Mode: Glassmorphism Overlay */}
        <div className={cn(
          "fixed inset-0 z-50 flex items-center justify-center transition-all duration-500",
          !isWriting ? "opacity-0 pointer-events-none backdrop-blur-none" : "opacity-100 backdrop-blur-md bg-background/30"
        )}>
          <div className={cn(
            "relative w-full max-w-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-2xl rounded-3xl p-12 flex flex-col items-center transition-all duration-500 transform",
            !isWriting ? "scale-90 translate-y-8" : "scale-100 translate-y-0"
          )}>
            
            {/* Single Close Button (Top Right) */}
            <button 
              onClick={() => setIsWriting(false)}
              className="absolute top-6 right-6 text-primary/50 hover:text-primary transition-colors p-2 hover:bg-primary/5 rounded-full"
            >
              <X size={24} />
            </button>

            {/* Header Date */}
            <div className="mb-10">
              <div className="bg-primary/10 text-primary px-6 py-2 rounded-full font-mono text-sm tracking-wider">
                {format(today, "MMMM d, yyyy")}
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
