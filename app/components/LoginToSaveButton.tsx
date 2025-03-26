import { useState } from 'react';
import LoginForm from '../(auth)/login/LoginForm';
import styles from './portal.module.scss';

interface LoginToSaveButtonProps {
  setSaveIsOpen: (isOpen: boolean) => void;
  saveIsOpen: boolean;
}

export default function LoginToSaveButton({
  setSaveIsOpen,
  saveIsOpen,
}: LoginToSaveButtonProps) {
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
