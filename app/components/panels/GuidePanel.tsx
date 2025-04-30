import Image from 'next/image';
import { useContext } from 'react';
import { journeyContext } from '../../context/journeyContext';
import PanelWrap from './PanelWrap';

export default function GuidePanel() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);

  return (
    <PanelWrap panel="Guide" className="bg-[#5381C4]">
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
            className=" inset-0 object-cover opacity-60"
            alt="Navigation"
            fill
            sizes="(max-width: 1024px) 80vw, 50vw"
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
            fill
            className=" inset-0 object-cover opacity-60"
            alt="Portal"
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
            className=" inset-0 object-cover opacity-60 w-full h-full"
            alt="About"
            fill
            sizes="(max-width: 1024px) 80vw, 50vw"
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
