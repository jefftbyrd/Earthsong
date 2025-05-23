'use client';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';

export interface Sound {
  description: string;
  duration: number;
  freesoundUrl: string;
  geotag: string;
  id: number;
  name: string;
  tags: string[];
  url: string;
  username: string;
  color?: string;
  pin?: Pin;
  location?: string;

  // pin?: { lat: number; lng: number };
  // location?: string;
}

interface Pin {
  lat: number;
  lng: number;
}

export interface Sounds {
  count: number;
  results: Sound;
  pin: Pin;
}

export interface SoundsColor {
  pin?: Pin;
  location?: string;
  sounds?: Sound[];
}

interface SoundsContextType {
  sounds: Sounds;
  setSounds: Dispatch<React.SetStateAction<Sounds>>;
  notEnough: boolean;
  setNotEnough: Dispatch<SetStateAction<boolean>>;
  freesoundLoading: boolean;
  setFreesoundLoading: Dispatch<SetStateAction<boolean>>;
  soundsColor: SoundsColor;
  setSoundsColor: Dispatch<SetStateAction<SoundsColor>>;
  isFetchingSounds: boolean; // New property added to SoundsContextType
  setIsFetchingSounds: Dispatch<SetStateAction<boolean>>; // New property added to SoundsContextType
}

export const soundsContext = createContext<SoundsContextType>({
  sounds: {
    count: 0,
    pin: { lat: 0, lng: 0 },
    results: {
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
  },
  setSounds: () => {},
  notEnough: false,
  setNotEnough: () => {},
  freesoundLoading: false,
  setFreesoundLoading: () => {},
  soundsColor: {
    pin: { lat: 0, lng: 0 },
    sounds: [
      {
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
    ],
  },
  setSoundsColor: () => {},
  isFetchingSounds: false, // Initialize the new property
  setIsFetchingSounds: () => {}, // Initialize the new property
});

interface Props {
  children: ReactNode;
}

export const SoundsContextProvider = ({ children }: Props) => {
  // Initialize with an empty sound object that matches the Sound type
  const [freesoundLoading, setFreesoundLoading] = useState(true);
  const [notEnough, setNotEnough] = useState(false);
  const [isFetchingSounds, setIsFetchingSounds] = useState(true); // New state
  const [soundsColor, setSoundsColor] = useState<SoundsColor>({
    pin: {
      lat: 0,
      lng: 0,
      // locationName: '',
    },
    location: '',
    sounds: [
      {
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
    ],
  });
  const [sounds, setSounds] = useState<Sounds>({
    count: 0,
    pin: {
      lat: 0,
      lng: 0,
    },
    results: {
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
        soundsColor,
        setSoundsColor,
        isFetchingSounds,
        setIsFetchingSounds,
      }}
    >
      {children}
    </soundsContext.Provider>
  );
};
