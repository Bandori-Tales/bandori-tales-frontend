import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import CardPageSection from '@/components/shared/card-page/card-section';

import { GameFeatures } from '@/constants';

export default function GamesPage() {
  const isMobile = useIsMobile({ isTablet: true });

  return (
    <div
      className={cn(
        'min-h-screen w-full bg-linear-to-t from-rose-100 to-background pb-6',
        isMobile ? 'px-4 pt-0' : 'px-6 pt-20'
      )}
    >
      <CardPageSection
        section_name="Games"
        items={GameFeatures.internal}
        isMobile={isMobile}
        isExternal={false}
      />
      <CardPageSection
        section_name="Other Games"
        items={GameFeatures.other}
        isMobile={isMobile}
        isExternal={true}
      />
    </div>
  );
}
