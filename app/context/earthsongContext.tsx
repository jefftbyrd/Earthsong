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
}) => {
  const [themeValue, setThemeValue] = useState(initial);

  return (
    <earthsongContext.Provider value={{ themeValue, setThemeValue }}>
      {children}
    </earthsongContext.Provider>
  );
};
