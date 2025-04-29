import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuideNavigatePanel() {
  return (
    <PanelWrap panel="Navigate" bg="#5381C4">
      <h2 className="text-xl mb-5">
        Navigate EARTH SONG using the menu at the bottom of your screen
      </h2>
      <div className="border-b-1 pb-5 border-black/30">
        <h3 className="text-3xl font-bold">MAP</h3>
        Return to the map page to explore a new location.
      </div>
      <div className="border-b-1 pb-5 border-black/30">
        <h3 className="text-3xl font-bold">UNLOCK</h3>
        Create an EARTHSONG account or sign in.
      </div>
      <div className="border-b-1 pb-5 border-black/30">
        <h3 className="text-3xl font-bold">POWERS</h3>
        Once signed in, you can save and recall your favorite journeys.
      </div>
      <div>
        <h3 className="text-3xl font-bold">GUIDE</h3>
        Access this guide.
      </div>
    </PanelWrap>
  );
}
