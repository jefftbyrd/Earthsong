'use client';
import { createContext, type Dispatch, type ReactNode, useState } from 'react';

export interface Sound {
  // color: string;
  description: string;
  duration: number;
  freesoundUrl: string;
  geotag: string;
  id: number;
  name: string;
  tags: string[];
  url: string;
  username: string;
}

interface Sounds {
  sound: Sound;
}

interface SoundsContextType {
  sounds: Sounds;
  setSounds: Dispatch<React.SetStateAction<Sounds>>;
}

export const soundsContext = createContext<SoundsContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const SoundsContextProvider = ({ children }: Props) => {
  // Initialize with an empty sound object that matches the Sound type
  const [freesoundLoading, setFreesoundLoading] = useState(true);
  const [notEnough, setNotEnough] = useState(false);
  const [sounds, setSounds] = useState<Sounds>({
    count: 0,
    pin: {
      lat: 0,
      lng: 0,
    },
    results: {
      // color: '',
      description: '',
      duration: 0,
      freesoundUrl: '',
      geotag: '',
      id: 0,
      name: '',
      tags: [],
      url: '',
      username: '',
    },
  });

  return (
    <soundsContext.Provider
      value={{
        sounds,
        setSounds,
        freesoundLoading,
        setFreesoundLoading,
        notEnough,
        setNotEnough,
      }}
    >
      {children}
    </soundsContext.Provider>
  );
};
