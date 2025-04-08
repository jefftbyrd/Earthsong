'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { useSoundPlayer } from '../context/soundPlayerContext'; // Import the context
import useIsMobile from '../hooks/useIsMobile';
import styles from '../styles/portal.module.scss';
import { soundPortal } from './p5soundPortal';
import PortalNav from './portal/PortalNav';
import SaveControl from './portal/SaveControl';
import SoundController from './portal/SoundController';
import SoundControllerMobile from './portal/SoundControllerMobile';
import SoundIcon from './portal/SoundIcon';
import { usePortalState } from './portal/usePortalState';
import { useSoundData } from './portal/useSoundData';

export default function Portal() {
  const { reset } = useContext(journeyContext);
  const { isLoading, soundsColor, error } = useSoundData();
  const [state, actions] = usePortalState();
  const isMobile = useIsMobile();
  // Get player state from context
  const { playerTarget, playing } = useSoundPlayer();

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
          playerTarget={playerTarget} // Use context value
          play={playing} // Use context value
          reset={reset}
          SoundIcon={SoundIcon}
        />
      )}

      <div className="relative min-h-full h-[100vh]">
        {isMobile ? (
          <SoundControllerMobile
            soundsColor={soundsColor}
            displayingItem={state.displayingItem}
            setDisplayingItem={actions.setDisplayingItem}
            isOpen={state.isOpen}
            setIsOpen={actions.toggleOpen}
            // No need to pass play state props
          />
        ) : (
          <SoundController
            soundsColor={soundsColor}
            displayingItem={state.displayingItem}
            setDisplayingItem={actions.setDisplayingItem}
            isOpen={state.isOpen}
            setIsOpen={actions.toggleOpen}
            // No need to pass play state props
          />
        )}

        {/* <SaveControl
          soundsColor={soundsColor}
          saveIsOpen={state.saveIsOpen}
          setSaveIsOpen={actions.toggleSaveOpen}
          showSuccessMessage={state.showSuccessMessage}
          setShowSuccessMessage={actions.showSuccessMessage}
        /> */}
        <PortalNav />
      </div>
    </>
  );
}
