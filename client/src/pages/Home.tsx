import React, { useState } from 'react';
import Layout from '@/components/Layout';
import YearGrid from '@/components/YearGrid';
import EntryModal from '@/components/EntryModal';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const daysCount = useJournalStore((state) => state.getDaysCount());
  
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const today = new Date();
  const daysLeft = 365 - daysCount; // Simplified calculation

  return (
    <Layout>
      <div className="flex flex-col items-center gap-8 animate-in fade-in duration-700">
        
        {/* Progress Section */}
        <div className="w-full max-w-md text-center space-y-2">
          <p className="font-display text-xl text-primary/80">
            {daysCount} memories planted
          </p>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
              style={{ width: `${(daysCount / 365) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground font-sans">
            {daysLeft} days left to grow your garden
          </p>
        </div>

        {/* Main Grid */}
        <div className="w-full bg-white/50 backdrop-blur-sm rounded-3xl p-4 sm:p-8 shadow-sm border border-white/60">
          <YearGrid onDayClick={handleDayClick} />
        </div>

        {/* Today's Prompt */}
        <div className="text-center max-w-sm mx-auto mt-4">
          <p className="font-display text-2xl text-primary mb-2">
            {format(today, 'EEEE, MMMM do')}
          </p>
          <button 
            onClick={() => handleDayClick(today)}
            className="text-muted-foreground hover:text-primary transition-colors font-sans text-sm underline decoration-dotted underline-offset-4"
          >
            Tap to write today's entry
          </button>
        </div>

        <EntryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          date={selectedDate} 
        />
      </div>
    </Layout>
  );
}
