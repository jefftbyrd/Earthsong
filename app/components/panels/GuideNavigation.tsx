import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import EarthsongIcons from '../EarthsongIcons';

export default function GuideNavigation() {
  const { phase } = useContext(journeyContext);
  const { user } = useContext(userContext);

  return (
    <div className="flex flex-col gap-2 text-left mt-6 ">
      <h3 className="text-3xl text-left uppercase">Navigation</h3>

      {phase !== 'map' && phase !== 'returnToMap' ? (
        <div className="guideItem">
          <h3 className="navGuideMenuItem">
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
        <div className="guideItem">
          <h3 className="navGuideMenuItem">
            <EarthsongIcons
              iconNumber={4}
              className="h-6 lg:h-8 static inline"
            />
            POWERS
          </h3>
          <p>Save and recall your favorite journeys</p>
        </div>
      ) : (
        <div className="guideItem">
          <h3 className="navGuideMenuItem">
            <EarthsongIcons
              iconNumber={4}
              className="h-6 lg:h-8 static inline"
            />
            UNLOCK
          </h3>
          <p>
            Create an <span className="earthSongName">EARTH SONG</span> account
            or sign in. Registered users can save and recall their favorite
            journeys.
          </p>
        </div>
      )}
    </div>
  );
}
