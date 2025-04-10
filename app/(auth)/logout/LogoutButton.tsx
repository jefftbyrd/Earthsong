'use client';

import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { Button } from '../../components/ui';
import { logout } from './actions';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await logout();
    router.refresh();
  };

  return (
    <form onSubmit={handleLogout}>
      <Button type="submit">Logout</Button>
    </form>
  );
}
