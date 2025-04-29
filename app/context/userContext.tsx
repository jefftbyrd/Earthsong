'use client';
import { createContext, type ReactNode } from 'react';
import { type Sound } from './soundsContext';

export interface User {
  id: number;
  username: string;
}

export interface Snapshot {
  id: number;
  sounds: Sound[];
  title: string;
}

export interface UserContextType {
  user: User | null;
  snapshots: Snapshot[];
}

export const userContext = createContext<UserContextType>({
  user: null,
  snapshots: [],
});

interface Props {
  children: ReactNode;
  user: User | null;
  snapshots: Snapshot[];
}

export const UserContextProvider = ({ children, user, snapshots }: Props) => {
  return (
    <userContext.Provider value={{ user, snapshots }}>
      {children}
    </userContext.Provider>
  );
};
