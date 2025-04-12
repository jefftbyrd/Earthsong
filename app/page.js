'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useEffect, useRef } from 'react';
import Logo from '../public/Logo.js';
import Map from './components/Map';
import { clouds } from './components/p5clouds';
import { occult } from './components/p5occult';
import { wind } from './components/p5wind';
import Portal from './components/Portal';
import { panels } from './components/portal/panelConfig';
import PortalNav from './components/portal/PortalNav';
import PortalRecall from './components/PortalRecall';
import Title from './components/Title';
import { journeyContext } from './context/journeyContext';
import { userContext } from './context/userContext';
import styles from './styles/ui.module.scss';

export default function Earthsong() {
  const { user, snapshots } = useContext(userContext);
  const { phase, setPhase, journeyToRecall } = useContext(journeyContext);
  const { panelId, panelOpen } = useContext(journeyContext);

  // Create audio element lazily
  const getAudio = () => {
    // Create an audio element only when needed
    return new Audio('/silent.mp3');
  };

  const handleLogoClick = () => {
    // Play the sound
    const audio = getAudio();
    audio
      .play()
      .catch((error) => console.error('Audio playback failed:', error));

    // Transition to map phase
    setPhase('map');
  };

  return (
    <>
      {/* If sound portal is open, display the return to map icon/link */}
      {user ? (
        <motion.h1
          className="welcomeMessage"
          animate={{
            opacity: [0, 1, 0],
            transition: { duration: 3, times: [0, 0.5, 1] },
          }}
        >
          Welcome, {user?.username}.
        </motion.h1>
      ) : null}

      {/* Wait until user clicks ✹ to start Earthsong */}
      {phase === 'initial' ? (
        <div className="grid justify-center items-center h-full">
          <motion.div
            className={styles.star}
            onClick={handleLogoClick}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.08, 1],
              color: ['rgb(255, 0, 89)', 'rgb(181, 0, 78)', 'rgb(255, 0, 89)'],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
            }}
          >
            <Logo className="w-[40vw] h-[40vw] lg:h-[15vw] lg:w-[15vw]" />
          </motion.div>
        </div>
      ) : null}

      {/* Wind generator is ready, but waits for start. */}
      <NextReactP5Wrapper sketch={wind} phase={phase} />

      {/* Map waits for start */}
      <AnimatePresence>
        {phase === 'map' ? (
          <>
            {/* Title h1 waits for start */}
            <Title className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center leading-none text-[22vw] lg:text-[15vw]" />
            <motion.div
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 4, times: [0, 0.6, 1] },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 2 },
              }}
            >
              <Map />
            </motion.div>
            <motion.div
              className={styles.noClick}
              animate={{
                opacity: [0, 0, 0.7, 0.4],
                transition: { duration: 6, times: [0, 0.2, 0.9, 1] },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 2 },
              }}
            >
              <NextReactP5Wrapper sketch={clouds} phase={phase} />
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Rest of component unchanged */}
      {phase === 'portal' || phase === 'portalRecall' ? (
        <>
          <motion.div
            className={styles.occult}
            animate={{
              opacity: [0, 0.4, 0.6, 0],
              transition: { duration: 3, times: [0, 0.1, 0.8, 1] },
            }}
          >
            <NextReactP5Wrapper sketch={occult} />
          </motion.div>

          <motion.div
            className={styles.initiating}
            animate={{
              opacity: [0, 1, 1, 0],
              color: [
                'rgb(255, 0, 89)',
                'rgb(255, 255, 255)',
                'rgb(255, 0, 89)',
              ],
              transition: { duration: 4, times: [0, 0.4, 0.8, 1] },
            }}
          >
            Initiating Sonic Projection
          </motion.div>
        </>
      ) : null}

      {phase === 'portal' ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <Portal />
        </motion.div>
      ) : null}

      {phase === 'portalRecall' && snapshots ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <PortalRecall
            recalledSounds={
              snapshots?.find((snapshot) => snapshot?.id === journeyToRecall)
                .sounds
            }
          />
        </motion.div>
      ) : null}

      {panelOpen && panelId && panels[panelId]?.component && (
        <div className="fixed inset-0 z-40">
          {React.createElement(panels[panelId].component)}
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full z-50">
        <PortalNav isLoggedIn={user} />
      </div>
    </>
  );
}
