import { useContext, useEffect, useState } from 'react';
import { journeyContext } from '../../context/journeyContext';
import Login from './Login';
import Register from './Register';

export default function PowersNotLoggedIn() {
  const { setPanelId, panelOpen, togglePanel, panelId } =
    useContext(journeyContext);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
      <p className="text-xl">
        Welcome, <span className="font-black">seeker</span>. Salutations from
        the realm of sound.
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
  );
}
