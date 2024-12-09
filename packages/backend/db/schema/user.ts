import { InferSelectModel } from 'drizzle-orm';
import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('user', {
  id: text().primaryKey(),
  name: text().notNull(),
  profilePictureUrl: text(),
});

export type User = InferSelectModel<typeof usersTable>;
