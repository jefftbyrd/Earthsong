'use client';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

interface Pin {
  lat: number | null;
  lng: number | null;
  locationName: string | null;
}

export interface JourneyContextType {
  phase: string;
  setPhase: Dispatch<SetStateAction<string>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  journeySaved: boolean;
  setJourneySaved: Dispatch<SetStateAction<boolean>>;
  journeyToRecall: number;
  setJourneyToRecall: Dispatch<SetStateAction<number>>;
  panelId: string;
  setPanelId: Dispatch<SetStateAction<string>>;
  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  togglePanel: () => void;
  mobileCheck: boolean;
  pin: Pin | null;
  setPin: Dispatch<SetStateAction<Pin>>;
  triggerJourneySaved: () => void;
  triggerReset: () => Promise<void>;
  triggerReset2: (args: { nextPhase: string }) => Promise<void>;
  searchMessage: string;
  setSearchMessage: Dispatch<SetStateAction<string>>;
  freesoundError: boolean;
  setFreesoundError: Dispatch<SetStateAction<boolean>>;
  snapshotVersion: number;
  incrementSnapshotVersion: () => void;
}

export const journeyContext = createContext<JourneyContextType>({
  phase: 'initial',
  setPhase: () => {},
  reset: false,
  setReset: () => {},
  journeySaved: false,
  setJourneySaved: () => {},
  journeyToRecall: 0,
  setJourneyToRecall: () => {},
  panelId: '',
  setPanelId: () => {},
  panelOpen: false,
  setPanelOpen: () => {},
  togglePanel: () => {},
  triggerJourneySaved: () => {},
  mobileCheck: false,
  pin: { lat: null, lng: null, locationName: null },
  setPin: () => {},
  triggerReset() {
    // This function is not implemented in the context provider
    // but is expected to be called in the context consumer
    return Promise.resolve();
  },
  triggerReset2() {
    // This function is not implemented in the context provider
    // but is expected to be called in the context consumer
    return Promise.resolve();
  },
  searchMessage: '',
  setSearchMessage: () => {},
  freesoundError: false,
  setFreesoundError: () => {},
  snapshotVersion: 0,
  incrementSnapshotVersion: () => {},
});

interface Props {
  children: ReactNode;
  mobileCheck: boolean;
}

export const JourneyContextProvider = ({ children, mobileCheck }: Props) => {
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState(false);
  const [journeyToRecall, setJourneyToRecall] = useState(0);
  const [panelId, setPanelId] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [pin, setPin] = useState<Pin>({
    lat: null,
    lng: null,
    locationName: null,
  });
  const [journeySaved, setJourneySaved] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  const [freesoundError, setFreesoundError] = useState(false);
  const [snapshotVersion, setSnapshotVersion] = useState(0);

  const incrementSnapshotVersion = () => {
    setSnapshotVersion((prev) => prev + 1);
  };

  const triggerReset = async () => {
    console.log('Starting reset sequence');
    setReset(true);

    // Return a promise that resolves after a longer delay
    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('Reset sequence complete');
        setReset(false);
        resolve();
      }, 1000); // Increased from 500ms to give more time for cleanup
    });
  };

  const triggerReset2 = async ({ nextPhase }: { nextPhase: string }) => {
    setReset(true);
    // Return the awaited promise
    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        setReset(false);
        setPhase(nextPhase);
        resolve();
      }, 500);
    });
  };

  const togglePanel = () => {
    setPanelOpen((prev) => {
      // If we're closing the panel, also clear the panel ID
      if (prev === true) {
        setPanelId('');
      }
      return !prev;
    });
  };

  const triggerJourneySaved = () => {
    setJourneySaved(true);
    setTimeout(() => setJourneySaved(false), 6000);
  };

  // Either remove the useEffect entirely, or modify it:
  useEffect(() => {
    // Only auto-open if we have a non-empty panelId AND the panel is currently closed
    if (panelId && !panelOpen) setPanelOpen(true);
  }, [panelId, panelOpen]);

  return (
    <journeyContext.Provider
      value={{
        phase,
        setPhase,
        reset,
        setReset,
        journeyToRecall,
        setJourneyToRecall,
        panelId,
        setPanelId,
        panelOpen,
        setPanelOpen,
        togglePanel,
        mobileCheck,
        pin,
        setPin,
        journeySaved,
        setJourneySaved,
        triggerJourneySaved,
        triggerReset,
        triggerReset2,
        searchMessage,
        setSearchMessage,
        setFreesoundError,
        freesoundError,
        snapshotVersion,
        incrementSnapshotVersion,
      }}
    >
      {children}
    </journeyContext.Provider>
  );
};
