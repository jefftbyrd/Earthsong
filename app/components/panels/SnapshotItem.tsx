'use client';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { soundsContext } from '../../context/soundsContext';
import { type Snapshot } from '../../context/userContext';

interface SnapshotItemProps {
  snapshot: Snapshot;
}

export default function SnapshotItem({ snapshot }: SnapshotItemProps) {
  const {
    setPhase,
    setReset,
    setJourneyToRecall,
    togglePanel,
    triggerReset,
    phase,
    setPin,
  } = useContext(journeyContext);
  const { setFreesoundLoading } = useContext(soundsContext);

  return (
    <button
      onClick={async () => {
        try {
          // Trigger reset first
          await triggerReset();
          console.log('Reset triggered successfully');

          // Await the first setPhase
          await new Promise((resolve) => {
            setPhase('initial');
            resolve(undefined);
          });

          // Wait 100ms before proceeding
          await new Promise<void>((resolve) => {
            setTimeout(() => resolve(), 100);
          });

          // Perform the other actions after reset
          setJourneyToRecall(snapshot.id);
          togglePanel();
          setPin({});
          setFreesoundLoading(true);
          setPhase('portalRecall');
        } catch (error) {
          console.error('Error triggering reset:', error);
        }
      }}
    >
      {snapshot.title}
    </button>
  );
}
