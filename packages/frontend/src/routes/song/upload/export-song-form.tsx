'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSong, getSignedURL } from './server-actions';
import { genresEnum } from '@/db/schema/song';
import { useState } from 'react';
import { User } from '@/db/schema/user';
import { useRouter } from 'next/navigation';
import { twMerge } from 'tailwind-merge';

// Define the Zod schema including file validation
export const uploadSongFormSchema = z.object({
  song: z
    .instanceof(FileList)
    .refine((value) => value instanceof FileList && value.length === 1, {
      message: 'Please upload one file',
    })
    .transform((fileList) => fileList[0])
    .refine((file) => file.size <= 10 * 1024 * 1024, {
      message: 'File size should be less than 10MB',
    })
    .refine((file) => file.type === 'audio/mpeg', {
      message: 'Only MP3 files are accepted',
    }),
  title: z
    .string()
    .min(1, 'Title is required')
    .max(50, 'Title is too long, must be less than 50 characters.'),
  artistName: z
    .string()
    .min(1, 'Artist name is required')
    .max(50, 'Artist name is too long, must be less than 50 characters.'),
  albumName: z
    .string()
    .min(1, 'Album name is required')
    .max(50, 'Album name is too long, must be less than 50 characters.'),
  genre: z.enum(genresEnum),
});

export type UploadSongSchemaType = z.infer<typeof uploadSongFormSchema>;

export function ExportSongForm(props: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UploadSongSchemaType>({
    resolver: zodResolver(uploadSongFormSchema),
  });

  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (data: UploadSongSchemaType) => {
    if (uploading) return;
    setUploading(true);
    const file = data.song;
    const computeSHA256 = async (file: File) => {
      const buffer = await file.arrayBuffer();
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
      return hashHex;
    };
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
    });
    if (signedURLResult.failure !== undefined) {
      console.error(signedURLResult.failure);
      setUploading(false);
      return;
    }

    const { url } = signedURLResult.success;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    });

    if (response.ok) {
      await createSong({
        userId: props.user.id,
        name: data.title,
        genre: data.genre,
        artist: data.artistName,
        album: data.albumName,
        url: url.split('?')[0],
      });
      router.push('/');
    } else
      setUploadError(
        'An error occurred while uploading your file. Please try again.'
      );
    setUploading(false);
  };

  return (
    <div className="flex flex-col items-center h-full text-white px-4 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={twMerge(
          `p-1 bg-light rounded-lg mt-8 w-full`,
          uploading ? 'opacity-80 select-none' : ''
        )}
      >
        <div className="bg-dark rounded p-4 flex flex-col gap-3 justify-center w-full">
          <label className="text-xl">Upload an MP3 file</label>
          <input type="file" accept=".mp3" {...register('song')} />
          {errors.song && <p className="text-red-500">{errors.song.message}</p>}

          <h2 className="text-2xl">Metadata</h2>

          <label className="text-xl">Song Title</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            placeholder="Song name..."
            {...register('title')}
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}

          <label className="text-xl">Artist</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            placeholder="Artist name..."
            {...register('artistName')}
          />
          {errors.artistName && (
            <p className="text-red-500">{errors.artistName.message}</p>
          )}

          <label className="text-xl">Album</label>
          <input
            className="p-2 rounded placeholder:text-gray-600 text-black"
            type="text"
            placeholder="Album name..."
            {...register('albumName')}
          />
          {errors.albumName && (
            <p className="text-red-500">{errors.albumName.message}</p>
          )}

          <label className="text-xl">Genre</label>
          <select
            className="p-2 rounded placeholder:text-gray-600 text-black"
            {...register('genre')}
          >
            {genresEnum.map((genre, index) => (
              <option selected={index === 0} key={genre}>
                {genre}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="mt-4 p-2 bg-lightest rounded text-black"
          >
            {uploading ? 'Loading...' : 'Upload'}
          </button>
          {uploadError && <p className="text-red-500">{uploadError}</p>}
        </div>
      </form>
    </div>
  );
}
