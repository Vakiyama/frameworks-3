// import { getUserServer } from '@/hooks/auth';
import { DeleteSong } from './-delete-song';
// import { getSongById } from './server-action';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/song/$id/play/');

function PlaySong(props: { params: { id: string } }) {
  const navigate = useNavigate({ from: '/song/$id/play' });

  return (
    <div className="px-4 flex flex-col items-center justify-center">
      <div className="bg-light w-full mt-8 rounded p-2 flex flex-col gap-2">
        {[
          `Title - ${song.name}`,
          `Artist - ${song.artist}`,
          `Album - ${song.album}`,
          `Genre - ${song.genre}`,
        ].map((text, index) => (
          <div className="py-1 px-4 rounded bg-dark" key={index}>
            <p className="text-white text-lg">{text}</p>
          </div>
        ))}
        <div className="mt-4">
          <audio
            className="w-full rounded bg-darkest"
            controls
            src={song.url}
          ></audio>
        </div>
        <Link
          href={`/song/${song.id}/edit`}
          className="font-semibold flex flex-row justify-center w-full bg-light rounded border-2 border-dark py-1 text-black hover:opacity-80 cursor-pointer"
        >
          Edit
        </Link>
        <DeleteSong songId={song.id} />
      </div>
    </div>
  );
}
