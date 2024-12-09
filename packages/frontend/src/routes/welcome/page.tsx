import { Suspense } from 'react';
import { Welcome } from './welcome';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import { getUserServer } from '@/hooks/auth';
import { getUserDB } from './server-actions';

export default async function WelcomePage() {
  const { getUser, isAuthenticated } = getKindeServerSession();

  const authenticated = await isAuthenticated();
  if (!authenticated) return redirect('/login');
  const user = await getUser();
  if (await getUserDB(user.id)) return redirect('/');

  return (
    <Suspense>
      <Welcome kindeId={user.id} kindeProfilePictureUrl={user.picture} />
    </Suspense>
  );
}
