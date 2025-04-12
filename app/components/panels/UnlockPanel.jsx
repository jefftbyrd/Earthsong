import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import ClosePanelButton from '../panels/ClosePanelButton';
import Login from './Login';
import PanelWrap from './PanelWrap';
// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
import Register from './Register';

export default function UnlockPanel() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const { user } = useContext(userContext);
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
    <PanelWrap panel="Unlock" bg="#C45353">
      {' '}
      <>
        <p className="text-xl">
          Welcome, <span className="font-black">seeker</span>.
        </p>
        {!loginOpen && !registerOpen ? (
          <>
            <p>
              To save and recall your favorite journeys,{' '}
              <button
                className="font-black"
                onClick={() => {
                  setLoginOpen(false);
                  setRegisterOpen(true);
                }}
              >
                create an account
              </button>
              .
            </p>
            <p>
              If you already have an account,{' '}
              <button
                className="font-black"
                onClick={() => {
                  setLoginOpen(true);
                }}
              >
                sign in
              </button>
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
