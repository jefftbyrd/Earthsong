'use client';
// import styles from './ui.module.scss';

interface Snapshot {
  id: string;
  title: string;
}

interface SnapshotItemProps {
  snapshot: Snapshot;
  setRecallId: (id: string) => void;
  setPortalRecall: (value: boolean) => void;
  setProfileOpen: (value: boolean) => void;
  setEnterPortal: (value: boolean) => void;
  setResetPortal: (value: boolean) => void;
  setStartWind: (value: boolean) => void;
  setIsStarted: (value: boolean) => void;
}

export default function SnapshotItem({
  snapshot,
  setRecallId,
  setPortalRecall,
  setProfileOpen,
  setEnterPortal,
  setResetPortal,
  setStartWind,
  setIsStarted,
}: SnapshotItemProps) {
  return (
    <button
      onClick={async () => {
        await setResetPortal(true);
        await setResetPortal(false);
        await setEnterPortal(false);
        await setRecallId(snapshot.id);
        await setPortalRecall(true);
        setStartWind(false);
        setProfileOpen(false);
        setEnterPortal(true);
        setIsStarted(true);
      }}
    >
      {snapshot.title}
    </button>
  );
}
