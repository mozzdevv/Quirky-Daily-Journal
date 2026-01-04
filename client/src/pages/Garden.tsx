import React from 'react';
import Layout from '@/components/Layout';
import { useJournalStore } from '@/lib/store';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export default function Garden() {
  const entries = useJournalStore((state) => state.getAllEntries());

  return (
    <Layout>
      <div className="space-y-8 animate-in fade-in duration-700">
        <div className="text-center space-y-2">
          <h2 className="font-display text-3xl text-primary">My Memory Garden</h2>
          <p className="text-muted-foreground font-sans">Watch your year grow, one plant at a time.</p>
        </div>

        {entries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-50">
            <img src="/images/plants/set1_1.png" alt="Seedling" className="w-24 h-24 mb-4 grayscale opacity-50" />
            <p className="font-display text-xl">Your garden is empty...</p>
            <p className="text-sm">Start journaling to plant your first seed.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {entries.map((entry) => {
              const setNum = entry.plantId <= 9 ? 1 : 2;
              const imgNum = entry.plantId <= 9 ? entry.plantId : entry.plantId - 9;
              const plantImage = `/images/plants/set${setNum}_${imgNum}.png`;

              return (
                <div 
                  key={entry.date}
                  className="group relative aspect-square bg-white/40 rounded-2xl border border-white/60 p-4 flex flex-col items-center justify-between transition-all hover:scale-105 hover:bg-white/60 hover:shadow-md cursor-default"
                >
                  <span className="text-[10px] font-sans text-muted-foreground uppercase tracking-wider">
                    {format(new Date(entry.date), 'MMM d')}
                  </span>
                  
                  <div className="flex-1 w-full flex items-center justify-center p-2">
                    <img 
                      src={plantImage} 
                      alt="Memory plant" 
                      className="w-full h-full object-contain drop-shadow-sm filter sepia-[0.2] contrast-[1.1]"
                    />
                  </div>
                  
                  <div className="absolute inset-0 bg-white/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl p-4 flex items-center justify-center text-center">
                    <p className="font-sans text-sm text-primary line-clamp-4 italic">
                      "{entry.text}"
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
