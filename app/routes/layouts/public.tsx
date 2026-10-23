import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { getUserProfileSettings } from '@/lib/profile';

import Loading from '@/components/helper/loading';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

import type { Route } from './+types/public';

export function clientLoader() {
  const profileSettings = getUserProfileSettings();

  return {
    userProfile: profileSettings,
  };
}

export default function PublicLayout({ loaderData }: Route.ComponentProps) {
  return (
    <Suspense fallback={<Loading />}>
      <main className="overflow-hidden">
        <Navbar userProfile={loaderData.userProfile} />
        <Outlet />
        <Footer />
      </main>
    </Suspense>
  );
}
