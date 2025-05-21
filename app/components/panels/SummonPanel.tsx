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

  const handleDelete = (id: number) => {
    setSnapshotList(snapshotList.filter((snapshot) => snapshot.id !== id));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 w-full md:w-9/10 [&>*:nth-child(2n+1)]:bg-[#FA70FF] [&>*:nth-child(2n)]:bg-[#a1ff5e] md:[&>*:nth-child(4n+1)]:bg-[#FA70FF] md:[&>*:nth-child(4n+2)]:bg-[#a1ff5e] md:[&>*:nth-child(4n+3)]:bg-[#a1ff5e] md:[&>*:nth-child(4n+4)]:bg-[#FA70FF] 2xl:[&>*:nth-child(6n+1)]:bg-[#FA70FF] 2xl:[&>*:nth-child(6n+2)]:bg-[#a1ff5e] 2xl:[&>*:nth-child(6n+3)]:bg-[#FA70FF] 2xl:[&>*:nth-child(6n+4)]:bg-[#a1ff5e] 2xl:[&>*:nth-child(6n+5)]:bg-[#FA70FF] 2xl:[&>*:nth-child(6n+6)]:bg-[#a1ff5e]">
      {[...snapshotList].reverse().map((snapshot) => (
        <div key={`snapshot-wrapper-${snapshot.id}`}>
          <SnapshotItem
            key={`snapshot-${snapshot.id}`}
            snapshot={snapshot}
            onDelete={handleDelete}
          />
        </div>
      ))}
    </div>
  );
}

export default function SummonPanel() {
  const { snapshots } = useContext(userContext);

  return (
    <PanelWrap panel="Summon" className="bg-[#0042F6]" panelTheme="dark">
      <h3 className="panelMessage">Summon past journeys</h3>

      {snapshots.length < 1 ? (
        'No snapshots yet'
      ) : (
        <SnapshotList snapshots={snapshots} />
      )}
    </PanelWrap>
  );
}
