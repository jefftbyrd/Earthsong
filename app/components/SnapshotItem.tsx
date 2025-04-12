'use client';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { type Snapshot } from '../context/userContext';

interface SnapshotItemProps {
  snapshot: Snapshot;
}

export default function SnapshotItem({ snapshot }: SnapshotItemProps) {
  const { setPhase, setReset, setJourneyToRecall } = useContext(journeyContext);

  return (
    <button
      onClick={() => {
        setReset(true);
        setReset(false);
        setJourneyToRecall(snapshot.id);
        setPhase('portalRecall');
      }}
    >
      {snapshot.title}
    </button>
  );
}
