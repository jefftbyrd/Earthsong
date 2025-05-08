import { useState } from 'react';
import EarthsongButton from '../EarthsongButton';
import Login from './Login';
import PanelWrap from './PanelWrap';
import Register from './Register';

export default function UnlockPanel() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <PanelWrap panel="Unlock" className="bg-[#C45353] text-black">
      <>
        <h3 className="text-xl">
          Welcome, <span className="font-black">stranger</span>.
        </h3>
        {!loginOpen && !registerOpen ? (
          <div className="flex flex-col gap-6">
            <p>
              To save and recall your favorite journeys, <br />
              <EarthsongButton
                buttonStyle={3}
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                Create an account
              </EarthsongButton>
            </p>
            <p>
              If you already have an account, <br />
              <EarthsongButton
                buttonStyle={3}
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                Sign in
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
