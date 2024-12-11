// import { getUserServer } from '@/hooks/auth';
import { ExportSongForm } from './-export-song-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/song/upload/')({
  component: UploadSong,
});

export function UploadSong() {
  // const user = await getUserServer();
  return; // <ExportSongForm user={user} />;
}
