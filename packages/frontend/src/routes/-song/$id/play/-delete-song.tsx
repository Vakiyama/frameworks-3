// import { deleteSong } from '../../upload/server-actions';
import { useNavigate } from '@tanstack/react-router';

export function DeleteSong(props: { songId: number }) {
  const navigate = useNavigate({ from: '/song/$id/play/delete-song' });

  async function handleClick() {
    // await deleteSong(props.songId);
    navigate({ to: '/' });
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
