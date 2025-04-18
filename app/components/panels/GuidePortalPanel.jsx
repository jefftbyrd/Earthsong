import { useContext, useEffect } from 'react';
import { journeyContext } from '../../context/journeyContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';

export default function GuidePortalPanel() {
  const { panelOpen, togglePanel } = useContext(journeyContext);
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
    <PanelWrap panel="Portal" bg="#5381C4">
      <h2 className="text-xl mb-5">Interacting with sounds</h2>
      <div className="flex flex-col gap-7 pb-7">
        <div className="border-b-1 pb-5 border-black/30">
          <h3 className="text-2xl font-bold">PLAY or STOP a sound</h3>
          <p>
            Tap a circle or the numbers in the play bar at the top of your
            screen.
          </p>
        </div>
        <div className="border-b-1 pb-5 border-black/30">
          <h3 className="text-2xl font-bold">MOVE SOUNDS in the sonic field</h3>
          Touch and drag sound circles.
        </div>
        <div>
          <h3 className="text-2xl font-bold">Open a sound's INFO PANEL</h3>
          Touch the sound title in the play bar.
        </div>

        <div className="border-1 p-5 w-full md:w-120 mx-auto bg-white/20 mt-5">
          <h3 className="text-3xl font-bold ">Secret Features</h3>
          <p className="text-sm">(currently only available on desktop site)</p>
          <h4 className="my-5">
            Manipulate sounds by hovering your cursor over a sound circle and
            using these keyboard commands:
          </h4>
          <div className="flex flex-col gap-7">
            <div className="border-b-1 p-5 border-black/30 ">
              <h3 className="text-xl font-bold mb-2">Change playback speed</h3>
              <div className="grid grid-cols-3 gap-4 items-center w-full md:w-60 mx-auto ">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    A
                  </div>
                  <p>slower</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    S
                  </div>
                  <p>reset</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    D
                  </div>
                  <p>faster</p>
                </div>
              </div>
            </div>
            <div className="border-b-1 pb-5 mx-6 border-black/30">
              <h3 className="text-xl font-bold mb-2">
                Toggle playback direction
              </h3>
              <div className="grid grid-cols-3 gap-4 w-full md:w-60 mx-auto ">
                <div className="flex flex-col items-center justify-center col-start-2">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    R
                  </div>
                  <p>reverse/forward</p>
                </div>
              </div>
            </div>
            <div className="">
              <h3 className="text-xl font-bold mb-2">Set volume trim</h3>
              <div className="grid grid-cols-3  gap-4 w-full md:w-60 mx-auto ">
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    Q
                  </div>
                  <p>quieter</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    W
                  </div>
                  <p>reset</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold h-10 w-10 bg-white/50 rounded-lg flex items-center justify-center">
                    E
                  </div>
                  <p>louder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PanelWrap>
  );
}
