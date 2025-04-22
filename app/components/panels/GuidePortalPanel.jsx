import { useContext, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import EarthsongButton from '../EarthsongButton';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
import SecretKeyboard from './SecretKeyboard';
import SecretTouch from './SecretTouch';

export default function GuidePortalPanel() {
  const { panelOpen, togglePanel } = useContext(journeyContext);
  const [secretMode, setSecretMode] = useState('touch');
  // useEffect(() => {
  //   // Create handler function for document-level keyboard events
  //   const handleKeyDown = (e) => {
  //     if (e.key === 'Escape' && panelOpen) {
  //       togglePanel();
  //     }
  //   };

  //   // Add keyboard event listener to document
  //   document.addEventListener('keydown', handleKeyDown);

  //   // Cleanup function
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // }, [panelOpen, togglePanel]);

  return (
    <PanelWrap panel="Portal" bg="#5381C4">
      <div className="w-full">
        <h2 className="text-xl mb-3">Interacting with sounds</h2>
        <div className="w-full md:w-2/3 mx-auto flex flex-col gap-3 pb-7 text-left p-2">
          <div className="border-b-1 pb-5 border-black/30">
            <h3 className="text-xl/10 font-bold">
              <span className="border-1 border-white/60 p-1 rounded-md text-white bg-black/30">
                PLAY
              </span>{' '}
              or{' '}
              <span className="border-1 border-white/60 p-1 rounded-md text-white bg-black/30">
                STOP
              </span>{' '}
              a sound
            </h3>
            <p>
              Tap a circle or the numbers in the play bar at the top of your
              screen.
            </p>
          </div>
          <div className="border-b-1 pb-5 border-black/30">
            <h3 className="text-xl/10 font-bold">
              <span className="border-1 border-white/60 p-1 rounded-md text-white bg-black/30">
                MOVE SOUNDS
              </span>{' '}
              in the sonic field
            </h3>
            Touch and drag sound circles.
          </div>
          <div>
            <h3 className="text-xl/10 font-bold">
              Open a sound's{' '}
              <span className="border-1 border-white/60 p-1 rounded-md text-white bg-black/30">
                INFO PANEL
              </span>
            </h3>
            Touch the sound title in the play bar.
          </div>

          <div className="border-1 p-5 md:p-7 w-full bg-white/20 sonicSorcery mt-5">
            <h3 className="text-5xl/13 uppercase text-center">Sonic Sorcery</h3>

            <div className="flex gap-1 justify-center text-lg mt-3">
              <EarthsongButton
                onClick={() => {
                  setSecretMode('touch');
                }}
                buttonStyle={3}
                // className="font-bold"
                className={`p-3 font-bold border-1 border-black/50 text-black/80 ${secretMode === 'touch' ? 'bg-white/70' : ''}`}
                // style={secretMode === 'touch' ? { backgroundColor: 'white' } : {}}
              >
                Touchscreen
              </EarthsongButton>

              <EarthsongButton
                onClick={() => {
                  setSecretMode('keyboard');
                }}
                buttonStyle={3}
                className={`p-3 font-bold border-1 border-black/50 text-black/80 ${secretMode === 'keyboard' ? 'bg-white/70' : ''}`}
              >
                Keyboard
              </EarthsongButton>
            </div>

            {secretMode === 'keyboard' && <SecretKeyboard />}
            {secretMode === 'touch' && <SecretTouch />}
          </div>
        </div>
      </div>
    </PanelWrap>
  );
}
