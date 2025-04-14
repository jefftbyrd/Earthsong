'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext'; // Import the context
// import InfoPanel from './InfoPanel';
import SoundNumber from './SoundNumber';

export default function SoundItem({ sound, index }) {
  const { setPanelId, panelOpen, togglePanel, panelId, setPanelOpen } =
    useContext(journeyContext);
  // Get sound player functions from context
  const { handlePlaySound, isSoundPlaying } = useSoundPlayer();

  // Check if this specific sound is playing
  const isPlaying = isSoundPlaying(sound.id);

  return (
    <header className="lg:h-20 xl:h-28">
      <div className={`s${sound.id} grid grid-cols-16 h-full`}>
        <button
          className="block w-full col-span-14 p-2 h-full"
          onClick={() => handlePlaySound(sound.id)}
        >
          <div className="flex items-center justify-start gap-x-0 h-full">
            <div className="flex-shrink-0">
              <SoundNumber soundNumber={index + 1} />
            </div>
            <span className="text-sm lg:text-xl xl:text-lg 2xl:text-xl line-clamp-1 lg:line-clamp-2 xl:line-clamp-3 text-black text-left ml-3">
              {sound.name}
            </span>
          </div>
        </button>
        <button
          className="p-1 my-auto bg-black rounded-full w-5 h-5 grid place-content-center col-span-2"
          data-info-toggle="true"
          onClick={(e) => {
            e.stopPropagation();

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
          <span className="text-center font-bold text-xs">i</span>
        </button>
      </div>
      {/* {panelOpen && panelId === sound.id && (
        <InfoPanel sound={sound} index={index} color={sound.color} />
      )} */}
    </header>
  );
}
