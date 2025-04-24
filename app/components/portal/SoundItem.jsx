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
    <header className="">
      <div>
        <button
          className={`s${sound.id} block w-full h-full inset-ring-1 inset-ring-white`}
          onClick={() => {
            setActivateTarget(true);
            setForceChange(!forceChange);
            setPlayerTarget(sound.id);
          }}
        >
          <div className="flex items-center justify-center gap-x-0 h-full p-0 ">
            <div className="flex-shrink-0 h-fit">
              <SoundNumber soundNumber={index + 1} />
            </div>
          </div>
        </button>
        <div className="h-0.5 w-full bg-black" />
        <button
          className="p-1 lg:p-3 block w-full h-full"
          // data-info-toggle="true"
          style={{ backgroundColor: sound.color }}
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
          <span className="wrap-break-word text-truncate break-all md:break-normal text-sm min-h-10 lg:min-h-14 lg:text-xl xl:text-lg 2xl:text-xl line-clamp-1 lg:line-clamp-2 xl:line-clamp-2 text-black text-left">
            {sound.name}
          </span>
        </button>
      </div>
    </header>
  );
}
