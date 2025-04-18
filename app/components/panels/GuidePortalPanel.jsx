import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePortalPanel() {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && panelOpen) {
        togglePanel();
      }
    };

    // Add keyboard event listener to document
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen, togglePanel]);

  return (
    <PanelWrap panel="Portal" bg="#5381C4">
      <h2 className="text-xl mb-5">Interacting with sounds.</h2>
      <div>
        <h3 className="text-3xl font-bold">Play or stop a sound</h3>
        Tap a circle or the numbers in the play bar at the top of your screen.
      </div>
      <div>
        <h3 className="text-3xl font-bold">Move sounds in the sonic field</h3>
        Touch and drag sound circles.
      </div>
      <div>
        <h3 className="text-3xl font-bold">Open a sound's info panel</h3>
        Touch the sound title in the play bar.
      </div>
      {/* <div>
        <h3 className="text-3xl font-bold">Special Features</h3>
        (currently only available on desktop site)
      </div> */}

      <div className="border-1 p-3">
        <h3 className="text-3xl font-bold">Special Features</h3>
        (currently only available on desktop site)
        <h4>
          While hovering cursor over a sound circle, use keyboard commands:
        </h4>
        <div>
          <h3 className="text-xl font-bold">Set volume trim</h3>
        </div>
        <div>
          <h3 className="text-xl font-bold">Change playback speed</h3>
        </div>
        <div>
          <h3 className="text-xl font-bold">Toggle playback direction</h3>
          backwards/forwards
        </div>
      </div>
    </PanelWrap>
  );
}
