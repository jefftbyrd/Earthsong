import { useContext, useEffect, useRef } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ClosePanelButton from '../panels/ClosePanelButton';

export default function PanelWrap({ children, panel, bg }) {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  const panelRef = useRef(null);

  useEffect(() => {
    // Function to calculate and set panel height
    const setPanelHeight = () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (!panelRef.current) return;

      // Get the bottom nav height (fixed at h-10 or 2.5rem)
      const navHeight = 40; // Equivalent to h-10 (adjust if needed)

      // Get the top of the panel (this accounts for SoundController)
      const panelTop = panelRef.current.getBoundingClientRect().top;

      // Calculate available height
      const availableHeight = window.innerHeight - panelTop - navHeight;

      // Set the height
      panelRef.current.style.height = `${availableHeight}px`;
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

  return (
    <div
      ref={panelRef}
      className="p-1 text-black box-border overflow-auto mt-0.5"
      style={{ backgroundColor: bg }}
    >
      {/* <ClosePanelButton panel={panel} /> */}
      <div className="p-5 grid gap-5">{children}</div>
      <h2 className="absolute bottom-10 left-0 right-0 text-7xl uppercase opacity-30 text-center">
        {panel}
      </h2>
    </div>
  );
}
