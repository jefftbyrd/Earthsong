'use client';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { type Snapshot } from '../../context/userContext';

interface SnapshotItemProps {
  snapshot: Snapshot;
}

export default function SnapshotItem({ snapshot }: SnapshotItemProps) {
  const { setPhase } = useContext(journeyContext);
  const { setReset } = useContext(journeyContext);
  const { setPastJourney } = useContext(journeyContext);

  return (
    <button
      onClick={async () => {
        await setReset(true);
        await setReset(false);
        await setPastJourney(snapshot.id);
        await setPhase('portalRecall');
      }}
    >
      {snapshot.title}
    </button>
  );
}
