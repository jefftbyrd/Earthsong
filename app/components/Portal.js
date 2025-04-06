'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/portal.module.scss';
import { soundPortal } from './p5soundPortal';
import SaveControl from './portal/SaveControl';
import SoundController from './portal/SoundController';
import SoundControllerMobile from './portal/SoundControllerMobile';
import { usePortalState } from './portal/usePortalState';
import { useSoundData } from './portal/useSoundData';

export default function Portal() {
  const { reset } = useContext(journeyContext);
  const { isLoading, soundsColor, error } = useSoundData();
  const [state, actions] = usePortalState();
  const isMobile = useIsMobile();

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <>
      {soundsColor?.length > 0 && (
        <NextReactP5Wrapper
          sketch={soundPortal}
          soundsColor={soundsColor}
          playerTarget={state.playerTarget}
          play={state.playing}
          reset={reset}
        />
      )}

      <div className="grid gap-0.5">
        {isMobile ? (
          <SoundControllerMobile
            soundsColor={soundsColor}
            setPlayerTarget={actions.setPlayerTarget}
            setPlaying={actions.setPlaying}
            playing={state.playing}
            displayingItem={state.displayingItem}
            setDisplayingItem={actions.setDisplayingItem}
            isOpen={state.isOpen}
            setIsOpen={actions.toggleOpen}
          />
        ) : (
          <SoundController
            soundsColor={soundsColor}
            setPlayerTarget={actions.setPlayerTarget}
            setPlaying={actions.setPlaying}
            playing={state.playing}
            displayingItem={state.displayingItem}
            setDisplayingItem={actions.setDisplayingItem}
            isOpen={state.isOpen}
            setIsOpen={actions.toggleOpen}
          />
        )}

        <SaveControl
          soundsColor={soundsColor}
          saveIsOpen={state.saveIsOpen}
          setSaveIsOpen={actions.toggleSaveOpen}
          showSuccessMessage={state.showSuccessMessage}
          setShowSuccessMessage={actions.showSuccessMessage}
        />
      </div>
    </>
  );
}
