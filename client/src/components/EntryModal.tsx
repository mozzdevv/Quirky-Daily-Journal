import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { format } from 'date-fns';
import { useJournalStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
}

const MAX_CHARS = 280; // Twitter-like limit to encourage concise memories

export default function EntryModal({ isOpen, onClose, date }: EntryModalProps) {
  const [text, setText] = useState('');
  const addEntry = useJournalStore((state) => state.addEntry);
  const getEntry = useJournalStore((state) => state.getEntry);

  useEffect(() => {
    if (date && isOpen) {
      const dateKey = format(date, 'yyyy-MM-dd');
      const existingEntry = getEntry(dateKey);
      setText(existingEntry?.text || '');
    }
  }, [date, isOpen, getEntry]);

  const handleSave = () => {
    if (date && text.trim()) {
      const dateKey = format(date, 'yyyy-MM-dd');
      addEntry(dateKey, text.trim());
      onClose();
    }
  };

  if (!date) return null;

  const charsLeft = MAX_CHARS - text.length;
  const isOverLimit = charsLeft < 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-sm border-border/50 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center font-display text-2xl text-primary">
            {format(date, 'MMMM do, yyyy')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <div className="relative">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Plant a memory for today..."
              className="min-h-[150px] resize-none font-sans text-lg bg-transparent border-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50 leading-relaxed"
              autoFocus
            />
            {/* Lined paper effect */}
            <div className="absolute inset-0 pointer-events-none -z-10 flex flex-col pt-[2px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[28px] border-b border-primary/10 w-full" />
              ))}
            </div>
          </div>
          
          <div className="flex justify-end mt-2">
            <span className={cn(
              "text-xs font-medium transition-colors",
              isOverLimit ? "text-destructive" : "text-muted-foreground"
            )}>
              {charsLeft} characters left
            </span>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={handleSave} 
            disabled={!text.trim() || isOverLimit}
            className="w-full sm:w-auto min-w-[120px] font-display text-lg rounded-full"
          >
            Plant Memory
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
