import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuideNavigatePanel() {
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
    <PanelWrap panel="Navigate" bg="#5381C4">
      <h2 className="text-xl mb-5">
        Navigate Earth Song using the menu at the bottom of your screen.
      </h2>
      <div>
        <h3 className="text-3xl font-bold">MAP</h3>
        Return to the map page to choose a new location to explore.
      </div>
      <div>
        <h3 className="text-3xl font-bold">UNLOCK</h3>
        Create an EARTHSONG account or sign in.
      </div>
      <div>
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
