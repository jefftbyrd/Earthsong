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
    incrementSnapshotVersion,
    triggerReset,
    phase,
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

              // Ensure we're in portalRecall phase (only changes if not already there)
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
          {snapshot && !Array.isArray(snapshot)
            ? snapshot.pin
              ? `${snapshot.pin.lat?.toFixed(3) || 0}, ${snapshot.pin.lng?.toFixed(3) || 0}`
              : snapshot.sounds?.[0]?.geotag || ''
            : ''}
          <br />
          {snapshot.location || snapshot.sounds?.[0]?.location || null}
          {snapshot && !Array.isArray(snapshot) && snapshot.location
            ? snapshot.location
            : snapshot.sounds?.[0]?.location || null}
        </EarthsongButton>
        <EarthsongButton buttonStyle={6} onClick={handleDelete}>
          delete
        </EarthsongButton>
      </motion.div>
    </AnimatePresence>
  );
}
