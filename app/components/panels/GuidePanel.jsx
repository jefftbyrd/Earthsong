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
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <button
          className="relative w-4/5 lg:w-1/2 aspect-24/7 overflow-hidden border-1 border-black/50 mt-3"
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
            priority
            className="absolute inset-0 object-cover opacity-50 w-full h-full"
            alt="Navigation"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl text-white z-10 text-shadow-lg/30 lg:text-7xl">
              Navigation
            </h1>
          </div>
        </button>

        <button
          className="relative w-4/5 lg:w-1/2 aspect-24/7 overflow-hidden border-1 border-black/50"
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
            priority
            className="absolute inset-0 object-cover opacity-50 w-full h-full"
            alt="Portal"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl text-white z-10 text-shadow-lg/30 lg:text-7xl">
              Sound Portal
            </h1>
          </div>
        </button>

        <button
          className="relative w-4/5 lg:w-1/2 aspect-24/7 overflow-hidden border-1 border-black/50"
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
            src="/guide-about.png"
            priority
            className="absolute inset-0 object-cover opacity-60 w-full h-full"
            alt="About"
            width={1600}
            height={900}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl text-white z-10 text-shadow-lg/30 lg:text-7xl">
              What is it?
            </h1>
          </div>
        </button>
      </div>
    </PanelWrap>
  );
}
