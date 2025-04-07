'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a context for sound player state
const soundPlayerContext = createContext();

// Provider component that wraps your app
export function SoundPlayerProvider({ children }) {
  const [playerTarget, setPlayerTarget] = useState(null);
  const [playing, setPlaying] = useState(false);

  // Combined function to handle playing and pausing sounds
  const handlePlaySound = (soundId) => {
    if (playerTarget === soundId && playing) {
      // If clicking the currently playing sound, pause it
      setPlaying(false);
    } else {
      // Otherwise, set the target and play
      setPlayerTarget(soundId);
      setPlaying(true);
    }
  };

  // Check if a specific sound is currently playing
  const isSoundPlaying = (soundId) => {
    return playing && playerTarget === soundId;
  };

  // Value object that will be passed to consumers
  const value = {
    playerTarget,
    playing,
    handlePlaySound,
    isSoundPlaying,
    // You might want these direct setters for special cases
    setPlayerTarget,
    setPlaying,
  };

  return (
    <soundPlayerContext.Provider value={value}>
      {children}
    </soundPlayerContext.Provider>
  );
}

// Custom hook to use the sound player context
export function useSoundPlayer() {
  const context = useContext(soundPlayerContext);
  if (context === undefined) {
    throw new Error('useSoundPlayer must be used within a SoundPlayerProvider');
  }
  return context;
}
