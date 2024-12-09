import { getUserServer } from '@/hooks/auth';
import { ExportSongForm } from './export-song-form';

export default async function UploadSong() {
  const user = await getUserServer();
  return <ExportSongForm user={user} />;
}
