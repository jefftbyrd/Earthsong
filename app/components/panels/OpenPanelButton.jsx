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
      className="uppercase text-center flex items-center justify-center text-lg rounded-md bg-black/50 p-3 text-white border-1 border-gray-200 cursor-pointer w-fit justify-self-center shadow-md hover:bg-black/80"
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
