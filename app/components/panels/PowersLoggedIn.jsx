import { useContext, useEffect, useState } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import OpenPanelButton from '../panels/OpenPanelButton';
import { Button } from '../ui';
import SnapshotItem from './SnapshotItem';

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

      {/* <h2>Summon past journeys</h2> */}
      <OpenPanelButton panel="Summon">Summon past journeys</OpenPanelButton>
      {/* <div>
        {snapshots.length < 1 ? (
          'No snapshots yet'
        ) : (
          <ul>
            {snapshots.map((snapshot) => (
              <li key={`snapshots-${snapshot.id}`}>
                <SnapshotItem snapshot={snapshot} />
              </li>
            ))}
          </ul>
        )}
      </div> */}

      <p>{phase !== 'portalRecall' ? <LogoutButton /> : null}</p>
    </>
  );
}
