import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { useDynamicHeight } from '../../hooks/useDynamicHeight';
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
  const { panelOpen, togglePanel } = useContext(journeyContext);

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
      // style={{ backgroundColor: bg }}
      {...props}
    >
      <ClosePanelButton panel={panel} />
      <div className="p-3 pt-6">
        <h2 className="left-0 right-0 text-6xl md:text-9xl uppercase opacity-30 text-center">
          {panel}
        </h2>
        <div className="flex flex-col justify-center items-center gap-5">
          {children}
        </div>
      </div>
    </div>
  );
}
