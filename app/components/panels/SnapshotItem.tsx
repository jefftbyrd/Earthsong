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
  onDelete: (id: number) => void; // Optional callback to refresh the list after deletion
}

interface SoundPlayerContextType {
  setActivateTarget: (value: boolean) => void;
  // Other properties...
}

export default function SnapshotItem({
  snapshot,
  onDelete,
}: SnapshotItemProps) {
  const {
    setPhase,
    setJourneyToRecall,
    togglePanel,
    triggerReset,
    setPin,
    setPanelId,
    setPanelOpen,
  } = useContext(journeyContext);
  const { setFreesoundLoading } = useContext(soundsContext);
  const { setActivateTarget } = useSoundPlayer() as SoundPlayerContextType;

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
        onDelete(snapshot.id); // Trigger a callback to refresh the list
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
              // Trigger reset first
              setPanelOpen(false);
              (setActivateTarget as (value: boolean) => void)(false);
              setPanelId('');

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

              // togglePanel();
              setPin({
                lat: null,
                lng: null,
                locationName: null,
              });
              setFreesoundLoading(true);
              setPhase('portalRecall');
            } catch (error) {
              console.error('Error triggering reset:', error);
            }
          }}
        >
          {snapshot.title}
        </EarthsongButton>
        <EarthsongButton buttonStyle={6} onClick={handleDelete}>
          delete
        </EarthsongButton>
      </motion.div>
    </AnimatePresence>
  );
}
