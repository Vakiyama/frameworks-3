'use client';
import { LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';

import { useForm } from 'react-hook-form';
import { welcomeFormSchema, WelcomeFormSchema } from '../welcome/welcome';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@/db/schema/user';
import { updateUser } from './server-actions';

export function ProfileForm(props: { user: User }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WelcomeFormSchema>({
    resolver: zodResolver(welcomeFormSchema),
  });

  async function onSubmit(formData: WelcomeFormSchema) {
    await updateUser(formData, props.user.id);
  }

  return (
    <form
      className="mt-4 flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label>Update Username</label>
      <input
        className="px-2 rounded text-black"
        type="text"
        {...register('name')}
        placeholder="username..."
        defaultValue={props.user.name}
      />
      {errors.name && <p className="text-text">{errors.name.message}</p>}
      <button type="submit" className="bg-dark text-white rounded px-4 py-1">
        <span>Update</span>
      </button>
      <LogoutLink className="bg-light border-dark border-2 text-black rounded px-4 py-1 flex justify-center">
        <span>Logout</span>
      </LogoutLink>
    </form>
  );
}
