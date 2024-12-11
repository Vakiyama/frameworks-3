import { Suspense } from 'react';
import { ProfileForm } from './-profile-form';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/profile/');

function Profile() {
  return (
    <div className="flex flex-col items-center h-full text-white px-4 w-full">
      <div className="bg-light w-full mt-8 rounded p-2">
        <h1 className="text-2xl">Profile</h1>
        <Suspense>
          {/* <ProfileForm user={await getUserServer()} /> */}
        </Suspense>
      </div>
    </div>
  );
}
