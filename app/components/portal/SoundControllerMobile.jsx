import React, { useState } from 'react';
import styles from '../../styles/portal.module.scss';
import SoundItem from './SoundItem';

export default function SoundControllerMobile({
  soundsColor,
  // setPlayerTarget,
  // setPlaying,
  // playing,
  displayingItem,
  setDisplayingItem,
  isOpen,
  setIsOpen,
}) {
  const [playerTarget, setPlayerTarget] = useState(null);
  const [playing, setPlaying] = useState(false);
  const handlePlaySound = (soundId) => {
    if (playerTarget === soundId && playing) {
      // If clicking the currently playing sound, pause it
      setPlaying(false);
    } else {
      // Otherwise, set the target and play
      setPlayerTarget(soundId);
      setPlaying(true);
    }
  };

  return (
    <>
      <span className="text-3xl uppercase text-center">Portal</span>
      {soundsColor.map((sound, index) => (
        <div key={`soundId-${sound.id}`} className="">
          <SoundItem
            sound={sound}
            index={index}
            // setPlayerTarget={setPlayerTarget}
            // setPlaying={setPlaying}
            // setDisplayingItem={setDisplayingItem}
            // playing={playing}
            onPlaySound={handlePlaySound}
            isPlaying={playing && playerTarget === sound.id}
            displayingItem={displayingItem}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      ))}
    </>
  );
}
