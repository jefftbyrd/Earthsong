'use client';
import { createContext, type ReactNode } from 'react';
import { type Sound } from './soundsContext';

export interface User {
  id: number;
  username: string;
}

// export interface Snapshot {
//   id: number;
//   sounds: Sound[];
//   title: string;
// }

export type Snapshot = {
  id: number;
  title: string;
  sounds: Sound[];
  userId: number;
  createdAt?: Date; // Optional since old records may not have it
  location?: string; // Optional location name
  pin?: {
    // Optional geographic coordinates
    lat?: number;
    lng?: number;
    // any other geo properties you might need
  };
};

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
