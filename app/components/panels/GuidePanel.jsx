import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePanel() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
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
    <PanelWrap panel="Guide" bg="blue">
      <p>This is the guide content</p>
      <p>line two</p>
    </PanelWrap>
  );
}
