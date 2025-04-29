import { useContext } from 'react';
import LogoutButton from '../../(auth)/logout/LogoutButton';
import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
import OpenPanelButton from './OpenPanelButton';
import PanelWrap from './PanelWrap';

export default function PowersPanel() {
  const { phase } = useContext(journeyContext);
  const { user } = useContext(userContext);

  return (
    <PanelWrap panel="Powers" bg="#C45353">
      <h3 className="text-xl mb-5">
        Greetings, <span className="font-bold">{user?.username}</span>. <br />
        What power will you wield?
      </h3>

      {phase === 'portal' || phase === 'portalRecall' ? (
        <OpenPanelButton panel="Save">Save this journey</OpenPanelButton>
      ) : null}

      <OpenPanelButton panel="Summon">Summon past journeys</OpenPanelButton>

      {phase !== 'portalRecall' ? <LogoutButton /> : null}
    </PanelWrap>
  );
}
