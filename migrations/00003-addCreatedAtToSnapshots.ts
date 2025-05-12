import type { Sql } from 'postgres';

export async function up(sql: Sql) {
  await sql`
    ALTER TABLE snapshots
    ADD COLUMN created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    ADD COLUMN location varchar(255),
    ADD COLUMN pin jsonb
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
