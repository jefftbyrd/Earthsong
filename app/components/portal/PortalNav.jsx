import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function PortalNav() {
  const { setPhase } = useContext(journeyContext);
  const { setReset } = useContext(journeyContext);
  const [resetDone, setResetDone] = useState(false);

  useEffect(() => {
    if (resetDone) {
      setPhase('map');
    }
  }, [resetDone, setPhase]);

  return (
    <footer className="h-10 border-t-1 bg-black fixed bottom-0 w-full grid grid-cols-3 uppercase text-center col-span-2">
      <button
        className="uppercase"
        onClick={() => {
          setReset(true);
          setTimeout(() => {
            setReset(false);
            setResetDone(true);
          }, 0);
        }}
      >
        &lt; Map
      </button>
      <button className="uppercase">Tools</button>
      <button className="uppercase">Guide</button>
    </footer>
  );
}
