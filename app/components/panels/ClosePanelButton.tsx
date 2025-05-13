import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';

export default function ClosePanelButton({
  panel,
  theme = 'light',
}: {
  panel: string | number;
  theme?: 'light' | 'dark';
}) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const { setActivateTarget } = useSoundPlayer();

  // Define classes based on theme
  const themeClasses =
    theme === 'dark'
      ? 'text-white/70 hover:text-white'
      : 'text-black/30 hover:text-white/100 md:text-white/70';

  return (
    <button
      className={`h-7 w-7 md:h-10 md:w-10 ${themeClasses} md:text-white/70 fixed right-1 md:right-[3.2vw] lg:right-[4.5vw] xl:right-[6vw] flex items-center justify-center font-[--font-noto] text-5xl md:text-7xl lg:text-8xl pb-1 md:pb-2 cursor-pointer transition-colors duration-200`}
      onClick={(e) => {
        e.stopPropagation();
        // Only action is to close the current panel - no reopening logic
        if (panelOpen && panelId === panel) {
          setActivateTarget(false);
          togglePanel(); // This will close the panel and clear panelId
        }
      }}
    >
      <span className={`${themeClasses} `}>𐄂</span>
    </button>
  );
}
