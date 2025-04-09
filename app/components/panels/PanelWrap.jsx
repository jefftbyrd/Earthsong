import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import ClosePanelButton from '../panels/ClosePanelButton';

export default function PanelWrap({ children, panel, bg }) {
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
    <div
      className="p-1 text-black box-border overflow-auto min-h-full h-svh mt-0.5"
      style={{ backgroundColor: bg }}
    >
      <ClosePanelButton panel={panel} />
      {children}
      <h2 className="absolute bottom-10 text-7xl uppercase opacity-30 text-center">
        {panel}
      </h2>
    </div>
  );
}
