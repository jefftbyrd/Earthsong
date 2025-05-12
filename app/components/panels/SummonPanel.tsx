import { useContext, useState } from 'react';
import { type Snapshot, userContext } from '../../context/userContext';
import PanelWrap from './PanelWrap';
import SnapshotItem from './SnapshotItem';

interface SnapshotListProps {
  snapshots: Snapshot[];
}

function SnapshotList({ snapshots }: SnapshotListProps) {
  const [snapshotList, setSnapshotList] = useState(snapshots);

  const handleDelete = (id: number) => {
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
    <PanelWrap panel="Summon" className="bg-[rgb(255,0,89)]" panelTheme="light">
      <h3 className="text-xl font-abordage">Summon past journeys</h3>

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
