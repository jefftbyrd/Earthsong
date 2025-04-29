'use client';
import React, { createContext, useContext, useState } from 'react';

// Define type for the context value
interface SoundPlayerContextType {
  playerTarget: string | number | null;
  playing: boolean;
  handlePlaySound: (soundId: string) => void;
  isSoundPlaying: (soundId: string) => boolean;
  setPlayerTarget: React.Dispatch<React.SetStateAction<string | number | null>>;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  toggleSound: (soundId: string) => void;
  soundStates: Record<string, boolean>;
  activateTarget: boolean;
  setActivateTarget: React.Dispatch<React.SetStateAction<boolean>>;
  forceChange: boolean;
  setForceChange: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create a context for sound player state
const soundPlayerContext = createContext<SoundPlayerContextType | undefined>(
  undefined,
);

// Provider component that wraps your app
export function SoundPlayerProvider({ children }) {
  const [playerTarget, setPlayerTarget] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [soundStates, setSoundStates] = useState<Record<string, boolean>>({});
  const [activateTarget, setActivateTarget] = useState(false);
  const [forceChange, setForceChange] = useState(false);

  // Combined function to handle playing and pausing sounds
  const handlePlaySound = (soundId: string): void => {
    if (playerTarget !== null && playerTarget === soundId && playing) {
      // If clicking the currently playing sound, pause it
      setPlaying(false);
    } else {
      // Otherwise, set the target and play
      setPlayerTarget(soundId);
      setPlaying(true);
    }
  };

  // Function to toggle the playing state of a specific sound
  const toggleSound = (soundId: string | number) => {
    setSoundStates((prevStates) => {
      const newStates = {
        ...prevStates,
        [soundId]: !prevStates[soundId], // Toggle the playing state
      };
      // console.log('Updated soundStates:', newStates); // Debugging
      return newStates;
    });
  };

  // Check if a specific sound is currently playing
  const isSoundPlaying = (soundId: string): boolean => {
    return !!soundStates[soundId]; // Return true if the soundId is playing
  };

  // Value object that will be passed to consumers
  const value = {
    playerTarget,
    playing,
    handlePlaySound,
    isSoundPlaying,
    setPlayerTarget,
    setPlaying,
    toggleSound,
    soundStates,
    activateTarget,
    setActivateTarget,
    forceChange,
    setForceChange,
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
