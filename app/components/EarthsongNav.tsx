'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { useSoundPlayer } from '../context/soundPlayerContext';
import { soundsContext } from '../context/soundsContext';
import EarthsongIcons from './EarthsongIcons';
import { panels } from './panels/panelConfig';

export interface FilteredPanelsProps {
  label: string;
  icon?: number;
  iconClassName?: string;
  component: React.ComponentType<any>;
  className?: string;
}

export default function EarthsongNav({ isLoggedIn }: { isLoggedIn: boolean }) {
  const {
    togglePanel,
    setPanelId,
    phase,
    panelId,
    panelOpen,
    incrementSnapshotVersion,
    setPin,
    setPhase,
    triggerReset,
  } = useContext(journeyContext);
  const { setFreesoundLoading } = useContext(soundsContext);
  const { setActivateTarget } = useSoundPlayer() as {
    setActivateTarget: (value: boolean) => void;
  };

  // Prevent event propagation to canvas
  // Define interface for interaction events
  interface InteractionEvent {
    stopPropagation: () => void;
  }

  // Prevent event propagation to canvas
  const handleInteraction = (e: InteractionEvent): void => {
    e.stopPropagation();
  };

  // Filter panels based on login status
  const filteredPanels = Object.entries(panels).filter(([id]) => {
    if (id === 'Unlock' && isLoggedIn) return false; // Hide Unlock if logged in
    if (id === 'Powers' && !isLoggedIn) return false; // Hide Powers if not logged in
    return !(
      id === 'Summon' ||
      id === 'Save' ||
      id === 'Navigate' ||
      id === 'Portal' ||
      id === 'About'
    ); // Hide these panels
  });

  return (
    <nav
      onClick={handleInteraction}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      className="h-10 lg:h-12 bg-black border-t-1 border-gray-600 text-white border-solid w-full grid grid-cols-3 uppercase text-xl tracking-wide"
      style={{
        position: 'relative',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      <AnimatePresence>
        {phase === 'portal' || phase === 'portalRecall' ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 3 },
            }}
            key="map"
            className="uppercase text-center flex items-center justify-center gap-0  hover:bg-[#0033FF] transition-all duration-100 ease-in-out"
            onClick={async (e) => {
              e.stopPropagation(); // Extra safeguard
              setActivateTarget(false);
              if (panelOpen) {
                togglePanel(); // This will close the panel and clear panelId
              }
              await triggerReset();
              setPin({
                lat: null,
                lng: null,
                locationName: null,
              });
              setFreesoundLoading(true);
              incrementSnapshotVersion();
              setPhase('returnToMap');
            }}
          >
            <EarthsongIcons className="h-6 w-6 mr-1" iconNumber={5} />
            <span>Map</span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="col-span-2 col-start-2 grid grid-cols-2 gap-0">
        {filteredPanels.map(
          ([id, { label, icon, iconClassName, className }]) => (
            <button
              key={`panel-${id}`}
              className="uppercase text-center flex items-center justify-center hover:bg-[#001effa5] transition-all duration-100 ease-in-out"
              onClick={(e) => {
                e.stopPropagation(); // Extra safeguard
                setActivateTarget(false);
                if (panelOpen && panelId === id) {
                  togglePanel(); // This will close the panel and clear panelId
                } else {
                  setPanelId(id);
                  // The useEffect will handle opening the panel if needed
                }
              }}
            >
              <EarthsongIcons iconNumber={icon} className={iconClassName} />
              <span className={className}>{label}</span>
            </button>
          ),
        )}
      </div>
    </nav>
  );
}
