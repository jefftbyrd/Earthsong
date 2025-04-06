'use client';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import styles from '../../styles/portal.module.scss';
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

  // const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];

  return (
    <div className="">
      <div className={`s${sound.id} p-2 grid grid-cols-16`}>
        <button
          className="p-0 m-0 w-full col-span-14"
          onClick={() => {
            setPlaying(!playing);
            setPlayerTarget(sound.id);
          }}
        >
          {/* <div className={styles.soundText}> */}
          {/* <span className={styles.soundNumber}>{aegean[index]}</span> */}
          <span className="text-sm line-clamp-1">{sound.name}</span>
          {/* </div> */}
        </button>
        <button
          className="p-1 bg-black rounded-full w-5 h-5 grid place-content-center"
          onClick={() => {
            // setDisplayingItem(sound.id);
            // setIsOpen(!isOpen);
            setPanelId(sound.id);
            togglePanel();
          }}
        >
          <span className="text-center font-bold text-xs">i</span>
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
