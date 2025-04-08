'use client';
import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import OpenPanelButton from '../panels/OpenPanelButton';
import PowersPanel from '../panels/PowersPanel';

export default function PortalNav() {
  const { setPhase, panelOpen, panelId, setReset, setPanelId, togglePanel } =
    useContext(journeyContext);
  // const { setReset } = useContext(journeyContext);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  return (
    <footer className="h-10 border-t-1 bg-black fixed bottom-0 w-full grid grid-cols-3 uppercase text-center col-span-2">
      <button
        className="uppercase"
        onClick={() => {
          if (panelOpen) {
            togglePanel(); // This will close the panel and clear panelId
          }
          setReset(true);
          setTimeout(() => {
            setReset(false);
            setResetDone(true);
          }, 0);
        }}
      >
        &lt; Map
      </button>
      {/* <button
        className="uppercase"
        onClick={(e) => {
          e.stopPropagation();

          // If this exact panel is already open, just toggle it closed
          if (panelOpen && panelId === 'powersPanel') {
            togglePanel(); // This will close the panel and clear panelId
          }
          // Otherwise, set this panel as active
          else {
            setPanelId('powersPanel');
            // The useEffect will handle opening the panel if needed
          }
        }}
      >
        Powers
      </button> */}
      <OpenPanelButton panel="Powers" />
      <OpenPanelButton panel="Guide" />
    </footer>
  );
}
