'use client';
import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';

interface EarthsongContextType {
  themeValue: 'light' | 'dark';
  setThemeValue: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const earthsongContext = createContext<EarthsongContextType>({
  themeValue: 'light',
  setThemeValue: () => {},
});

interface Props {
  children: ReactNode;
  initial?: 'light' | 'dark';
}

export const EarthsongContextProvider: FC<Props> = ({
  children,
  initial = 'light',
  user,
  snapshots,
}) => {
  const [themeValue, setThemeValue] = useState(initial);
  const [isStarted, setIsStarted] = useState(false);
  const [enterPortal, setEnterPortal] = useState(false);
  const [phase, setPhase] = useState('initial');
  const [reset, setReset] = useState('initial');

  return (
    <earthsongContext.Provider
      value={{
        themeValue,
        setThemeValue,
        isStarted,
        setIsStarted,
        enterPortal,
        setEnterPortal,
        user,
        snapshots,
        setPhase,
        phase,
        reset,
        setReset,
      }}
    >
      {children}
    </earthsongContext.Provider>
  );
};
