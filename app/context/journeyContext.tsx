'use client';
import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useEffect,
  useState,
} from 'react';

interface JourneyContextType {
  themeValue: 'light' | 'dark';
  setThemeValue: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const journeyContext = createContext<JourneyContextType>({
  themeValue: 'light',
  setThemeValue: () => {},
});

interface Props {
  children: ReactNode;
  initial?: 'light' | 'dark';
}

export const JourneyContextProvider: FC<Props> = ({
  children,
  // initial = 'light',
  // user,
  // snapshots,
}) => {
  // const [themeValue, setThemeValue] = useState(initial);
  // const [isStarted, setIsStarted] = useState(false);
  // const [enterPortal, setEnterPortal] = useState(false);
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState(false);
  const [pastJourney, setPastJourney] = useState();
  const [panelId, setPanelId] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  function togglePanel() {
    // setPanelOpen((prev) => (prev === false ? true : false));
    setPanelOpen(!panelOpen);
  }

  useEffect(() => {
    // manually deep compare here before updating state
    setPanelOpen(true);
  }, [panelId]);

  return (
    <journeyContext.Provider
      value={{
        // themeValue,
        // setThemeValue,
        // isStarted,
        // setIsStarted,
        // enterPortal,
        // setEnterPortal,
        // user,
        // snapshots,
        setPhase,
        phase,
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
