'use client';

import { useRouter } from 'next/navigation';
import styles from '../../styles/ui.module.scss';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  return (
    <form>
      <button
        className={styles.uiButton}
        formAction={async () => {
          await logout();
          router.refresh();
        }}
      >
        Logout
      </button>
    </form>
  );
}
