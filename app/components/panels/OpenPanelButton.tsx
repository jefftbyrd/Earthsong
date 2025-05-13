import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';

interface OpenPanelButtonProps {
  panel: string;
  children?: React.ReactNode;
}

export default function OpenPanelButton({
  panel,
  children,
}: OpenPanelButtonProps) {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <button
      className="text-center flex items-center justify-center text-lg bg-black/50 p-3 text-white cursor-pointer w-fit justify-self-center shadow-md hover:bg-black/80 outline-1 outline-offset-2 outline-black/30 tracking-wider uppercase"
      onClick={(e) => {
        e.stopPropagation();
        if (panelOpen && panelId === panel) {
          togglePanel();
        } else {
          setPanelId(panel);
        }
      }}
    >
      {children ? children : panel}
    </button>
  );
}
