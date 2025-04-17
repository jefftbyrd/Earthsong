'use client';
import { motion } from 'motion/react';
import { useContext, useEffect } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function MapMessages(props) {
  const { setPhase, phase, pin, setPin, searchMessage } =
    useContext(journeyContext);
  const {
    sounds,
    freesoundLoading,
    notEnough,
    setFreesoundLoading,
    isFetchingSounds,
  } = useContext(soundsContext);

  // useEffect(() => {
  //   if (pin && pin.lat && pin.lng) {
  //     console.log('MapMessages: Pin changed!');
  //   }
  // }, [pin]);

  const mapConditions = {
    initial: !pin.lat && (phase === 'map' || phase === 'returnToMap'),
    location: pin.lat && (phase === 'map' || phase === 'returnToMap'),
    fetching:
      pin.lat &&
      (phase === 'map' || phase === 'returnToMap') &&
      isFetchingSounds === true,
    // freesoundLoading === true,
    searching:
      pin.lat &&
      (phase === 'map' || phase === 'returnToMap') &&
      freesoundLoading === true,
    found: !freesoundLoading && sounds,
    hasResults:
      (phase === 'map' || phase === 'returnToMap') &&
      notEnough === false &&
      sounds?.results?.length > 0 &&
      freesoundLoading === false,
    noResults:
      (phase === 'map' || phase === 'returnToMap') &&
      notEnough === true &&
      // freesoundLoading === false,
      isFetchingSounds === false,
  };

  const glowAnimation = {
    color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    transition: { repeat: Infinity, duration: 3 },
  };

  const fadeInAnimation = {
    opacity: [0, 1],
    transition: { duration: 1 },
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  const combinedAnimation = {
    color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    opacity: [0, 1],
    transition: {
      color: { repeat: Infinity, duration: 3 }, // Infinite color oscillation
      opacity: { duration: 2 }, // Fade-in effect
    },
  };

  console.log('MapMessages: pin.lat:', pin.lat);
  console.log('MapMessages: phase:', phase);
  console.log('MapMessages: isFetchingSounds:', isFetchingSounds);

  return (
    <div className="absolute bottom-10 z-10 m-auto left-0 right-0 text-center text-lg lg:text-4xl/13 p-2 backdrop-blur-[5px]  text-shadow-lg/20">
      {/* <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md max-w-md">
        {searchMessage && (
          <p className="text-sm font-medium">{searchMessage}</p>
        )}
        {!searchMessage && pin?.locationName && (
          <p className="text-sm font-medium">
            Current location: {pin.locationName}
          </p>
        )}
        {!searchMessage && !pin?.locationName && (
          <p className="text-sm font-medium">
            Click on the map to select a location
          </p>
        )}
      </div> */}
      {/* LINE 1 */}
      <div>
        <motion.p animate={fadeInAnimation}>
          {mapConditions.initial ? 'Choose a place to explore' : null}
        </motion.p>
        <motion.p animate={fadeInAnimation}>
          {mapConditions.location ? (
            <>
              You chose{' '}
              <span className="font-bold">
                {pin.lat.toFixed(3)}, {pin.lng.toFixed(3)}
              </span>
              {props.location ? ` (${props.location})` : ''}.
            </>
          ) : null}
        </motion.p>
      </div>

      {/* LINE 2 */}
      <div>
        <motion.p
          animate={combinedAnimation}
          className="font-bold text-shadow-lg/20"
        >
          {searchMessage}
          <br />
          <br />
        </motion.p>
      </div>

      {/* LINE 3 */}
      {mapConditions.hasResults && (
        <>
          <motion.p animate={fadeInAnimation}>
            Found {sounds.soundCount} sounds within {sounds.searchRadius}km
          </motion.p>
          <motion.button
            animate={combinedAnimation}
            className="font-bold text-shadow-lg/20"
            onClick={() => {
              setPin({});
              setFreesoundLoading(true);
              setPhase('portal');
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

      {/* <div className="backdrop-blur-sm mask-alpha mask-x-from-black mask-x-from-80% mask-x-to-transparent h-full w-full block absolute" /> */}
    </div>
  );
}
