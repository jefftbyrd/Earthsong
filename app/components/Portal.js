'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useContext, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/portal.module.scss';
import { soundPortal } from './p5soundPortal';
import SaveControl from './portal/SaveControl';
import SoundController from './portal/SoundController';
import { useSoundData } from './portal/useSoundData';

export default function Portal() {
  const [playerTarget, setPlayerTarget] = useState();
  const [playing, setPlaying] = useState(false);
  const [displayingItem, setDisplayingItem] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const { reset } = useContext(journeyContext);
  const { isLoading, soundsColor } = useSoundData();

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <>
      {soundsColor?.length > 0 && (
        <NextReactP5Wrapper
          sketch={soundPortal}
          soundsColor={soundsColor}
          playerTarget={playerTarget}
          play={playing}
          reset={reset}
        />
      )}

      <div className={styles.multiController}>
        <SoundController
          soundsColor={soundsColor}
          setPlayerTarget={setPlayerTarget}
          setPlaying={setPlaying}
          playing={playing}
          displayingItem={displayingItem}
          setDisplayingItem={setDisplayingItem}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />

        <SaveControl soundsColor={soundsColor} />
      </div>
    </>
  );
}
