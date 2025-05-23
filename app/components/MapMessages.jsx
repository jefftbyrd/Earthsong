'use client';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function MapMessages(props) {
  const {
    setPhase,
    phase,
    pin,
    setPin,
    searchMessage,
    freesoundError,
    setPanelOpen,
  } = useContext(journeyContext);
  const {
    sounds,
    freesoundLoading,
    notEnough,
    setFreesoundLoading,
    isFetchingSounds,
  } = useContext(soundsContext);

  const mapConditions = {
    initial: !pin.lat && (phase === 'map' || phase === 'returnToMap'),
    location: pin?.lat && (phase === 'map' || phase === 'returnToMap'),
    fetching:
      (phase === 'map' || phase === 'returnToMap') &&
      pin.lat &&
      isFetchingSounds === true,
    searching:
      pin?.lat &&
      (phase === 'map' || phase === 'returnToMap') &&
      freesoundLoading === true,
    found: !freesoundLoading && sounds,
    hasError:
      (phase === 'map' || phase === 'returnToMap') &&
      isFetchingSounds === false &&
      freesoundError === true,
    hasResults:
      (phase === 'map' || phase === 'returnToMap') &&
      notEnough === false &&
      sounds?.results?.length > 0 &&
      freesoundLoading === false,
    noResults:
      (phase === 'map' || phase === 'returnToMap') &&
      notEnough === true &&
      isFetchingSounds === false,
  };

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  };

  const fadeAndPulsate = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    },
    transition: {
      opacity: { duration: 2 },
      color: { repeat: Infinity, duration: 3 },
    },
  };

  return (
    <div className="absolute bottom-12 z-10 m-auto left-0 right-0 text-center text-lg sm:text-3xl/10 lg:text-4xl/13 p-2 backdrop-blur-[5px] text-shadow-lg/20 sm:w-3/4 font-basteleur">
      {/* LINE 1 */}
      <div>
        {mapConditions.initial && (
          <motion.div {...fadeAndPulsate} className="font-basteleur">
            Choose a place to explore
          </motion.div>
        )}

        <motion.div {...fadeAnimation}>
          {mapConditions.location &&
          !mapConditions.hasResults &&
          !mapConditions.noResults ? (
            <>
              You chose{' '}
              <span className="font-bold">
                {pin.lat.toFixed(3)}, {pin.lng.toFixed(3)}
              </span>
              {props.location ? ` (${props.location})` : ''}.
            </>
          ) : null}
        </motion.div>
      </div>

      {/* LINE 2 */}
      <div>
        {Boolean(mapConditions.fetching) && (
          <motion.div
            {...fadeAndPulsate}
            className="font-bold text-shadow-lg/20"
          >
            {searchMessage || 'Searching...'}
            <br />
          </motion.div>
        )}
        {mapConditions.hasError && (
          <motion.div
            {...fadeAnimation}
            className="font-bold text-shadow-lg/20"
          >
            {searchMessage || 'Searching...'}
            <br />
          </motion.div>
        )}
      </div>

      {/* LINE 3 */}
      {mapConditions.hasResults && (
        <>
          <motion.div {...fadeAnimation}>
            {/* Found {sounds.soundCount} sounds within {sounds.searchRadius}km. */}
            {searchMessage}.
          </motion.div>
          <motion.button
            {...fadeAndPulsate}
            className="font-bold text-shadow-lg/20 hover:scale-105 transition-all duration-300 active:scale-97"
            onClick={() => {
              setPanelOpen(false); // Close the panel if it's open
              setPin({});
              setFreesoundLoading(true);
              setPhase('portal');
              setPanelOpen(false); // Close the panel if it's open
            }}
          >
            Take me there
          </motion.button>
        </>
      )}

      {mapConditions.noResults && (
        <>
          <div>
            No sounds found within 500km of{' '}
            {props.location ? ` ${props.location}` : ''}.
          </div>
          <motion.div {...fadeAndPulsate} className=" text-shadow-lg/20">
            Please choose another location.
          </motion.div>
        </>
      )}
    </div>
  );
}
