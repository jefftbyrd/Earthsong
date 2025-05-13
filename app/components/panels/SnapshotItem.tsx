'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import { soundsContext } from '../../context/soundsContext';
import { type Snapshot } from '../../context/userContext';
import EarthsongButton from '../EarthsongButton';

interface SnapshotItemProps {
  snapshot: Snapshot;
  onDelete: (id: number) => void;
}

export default function SnapshotItem({
  snapshot, // This is already normalized
  onDelete,
}: SnapshotItemProps) {
  const {
    setPhase,
    setJourneyToRecall,
    incrementSnapshotVersion,
    triggerReset,
    phase,
    setPin,
    setPanelId,
    setPanelOpen,
  } = useContext(journeyContext);
  const { setFreesoundLoading } = useContext(soundsContext);
  const { setActivateTarget } = useSoundPlayer();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/snapshots?id=${snapshot.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to delete snapshot:', errorData.error);
        return;
      }

      console.log('Snapshot deleted successfully');
      if (onDelete) {
        onDelete(snapshot.id);
      }
    } catch (error) {
      console.error('Error deleting snapshot:', error);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="flex gap-4"
        exit={{
          opacity: 0,
          transition: { duration: 2 },
        }}
      >
        <EarthsongButton
          buttonStyle={4}
          onClick={async () => {
            try {
              // Close panel and reset targets
              setPanelOpen(false);
              setActivateTarget(false);
              setPanelId('');

              // Reset audio
              await triggerReset();

              // Update state for new snapshot
              setJourneyToRecall(snapshot.id);
              setPin({
                lat: null,
                lng: null,
                locationName: null,
              });
              setFreesoundLoading(true);

              // Force component remount with version increment
              incrementSnapshotVersion();

              // Ensure we're in portalRecall phase
              if (phase !== 'portalRecall') {
                setPhase('portalRecall');
              }
            } catch (error) {
              console.error('Error recalling snapshot:', error);
            }
          }}
        >
          {snapshot.title}
          <br />
          {/* Display coordinates */}
          {snapshot.pin
            ? `${snapshot.pin.lat || 0}, ${snapshot.pin.lng || 0}`
            : ''}
          <br />
          {/* Display location */}
          {snapshot.location || ''}
          <br />
          {/* Display date */}
          {snapshot.createdAt instanceof Date
            ? snapshot.createdAt.toLocaleString(undefined, {
                dateStyle: 'short',
                timeStyle: 'short',
              })
            : snapshot.createdAt
              ? String(snapshot.createdAt)
              : 'Date unknown'}
        </EarthsongButton>
        <EarthsongButton buttonStyle={6} onClick={handleDelete}>
          delete
        </EarthsongButton>
      </motion.div>
    </AnimatePresence>
  );
}
