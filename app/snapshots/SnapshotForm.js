'use client';

import { AnimatePresence, motion } from 'motion/react';
import { useContext, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
import LogoutButton from '../(auth)/logout/LogoutButton';
import About from '../components/About';
// import type { User } from '../../migrations/00000-createTableUsers';
// import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
// import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import SnapshotItem from '../components/SnapshotItem';
import { journeyContext } from '../context/journeyContext';
// import { earthsongContext } from '../context/journeyContext';
import { userContext } from '../context/userContext';
import styles from '../styles/ui.module.scss';

// import ErrorMessage from '../ErrorMessage';
// import styles from './SnapshotsForm.module.scss';

// type Props = {
//   user: User;
//   snapshots: Snapshot[];
// };

export default function SnapshotsForm({ setProfileOpen, setStartWind }) {
  // const [title, setTitle] = useState('');
  // const [textContent, setTextContent] = useState('');
  // const [errorMessage, setErrorMessage] = useState('');
  const [aboutOpen, setAboutOpen] = useState(false);
  const { user } = useContext(userContext);
  const { snapshots } = useContext(userContext);
  const { phase } = useContext(journeyContext);

  // const router = useRouter();

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

        <h3>Welcome, {user?.username}.</h3>

        <div className={styles.summon}>
          <h2>Summon past journeys</h2>
          {snapshots && (
            <div className={styles.snapshots}>
              {snapshots?.length === 0 ? (
                'No snapshots yet'
              ) : (
                <ul>
                  {snapshots?.map((snapshot) => (
                    <li key={`snapshots-${snapshot?.id}`}>
                      <SnapshotItem
                        snapshot={snapshot}
                        setProfileOpen={setProfileOpen}
                        setStartWind={setStartWind}
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
          {phase !== 'portalRecall' ? <LogoutButton /> : null}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
