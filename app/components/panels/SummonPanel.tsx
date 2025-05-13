import { useContext, useMemo, useState } from 'react';
import { normalizeSnapshotFormat } from '../../../util/normalizeData';
import { type Snapshot, userContext } from '../../context/userContext';
import PanelWrap from './PanelWrap';
import SnapshotItem from './SnapshotItem';

interface SnapshotListProps {
  snapshots: Snapshot[];
}

function SnapshotList({ snapshots }: SnapshotListProps) {
  // Normalize all snapshots at once when the component mounts
  const normalizedSnapshots = useMemo(() => {
    return snapshots.map((snapshot) => normalizeSnapshotFormat(snapshot));
  }, [snapshots]);

  const [snapshotList, setSnapshotList] = useState(normalizedSnapshots);
  console.log('SnapshotList', snapshotList);

  const handleDelete = (id: number) => {
    setSnapshotList(snapshotList.filter((snapshot) => snapshot.id !== id));
  };

  return (
    <div className="grid grid-col-2 gap-10">
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
