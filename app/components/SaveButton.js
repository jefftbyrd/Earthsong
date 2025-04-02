import React, { useContext, useState } from 'react';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/portal.module.scss';

export default function SaveButton({
  setSaveIsOpen,
  saveIsOpen,
  setShowSuccessMessage,
}) {
  const { togglePanel, setPanelId } = useContext(journeyContext);

  return (
    <button
      className={styles.saveSnapshotButton}
      onClick={() => {
        // setSaveIsOpen(!saveIsOpen);
        setPanelId('savePanel');
        togglePanel();
        setShowSuccessMessage(false);
      }}
    >
      Save
    </button>
  );
}
