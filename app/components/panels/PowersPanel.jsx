import { useContext, useEffect, useState } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import ClosePanelButton from '../panels/ClosePanelButton';
import OpenPanelButton from '../panels/OpenPanelButton';
import { Button } from '../ui';
import PanelWrap from './PanelWrap';
// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
import SnapshotItem from './SnapshotItem';

export default function PowersPanel() {
  const { setPanelId, panelOpen, togglePanel, panelId, phase } =
    useContext(journeyContext);
  const { user, snapshots } = useContext(userContext);

  return (
    <PanelWrap panel="Powers" bg="#C45353">
      <>
        <p className="text-xl">
          Greetings, <span className="font-black">{user?.username}</span>. What
          power will you wield?
        </p>

        <OpenPanelButton panel="Save">Save this journey</OpenPanelButton>

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
    </PanelWrap>
  );
}
