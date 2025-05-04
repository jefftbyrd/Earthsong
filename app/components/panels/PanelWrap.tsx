import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';
import EarthsongIcons from '../EarthsongIcons';
import ClosePanelButton from './ClosePanelButton';

interface PanelProps {
  children: React.ReactNode;
  panel: string;
  className?: string;
}

export default function PanelWrap({
  children,
  panel,
  className,
  ...props
}: PanelProps) {
  const { ref } = useDynamicHeight();
  const { panelOpen, togglePanel, setPanelId, panelId } =
    useContext(journeyContext);
  const { setActivateTarget } = useSoundPlayer();

  useEffect(() => {
    // Create handler function for document-level keyboard events
    const handleKeyDown = (e: KeyboardEvent): void => {
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
      ref={ref}
      className={`${className} text-black box-border overflow-auto mt-0.5 z-40 relative text-center lg:m-20 lg:border-black/30 lg:border-x-6 lg:border-t-6 pb-6`}
      {...props}
    >
      <ClosePanelButton panel={panel} />
      <div className={panelId === 'About' ? 'p-4 pt-6' : 'p-8 pt-6'}>
        {panelOpen && panelId !== 'About' && (
          <button
            className="bg-white/70 hover:bg-[#ff0059] hover:text-white text-black fixed right-0 translate-y-25 z-50 [writing-mode:vertical-rl] [text-orientation:upright] rounded-l-md pt-3 pb-2 py-1 flex items-center justify-center text-center uppercase font-bold tracking-[0.4em] shadow-xl/20 outline-black/30 outline-2"
            onClick={(e) => {
              e.stopPropagation();
              // setTest(false);
              setActivateTarget(false);
              // If this exact panel is already open, just toggle it closed
              if (panelOpen && panelId === 'About') {
                togglePanel(); // This will close the panel and clear panelId
              }
              // Otherwise, set this panel as active
              else {
                setPanelId('About');
                // The useEffect will handle opening the panel if needed
              }
            }}
          >
            {/* <EarthsongIcons
              iconNumber={7}
              className="h-5 lg:h-7 static inline mb-2 text-[#ff0059]"
            /> */}
            {/* <Logo className="h-6 lg:h-[18vw] lg:w-[18vw] mb-2 text-[#ff0059]" /> */}
            About
          </button>
        )}
        {/* <button className="bg-[#b0cbf1] hover:bg-[#ff0059] text-black fixed right-0 translate-y-62 z-50 [writing-mode:vertical-rl] [text-orientation:upright] rounded-l-md pt-3 pb-2 py-1 flex items-center justify-center text-center uppercase font-bold tracking-[0.5em] shadow-xl/20 outline-black/30 outline-2 ">
          Nav
        </button> */}
        <h2 className="left-0 right-0 text-7xl md:text-9xl uppercase opacity-30 text-center">
          {panel}
        </h2>
        <div className="flex flex-col justify-center items-center gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
