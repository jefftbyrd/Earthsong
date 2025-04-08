import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function ClosePanelButton({ panel }) {
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
      className="uppercase h-5 w-5 bg-black text-white text-center"
      onClick={(e) => {
        e.stopPropagation();

        // If this exact panel is already open, just toggle it closed
        if (panelOpen && panelId === panel) {
          togglePanel(); // This will close the panel and clear panelId
        }
        // Otherwise, set this panel as active
        else {
          setPanelId(panel);
          // The useEffect will handle opening the panel if needed
        }
      }}
    >
      <p className="text-white text-center">x</p>
    </button>
  );
}
