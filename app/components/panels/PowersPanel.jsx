import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
import PowersLoggedIn from './PowersLoggedIn';
import PowersNotLoggedIn from './PowersNotLoggedIn';

export default function PowersPanel() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const { user } = useContext(userContext);
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
    <PanelWrap panel="Powers" bg="red">
      {user ? <PowersLoggedIn /> : <PowersNotLoggedIn />}
      <p>line two</p>
    </PanelWrap>
  );
}
