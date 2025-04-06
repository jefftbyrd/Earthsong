'use client';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import styles from '../../styles/portal.module.scss';
import InfoPanel from './InfoPanel';

export default function SoundItem({
  sound,
  index,
  setPlayerTarget,
  setPlaying,
  playing,
  setDisplayingItem,
  displayingItem,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

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
            <span className="text-sm">{sound.name}</span>
          </div>
        </button>
        <button
          className={styles.infoButton}
          onClick={() => {
            // setDisplayingItem(sound.id);
            // setIsOpen(!isOpen);
            setPanelId(sound.id);
            togglePanel();
          }}
        >
          𐙁
        </button>
      </div>
      {panelOpen && panelId === sound.id && (
        <InfoPanel
          sound={sound}
          index={index}
          // setIsOpen={setIsOpen}
          // isOpen={isOpen}
          color={sound.color}
        />
      )}
    </div>
  );
}
