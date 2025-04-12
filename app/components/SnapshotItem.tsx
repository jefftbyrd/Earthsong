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
      onClick={async () => {
        await setReset(true);
        await setReset(false);
        await setJourneyToRecall(snapshot.id);
        await setPhase('portalRecall');
      }}
    >
      {snapshot.title}
    </button>
  );
}
