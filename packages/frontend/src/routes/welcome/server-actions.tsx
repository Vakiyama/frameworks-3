'use server';
import { db } from '@/db';
import { usersTable } from '@/db/schema/user';
import { eq, InferInsertModel } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function getUserDB(id: string) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id));
  if (!result[0]) return null;
  return result[0];
}

export async function createUser(user: InferInsertModel<typeof usersTable>) {
  await db.insert(usersTable).values(user);
  revalidatePath('/', 'layout');
}
