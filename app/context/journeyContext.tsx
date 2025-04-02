'use client';
import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

export interface JourneyContextType {
  phase: string;
  setPhase: Dispatch<SetStateAction<string>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  pastJourney: number;
  setPastJourney: Dispatch<SetStateAction<number>>;
  panelId: string;
  setPanelId: Dispatch<SetStateAction<string>>;
  panelOpen: boolean;
  setPanelOpen: Dispatch<SetStateAction<boolean>>;
  togglePanel: () => void;
}

export const journeyContext = createContext<JourneyContextType>({
  phase: 'initial',
  setPhase: () => {},
  reset: false,
  setReset: () => {},
  pastJourney: 0,
  setPastJourney: () => {},
  panelId: '',
  setPanelId: () => {},
  panelOpen: false,
  setPanelOpen: () => {},
  togglePanel: () => {},
});

interface Props {
  children: ReactNode;
}

export const JourneyContextProvider = ({ children }: Props) => {
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState(false);
  const [pastJourney, setPastJourney] = useState(0);
  const [panelId, setPanelId] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);

  const togglePanel = () => setPanelOpen((prev) => !prev);

  useEffect(() => {
    if (panelId) setPanelOpen(true);
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
