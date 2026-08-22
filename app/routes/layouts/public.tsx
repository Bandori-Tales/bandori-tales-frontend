import { Suspense } from 'react';
import { Outlet } from 'react-router';

import Loading from '@/components/helper/loading';
import Footer from '@/components/ui/footer';
import Navbar from '@/components/ui/navbar';

export default function PublicLayout() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="overflow-hidden">
        <Navbar />
        <Outlet />
        <Footer />
      </main>
    </Suspense>
  );
}
