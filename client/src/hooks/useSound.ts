import { useCallback } from 'react';

export const useSound = () => {
  const playSound = useCallback((soundName: 'glass-chime' | 'cosmic-hover' | 'soft-click') => {
    const audio = new Audio(`/sounds/${soundName}.wav`);
    audio.volume = 0.4; // Default volume
    
    if (soundName === 'cosmic-hover') {
      audio.volume = 0.15; // Lower volume for repetitive hover sounds
    }
    
    audio.play().catch(err => {
      // Ignore auto-play errors (user hasn't interacted yet)
      console.warn('Audio play failed:', err);
    });
  }, []);

  return { playSound };
};
