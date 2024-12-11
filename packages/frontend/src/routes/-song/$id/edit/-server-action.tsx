/*
'use server';
import { db } from '@/db';
import { songsTable } from '@/db/schema/song';
import { eq, InferInsertModel } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export async function updateSongById(
  id: number,
  song: Partial<Omit<InferInsertModel<typeof songsTable>, 'id'>>
) {
  console.log('???', id, song);
  await db
    .update(songsTable)
    .set(song)
    .where(eq(songsTable.id, id))
    .returning();
  revalidatePath('/', 'layout');
}
*/
