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
      className="uppercase text-center flex items-center justify-center text-lg rounded-md bg-black/50 p-3 text-white border-1 border-gray-200 cursor-pointer w-fit justify-self-center shadow-md hover:bg-black/80"
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
