import { Outlet } from 'react-router';

import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';

import { AboutMenubar } from '../components/menubar';

export default function AboutPageLayout() {
  const isMobile = useIsMobile({ isTablet: true });

  return (
    <div
      className={cn(
        'flex h-full min-h-screen w-full flex-col items-center bg-linear-to-t from-rose-100 to-background px-3 pb-5 sm:px-5 dark:from-[#1E0009]',
        isMobile ? 'px-4 pt-3' : 'px-6 pt-20'
      )}
    >
      <div className="flex w-full flex-row justify-center sm:justify-start">
        <AboutMenubar />
      </div>

      <div className="flex w-full flex-1 flex-col items-center justify-between rounded-md rounded-tl-none border border-border border-b-2 bg-white p-3 pb-0 max-[730px]:rounded-tr-none sm:p-5 sm:pb-0 dark:bg-mauve-800">
        <div className="w-full">
          <Outlet />
        </div>

        <div className="relative mt-8 flex h-25 w-full items-end justify-center">
          <Image
            alt="About Sillies"
            src="/images/about/about_sillies.webp"
            className="absolute -bottom-px w-72"
          />
        </div>
      </div>
    </div>
  );
}
