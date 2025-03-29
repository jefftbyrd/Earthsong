import { createContext } from 'react';

interface EarthsongContextType {
  themeValue: 'light' | 'dark';
}

export const earthsongContext = createContext<EarthsongContextType>({
  themeValue: 'dark',
});
