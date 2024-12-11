/*
'use server';

import { db } from '@/db';
import { usersTable } from '@/db/schema/user';
import { eq, InferInsertModel } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateUser(
  user: Partial<Omit<InferInsertModel<typeof usersTable>, 'id'>>,
  id: string
) {
  await db.update(usersTable).set(user).where(eq(usersTable.id, id));
  revalidatePath('/', 'layout');
}
*/
