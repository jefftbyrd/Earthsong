import React from 'react';
import styles from '../../styles/portal.module.scss';
import SoundItem from './SoundItem';

export default function SoundControllerMobile({
  soundsColor,
  setPlayerTarget,
  setPlaying,
  playing,
  displayingItem,
  setDisplayingItem,
  isOpen,
  setIsOpen,
}) {
  return (
    <>
      <span className="text-xl uppercase text-center">Sound Portal</span>
      {soundsColor.map((sound, index) => (
        <div key={`soundId-${sound.id}`} className="">
          <SoundItem
            sound={sound}
            index={index}
            setPlayerTarget={setPlayerTarget}
            setPlaying={setPlaying}
            setDisplayingItem={setDisplayingItem}
            playing={playing}
            displayingItem={displayingItem}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
          />
        </div>
      ))}
    </>
  );
}
