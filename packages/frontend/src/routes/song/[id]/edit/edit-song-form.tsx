'use client';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { twMerge } from 'tailwind-merge';

import { updateSongById } from '../edit/server-action';
import { genresEnum, songsTable } from '@/db/schema/song';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { InferSelectModel } from 'drizzle-orm';
import { useRouter } from 'next/navigation';

// Define the Zod schema including file validation
const editSongFormSchema = z.object({
  name: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title is too long, must be less than 50 characters.'),
  artist: z
    .string()
    .min(1, 'Artist name is required')
    .max(50, 'Artist name is too long, must be less than 50 characters.'),
  album: z
    .string()
    .min(1, 'Album name is required')
    .max(50, 'Album name is too long, must be less than 50 characters.'),
  genre: z.enum(genresEnum),
});

type EditSongSchemaType = z.infer<typeof editSongFormSchema>;

export function EditSongForm(props: {
  song: InferSelectModel<typeof songsTable>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditSongSchemaType>({
    resolver: zodResolver(editSongFormSchema),
  });

  const router = useRouter();

  async function onSubmit(formData: EditSongSchemaType) {
    console.log(formData, '????');
    await updateSongById(props.song.id, formData);
    setTimeout(() => {
      router.push(`/song/${props.song.id}/play`);
    }, 500);
  }

  return (
    <div className="px-4 text-white">
      <form // ik it's a duplicate and i could refactor it i just ran out of time
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge(`p-1 bg-light rounded-lg mt-8 w-full`)}
      >
        <div className="bg-dark rounded p-4 flex flex-col gap-3 justify-center w-full">
          <h1 className="text-3xl">Edit</h1>
          <label className="text-xl">Song Title</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            placeholder="Song name..."
            defaultValue={props.song.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-red-500">{errors.name.message}</p>
          )}

          <label className="text-xl">Artist</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            defaultValue={props.song.artist}
            placeholder="Artist name..."
            {...register('artist')}
          />
          {errors.artist && (
            <p className="text-red-500">{errors.artist.message}</p>
          )}

          <label className="text-xl">Album</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            placeholder="Album name..."
            defaultValue={props.song.album}
            {...register('album')}
          />
          {errors.album && (
            <p className="text-red-500">{errors.album.message}</p>
          )}

          <label className="text-xl">Genre</label>
          <select
            defaultValue={props.song.genre}
            className="p-2 rounded placeholder:text-gray-600 text-black"
            {...register('genre')}
          >
            {genresEnum.map((genre) => (
              <option key={genre}>{genre}</option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 p-2 bg-lightest rounded text-black hover:opacity-80"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
