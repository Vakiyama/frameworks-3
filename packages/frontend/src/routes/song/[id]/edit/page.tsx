import { getSongById } from '../play/server-action';
import { EditSongForm } from './edit-song-form';

export default async function EditSong(props: { params: { id: string } }) {
  const song = getSongById(parseInt(props.params.id));
  return <EditSongForm song={await song} />;
}
