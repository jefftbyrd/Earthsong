import React from 'react';
import styles from '../../styles/portal.module.scss';
import SoundPlayerItem from '../SoundPlayerItem';

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
      <h1>Portal</h1>
      {soundsColor.map((sound, index) => (
        <div key={`soundId-${sound.id}`} className={styles.soundItem}>
          <SoundPlayerItem
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
