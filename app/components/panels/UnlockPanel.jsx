import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import ClosePanelButton from '../panels/ClosePanelButton';
import Login from './Login';
import PanelWrap from './PanelWrap';
// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
import Register from './Register';
import EarthsongButton from '../EarthsongButton';

export default function UnlockPanel() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const { user } = useContext(userContext);

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
