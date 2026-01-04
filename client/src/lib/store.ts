import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface JournalEntry {
  date: string; // ISO date string YYYY-MM-DD
  text: string;
  plantId: number; // 1-365
  createdAt: number;
}

interface JournalState {
  entries: Record<string, JournalEntry>;
  addEntry: (date: string, text: string) => void;
  getEntry: (date: string) => JournalEntry | undefined;
  getAllEntries: () => JournalEntry[];
  getDaysCount: () => number;
}

// Helper to get a deterministic plant ID for a date
// This ensures the same date always gets the same plant, but it looks random
const getPlantIdForDate = (date: string): number => {
  const hash = date.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return (Math.abs(hash) % 18) + 1; // We have 18 generated plant images (2 sets of 9)
};

export const useJournalStore = create<JournalState>()(
  persist(
    (set, get) => ({
      entries: {},
      
      addEntry: (date: string, text: string) => {
        set((state: JournalState) => {
          const plantId = getPlantIdForDate(date);
          return {
            entries: {
              ...state.entries,
              [date]: {
                date,
                text,
                plantId,
                createdAt: Date.now(),
              },
            },
          };
        });
      },
      
      getEntry: (date: string) => {
        return get().entries[date];
      },
      
      getAllEntries: () => {
        const entries = Object.values(get().entries) as JournalEntry[];
        return entries.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
      },
      
      getDaysCount: () => {
        return Object.keys(get().entries).length;
      },
    }),
    {
      name: 'one-year-journal-storage',
    }
  )
);
