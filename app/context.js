'use client';

import React, { createContext } from 'react';

// import type { User } from '../types/types';

// export const userContext = createContext<User | undefined>(undefined);
// export const userContext = createContext(undefined);
// export const snapshotsContext = createContext(undefined);
export const earthsongContextOld = createContext(undefined);

export default function AppWrapper({ children, snapshots, user }) {
  return (
    <earthsongContextOld.Provider value={[user, snapshots]}>
      {children}
    </earthsongContextOld.Provider>
  );
}

// export function useSnapshotsContext() {
//   return useContext<User | undefined>(snapshotsContext);
// }

// export default function AppWrapper({
//   children,
//   user,
//   // snapshots,
// }: {
//   children: React.ReactNode;
//   user: User | undefined;
// }) {
//   return <userContext.Provider value={user}>{children}</userContext.Provider>;
// }

// export function useUserContext() {
//   return useContext<User | undefined>(userContext);
// }
