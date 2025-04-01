'use client';
import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
  useState,
} from 'react';

interface SoundsContextType {
  themeValue: 'light' | 'dark';
  setThemeValue: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const soundsContext = createContext<SoundsContextType>({
  themeValue: 'light',
  setThemeValue: () => {},
});

interface Props {
  children: ReactNode;
  initial?: 'light' | 'dark';
}

export const SoundsContextProvider: FC<Props> = ({
  children,
  // sounds,
  // initial = 'light',
  // user,
  // snapshots,
}) => {
  // const [themeValue, setThemeValue] = useState(initial);
  const [sounds, setSounds] = useState([]);

  return (
    <soundsContext.Provider
      value={{
        setSounds,
        sounds,
      }}
    >
      {children}
    </soundsContext.Provider>
  );
};
