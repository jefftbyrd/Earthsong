'use client';
import { createContext, type Dispatch, type ReactNode, useState } from 'react';

export interface Sound {
  color: string;
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
  const [sounds, setSounds] = useState<Sounds>({});

  return (
    <soundsContext.Provider value={{ sounds, setSounds }}>
      {children}
    </soundsContext.Provider>
  );
};
