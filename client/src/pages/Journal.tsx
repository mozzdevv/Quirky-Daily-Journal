import React from 'react';
import Layout from '@/components/Layout';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';

export default function Journal() {
  const entries = useJournalStore((state) => state.getAllEntries());

  // Group entries by month
  const groupedEntries = entries.reduce((acc, entry) => {
    const monthYear = format(new Date(entry.date), 'MMMM yyyy');
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    acc[monthYear].push(entry);
    return acc;
  }, {} as Record<string, typeof entries>);

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700 max-w-2xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl text-primary">Journal Entries</h2>
          <p className="text-muted-foreground font-sans">Reflect on your journey.</p>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-20 opacity-50">
            <p className="font-display text-xl">No entries yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(groupedEntries).map(([month, monthEntries]) => (
              <div key={month} className="space-y-6">
                <h3 className="font-display text-2xl text-primary/50 border-b border-primary/10 pb-2 sticky top-0 bg-background/80 backdrop-blur-sm z-10">
                  {month}
                </h3>
                
                <div className="space-y-8">
                  {monthEntries.map((entry) => (
                    <div key={entry.date} className="relative pl-6 border-l-2 border-primary/20 hover:border-primary/50 transition-colors">
                      <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-primary/20" />
                      
                      <div className="space-y-2">
                        <div className="flex items-baseline justify-between">
                          <span className="font-display text-xl text-primary">
                            {format(new Date(entry.date), 'do')}
                          </span>
                          <span className="text-xs text-muted-foreground font-sans uppercase tracking-wider">
                            {format(new Date(entry.date), 'EEEE')}
                          </span>
                        </div>
                        
                        <p className="font-sans text-foreground/80 leading-relaxed whitespace-pre-wrap">
                          {entry.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
