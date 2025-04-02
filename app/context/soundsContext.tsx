'use client';
import { createContext, type Dispatch, type ReactNode, useState } from 'react';

interface Sounds {
  [key: string]: any; // Adjust this type as needed
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
