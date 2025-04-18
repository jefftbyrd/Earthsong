import { useContext } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import OpenPanelButton from '../panels/OpenPanelButton';
// import EarthsongButton from '../EarthsongButton';
import PanelWrap from './PanelWrap';

// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
// import SnapshotItem from './SnapshotItem';

export default function PowersPanel() {
  const { setPanelId, panelOpen, togglePanel, panelId, phase } =
    useContext(journeyContext);
  const { user } = useContext(userContext);

  return (
    <PanelWrap
      panel="Powers"
      bg="#C45353"
      //   style={{
      //     background: `radial-gradient(
      //   circle,
      //   rgba(43, 23, 56, 1) 0%,
      //   rgba(18, 22, 52, 1) 0%,
      //   rgba(0, 0, 0, 1) 100%
      // )`,
      // }}
    >
      <h3 className="text-xl mb-5">
        Greetings, <span className="font-bold">{user?.username}</span>. <br />
        What power will you wield?
      </h3>

      {phase === 'portal' || phase === 'portalRecall' ? (
        <OpenPanelButton panel="Save">Save this journey</OpenPanelButton>
      ) : null}

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
    </PanelWrap>
  );
}
