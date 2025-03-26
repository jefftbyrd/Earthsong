'use client';
import { motion } from 'motion/react';
import { useState } from 'react';
import Star from '../../public/Star.js';
import SnapshotForm from '../snapshots/SnapshotForm.js';
import styles from './ui.module.scss';

interface ProfileProps {
  user?: any; // Note: This could be improved with a proper user type
  snapshots?: any;
  setRecallId?: any;
  setPortalRecall?: any;
  setEnterPortal?: any;
  setResetPortal?: any;
  resetPortal?: any;
  setStartWind?: any;
  setIsStarted?: any;
  portalRecall?: any;
}

export default function Profile({
  user,
  snapshots,
  setRecallId,
  setPortalRecall,
  setEnterPortal,
  setResetPortal,
  resetPortal,
  setStartWind,
  setIsStarted,
  portalRecall,
}: ProfileProps) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setProfileOpen(!profileOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
        }}
      >
        <Star height="6vw" width="6vw" />
      </motion.button>

      {profileOpen ? (
        <SnapshotForm
          user={user}
          snapshots={snapshots}
          setProfileOpen={setProfileOpen}
          // profileOpen={profileOpen}
          setRecallId={setRecallId}
          setPortalRecall={setPortalRecall}
          setEnterPortal={setEnterPortal}
          setResetPortal={setResetPortal}
          resetPortal={resetPortal}
          setStartWind={setStartWind}
          setIsStarted={setIsStarted}
          portalRecall={portalRecall}
        />
      ) : null}
    </>
  );
}
