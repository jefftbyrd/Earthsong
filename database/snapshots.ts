import { cache } from 'react';
import type { Session } from '../migrations/00001-sessions';
import type { Snapshot } from '../migrations/00002-createTableSnapshots';
import { sql } from './connect';

export const getSnapshots = cache(async (sessionToken: string) => {
  const snapshots = await sql<Snapshot[]>`
    SELECT
      snapshots.id,
      snapshots.user_id,
      snapshots.title,
      snapshots.sounds,
      snapshots.location,
      snapshots.pin,
      snapshots.created_at at time zone 'UTC' created_at
    FROM
      snapshots
      INNER JOIN sessions ON (
        sessions.token = ${sessionToken}
        AND sessions.user_id = snapshots.user_id
        AND expiry_timestamp > now()
      )
  `;
  return snapshots;
});

export const getSnapshot = cache(
  async (sessionToken: string, snapshotId: number) => {
    const [snapshot] = await sql<Snapshot[]>`
      SELECT
        snapshots.id,
        snapshots.user_id,
        snapshots.title,
        snapshots.sounds,
        snapshots.location,
        snapshots.pin,
        snapshots.created_at at time zone 'UTC' created_at
      FROM
        snapshots
        INNER JOIN sessions ON (
          sessions.token = ${sessionToken}
          AND sessions.user_id = snapshots.user_id
          AND expiry_timestamp > now()
        )
      WHERE
        snapshots.id = ${snapshotId}
    `;
    return snapshot;
  },
);

export const createSnapshot = cache(
  async (
    sessionToken: Session['token'],
    title: string,
    sounds: any,
    location?: string | null,
    pin?: any | null,
  ) => {
    const [snapshot] = await sql<Snapshot[]>`
      INSERT INTO
        snapshots (
          user_id,
          sounds,
          title,
          location,
          pin
        ) (
          SELECT
            sessions.user_id,
            ${sounds},
            ${title},
            ${location || null},
            ${pin || null}
          FROM
            sessions
          WHERE
            token = ${sessionToken}
            AND sessions.expiry_timestamp > now()
        )
      RETURNING
        snapshots.*
    `;

    return snapshot;
  },
);

export const deleteSnapshot = cache(
  async (sessionToken: Session['token'], id: number) => {
    const [snapshot] = await sql<Snapshot[]>`
      DELETE FROM snapshots USING sessions
      WHERE
        sessions.token = ${sessionToken}
        AND sessions.expiry_timestamp > now()
        AND snapshots.id = ${id}
      RETURNING
        snapshots.*
    `;

    return snapshot;
  },
);
