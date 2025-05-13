import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useSoundPlayer } from '../../context/soundPlayerContext';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';
// import EarthsongIcons from '../EarthsongIcons';
import ClosePanelButton from './ClosePanelButton';

interface PanelProps {
  children: React.ReactNode;
  panel: string;
  heading?: string;
  className?: string;
  headingClassName?: string;
  panelTheme?: 'light' | 'dark';
}

export default function PanelWrap({
  children,
  panel,
  heading,
  className,
  headingClassName,
  panelTheme = 'light',
  ...props
}: PanelProps) {
  const { ref } = useDynamicHeight();
  const { panelOpen, togglePanel, setPanelId, panelId } =
    useContext(journeyContext);
  const { setActivateTarget } = useSoundPlayer();

  const borderColor =
    panelTheme === 'dark' ? 'lg:border-white/20' : 'lg:border-black/30';

  const textColor = panelTheme === 'dark' ? 'text-white' : 'text-black';

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
      className={`${className} box-border overflow-auto mt-0.5 z-40 relative text-center md:mt-20 ${borderColor} lg:border-x-6 lg:border-t-6 pb-6 md:w-4/5 lg:w-4/5 md:mx-auto`}
      {...props}
    >
      <ClosePanelButton panel={panel} theme={panelTheme} />
      <div className={panelId === 'About' ? 'p-4 pt-6' : 'p-8 pt-6'}>
        {panelOpen && panelId !== 'About' && (
          <button
            className="
              bg-white/70 hover:bg-white/100 text-black/80 md:text-3xl
              fixed md:absolute
              right-0 top-1/2 z-50
              [writing-mode:vertical-rl] [text-orientation:upright]
               pt-3 pb-2 py-1 flex items-center justify-center text-center
              uppercase tracking-[0.4em] shadow-xl/20 outline-black/30 outline-3 font-bold
            "
            onClick={(e) => {
              e.stopPropagation();
              setActivateTarget(false);
              if (panelOpen && panelId === 'About') {
                togglePanel();
              } else {
                setPanelId('About');
              }
            }}
          >
            About
          </button>
        )}
        <h2
          className={`${headingClassName ?? textColor} left-0 right-0 text-6xl md:text-9xl uppercase text-center opacity-30`}
        >
          {heading ?? panel}
        </h2>
        <div
          className={`${textColor} flex flex-col justify-center items-center gap-5`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
