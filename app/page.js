'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useEffect, useState } from 'react';
import Logo from '../public/Logo.js';
import BackToMap from './components/BackToMap';
import Map from './components/Map';
import { clouds } from './components/p5clouds';
import { occult } from './components/p5occult';
import { wind } from './components/p5wind';
import Portal from './components/Portal';
import PortalRecall from './components/PortalRecall';
import Profile from './components/Profile';
import Title from './components/Title';
import { journeyContext } from './context/journeyContext';
import { userContext } from './context/userContext';
import styles from './styles/ui.module.scss';

export default function Earthsong() {
  const { user, snapshots } = useContext(userContext);
  const { phase, setPhase, pastJourney } = useContext(journeyContext);

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

      <AnimatePresence>
        {phase === 'portal' || phase === 'portalRecall' ? (
          <>
            <BackToMap />
            {/* <HelpButton /> */}
          </>
        ) : null}
      </AnimatePresence>

      <Profile />

      {/* Wait until user clicks ✹ to start Earthsong */}
      {phase === 'initial' ? (
        <div className={styles.start}>
          <motion.div
            className={styles.star}
            onClick={() => {
              setPhase('map');
            }}
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
            <Logo height="15vw" width="15vw" />
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
            <Title />
            <motion.div
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 4, times: [0, 0.6, 1] },
              }}
              exit={{
                // scale: 10,
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

      {/* Show the occult text */}
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

          {/* Show initiating */}
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

      {/* Portal waits for enterPortal */}
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

      {/* PortalRecall */}
      {phase === 'portalRecall' && snapshots ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <PortalRecall
            sounds={
              snapshots?.find((snapshot) => snapshot?.id === pastJourney).sounds
            }
          />
        </motion.div>
      ) : null}
    </>
  );
}
