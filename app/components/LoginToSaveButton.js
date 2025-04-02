import React, { useContext, useState } from 'react';
// import LoginForm from '../(auth)/login/LoginForm';
import { journeyContext } from '../context/journeyContext';
import styles from '../styles/portal.module.scss';
import LoginPanel from './LoginPanel';

export default function LoginToSaveButton() {
  // const [loginOpen, setLoginOpen] = useState(false);
  const { togglePanel, setPanelId, panelId, panelOpen } =
    useContext(journeyContext);

  return (
    <>
      <button
        className={styles.saveSnapshotButton}
        onClick={() => {
          // setLoginOpen(!loginOpen);
          setPanelId('loginToSave');
          togglePanel();
        }}
      >
        Save
      </button>

      {panelOpen && panelId === 'loginToSave' ? <LoginPanel /> : null}
    </>
  );
}
