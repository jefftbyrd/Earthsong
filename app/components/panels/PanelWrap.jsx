import { useContext, useEffect, useRef, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ClosePanelButton from '../panels/ClosePanelButton';

export default function PanelWrap({ children, panel, bg }) {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  const panelRef = useRef(null);
  const [panelDimensions, setPanelDimensions] = useState({ top: 0, height: 0 });

  useEffect(() => {
    // Function to calculate and set panel height and position
    const setPanelHeight = () => {
      if (!panelRef.current) return;

      // Get the bottom nav height (fixed at h-10 or 2.5rem)
      const navHeight = 40; // Equivalent to h-10 (adjust if needed)

      // Get the top of the panel (this accounts for SoundController)
      const panelTop = panelRef.current.getBoundingClientRect().top;

      // Calculate available height
      const availableHeight = window.innerHeight - panelTop - navHeight;

      // Set the height
      panelRef.current.style.height = `${availableHeight}px`;

      // Update dimensions for overlay positioning
      setPanelDimensions({
        top: panelTop,
        height: availableHeight,
      });
    };

    // Set height initially and on resize
    setPanelHeight();
    window.addEventListener('resize', setPanelHeight);

    // Escape key handler
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && panelOpen) {
        togglePanel();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      window.removeEventListener('resize', setPanelHeight);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [panelOpen, togglePanel]);

  // Create a "click catcher" div that sits on top of the content area
  // This prevents clicks from reaching the elements underneath
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      {/* Invisible overlay that only covers the panel area */}
      {/* <div
        className="fixed inset-x-0 z-30"
        style={{
          top: `${panelDimensions.top}px`,
          height: `${panelDimensions.height}px`,
          background: 'transparent',
          pointerEvents: 'auto',
        }}
        onClick={togglePanel}
        onKeyDown={(e) => {
          // Handle Escape key to close panel
          if (e.key === 'Escape') {
            togglePanel();
          }
        }}
      /> */}

      {/* Original panel with its positioning intact */}
      <div
        ref={panelRef}
        className=" text-black box-border overflow-auto mt-0.5 z-40 relative"
        style={{
          backgroundColor: bg,
          pointerEvents: 'auto', // Ensure clicks on panel content are captured
        }}
        // onClick={stopPropagation} // Prevent clicks from reaching the overlay
      >
        <ClosePanelButton panel={panel} />
        <div className="p-3 pt-6">
          <h2 className=" left-0 right-0 text-7xl uppercase opacity-30 text-center">
            {panel}
          </h2>

          <div className="p-5 grid gap-5">{children}</div>
          {/* <h2 className="absolute bottom-0 left-0 right-0 text-7xl uppercase opacity-30 text-center">
          {panel}
        </h2> */}
        </div>
      </div>
    </>
  );
}
