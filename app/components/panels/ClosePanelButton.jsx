import { useContext, useEffect } from 'react';
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
      className="h-6 w-6 lg:h-10 lg:w-10 text-black absolute right-0.5 top-0.5 flex items-center justify-center font-[--font-noto] text-4xl lg:text-4xl pb-1 lg:pb-2 opacity-30"
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
      <span className="">𐄂</span>
    </button>
  );
}
