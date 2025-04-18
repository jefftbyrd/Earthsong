import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
import OpenPanelButton from '../panels/OpenPanelButton';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePanel() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
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
    <PanelWrap panel="Guide" bg="#5381C4">
      <button
        className="relative w-4/5 aspect-video overflow-hidden border-2 border-black/30 mt-3"
        onClick={(e) => {
          e.stopPropagation();
          if (panelOpen && panelId === 'Navigate') {
            togglePanel();
          } else {
            setPanelId('Navigate');
          }
        }}
      >
        <Image
          src="/guide-navigate.webp"
          className="absolute inset-0 object-cover opacity-50 w-full h-full"
          alt="Navigation"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl text-white z-10 text-shadow-md">
            Navigation
          </h1>
        </div>
      </button>

      <button
        className="relative w-4/5 aspect-video overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          if (panelOpen && panelId === 'Portal') {
            togglePanel();
          } else {
            setPanelId('Portal');
          }
        }}
      >
        <Image
          src="/guide-portal.webp"
          className="absolute inset-0 object-cover opacity-50 w-full h-full rounded-md"
          alt="Portal"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl text-white z-10 text-shadow-md">
            Sound Portal
          </h1>
        </div>
      </button>

      <button
        className="relative w-4/5 aspect-video overflow-hidden"
        onClick={(e) => {
          e.stopPropagation();
          if (panelOpen && panelId === 'About') {
            togglePanel();
          } else {
            setPanelId('About');
          }
        }}
      >
        <Image
          src="/guide-about.webp"
          className="absolute inset-0 object-cover opacity-50 w-full h-full rounded-md"
          alt="About"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl text-white z-10 text-shadow-md">
            What is it?
          </h1>
        </div>
      </button>
    </PanelWrap>
  );
}
