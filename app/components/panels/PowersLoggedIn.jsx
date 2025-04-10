import { useContext, useEffect, useState } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import { Button } from '../ui';

export default function PowersLoggedIn() {
  const { setPanelId, panelOpen, togglePanel, panelId, phase } =
    useContext(journeyContext);
  const { user, snapshots } = useContext(userContext);

  return (
    <>
      <p className="text-xl">
        Greetings, <span className="font-black">{user?.username}</span>. What
        power will you wield?
      </p>
      {/* <Button click="">Save this journey</Button> */}
      <Button
        onClick={() => {
          setPanelId('savePanel');
          togglePanel();
          // setShowSuccessMessage(false);
        }}
      >
        Save this journey
      </Button>
      <p>Recall a saved journey</p>
      <p>{phase !== 'portalRecall' ? <LogoutButton /> : null}</p>
    </>
  );
}
