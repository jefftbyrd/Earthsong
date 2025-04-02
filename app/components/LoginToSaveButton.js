import { useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import styles from '../styles/portal.module.scss';

export default function LoginToSaveButton({ setSaveIsOpen, saveIsOpen }) {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <button
        className={styles.saveSnapshotButton}
        onClick={() => {
          setLoginOpen(!loginOpen);
        }}
      >
        Save
      </button>

      {loginOpen ? (
        <LoginForm setLoginOpen={setLoginOpen} loginOpen={loginOpen} />
      ) : null}
    </>
  );
}
