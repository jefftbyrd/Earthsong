'use client';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';
import styles from '../styles/ui.module.scss';

export default function MapMessages() {
  const { setPhase, phase, pin, setPin } = useContext(journeyContext);
  const { sounds, freesoundLoading, notEnough, setFreesoundLoading } =
    useContext(soundsContext);

  const instructionVariants = {
    container: {
      initial: { opacity: 0 },
      animate: {
        opacity: 1,
        transition: { duration: 10, times: [0, 0.6, 0.9, 1] },
      },
    },
  };

  const mapConditions = {
    initial: !pin.lat && phase === 'map',
    location: pin.lat && phase === 'map',
    loading: pin.lat && phase === 'map' && freesoundLoading === true,
    hasResults:
      phase === 'map' &&
      notEnough === false &&
      sounds?.results?.length > 0 &&
      freesoundLoading === false,
    noResults:
      phase === 'map' && notEnough === true && freesoundLoading === false,
  };

  // Separate animation for text color
  const glowAnimation = {
    color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    transition: { repeat: Infinity, duration: 3 },
  };

  return (
    <>
      <div className="absolute top-2 z-10 m-auto left-0 right-0 text-center text-xl">
        <div>
          <motion.p animate={glowAnimation}>
            {mapConditions.initial ? 'Choose a place to explore' : null}
          </motion.p>
          {mapConditions.location
            ? `You chose ${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)}.`
            : null}
        </div>

        <p>{mapConditions.loading ? 'Searching the area.' : null}</p>

        {mapConditions.hasResults && (
          <>
            <p>{sounds?.count} sounds found nearby.</p>
            <motion.button
              animate={glowAnimation}
              onClick={() => {
                setPhase('portal');
                setPin({});
                setFreesoundLoading(true);
              }}
            >
              Take me there
            </motion.button>
          </>
        )}

        {mapConditions.noResults && (
          <>
            <p>No sounds found within 200km.</p>
            <p>Please choose another location.</p>
          </>
        )}
      </div>

      <div>
        {phase === 'map' && !pin.lat ? (
          <motion.div
            className={styles.instruction}
            initial="initial"
            animate="animate"
            variants={instructionVariants.container}
          >
            <motion.h2
              // Remove the variants prop and directly apply the animation
              animate={glowAnimation}
            >
              Choose a place to explore.
            </motion.h2>
          </motion.div>
        ) : null}

        {/* SEARCHING */}
        {pin.lat && phase === 'map' ? (
          <div className={styles.projection}>
            <motion.h2
              animate={{
                opacity: [0, 1],
                transition: { duration: 2, times: [0, 1] },
              }}
            >
              {/* Announce the chosen coordinates */}
              You chose {pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}.
              <br />
              <br />
              <br />
            </motion.h2>
          </div>
        ) : null}

        {pin.lat && phase === 'map' && freesoundLoading === true ? (
          <div className={styles.projection}>
            <motion.div
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 2, times: [0, 0.5, 1] },
              }}
            >
              <motion.button
                className={styles.projectionStart}
                animate={glowAnimation}
              >
                {/* Searching the area. */}
                Searching the area.
                <br />
                <br />
              </motion.button>
            </motion.div>
          </div>
        ) : null}

        {/* IF THERE ARE ENOUGH SOUNDS */}
        {pin.lat &&
        phase === 'map' &&
        notEnough === false &&
        sounds?.results?.length > 0 &&
        freesoundLoading === false ? (
          <div className={styles.projection}>
            <motion.h2
              animate={{
                opacity: [0, 1],
                transition: { duration: 3, times: [0, 1] },
              }}
            >
              {/* Number of sounds found nearby. */}
              {sounds?.count} sounds found nearby.
            </motion.h2>

            <motion.div
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 2, times: [0, 0.5, 1] },
              }}
            >
              <motion.button
                className={styles.projectionStart}
                animate={glowAnimation}
                onClick={() => {
                  setPhase('portal');
                  setPin({});
                }}
              >
                {/* Click to initiate sonic projection */}
                Take me there.
              </motion.button>
            </motion.div>
          </div>
        ) : null}

        {/* NOT ENOUGH SOUNDS */}
        {pin.lat && phase === 'map' && notEnough === true ? (
          <div className={styles.projection}>
            <motion.div
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 3, times: [0, 0.5, 1] },
              }}
            >
              <motion.button
                className={styles.projectionStart}
                animate={glowAnimation}
              >
                {/* No sounds found */}
                No sounds found within 200km. Please choose another location.
              </motion.button>
            </motion.div>
          </div>
        ) : null}
      </div>
    </>
  );
}
