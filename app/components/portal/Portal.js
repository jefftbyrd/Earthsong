'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';
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

  // Transform old format snapshots to new format if needed
  const normalizeSnapshotFormat = (data) => {
    if (!data) return null;

    // Helper function to format coordinates consistently
    const formatCoordinates = (lat, lng) => {
      return {
        lat: Number(lat),
        lng: Number(lng),
      };
    };

    // If data is already an array, it's in the new format
    if (Array.isArray(data)) {
      return data;
    }

    // Check if this is the old format (object with sounds array)
    if (data.sounds && Array.isArray(data.sounds)) {
      // Extract coordinates - first try direct pin on soundsColor
      let pin = null;

      // Case 1: Direct pin on data
      if (data.pin?.lat !== undefined && data.pin?.lng !== undefined) {
        pin = formatCoordinates(data.pin.lat, data.pin.lng);
      }
      // Case 2: Pin on first sound
      else if (
        data.sounds[0]?.pin?.lat !== undefined &&
        data.sounds[0]?.pin?.lng !== undefined
      ) {
        pin = formatCoordinates(data.sounds[0].pin.lat, data.sounds[0].pin.lng);
      }
      // Case 3: Geotag on first sound
      else if (data.sounds[0]?.geotag) {
        const geotagSplit = data.sounds[0].geotag.split(' ');
        if (geotagSplit && geotagSplit.length >= 2) {
          pin = formatCoordinates(geotagSplit[0], geotagSplit[1]);
        }
      }

      // Create object in new format
      return {
        pin: pin,
        location: data.location || data.sounds[0]?.location || data.title || '',
        sounds: data.sounds || [],
      };
    }

    // If it's neither an array nor has a sounds property, return as is
    return data;
  };

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
