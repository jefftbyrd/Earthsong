'use client';
import { useContext, useState } from 'react';
import { earthsongContext } from '../context/earthsongContext';
import styles from './ui.module.scss';

export default function SnapshotItem({
  snapshot,
  setRecallId,
  setPortalRecall,
  setProfileOpen,
  setEnterPortal,
  resetPortal,
  setResetPortal,
  setStartWind,
  setIsStarted,
}) {
  const aegean = ['𐄇', '𐄈', '𐄉', '𐄊', '𐄋'];
  const { setPhase } = useContext(earthsongContext);
  const { setReset } = useContext(earthsongContext);

  return (
    <>
      {/* {snapshot.title} */}
      <button
        onClick={async () => {
          // await setResetPortal(true);
          // await setResetPortal(false);
          await setReset(true);
          await setReset(false);
          await setRecallId(snapshot.id);
          await setPhase('portalRecall');
          // await setResetPortal(true);
          // await setResetPortal(false);
          // await setEnterPortal(false);
          // await setPortalRecall(true);
          setStartWind(false);
          setProfileOpen(false);
          // setEnterPortal(true);
          // setIsStarted(true);
        }}
      >
        {snapshot.title}
      </button>
    </>
  );
}
