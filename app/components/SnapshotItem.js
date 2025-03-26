'use client';
// import styles from './ui.module.scss';

export default function SnapshotItem({
  snapshot,
  setRecallId,
  setPortalRecall,
  setProfileOpen,
  setEnterPortal,
  setResetPortal,
  setStartWind,
  setIsStarted,
}) {
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
