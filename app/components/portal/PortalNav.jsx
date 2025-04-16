'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import EarthsongIcons from '../EarthsongIcons';
import { panels } from './panelConfig';

export default function PortalNav({ isLoggedIn }) {
  const { togglePanel, setPanelId, phase, triggerReset2, panelId, panelOpen } =
    useContext(journeyContext);
  // const [resetDone, setResetDone] = useState(false);
  const { setActivateTarget } = useSoundPlayer();

  // useEffect(() => {
  //   if (resetDone) {
  //     setPhase('map');
  //   }
  // }, [resetDone, setPhase]);

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
      onClick={handleInteraction}
      onMouseDown={handleInteraction}
      onTouchStart={handleInteraction}
      className="h-10 bg-black border-t-1 border-gray-600 text-white border-solid w-full grid grid-cols-3 uppercase text-xl tracking-wide"
      style={{
        position: 'relative',
        zIndex: 50,
        pointerEvents: 'auto',
      }}
    >
      {phase === 'portal' || phase === 'portalRecall' ? (
        <button
          key="map"
          className="uppercase text-center flex items-center justify-center gap-0  hover:bg-[#0033FF] transition-all duration-100 ease-in-out"
          onClick={async (e) => {
            e.stopPropagation(); // Extra safeguard
            setActivateTarget(false);
            togglePanel();
            try {
              await triggerReset2({ nextPhase: 'returnToMap' }); // Pass the required object
              console.log('Reset triggered successfully');
            } catch (error) {
              console.error('Error triggering reset:', error);
            }
          }}
        >
          <EarthsongIcons className="h-6 w-6 mr-1" iconNumber={5} />
          <span>Map</span>
        </button>
      ) : null}
      <div className="col-span-2 col-start-2 grid grid-cols-2 gap-0">
        {filteredPanels.map(([id, { label, icon, iconClassName }]) => (
          <button
            key={`panel-${id}`}
            className="uppercase text-center flex items-center justify-center hover:bg-[#0033FF] transition-all duration-100 ease-in-out"
            onClick={(e) => {
              e.stopPropagation(); // Extra safeguard
              setActivateTarget(false);
              if (panelOpen && panelId === id) {
                togglePanel(); // This will close the panel and clear panelId
              }
              // Otherwise, set this panel as active
              else {
                setPanelId(id);
                // The useEffect will handle opening the panel if needed
              }
            }}
          >
            <EarthsongIcons
              // className="h-6 w-6"
              iconNumber={icon}
              className={iconClassName}
            />
            <span>{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
