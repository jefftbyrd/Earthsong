'use client';
import { motion } from 'motion/react';
import { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import { soundsContext } from '../context/soundsContext';

export default function MapMessages() {
  const { setPhase, phase, pin, setPin } = useContext(journeyContext);
  const { sounds, freesoundLoading, notEnough, setFreesoundLoading } =
    useContext(soundsContext);

  const mapConditions = {
    initial: !pin.lat && phase === 'map',
    location: pin.lat && phase === 'map',
    loading: pin.lat && phase === 'map' && freesoundLoading === true,
    found: !freesoundLoading && sounds,
    hasResults:
      phase === 'map' &&
      notEnough === false &&
      sounds?.results?.length > 0 &&
      freesoundLoading === false,
    noResults:
      phase === 'map' && notEnough === true && freesoundLoading === false,
  };

  const glowAnimation = {
    color: ['rgb(255, 0, 89)', 'rgb(255, 145, 0)', 'rgb(255, 0, 89)'],
    transition: { repeat: Infinity, duration: 3 },
  };

  // console.log('sounds', sounds);

  return (
    <div className="absolute bottom-10 z-10 m-auto left-0 right-0 text-center text-xl sm:text-3xl p-2 backdrop-blur-[5px] ">
      <div className="">
        <motion.p animate={glowAnimation}>
          {mapConditions.initial ? 'Choose a place to explore' : null}
        </motion.p>
        {mapConditions.location
          ? `You chose ${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)}.`
          : null}
      </div>

      <div>
        {mapConditions.loading ? (
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

      {/* <div className="backdrop-blur-sm mask-alpha mask-x-from-black mask-x-from-80% mask-x-to-transparent h-full w-full block absolute" /> */}
    </div>
  );
}
