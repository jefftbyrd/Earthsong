'use client';
import React, { useState } from 'react';
import styles from './portal.module.scss';
import SoundInfoPanel from './SoundInfoPanel';

interface ProcessedSound {
  id: number;
  url: string;
  name: string;
  freesoundUrl?: string;
  color?: string;
}

interface SoundPlayerItemProps {
  sound: ProcessedSound;
  index: number;
  setPlayerTarget: (id: number) => void;
  setPlaying: (playing: boolean) => void;
  playing: boolean;
  setDisplayingItem: (id: number) => void;
  displayingItem: number | undefined;
}

export default function SoundPlayerItem({
  sound,
  index,
  setPlayerTarget,
  setPlaying,
  playing,
  setDisplayingItem,
  displayingItem,
}: SoundPlayerItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  return (
    <div className={styles.outerDiv}>
      <div className={`s${sound.id}`}>
        <button
          className={styles.outerButton}
          onClick={() => {
            setPlaying(!playing);
            setPlayerTarget(sound.id);
          }}
        >
          <div className={styles.soundText}>
            <span className={styles.soundNumber}>{aegean[index]}</span>
            <span className={styles.soundName}>{sound.name}</span>
          </div>
        </button>
        <button
          className={styles.infoButton}
          onClick={() => {
            setDisplayingItem(sound.id);
            setIsOpen(!isOpen);
          }}
        >
          𐙁
        </button>
      </div>
      {isOpen && displayingItem === sound.id && (
        <SoundInfoPanel
          sound={sound}
          index={index}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          color={sound.color}
        />
      )}
    </div>
  );
}
