'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import { useSoundPlayer } from '../context/soundPlayerContext';
import { userContext } from '../context/userContext';
import styles from '../styles/portal.module.scss';
import { soundPortal } from './p5soundPortal';
import PortalNav from './portal/PortalNav';
import SoundController from './portal/SoundController';
import SoundIcon from './portal/SoundIcon';
// import { usePortalState } from './portal/usePortalState';
import { useSoundData } from './portal/useSoundData';

export default function Portal() {
  const canvasContainerRef = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { reset } = useContext(journeyContext);
  const { isLoading, soundsColor, error } = useSoundData();
  // const [state, actions] = usePortalState();
  const { playerTarget, playing } = useSoundPlayer();
  const { user } = useContext(userContext);

  // More robust approach to measure height
  useEffect(() => {
    // Function to calculate available height
    const calculateHeight = () => {
      if (!canvasContainerRef.current) return;

      const soundController = document.getElementById('sound-controller');
      const portalNav = document.getElementById('portal-nav');

      const totalHeight = window.innerHeight;
      const controllerHeight = soundController
        ? soundController.offsetHeight
        : 0;
      const navHeight = portalNav ? portalNav.offsetHeight : 0;

      // Calculate available space
      const availableHeight = totalHeight - controllerHeight - navHeight;

      // Set a minimum height to prevent issues
      const finalHeight = Math.max(availableHeight, 100);

      setContainerHeight(finalHeight);
      console.log('Container height set to:', finalHeight);
    };

    // Initial measurement after a short delay to ensure DOM is ready
    const timer = setTimeout(calculateHeight, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateHeight);
    };
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Sound Controller */}
      <div className="flex-shrink-0" id="sound-controller">
        <SoundController
          soundsColor={soundsColor}
          // displayingItem={state.displayingItem}
          // setDisplayingItem={actions.setDisplayingItem}
          // isOpen={state.isOpen}
          // setIsOpen={actions.toggleOpen}
        />
      </div>

      {/* Canvas Container */}
      <div
        ref={canvasContainerRef}
        className="flex-grow relative overflow-hidden"
        style={{
          height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
          maxHeight: 'calc(100vh - 2.5rem)',
        }}
      >
        {soundsColor?.length > 0 && containerHeight > 0 && (
          <NextReactP5Wrapper
            sketch={soundPortal}
            soundsColor={soundsColor}
            containerHeight={containerHeight}
            playerTarget={playerTarget}
            play={playing}
            reset={reset}
            SoundIcon={SoundIcon}
          />
        )}
      </div>
    </div>
  );
}
