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
        className="flex flex-col gap-0 text-left w-full bg-white/20 h-fit"
        exit={{
          opacity: 0,
          transition: { duration: 2 },
        }}
      >
        <div className="flex flex-row gap-0 justify-between w-full border-black/30 border-l-2 border-b-2 border-solid py-3 pl-4 pr-2">
          <div className="flex flex-col gap-1 ml-0 my-1 pr-5 w-full  ">
            <h3 className="font-bold text-xl mb-2 text-left tracking-wide">
              {snapshot.title}
            </h3>

            {/* Display location */}
            <div className="font-abordage tracking-wide">
              <span className="font-bold font-basteleur">Location:</span>{' '}
              {snapshot.location || ''}
            </div>

            <div className="font-abordage tracking-wide">
              {/* Display date with label only if createdAt exists */}
              {snapshot.createdAt ? (
                <>
                  <span className="font-bold font-basteleur">Created:</span>{' '}
                  {snapshot.createdAt instanceof Date
                    ? snapshot.createdAt.toLocaleString(undefined, {
                        dateStyle: 'short',
                        timeStyle: 'short',
                      })
                    : String(snapshot.createdAt)}
                </>
              ) : null}
            </div>
            <button
              className="text-md uppercase font-basteleur tracking-widest text-left text-white bg-black/40 hover:bg-black/70 active:bg-white/50 active:text-black w-fit p-3 outline-1 outline-offset-2 outline-black/30"
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
              Summon Journey {'>'}
            </button>
          </div>

          <div className="flex ml-auto">
            <button
              onClick={handleDelete}
              className="hover:text-white text-black/70 lg:text-sm [writing-mode:vertical-rl] [text-orientation:upright] tracking-[0.6em] lg:tracking-[0.2em] text-xs border-black/30  border-l-4 pl-1.5 h-auto w-auto border-double"
            >
              remove
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
