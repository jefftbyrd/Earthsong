import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import OpenPanelButton from '../panels/OpenPanelButton';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePanel() {
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
    <PanelWrap panel="Guide" bg="#5381C4">
      <OpenPanelButton panel="Navigate">Navigate Earth Song</OpenPanelButton>
      <OpenPanelButton panel="Portal">Sound Portal</OpenPanelButton>
      <OpenPanelButton panel="About">What is Earth Song?</OpenPanelButton>
    </PanelWrap>
  );
}
