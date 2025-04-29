import { useState } from 'react';
import EarthsongButton from '../EarthsongButton';
import Login from './Login';
import PanelWrap from './PanelWrap';
import Register from './Register';

export default function UnlockPanel() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <PanelWrap panel="Unlock" bg="#C45353">
      {' '}
      <>
        <h3 className="text-xl">
          Welcome, <span className="font-black">stranger</span>.
        </h3>
        {!loginOpen && !registerOpen ? (
          <>
            <p>
              To save and recall your favorite journeys,{' '}
              <EarthsongButton
                buttonStyle={3}
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                create an account
              </EarthsongButton>
              .
            </p>
            <p>
              If you already have an account,{' '}
              <EarthsongButton
                buttonStyle={3}
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                sign in
              </EarthsongButton>
              .
            </p>{' '}
          </>
        ) : null}
        {loginOpen && <Login />}
        {registerOpen && <Register />}
      </>
    </PanelWrap>
  );
}
