import { useContext, useEffect, useState } from 'react';
// import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
import SnapshotItem from './SnapshotItem';

export default function SummonPanel() {
  // const { setPanelId, panelOpen, togglePanel, panelId } =
  //   useContext(journeyContext);
  const { snapshots } = useContext(userContext);

  return (
    <PanelWrap panel="Summon" bg="#C45353">
      <h2>Summon past journeys</h2>

      <div>
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
      </div>
    </PanelWrap>
  );
}
