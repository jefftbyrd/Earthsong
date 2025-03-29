import { redirect } from 'next/navigation';
import { getSnapshots } from '../../database/snapshots';
import { getUser } from '../../database/users';
import { getCookie } from '../../util/cookies';
import SnapshotsForm from './SnapshotForm';

export default async function SnapshotsComponent() {
  // Task: Restrict access to the snapshots page and only display snapshots belonging to the current logged in user
  // 1. Check if the sessionToken cookie exists
  const sessionTokenCookie = await getCookie('sessionToken');

  // 2. Query user with the sessionToken
  const user = sessionTokenCookie && (await getUser(sessionTokenCookie));

  // 3. If the user does not exist, redirect to the login with the returnTo query parameter
  if (!user) {
    redirect('/login?returnTo=/snapshots');
  }

  // 4. Display the snapshots for the current logged in user
  const snapshots = await getSnapshots(sessionTokenCookie);
  return (
    <div>
      <SnapshotsForm user={user} snapshots={snapshots} />
    </div>
  );
}
