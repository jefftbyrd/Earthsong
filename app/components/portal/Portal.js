'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { normalizeSnapshotFormat } from '../../../util/normalizeData';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import styles from '../../styles/portal.module.scss';
import { soundPortal } from '../p5/p5soundPortal';
import { panels } from '../panels/panelConfig';
import SoundController from './SoundController';
import { useSoundData } from './useSoundData';

export default function Portal(props) {
  const canvasContainerRef = useRef(null);
  const p5Ref = useRef(null);
  const [containerHeight, setContainerHeight] = useState(0);
  const { reset, panelOpen, panelId, snapshotVersion, phase } =
    useContext(journeyContext);
  const { isLoading, soundsColor, error } = useSoundData();
  const { playerTarget, playing, activateTarget, forceChange } =
    useSoundPlayer();

  const soundsForPortal = normalizeSnapshotFormat(
    phase === 'portal' ? soundsColor : props.recalledSounds,
  );

  console.log('soundsForPortal', soundsForPortal);

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
    };

    // Initial measurement after a short delay to ensure DOM is ready
    const timer = setTimeout(calculateHeight, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateHeight);

    // Store the p5Ref.current in a variable that the cleanup function can use
    const currentP5Ref = p5Ref.current;

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateHeight);
      if (currentP5Ref) {
        currentP5Ref.updateWithProps({ reset: true });
      }
    };
  }, []);

  if (phase === 'portal' && isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (phase === 'portal' && error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Sound Controller */}
      <div className="flex-shrink-0" id="sound-controller">
        <SoundController
          soundsColor={soundsForPortal}
          {...(props.recalledName && { recalledName: props.recalledName })}
        />
      </div>

      {/* Canvas Container */}
      <div
        id="sound-portal-canvas-container"
        ref={canvasContainerRef}
        className="flex-grow relative overflow-hidden"
        style={{
          width: '100vw',
          maxWidth: '100vw',
          height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
          maxHeight: 'calc(100vh - 2.5rem)',
        }}
      >
        {(soundsForPortal?.sounds?.length > 0 ||
          (Array.isArray(soundsForPortal) && soundsForPortal.length > 0)) &&
          containerHeight > 0 && (
            <NextReactP5Wrapper
              key={`p5-wrapper-${snapshotVersion}-${phase}`}
              sketch={soundPortal}
              soundsColor={soundsForPortal?.sounds || soundsForPortal}
              containerHeight={containerHeight}
              playerTarget={playerTarget}
              playing={playing}
              reset={reset}
              activateTarget={activateTarget}
              panelOpen={panelOpen}
              forceChange={forceChange}
              version={snapshotVersion}
              ref={p5Ref}
            />
          )}
        <AnimatePresence>
          {panelOpen && panelId && panels[panelId]?.component && (
            <motion.div
              className="absolute inset-x-0 z-40 overflow-hidden"
              style={{
                top: 0,
                height: containerHeight > 0 ? `${containerHeight}px` : 'auto',
                maxHeight: 'calc(100vh - 2.5rem)',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              exit={{
                opacity: 0,
                transition: { duration: 2 },
              }}
            >
              {React.createElement(panels[panelId].component, { phase })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
