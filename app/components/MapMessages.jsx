'use client';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function MapMessages(props) {
  const { setPhase, phase, pin, setPin } = useContext(journeyContext);
  const {
    sounds,
    freesoundLoading,
    notEnough,
    setFreesoundLoading,
    isFetchingSounds,
  } = useContext(soundsContext);

  const mapConditions = {
    initial: !pin.lat && (phase === 'map' || phase === 'returnToMap'),
    location: pin.lat && (phase === 'map' || phase === 'returnToMap'),
    fetching:
      pin.lat &&
      (phase === 'map' || phase === 'returnToMap') &&
      isFetchingSounds === true,
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
      freesoundLoading === false,
  };

  const glowAnimation = {
    color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    transition: { repeat: Infinity, duration: 3 },
  };

  console.log('MapMessages: pin.lat:', pin.lat);
  console.log('MapMessages: phase:', phase);
  console.log('MapMessages: isFetchingSounds:', isFetchingSounds);

  return (
    <div className="absolute bottom-10 z-10 m-auto left-0 right-0 text-center text-xl sm:text-3xl p-2 backdrop-blur-[5px] ">
      <div className="">
        <motion.p animate={glowAnimation}>
          {mapConditions.initial ? 'Choose a place to explore' : null}
        </motion.p>
        {mapConditions.location
          ? `You chose ${pin.lat.toFixed(3)}, ${pin.lng.toFixed(3)} ${props.location === null ? null : props.location}.`
          : null}
      </div>

      <div>
        {mapConditions.fetching ? (
          <p>
            Searching the area.
            <br />
            <br />
          </p>
        ) : null}
      </div>

      {mapConditions.hasResults && (
        <>
          <p>
            Found {sounds.soundCount} sounds within {sounds.searchRadius}km
          </p>
          <motion.button
            animate={glowAnimation}
            className="font-bold"
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
