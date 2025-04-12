'use client';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { type Snapshot } from '../../context/userContext';

interface SnapshotItemProps {
  snapshot: Snapshot;
}

export default function SnapshotItem({ snapshot }: SnapshotItemProps) {
  const { setPhase, setReset, setJouneyToRecall, togglePanel } =
    useContext(journeyContext);

  return (
    <button
      onClick={() => {
        setReset(true);
        setReset(false);
        setJouneyToRecall(snapshot.id);
        setPhase('portalRecall');
        togglePanel();
      }}
    >
      {snapshot.title}
    </button>
  );
}
