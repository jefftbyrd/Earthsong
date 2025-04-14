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
  lat?: number;
  lng?: number;
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
  setPin: Dispatch<SetStateAction<Pin | object>>;
  triggerJourneySaved: () => void;
  triggerReset: () => Promise<void>;
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
  pin: {},
  setPin: () => {},
  triggerReset: () => {},
});

interface Props {
  children: ReactNode;
  mobileCheck: boolean;
}

export const JourneyContextProvider = ({ children, mobileCheck }: Props) => {
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState(false);
  const [journeyToRecall, setJourneyToRecall] = useState(0);
  const [panelId, setPanelId] = useState(0);
  const [panelOpen, setPanelOpen] = useState(false);
  const [pin, setPin] = useState<Pin | object>({});
  const [journeySaved, setJourneySaved] = useState(false);

  const triggerReset = async () => {
    setReset(true);

    // Return the awaited promise
    return await new Promise<void>((resolve) => {
      setTimeout(() => {
        setReset(false);
        setPhase('map');
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
      }}
    >
      {children}
    </journeyContext.Provider>
  );
};
