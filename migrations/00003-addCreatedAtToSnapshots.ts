import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  // First add columns without default
  await sql`
    ALTER TABLE snapshots
    ADD COLUMN created_at timestamp NULL,
    ADD COLUMN location varchar(255),
    ADD COLUMN pin jsonb
  `;

  // Then set default for future records only
  await sql`
    ALTER TABLE snapshots
    ALTER COLUMN created_at
    SET DEFAULT CURRENT_TIMESTAMP
  `;
}

export async function down(sql: Sql) {
  await sql`
    ALTER TABLE snapshots
    DROP COLUMN pin,
    DROP COLUMN location,
    DROP COLUMN created_at
  `;
}
