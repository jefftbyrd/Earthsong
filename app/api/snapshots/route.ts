import { NextResponse } from 'next/server';
import { z } from 'zod';
import { createSnapshot, deleteSnapshot } from '../../../database/snapshots'; // Import the delete function
import {
  type Snapshot,
  snapshotSchema,
} from '../../../migrations/00002-createTableSnapshots';
import { getCookie } from '../../../util/cookies';

export type CreateSnapshotResponseBodyPost =
  | {
      snapshot: { sounds: Snapshot['sounds'] };
    }
  | {
      error: string;
    };

export async function POST(
  request: Request,
): Promise<NextResponse<CreateSnapshotResponseBodyPost>> {
  try {
    // Task: Create a snapshot for the current logged in user
    // 1. Get the snapshot data from the request
    const body = await request.json();

    // 3. Get the token from the cookie
    const sessionTokenCookie = await getCookie('sessionToken');

    if (!sessionTokenCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 },
      );
    }

    // 4. Create the snapshot
    const newSnapshot = await createSnapshot(
      sessionTokenCookie,
      body.title,
      body.sounds,
      body.location, // Add location parameter
      body.pin, // Add pin parameter
    );

    // 5. If the snapshot creation fails, return an error
    if (!newSnapshot) {
      return NextResponse.json(
        { error: 'Snapshot not created or access denied creating snapshot' },
        { status: 400 },
      );
    }

    // 6. Return the text content of the snapshot
    return NextResponse.json({
      snapshot: { sounds: newSnapshot.sounds },
    });
  } catch (error) {
    console.error('Error creating snapshot:', error);
    return NextResponse.json(
      {
        error: `Failed to create snapshot: ${error instanceof Error ? error.message : String(error)}`,
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
): Promise<NextResponse<{ message?: string; error?: string }>> {
  // 1. Parse the snapshot ID from the request URL
  const url = new URL(request.url);
  const snapshotId = url.searchParams.get('id');

  if (!snapshotId) {
    return NextResponse.json(
      { error: 'Snapshot ID is required' },
      { status: 400 },
    );
  }

  // Convert snapshotId to a number since `deleteSnapshot` expects a number
  const snapshotIdNumber = parseInt(snapshotId, 10);
  if (isNaN(snapshotIdNumber)) {
    return NextResponse.json({ error: 'Invalid Snapshot ID' }, { status: 400 });
  }

  // 2. Get the token from the cookie
  const sessionTokenCookie = await getCookie('sessionToken');

  if (!sessionTokenCookie) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // 3. Attempt to delete the snapshot
  const deletedSnapshot = await deleteSnapshot(
    sessionTokenCookie,
    snapshotIdNumber,
  );

  if (!deletedSnapshot) {
    return NextResponse.json(
      { error: 'Failed to delete snapshot or access denied' },
      { status: 400 },
    );
  }

  // 4. Return a success response
  return NextResponse.json({ message: 'Snapshot deleted successfully' });
}
