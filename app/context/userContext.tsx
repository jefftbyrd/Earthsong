'use client';
import {
  createContext,
  type Dispatch,
  type FC,
  type ReactNode,
  type SetStateAction,
} from 'react';

interface UserContextType {
  themeValue: 'light' | 'dark';
  setThemeValue: Dispatch<SetStateAction<'light' | 'dark'>>;
}

export const userContext = createContext<UserContextType>({
  themeValue: 'light',
  setThemeValue: () => {},
});

interface Props {
  children: ReactNode;
  // initial?: 'light' | 'dark';
}

export const UserContextProvider: FC<Props> = ({
  children,
  user,
  snapshots,
}) => {
  return (
    <userContext.Provider
      value={{
        user,
        snapshots,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
