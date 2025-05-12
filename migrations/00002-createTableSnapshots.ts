import type { Sql } from 'postgres';
import { z } from 'zod';
import type { Sounds } from '../app/context/soundsContext';

export type Snapshot = {
  id: number;
  title: string;
  sounds: Sounds;
  userId: number;
  location?: string | null;
  pin?: any | null;
  created_at?: Date;
};

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE snapshots (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       title varchar(200) NOT NULL UNIQUE,
//       -- date date NOT NULL DEFAULT CURRENT_DATE,
//       sounds jsonb NOT NULL,
//       user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
//     )
//   `;
// }

export const snapshotSchema = z.any();

// export const snapshotSchema = z.object({
//   // title: z.string().min(3).max(100),
//   sounds: z.any(),
// });

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE snapshots (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title varchar(255) NOT NULL UNIQUE,
      sounds json NOT NULL,
      user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
    )
  `;
}

// export async function up(sql: Sql) {
//   await sql`
//     CREATE TABLE snapshots (
//       id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
//       title varchar(100) NOT NULL UNIQUE,
//       text_content text NOT NULL,
//       user_id integer NOT NULL REFERENCES users (id) ON DELETE cascade
//     )
//   `;
// }

export async function down(sql: Sql) {
  await sql`DROP TABLE snapshots`;
}
