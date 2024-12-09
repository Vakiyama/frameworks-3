import { db } from '@/db';
import { songsTable } from '@/db/schema/song';
import { eq } from 'drizzle-orm';

export async function getSongById(id: number) {
  return (await db.select().from(songsTable).where(eq(songsTable.id, id)))[0];
}
