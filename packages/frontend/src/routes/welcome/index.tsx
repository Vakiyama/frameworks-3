import { Suspense } from 'react';
import { Welcome } from './-welcome';
// import { getUserDB } from './server-actions';
import { createFileRoute, useNavigate } from '@tanstack/react-router';

export const Route = createFileRoute('/welcome/')({
  component: WelcomePage,
});

function WelcomePage() {
  // const { getUser, isAuthenticated } = getKindeServerSession();
  const navigate = useNavigate({ from: '/welcome' });

  // const authenticated = await isAuthenticated();
  // if (!authenticated) return navigate({ to: '/login' });
  // const user = await getUser();
  // if (await getUserDB(user.id)) return navigate({ to: '/' });

  return (
    <Suspense>
      <Welcome kindeId={user.id} kindeProfilePictureUrl={user.picture} />
    </Suspense>
  );
}
