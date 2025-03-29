import { AnimatePresence, motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import ErrorMessage from '../ErrorMessage';
import styles from './ui.module.scss';

// type Props = {
//   user: User;
//   snapshots: Snapshot[];
// };

interface SaveProps {
  sounds: [];
  setSaveIsOpen: (value: boolean) => void;
  setShowSuccessMessage: (value: boolean) => void;
  showSuccessMessage: boolean;
}

interface ErrorResponse {
  error: string;
}

export default function Save({
  sounds,
  setSaveIsOpen,
  setShowSuccessMessage,
  showSuccessMessage,
}: SaveProps) {
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');

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

            const response = await fetch('/api/snapshots', {
              method: 'POST',
              body: JSON.stringify({
                title,
                sounds,
              }),
            });

            setErrorMessage('');

            if (!response.ok) {
              const responseBody = (await response.json()) as ErrorResponse;

              if ('error' in responseBody) {
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
