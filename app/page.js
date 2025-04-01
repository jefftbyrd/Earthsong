'use client';
import { NextReactP5Wrapper } from '@p5-wrapper/next';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import Logo from '../public/Logo.js';
import BackToMap from './components/BackToMap';
import { clouds } from './components/clouds';
import HelpButton from './components/HelpButton.js';
import Login from './components/Login';
import Map from './components/Map';
import { occult } from './components/occult';
import Portal from './components/Portal';
import PortalRecall from './components/PortalRecall';
import Profile from './components/Profile';
import Title from './components/Title';
import styles from './components/ui.module.scss';
import { wind } from './components/wind';
// import { earthsongContextOld } from './context';
import { journeyContext } from './context/journeyContext';
// import { soundsContext, SoundsContextProvider } from './context/soundsContext';
import { userContext } from './context/userContext';

export default function Earthsong() {
  // const [isStarted, setIsStarted] = useState(false);
  // const { isStarted, setIsStarted } = useContext(journeyContext);
  // const [enterPortal, setEnterPortal] = useState(false);
  // const { enterPortal, setEnterPortal } = useContext(earthsongContext);
  // const [dataFromChild, setDataFromChild] = useState('');
  // const [resetPortal, setResetPortal] = useState(false);
  // const [portalRecall, setPortalRecall] = useState(false);
  // const [recallId, setRecallId] = useState();
  const [startWind, setStartWind] = useState(false);
  // const earthsong = useContext(earthsongContextOld);
  // const earthsong = useContext(earthsongContext);
  const { user } = useContext(userContext);
  const { snapshots } = useContext(userContext);
  const { phase, setPhase } = useContext(journeyContext);
  const { pastJourney } = useContext(journeyContext);
  // const { sounds } = useContext(soundsContext);

  // const user = earthsong.user;
  // const snapshots = earthsong.snapshots;

  // function handleDataFromChild(data) {
  //   setDataFromChild(data);
  // }

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

      {/* <AnimatePresence>
        {phase === 'portal' || phase === 'portalRecall' ? (
          <>
            <BackToMap
              // setEnterPortal={setEnterPortal}
              // setResetPortal={setResetPortal}
              // resetPortal={resetPortal}
              setStartWind={setStartWind}
              // setPortalRecall={setPortalRecall}
            />
            <HelpButton />
          </>
        ) : null}
      </AnimatePresence> */}

      {user ? (
        <Profile
          // setPortalRecall={setPortalRecall}
          // setRecallId={setRecallId}
          // setEnterPortal={setEnterPortal}
          // setResetPortal={setResetPortal}
          // resetPortal={resetPortal}
          setStartWind={setStartWind}
          // setIsStarted={setIsStarted}
          // portalRecall={portalRecall}
        />
      ) : (
        <Login />
      )}

      {/* Wait until user clicks ✹ to start Earthsong */}
      {phase === 'initial' ? (
        <div className={styles.start}>
          <motion.div
            className={styles.star}
            onClick={() => {
              setPhase('map');
              setStartWind(true);
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
      <NextReactP5Wrapper sketch={wind} startWind={startWind} />

      {/* Title h1 waits for start */}
      {phase === 'map' ? <Title /> : null}

      {/* Map waits for start */}
      <AnimatePresence>
        {phase === 'map' ? (
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
              // sendDataToParent={handleDataFromChild}
              // setEnterPortal={setEnterPortal}
              setStartWind={setStartWind}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Clouds overlay waits to start, ends when portal is entered. */}
      <AnimatePresence>
        {phase === 'map' ? (
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
      {phase === 'portal' || phase === 'portalRecall' ? (
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
      {phase === 'portal' ? (
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
      {/* <SoundsContextProvider> */}
      {phase === 'portal' ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <Portal
          // sounds={dataFromChild}
          // sounds={sounds}
          // resetPortal={resetPortal}
          // user={user}
          />
        </motion.div>
      ) : null}

      {/* PortalRecall */}
      {phase === 'portalRecall' && snapshots ? (
        <motion.div
          animate={{
            opacity: [0, 0, 1],
            // scale: [0.8, 0.8, 1, 1, 0.8],
            transition: { duration: 6, times: [0, 0.5, 1] },
          }}
        >
          <PortalRecall
            sounds={
              snapshots?.find((snapshot) => snapshot?.id === pastJourney).sounds
            }
            // resetPortal={resetPortal}
            user={user}
          />
        </motion.div>
      ) : null}
      {/* </SoundsContextProvider> */}
    </>
  );
}
