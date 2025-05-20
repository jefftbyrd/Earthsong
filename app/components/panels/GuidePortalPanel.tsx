import { useState } from 'react';
import EarthsongButton from '../EarthsongButton';
import GuideNavigation from './GuideNavigation';
import PanelWrap from './PanelWrap';
import SecretKeyboard from './SecretKeyboard';
import SecretTouch from './SecretTouch';

export default function GuidePortalPanel() {
  const [secretMode, setSecretMode] = useState('touch');

  return (
    <PanelWrap
      panel="Portal"
      className="bg-[#1c0929] text-white tracking-wide"
      panelTheme="dark"
    >
      <div className="w-full">
        <h2 className="panelMessage">Interacting with sounds</h2>
        <div className="w-full md:w-2/3 mx-auto flex flex-col text-left gap-2 mt-12">
          <h3 className="text-3xl text-left uppercase">Basic Controls</h3>
          <div className="guideItem">
            <h3 className="text-xl mb-2">
              <span className="font-bold">Play</span> or{' '}
              <span className="font-bold">stop</span> a sound
            </h3>
            <p>
              Tap a circle or the numbers in the <strong>play bar</strong> at
              the top of your screen.
            </p>
          </div>
          <div className="guideItem">
            <h3 className="text-xl mb-2">
              <span className="font-bold">Move sounds</span> in the sonic field
            </h3>
            <p>Touch and drag sound circles.</p>
          </div>
          <div className="guideItem">
            <h3 className="text-xl mb-2">
              Open a sound's <span className="font-bold">info panel</span>
            </h3>
            <p>
              Touch the sound title in the <strong>play bar</strong>.
            </p>
          </div>

          <h3 className="text-3xl text-left uppercase mt-6">Sonic Sorcery</h3>
          <div className="w-full md:w-2/3 sonicSorcery">
            <div className="flex gap-2 justify-start mb-3">
              <EarthsongButton
                onClick={() => {
                  setSecretMode('touch');
                }}
                buttonStyle={8}
                className={`p-2 text-sm font-bold border-1 font-abordage border-white/50 ${secretMode === 'touch' ? 'bg-white/70 text-black/80!' : ''}`}
              >
                Touchscreen
              </EarthsongButton>

              <EarthsongButton
                onClick={() => {
                  setSecretMode('keyboard');
                }}
                buttonStyle={8}
                className={`p-2 text-sm font-bold border-1 font-abordage border-white/50 ${secretMode === 'keyboard' ? 'bg-white/80 text-black/80!' : ''}`}
              >
                Keyboard
              </EarthsongButton>
            </div>

            {secretMode === 'keyboard' && <SecretKeyboard />}
            {secretMode === 'touch' && <SecretTouch />}
          </div>
        </div>
      </div>

      <GuideNavigation />
    </PanelWrap>
  );
}
