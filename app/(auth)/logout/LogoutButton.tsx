'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useContext } from 'react';
import EarthsongButton from '../../components/EarthsongButton';
import { journeyContext } from '../../context/journeyContext';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();
  const { setPanelId, togglePanel } = useContext(journeyContext);

  const handleLogout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await logout();
      router.refresh();
      setPanelId('PowersPanel');
      togglePanel();
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, display an error message to the user
    }
  };

  return (
    <form onSubmit={handleLogout}>
      <EarthsongButton type="submit" buttonStyle={7} className="mt-6">
        Sign out
      </EarthsongButton>
    </form>
  );
}
