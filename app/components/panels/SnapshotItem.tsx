'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import { soundsContext } from '../../context/soundsContext';
import { type Snapshot } from '../../context/userContext';
import EarthsongButton from '../EarthsongButton';
import EarthsongIcons from '../EarthsongIcons';

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
        className="flex flex-col gap-0 text-left w-full h-full text-black tracking-wide outline-2 outline-solid place-content-between"
        style={{ outlineColor: 'inherit' }}
        exit={{
          opacity: 0,
          transition: { duration: 2 },
        }}
      >
        <div className="p-2">
          <h3 className="font-bold text-lg text-left tracking-wide mb-1">
            {snapshot.title}
          </h3>

          {/* Display location */}
          <div className="font-abordage tracking-wide text-sm flex gap-2">
            <EarthsongIcons className="h-6 w-6" iconNumber={9} />{' '}
            {snapshot.location || ''}
          </div>

          <div className="font-abordage tracking-wide text-sm flex gap-2">
            {/* Display date with label only if createdAt exists */}
            {snapshot.createdAt ? (
              <>
                <EarthsongIcons className="h-6 w-6" iconNumber={10} />{' '}
                {snapshot.createdAt instanceof Date
                  ? snapshot.createdAt.toLocaleString(undefined, {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  : String(snapshot.createdAt)}
              </>
            ) : null}
          </div>
        </div>

        <div className="flex gap-0 justify-between w-full border-t-2 border-black border-solid place-self-end">
          <button
            className="text-sm uppercase font-basteleur tracking-widest text-center text-white font-bold bg-black/50 hover:bg-black/80 active:bg-white/50 active:text-black w-full py-2 px-7 border-r-2 border-black "
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
            Summon {'>'}
          </button>

          <button
            onClick={handleDelete}
            className="hover:bg-white/90 text-black lg:text-sm text-xs outline-0 outline-black h-auto w-fit px-2 bg-white/40 font-abordage leading-3 active:bg-black/50 active:text-white"
          >
            x remove
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
