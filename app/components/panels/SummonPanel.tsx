import { AnimatePresence } from 'motion/react';
import { useContext, useState } from 'react';
// import { journeyContext } from '../../context/journeyContext';
import { userContext } from '../../context/userContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
// import PowersLoggedIn from './PowersLoggedIn';
// import PowersNotLoggedIn from './PowersNotLoggedIn';
import SnapshotItem from './SnapshotItem';

function SnapshotList({ snapshots }: { snapshots: Snapshot[] }) {
  const [snapshotList, setSnapshotList] = useState(snapshots);

  const handleDelete = (id: number) => {
    setSnapshotList(snapshotList.filter((snapshot) => snapshot.id !== id));
  };

  return (
    <div>
      {snapshotList.map((snapshot) => (
        <SnapshotItem
          key={`snapshot-${snapshot.id}`}
          snapshot={snapshot}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

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
          <SnapshotList snapshots={snapshots} />
        )}
      </div>
    </PanelWrap>
  );
}
