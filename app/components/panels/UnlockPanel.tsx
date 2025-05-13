import { useState } from 'react';
import EarthsongButton from '../EarthsongButton';
import Login from './Login';
import PanelWrap from './PanelWrap';
import Register from './Register';

export default function UnlockPanel() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <PanelWrap panel="Unlock" className="bg-[#23d5e8]" panelTheme="light">
      <>
        <p className="panelMessage">
          Welcome, <span className="font-black">stranger</span>.
        </p>
        {!loginOpen && !registerOpen ? (
          <div className="flex flex-col gap-6 mt-4">
            <p>
              To save and recall your favorite journeys,{' '}
              <EarthsongButton
                buttonStyle={3}
                className="mt-1"
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                create an account
              </EarthsongButton>
            </p>
            <p>
              If you already have an account,{' '}
              <EarthsongButton
                buttonStyle={3}
                className="mt-1"
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                sign in
              </EarthsongButton>
            </p>
          </div>
        ) : null}
        {loginOpen && <Login />}
        {registerOpen && <Register />}
      </>
    </PanelWrap>
  );
}
