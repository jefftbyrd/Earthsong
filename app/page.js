'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import Logo2 from '../public/Logo2.js';
import BackToMap from './components/BackToMap';
import { clouds } from './components/clouds';
import Login from './components/Login';
import Map from './components/Map';
import { occult } from './components/occult';
import Portal from './components/Portal';
import PortalRecall from './components/PortalRecall';
import Profile from './components/Profile';
import Title from './components/Title';
import styles from './components/ui.module.scss';
import { wind } from './components/wind';
import { earthsongContext } from './context';

export default function Earthsong() {
  const [isStarted, setIsStarted] = useState(false);
  const [enterPortal, setEnterPortal] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');
  const [resetPortal, setResetPortal] = useState(false);
  const [portalRecall, setPortalRecall] = useState(false);
  const [recallId, setRecallId] = useState();
  const [startWind, setStartWind] = useState(false);
  const earthsong = useContext(earthsongContext);

  const user = earthsong[0];
  const snapshots = earthsong[1];

  function handleDataFromChild(data) {
    setDataFromChild(data);
  }

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
          Welcome, {user.username}.
        </motion.h1>
      ) : null}

      <AnimatePresence>
        {enterPortal || portalRecall ? (
          <BackToMap
            setEnterPortal={setEnterPortal}
            setResetPortal={setResetPortal}
            resetPortal={resetPortal}
            setStartWind={setStartWind}
            setPortalRecall={setPortalRecall}
          />
        ) : null}
      </AnimatePresence>

      {user ? (
        <Profile
          user={user}
          snapshots={snapshots}
          setPortalRecall={setPortalRecall}
          setRecallId={setRecallId}
          setEnterPortal={setEnterPortal}
          setResetPortal={setResetPortal}
          resetPortal={resetPortal}
          setStartWind={setStartWind}
          setIsStarted={setIsStarted}
          portalRecall={portalRecall}
        />
      ) : (
        <Login />
      )}

      {/* Wait until user clicks ✹ to start Earthsong */}
      {!isStarted && !portalRecall ? (
        <div className={styles.start}>
          <motion.div
            className={styles.star}
            onClick={() => {
              setIsStarted(true);
              setStartWind(true);
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
              scale: [1, 1.08, 1],
              color: ['rgb(255, 0, 89)', 'rgb(181, 0, 78)', 'rgb(255, 0, 89)'],
              // rotate: [-3, 3, -3],
              // width: ['13vw', '16vw', '13vw'],
            }}
            transition={{
              // restSpeed: 0.9,
              repeat: Infinity,
              duration: 3,
              // type: 'spring',
            }}
            // whileHover={{ scale: 1.5 }}
          >
            <Logo2 height="15vw" width="15vw" />
          </motion.div>
        </div>
      ) : null}

      {/* Wind generator is ready, but waits for start. */}
      <NextReactP5Wrapper sketch={wind} startWind={startWind} />

      {/* Title h1 waits for start */}
      {isStarted ? <Title /> : null}

      {/* Map waits for start */}
      <AnimatePresence>
        {isStarted && !enterPortal ? (
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
            <Map
              // openPortal={() => setEnterPortal(true)}
              sendDataToParent={handleDataFromChild}
              setEnterPortal={setEnterPortal}
              setStartWind={setStartWind}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Clouds overlay waits to start, ends when portal is entered. */}
      <AnimatePresence>
        {isStarted && !enterPortal ? (
          <motion.div
            className={styles.noClick}
            animate={{
              opacity: [0, 0, 0.7, 0.4],
              // scale: [0.8, 0.8, 1, 1, 0.8],
              transition: { duration: 6, times: [0, 0.2, 0.9, 1] },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 2 },
            }}
          >
            <NextReactP5Wrapper sketch={clouds} />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Show the occult text */}
      {enterPortal ? (
        <motion.div
          className={styles.occult}
          animate={{
            opacity: [0, 0.4, 0.6, 0],
            transition: { duration: 3, times: [0, 0.1, 0.8, 1] },
          }}
        >
          <NextReactP5Wrapper sketch={occult} />
        </motion.div>
      ) : null}

      {/* Show initiating */}
      {enterPortal ? (
        <motion.div
          className={styles.initiating}
          animate={{
            opacity: [0, 1, 1, 0],
            color: ['rgb(255, 0, 89)', 'rgb(255, 255, 255)', 'rgb(255, 0, 89)'],
            // scale: [0, 1],
            transition: { duration: 4, times: [0, 0.4, 0.8, 1] },
          }}
        >
          Initiating Sonic Projection
        </motion.div>
      ) : null}

      {/* Portal waits for enterPortal */}
      {!portalRecall && enterPortal ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <Portal
            sounds={dataFromChild}
            resetPortal={resetPortal}
            user={user}
          />
        </motion.div>
      ) : null}

      {/* PortalRecall */}
      {portalRecall && enterPortal && snapshots ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <PortalRecall
            sounds={
              snapshots.find((snapshot) => snapshot.id === recallId).sounds
            }
            resetPortal={resetPortal}
            user={user}
          />
        </motion.div>
      ) : null}
    </>
  );
}
