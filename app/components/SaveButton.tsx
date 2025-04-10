import React, { useContext } from 'react';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/portal.module.scss';

interface SaveButtonProps {
  setShowSuccessMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveButton({ setShowSuccessMessage }: SaveButtonProps) {
  const { togglePanel, setPanelId } = useContext(journeyContext);

  return (
    <button
      className={styles.saveSnapshotButton}
      onClick={() => {
        setPanelId('savePanel');
        togglePanel();
        setShowSuccessMessage(false);
      }}
    >
      Save
    </button>
  );
}
