'use client';

import { useRouter } from 'next/navigation';
import { deleteSong } from '../../upload/server-actions';

export function DeleteSong(props: { songId: number }) {
  const router = useRouter();

  async function handleClick() {
    await deleteSong(props.songId);
    router.push('/');
  }
  return (
    <button
      onClick={handleClick}
      className="w-full bg-light rounded border-2 border-dark py-1 text-black hover:opacity-80 cursor-pointer"
    >
      <span className="font-semibold">Delete Song</span>
    </button>
  );
}
