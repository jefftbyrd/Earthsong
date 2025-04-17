import { useContext, useState } from 'react';
// import { type Snapshot } from '../../../migrations/00002-createTableSnapshots';
import { userContext } from '../../context/userContext';
// import ClosePanelButton from '../panels/ClosePanelButton';
import PanelWrap from './PanelWrap';
import SnapshotItem from './SnapshotItem';

function SnapshotList({ snapshots }) {
  const [snapshotList, setSnapshotList] = useState(snapshots);

  const handleDelete = (id) => {
    setSnapshotList(snapshotList.filter((snapshot) => snapshot.id !== id));
  };

  return (
    <div className="grid grid-col-2 gap-2">
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
  const { snapshots } = useContext(userContext);

  return (
    <PanelWrap panel="Summon" bg="#C45353">
      <h3 className="text-xl">Summon past journeys</h3>

      <div className="">
        {snapshots.length < 1 ? (
          'No snapshots yet'
        ) : (
          <SnapshotList snapshots={snapshots} />
        )}
      </div>
    </PanelWrap>
  );
}
