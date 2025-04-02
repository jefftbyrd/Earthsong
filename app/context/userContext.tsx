'use client';
import { createContext, type ReactNode } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface Sound {
  color: string;
  description: string;
  duration: number;
  freesoundUrl: string;
  geotag: string;
  id: number;
  name: string;
  tags: string[];
  url: string;
  username: string;
}

interface Snapshot {
  id: number;
  sounds: Sound[];
  title: string;
}

interface UserContextType {
  user: User | null;
  snapshots: Snapshot[];
}

export const userContext = createContext<UserContextType | null>(null);

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
