'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useContext } from 'react';
import { Button } from '../../components/ui';
import { journeyContext } from '../../context/journeyContext';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();
  const { setPhase, panelOpen, setReset, togglePanel, setPin, setPanelId } =
    useContext(journeyContext);

  const handleLogout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await logout();
    router.refresh();
    setPanelId('PowersPanel');
    togglePanel();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
