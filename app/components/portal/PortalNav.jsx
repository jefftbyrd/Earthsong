'use client';
import React, { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import EarthsongIcons from '../EarthsongIcons';
import { panels } from './panelConfig';

export default function PortalNav({ isLoggedIn }) {
  const { togglePanel, setPanelId, setReset, setPhase, phase, triggerReset } =
    useContext(journeyContext);
  const [resetDone, setResetDone] = useState(false);
  const { setActivateTarget } = useSoundPlayer();

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  // Prevent event propagation to canvas
  const handleInteraction = (e) => {
    e.stopPropagation();
  };

  // Filter panels based on login status
  const filteredPanels = Object.entries(panels).filter(([id]) => {
    if (id === 'Unlock' && isLoggedIn) return false; // Hide Unlock if logged in
    if (id === 'Powers' && !isLoggedIn) return false; // Hide Powers if not logged in
    return !(id === 'Summon' || id === 'Save');
  });

  return (
    <nav
      className="h-10 border-t-1 bg-black w-full grid grid-cols-3 uppercase"
      onClick={handleInteraction}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      style={{
        position: 'relative',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {phase === 'portal' || phase === 'portalRecall' ? (
        <button
          key="map"
          className="uppercase text-center flex items-center justify-center gap-2 text-lg"
          onClick={(e) => {
            e.stopPropagation(); // Extra safeguard
            setActivateTarget(false);
            triggerReset();
            // setReset(true);
            // setTimeout(() => {
            //   setReset(false);
            //   setResetDone(true);
            // }, 0);
          }}
        >
          <EarthsongIcons className="h-6 w-6" iconNumber={5} />
          <span>Map</span>
        </button>
      ) : null}

      {filteredPanels.map(([id, { label, icon }]) => (
        <button
          key={`panel-${id}`}
          className="uppercase text-center flex items-center justify-center gap-2 text-lg"
          onClick={(e) => {
            e.stopPropagation(); // Extra safeguard
            setActivateTarget(false);
            setPanelId(id);
            togglePanel();
          }}
        >
          <EarthsongIcons className="h-6 w-6" iconNumber={icon} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
