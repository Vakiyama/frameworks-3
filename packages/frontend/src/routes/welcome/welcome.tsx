'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createUser } from './server-actions';

export const welcomeFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Username must not be empty.' })
    .max(21, { message: 'Username must be less than 20 characters long.' }),
});

export type WelcomeFormSchema = z.infer<typeof welcomeFormSchema>;

export function Welcome(props: {
  kindeId: string;
  kindeProfilePictureUrl: string | null;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeFormSchema>({
    resolver: zodResolver(welcomeFormSchema),
  });

  async function onSubmit(welcomeFormSchema: WelcomeFormSchema) {
    const userDetails = {
      id: props.kindeId,
      name: welcomeFormSchema.name,
      profilePictureUrl: props.kindeProfilePictureUrl,
    };
    await createUser(userDetails);
    setTimeout(() => router.push('/'), 500);
  }

  return (
    <div className="px-4 flex flex-col items-center justify-center">
      <div className="bg-light w-full mt-8 rounded p-2">
        <h1 className="text-2xl">Welcome!</h1>
        <form
          className="mt-4 flex flex-col gap-2"
          onSubmit={handleSubmit(onSubmit)}
        >
          <label>What is your username?</label>
          <input
            className="px-2 rounded"
            type="text"
            {...register('name')}
            placeholder="username..."
          />
          {errors.name && <p className="text-text">{errors.name.message}</p>}
          <button
            type="submit"
            className="bg-dark text-white rounded px-4 py-1"
          >
            <span>Submit</span>
          </button>
        </form>
      </div>
    </div>
  );
}
