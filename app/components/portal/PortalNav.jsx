'use client';
import React, { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import { userContext } from '../../context/userContext';
import EarthsongIcons from '../EarthsongIcons';
import { panels } from './panelConfig';

export default function PortalNav({ isLoggedIn }) {
  const { togglePanel, setPanelId, setReset, setPhase, phase } =
    useContext(journeyContext);
  // const { user } = useContext(userContext);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  // Filter panels based on login status
  const filteredPanels = Object.entries(panels).filter(([id]) => {
    if (id === 'Unlock' && isLoggedIn) return false; // Hide Unlock if logged in
    if (id === 'Powers' && !isLoggedIn) return false; // Hide Powers if not logged in
    return true;
  });

  return (
    <footer className="h-10 border-t-1 bg-black w-full grid grid-cols-3 uppercase">
      {phase === 'portal' || phase === 'portalRecall' ? (
        <button
          key="map"
          className="uppercase text-center flex items-center justify-center gap-2 text-lg"
          onClick={() => {
            setReset(true);
            setTimeout(() => {
              setReset(false);
              setResetDone(true);
            }, 0);
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
          onClick={() => {
            setPanelId(id);
            togglePanel();
          }}
        >
          <EarthsongIcons className="h-6 w-6" iconNumber={icon} />
          <span>{label}</span>
        </button>
      ))}
    </footer>
  );
}
