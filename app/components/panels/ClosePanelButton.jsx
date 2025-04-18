import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function ClosePanelButton({ panel }) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  // useEffect(() => {
  //   // Create handler function for document-level keyboard events
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Escape' && panelOpen) {
  //       togglePanel();
  //     }
  //   };

  //   // Add keyboard event listener to document
  //   document.addEventListener('keydown', handleKeyDown);

  //   // Cleanup function
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [panelOpen, togglePanel]);

  return (
    <button
      className="h-7 w-7 lg:h-10 lg:w-10 text-black/30 lg:text-white/70 fixed right-1 lg:right-5 flex items-center justify-center font-[--font-noto] text-5xl lg:text-8xl pb-1 lg:pb-2 cursor-pointer"
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
