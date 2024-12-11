import { createFileRoute } from '@tanstack/react-router';
// import { getSongById } from '../play/server-action';
import { EditSongForm } from './-edit-song-form';

export const Route = createFileRoute('/song/$id/edit/');

function EditSong(props: { params: { id: string } }) {
  // const song = getSongById(parseInt(props.params.id));
  return <EditSongForm song={song} />;
}
