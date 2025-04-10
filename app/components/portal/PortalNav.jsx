'use client';
import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { soundsContext } from '../../context/soundsContext';
import EarthsongIcons from '../EarthsongIcons';
import OpenPanelButton from '../panels/OpenPanelButton';
import PowersPanel from '../panels/PowersPanel';

export default function PortalNav() {
  const { setPhase, panelOpen, setReset, togglePanel, setPin } =
    useContext(journeyContext);
  const { setFreesoundLoading } = useContext(soundsContext);
  // const { setReset } = useContext(journeyContext);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  return (
    <footer className="h-10 border-t-1 bg-black fixed bottom-0 w-full grid grid-cols-3 uppercase">
      <button
        className="uppercase text-center flex items-center justify-center gap-2 text-lg"
        onClick={() => {
          if (panelOpen) {
            togglePanel(); // This will close the panel and clear panelId
          }
          setReset(true);
          setTimeout(() => {
            setReset(false);
            setResetDone(true);
          }, 0);
          setPin({});
          setFreesoundLoading(true);
          setPhase('map');
        }}
      >
        <EarthsongIcons className="h-5 w-5" iconNumber={5} />
        <span>Map</span>
      </button>

      <OpenPanelButton panel="Powers">
        <EarthsongIcons className="h-6 w-6" iconNumber={3} />
        <span className="ml-1">Powers</span>
      </OpenPanelButton>

      <OpenPanelButton panel="Guide">
        <EarthsongIcons className="h-6 w-5" iconNumber={2} />
        <span>Guide</span>
      </OpenPanelButton>
    </footer>
  );
}
