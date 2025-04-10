import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

// import ClosePanelButton from '../panels/ClosePanelButton';

export default function OpenPanelButton({ panel, children }) {
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
    <button
      className="uppercase text-center flex items-center justify-center gap-1"
      onClick={(e) => {
        e.stopPropagation();
        if (panelOpen && panelId === panel) {
          togglePanel();
        } else {
          setPanelId(panel);
        }
      }}
    >
      {children ? children : panel}
    </button>
  );
}
