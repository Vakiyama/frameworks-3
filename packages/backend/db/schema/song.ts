import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { usersTable } from './user';
import { sql } from 'drizzle-orm';

export const genresEnum = [
  'Rock',
  'Jazz',
  'Hip Hop',
  'Classical',
  'Electronic',
  'Pop',
] as const;

export const songsTable = sqliteTable('song', {
  id: integer().primaryKey({ autoIncrement: true }),
  url: text().notNull(),
  name: text().notNull(),
  artist: text().notNull(),
  genre: text({
    enum: genresEnum,
  }).notNull(),
  album: text().notNull(),
  userId: text('user_id')
    .references(() => usersTable.id)
    .notNull(),
  timestamp: text('timestamp')
    .notNull()
    .default(sql`(current_timestamp)`),
});
