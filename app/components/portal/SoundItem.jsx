'use client';
import React, { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import InfoPanel from './InfoPanel';
import SoundIcon from './SoundIcon';

export default function SoundItem({
  sound,
  index,
  setPlayerTarget,
  setPlaying,
  playing,
  // setDisplayingItem,
  // displayingItem,
}) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <div className="">
      <div className={`s${sound.id} p-2 grid grid-cols-16`}>
        <button
          className="p-0 m-0 w-full grid col-span-14 grid-cols-16"
          onClick={() => {
            setPlaying(!playing);
            setPlayerTarget(sound.id);
          }}
        >
          <SoundIcon height="6vw" width="6vw" soundNumber={index + 1} />

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
