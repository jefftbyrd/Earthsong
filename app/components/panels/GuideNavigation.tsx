import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import EarthsongIcons from '../EarthsongIcons';

export default function GuideNavigation() {
  const { phase } = useContext(journeyContext);
  const { user } = useContext(userContext);

  return (
    <div className="flex flex-col justify-center items-center gap-10 p-3 md:p-6 pt-6 border-2 border-black/30 bg-white/20 pb-5">
      <h3 className="left-0 right-0 text-4xl md:text-5xl uppercase  text-center">
        Navigation
      </h3>

      {phase !== 'map' && phase !== 'returnToMap' ? (
        <div className="">
          <h3 className="lg:text-3xl font-bold bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-2 w-fit m-auto">
            <EarthsongIcons
              iconNumber={5}
              className="h-6 lg:h-8 static inline"
            />
            MAP
          </h3>
          <p>Return to the map page to explore a new location</p>
        </div>
      ) : null}

      {!!user ? (
        <div className="">
          <h3 className="lg:text-3xl font-bold bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-2 w-fit m-auto">
            <EarthsongIcons
              iconNumber={4}
              className="h-6 lg:h-8 static inline"
            />
            POWERS
          </h3>
          <p>Save and recall your favorite journeys</p>
        </div>
      ) : (
        <div className="">
          <h3 className="lg:text-3xl font-bold bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 mb-2 w-fit m-auto">
            <EarthsongIcons
              iconNumber={4}
              className="h-6 lg:h-8 static inline"
            />
            UNLOCK
          </h3>
          <p>
            Create an EARTH SONG account or sign in. Registered users can save
            and recall their favorite journeys.
          </p>
        </div>
      )}
    </div>
  );
}
