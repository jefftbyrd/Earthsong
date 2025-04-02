import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
// import type { User } from '../../../migrations/00000-createTableUsers';
// import type { Snapshot } from '../../migrations/00002-createTableSnapshots';
// import type { CreateSnapshotResponseBodyPost } from '../api/snapshots/route';
import ErrorMessage from '../ErrorMessage';
import styles from '../styles/ui.module.scss';

// import styles from './SnapshotsForm.module.scss';

// type Props = {
//   user: User;
//   snapshots: Snapshot[];
// };

export default function Save({
  sounds,
  setSaveIsOpen,
  setShowSuccessMessage,
  showSuccessMessage,
}) {
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

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
          className="closeButton"
          onClick={() => {
            setSaveIsOpen(false);
          }}
        >
          𐛠
        </button>
        <h2>Save this journey</h2>
        <p>Save this journey so you can revisit it later.</p>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            // setSaveIsOpen(false);

            const response = await fetch('/api/snapshots', {
              method: 'POST',
              body: JSON.stringify({
                title,
                sounds,
              }),
            });

            setErrorMessage('');

            if (!response.ok) {
              const responseBody = await response.json();

              if ('error' in responseBody) {
                // TODO: Use toast instead of showing
                // this below creation / update form
                setErrorMessage(responseBody.error);
                return;
              }
            }

            setTitle('');
            await setShowSuccessMessage(!showSuccessMessage);
            await setSaveIsOpen(false);
            router.refresh();
          }}
        >
          <div className={styles.journey}>
            <label>
              <h3>Give your journey a name:</h3>
              <input
                autoFocus={true}
                value={title}
                onChange={(event) => setTitle(event.currentTarget.value)}
              />
            </label>
          </div>
          <button className={styles.uiButton}>Save</button>
        </form>

        <ErrorMessage>{errorMessage}</ErrorMessage>
      </motion.div>
    </AnimatePresence>
  );
}
