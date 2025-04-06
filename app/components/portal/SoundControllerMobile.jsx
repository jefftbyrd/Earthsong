import React from 'react';
import styles from '../../styles/portal.module.scss';
import FullscreenMobileView from '../FullscreenMobileView';
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
      <h1>Portal</h1>
      <FullscreenMobileView />
      {soundsColor.map((sound, index) => (
        <div key={`soundId-${sound.id}`} className={styles.soundItem}>
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
