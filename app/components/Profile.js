'use client';
import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import Star from '../../public/Star.js';
import { journeyContext } from '../context/journeyContext';
import SnapshotForm from '../snapshots/SnapshotForm';
import styles from './ui.module.scss';

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
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const { phase, setPhase } = useContext(journeyContext);

  return (
    <>
      <motion.button
        className={styles.userIcon}
        onClick={() => {
          setProfileOpen(!profileOpen);
        }}
        whileHover={{
          color: 'rgba(255, 0, 89, 1)',
          // rotate: 20,
        }}
      >
        <Star height="6vw" width="6vw" />
      </motion.button>

      {profileOpen ? (
        <SnapshotForm
          user={user}
          snapshots={snapshots}
          setProfileOpen={setProfileOpen}
          profileOpen={profileOpen}
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
