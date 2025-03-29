'use client';

import React, { createContext } from 'react';

interface User {
  username: string;
}

interface Snapshot {
  id: string;
  sounds: any[];
}

export const earthsongContext = createContext<[User | null, Snapshot[] | null]>(
  [null, null],
);

export default function AppWrapper({
  children,
  snapshots,
  user,
}: {
  children: React.ReactNode;
  snapshots: Snapshot[] | null;
  user: User | null;
}) {
  return (
    <earthsongContext.Provider value={[user, snapshots]}>
      {children}
    </earthsongContext.Provider>
  );
}
