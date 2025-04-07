'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext'; // Import the context
import InfoPanel from './InfoPanel';
import SoundIcon from './SoundIcon';

export default function SoundItem({ sound, index }) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  // Get sound player functions from context
  const { handlePlaySound, isSoundPlaying } = useSoundPlayer();

  // Check if this specific sound is playing
  const isPlaying = isSoundPlaying(sound.id);

  return (
    <div className="">
      <div className={`s${sound.id} p-2 grid grid-cols-16`}>
        <button
          className="p-0 m-0 w-full grid col-span-14 grid-cols-16"
          onClick={() => handlePlaySound(sound.id)}
        >
          <SoundIcon
            height="6vw"
            width="6vw"
            soundNumber={index + 1}
            isPlaying={isPlaying}
          />

          <span className="text-sm line-clamp-1 text-black col-span-13">
            {sound.name}
          </span>
        </button>
        <button
          className="p-1 bg-black rounded-full w-5 h-5 grid place-content-center col-span-2"
          onClick={() => {
            setPanelId(sound.id);
            togglePanel();
          }}
        >
          <span className="text-center font-bold text-xs">i</span>
        </button>
      </div>
      {panelOpen && panelId === sound.id && (
        <InfoPanel sound={sound} index={index} color={sound.color} />
      )}
    </div>
  );
}
