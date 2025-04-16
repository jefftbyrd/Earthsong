'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext'; // Import the context
import SoundNumber from './SoundNumber';

export default function SoundItem({ sound, index }) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  // Get sound player functions from context
  const { setPlayerTarget, setActivateTarget, setForceChange, forceChange } =
    useSoundPlayer();

  return (
    <header className="lg:h-20 xl:h-28">
      <div className={`s${sound.id}`}>
        <button
          className="block w-full h-full"
          onClick={() => {
            setActivateTarget(true);
            setForceChange(!forceChange);
            setPlayerTarget(sound.id);
          }}
        >
          <div className="flex items-center justify-center gap-x-0 h-full p-2">
            <div className="flex-shrink-0">
              <SoundNumber soundNumber={index + 1} />
            </div>
          </div>
        </button>
        <div className="h-0.5 w-full bg-black" />
        <button
          className="p-1 "
          data-info-toggle="true"
          onClick={(e) => {
            e.stopPropagation();
            // setTest(false);
            setActivateTarget(false);
            // If this exact panel is already open, just toggle it closed
            if (panelOpen && panelId === sound.id) {
              togglePanel(); // This will close the panel and clear panelId
            }
            // Otherwise, set this panel as active
            else {
              setPanelId(sound.id);
              // The useEffect will handle opening the panel if needed
            }
          }}
        >
          <span className="p-1 text-sm min-h-10 lg:text-xl xl:text-lg 2xl:text-xl line-clamp-1 lg:line-clamp-2 xl:line-clamp-3 text-black text-left">
            {sound.name}
          </span>
        </button>
      </div>
    </header>
  );
}
