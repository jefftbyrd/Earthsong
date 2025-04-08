'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext'; // Import the context
// import InfoPanel from './InfoPanel';
import SoundIcon from './SoundIcon';

export default function SoundItem({ sound, index }) {
  const { setPanelId, panelOpen, togglePanel, panelId, setPanelOpen } =
    useContext(journeyContext);
  // Get sound player functions from context
  const { handlePlaySound, isSoundPlaying } = useSoundPlayer();

  // Check if this specific sound is playing
  const isPlaying = isSoundPlaying(sound.id);

  return (
    <header className="">
      <div className={`s${sound.id} grid grid-cols-16`}>
        <button
          // className="p-0 m-0 w-full grid col-span-14 grid-cols-16 h-full bg-blue-900"
          className="block w-full col-span-14 p-2"
          onClick={() => handlePlaySound(sound.id)}
        >
          <div className="grid grid-cols-16">
            <SoundIcon
              height="6vw"
              width="6vw"
              soundNumber={index + 1}
              isPlaying={isPlaying}
            />

            <span className="text-sm line-clamp-1 text-black col-span-13">
              {sound.name}
            </span>
          </div>
        </button>
        <button
          className="p-1 mt-2 bg-black rounded-full w-5 h-5 grid place-content-center col-span-2"
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
