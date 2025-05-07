import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';

export default function ClosePanelButton({
  panel,
}: {
  panel: string | number;
}) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <button
      className="h-7 w-7 md:h-10 md:w-10 text-black/30 md:text-white/70 fixed right-1 md:right-[4.5vw] lg:right-[5vw] xl:right-[6vw] flex items-center justify-center font-[--font-noto] text-5xl md:text-7xl lg:text-8xl pb-1 md:pb-2 cursor-pointer"
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
