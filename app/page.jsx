'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useEffect, useRef } from 'react';
import Map from './components/Map';
import Message from './components/Message';
import { clouds } from './components/p5clouds';
import { occult } from './components/p5occult';
import { wind } from './components/p5wind';
import Portal from './components/Portal';
import { panels } from './components/portal/panelConfig';
import PortalNav from './components/portal/PortalNav';
import PortalRecall from './components/PortalRecall';
import Title from './components/Title';
import Logo from './components/vector/Logo';
import { journeyContext } from './context/journeyContext';
import { userContext } from './context/userContext';
import styles from './styles/ui.module.scss';

export default function Earthsong() {
  const { user, snapshots } = useContext(userContext);
  const { phase, setPhase, journeyToRecall, journeySaved } =
    useContext(journeyContext);
  const { panelId, panelOpen } = useContext(journeyContext);

  // Create a ref to store the audio element
  const audioRef = useRef(null);

  useEffect(() => {
    // Preload mapbox-gl before Map is mounted
    import('mapbox-gl').catch((error) => {
      console.error('Failed to preload mapbox-gl:', error);
    });
  }, []);

  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('/silent.mp3');
  }, []);

  // Function to play sound
  const playSound = () => {
    // Reset the audio to the beginning
    audioRef.current.currentTime = 0;

    // Play the sound
    audioRef.current
      .play()
      .then(() => {
        console.log('Audio playback started successfully');
      })
      .catch((error) => {
        console.error('Audio playback failed:', error);
      });
  };

  // Logo click handler that plays sound and transitions to map
  const handleLogoClick = () => {
    playSound(); // Play the sound
    setPhase('map'); // Transition to map phase
    // Force window resize event after a brief delay to ensure components are mounted
    setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
  };

  return (
    <>
      {/* Render messages */}
      <Message
        text={`Welcome, ${user?.username}`}
        isVisible={!!user}
        animationProps={{ opacity: [0, 1, 0], transition: { duration: 4 } }}
        style={{ top: '80%' }}
      />
      <Message
        text="Your Journey was Saved!"
        isVisible={journeySaved}
        animationProps={{ opacity: [0, 1, 0], transition: { duration: 4 } }}
        style={{ top: '65%' }}
      />
      <Message
        text="Returning to map"
        isVisible={phase === 'returnToMap'}
        animationProps={{ opacity: [0, 1, 0], transition: { duration: 4 } }}
        style={{ top: '50%' }}
      />
      <Message
        text="Shuffling the sonic deck, five cards are drawn"
        isVisible={phase === 'portal'}
        animationProps={{
          opacity: [0, 1, 1, 0],
          color: ['rgb(255, 0, 89)', 'rgb(255, 255, 255)', 'rgb(255, 0, 89)'],
          transition: { duration: 3, times: [0, 0.25, 0.6, 0.9] },
        }}
        style={{ top: '55%' }}
      />
      <Message
        text="Summoning journey"
        isVisible={phase === 'portalRecall'}
        animationProps={{
          opacity: [0, 1, 1, 0],
          color: ['rgb(255, 0, 89)', 'rgb(255, 255, 255)', 'rgb(255, 0, 89)'],
          transition: { duration: 4, times: [0, 0.25, 0.5, 1] },
        }}
        style={{ top: '55%' }}
      />
      <Message
        text="Entering Sound Portal"
        isVisible={phase === 'portal' || phase === 'portalRecall'}
        animationProps={{
          opacity: [0, 0, 1, 0],
          color: ['rgb(255, 0, 89)', 'rgb(255, 255, 255)', 'rgb(255, 0, 89)'],
          transition: { duration: 5, times: [0, 0.6, 0.8, 1] },
        }}
        style={{ top: '55%' }}
      />

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
            <Logo className="w-[45vw] h-[45vw] lg:h-[18vw] lg:w-[18vw]" />
          </motion.div>
        </div>
      ) : null}

      {/* Wind generator is ready, but waits for start. */}
      <NextReactP5Wrapper sketch={wind} phase={phase} />

      {/* Title waits for start */}
      <AnimatePresence>
        {phase === 'map' && (
          <Title className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none text-center leading-none text-[22vw] lg:text-[15vw] uppercase" />
        )}
      </AnimatePresence>

      {/* Map waits for start */}
      <AnimatePresence>
        {phase === 'map' || phase === 'returnToMap' ? (
          <>
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
              initial={{ opacity: 0 }}
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

      {/* Show the occult text */}
      {phase === 'portal' || phase === 'portalRecall' ? (
        <motion.div
          className={styles.occult}
          animate={{
            opacity: [0, 0.4, 0.6, 0],
            transition: { duration: 3, times: [0, 0.1, 0.8, 1] },
          }}
        >
          <NextReactP5Wrapper
            sketch={occult}
            setVisibility={phase === 'portal' || phase === 'portalRecall'}
          />
        </motion.div>
      ) : null}

      {/* Portal waits for enterPortal */}
      <AnimatePresence>
        {phase === 'portal' || phase === 'portalRecall' ? (
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 6, times: [0, 0.5, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 4 },
            }}
          >
            <Portal
              {...(phase === 'portalRecall' && snapshots
                ? {
                    recalledSounds: snapshots?.find(
                      (snapshot) => snapshot?.id === journeyToRecall,
                    )?.sounds,
                    recalledName: snapshots?.find(
                      (snapshot) => snapshot?.id === journeyToRecall,
                    )?.title,
                  }
                : {})}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* PortalRecall */}
      {/* <AnimatePresence>
        {phase === 'portalRecall' && snapshots ? (
          <motion.div
            animate={{
              opacity: [0, 0, 1],
              transition: { duration: 6, times: [0, 0.5, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 2 },
            }}
          >
            <PortalRecall
              recalledSounds={
                snapshots?.find((snapshot) => snapshot?.id === journeyToRecall)
                  .sounds
              }
              recalledName={
                snapshots?.find((snapshot) => snapshot?.id === journeyToRecall)
                  .title
              }
            />
          </motion.div>
        ) : null}
      </AnimatePresence> */}

      <AnimatePresence>
        {panelOpen &&
          panelId &&
          panels[panelId]?.component &&
          phase !== 'portal' &&
          phase !== 'portalRecall' && (
            <motion.div
              className="fixed inset-0 z-40"
              animate={{
                opacity: [0, 1],
                transition: { duration: 0.25 },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.25 },
              }}
            >
              {React.createElement(panels[panelId].component)}
            </motion.div>
          )}
      </AnimatePresence>

      {/* PortalNav */}
      <AnimatePresence>
        {phase !== 'initial' && (
          <motion.div
            key={phase}
            id="portal-nav"
            className="fixed bottom-0 left-0 w-full z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 4 },
            }}
          >
            <PortalNav isLoggedIn={user} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
