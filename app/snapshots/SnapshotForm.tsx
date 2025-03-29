'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import type { User } from '../../migrations/00000-createTableUsers';
import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import About from '../components/About';
import SnapshotItem from '../components/SnapshotItem';
// import styles from '../components/ui.module.scss';
import ErrorMessage from '../ErrorMessage';
import styles from './SnapshotsForm.module.scss';

type Props = {
  user: User;
  snapshots: Snapshot[];
  setRecallId: (value: boolean) => void;
  setPortalRecall: (value: boolean) => void;
  setProfileOpen: (value: boolean) => void;
  setEnterPortal: (value: boolean) => void;
  setResetPortal: (value: boolean) => void;
  resetPortal: boolean;
  setStartWind: (value: boolean) => void;
  setIsStarted: (value: boolean) => void;
  portalRecall: boolean;
};

export default function SnapshotsForm({
  setRecallId,
  setPortalRecall,
  user,
  snapshots,
  setProfileOpen,
  // profileOpen,
  setEnterPortal,
  setResetPortal,
  resetPortal,
  setStartWind,
  setIsStarted,
  portalRecall,
}: Props) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className={styles.uiModal}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 0,
          ease: [0, 0.71, 0.2, 1.01],
        }}
      >
        <button
          className="closeButtonAlt"
          onClick={() => {
            setProfileOpen(false);
          }}
        >
          𐛠
        </button>

        <h3>Welcome, {user.username}.</h3>

        <div className={styles.summon}>
          <h2>Summon past journeys</h2>
          {snapshots && (
            <div className={styles.snapshots}>
              {snapshots.length === 0 ? (
                'No snapshots yet'
              ) : (
                <ul>
                  {snapshots.map((snapshot) => (
                    <li key={`snapshots-${snapshot.id}`}>
                      <SnapshotItem
                        snapshot={snapshot}
                        setRecallId={setRecallId}
                        setPortalRecall={setPortalRecall}
                        setProfileOpen={setProfileOpen}
                        setEnterPortal={setEnterPortal}
                        setResetPortal={setResetPortal}
                        resetPortal={resetPortal}
                        setStartWind={setStartWind}
                        setIsStarted={setIsStarted}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <button
          className={styles.textButton}
          onClick={() => {
            setAboutOpen(!aboutOpen);
          }}
        >
          About Earthsong
        </button>
        {aboutOpen && <About />}

        <div className={styles.userButtons}>
          {!portalRecall ? <LogoutButton /> : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
