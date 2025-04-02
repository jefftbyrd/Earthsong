'use client';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

interface JourneyContextType {
  phase: string;
  setPhase: Dispatch<SetStateAction<string>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  pastJourney: string;
  setPastJourney: Dispatch<SetStateAction<string>>;
  panelId: string;
  setPanelId: Dispatch<SetStateAction<string>>;
  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  togglePanel: () => void;
}

export const journeyContext = createContext<JourneyContextType | null>(null);

interface Props {
  children: ReactNode;
}

export const JourneyContextProvider = ({ children }: Props) => {
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState(false);
  const [pastJourney, setPastJourney] = useState('');
  const [panelId, setPanelId] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => setPanelOpen((prev) => !prev);

  useEffect(() => {
    setPanelOpen(true);
  }, [panelId]);

  return (
    <journeyContext.Provider
      value={{
        phase,
        setPhase,
        reset,
        setReset,
        pastJourney,
        setPastJourney,
        panelId,
        setPanelId,
        panelOpen,
        setPanelOpen,
        togglePanel,
      }}
    >
      {children}
    </journeyContext.Provider>
  );
};
