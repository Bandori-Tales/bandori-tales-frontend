import { useIsMobile } from '@/hooks/use-mobile';
import { generateMeta } from '@/lib/generate-meta';
import { cn } from '@/lib/utils';

import CardPageSection from '@/components/shared/card-page/card-section';

import { GameFeatures } from '@/constants';

export function meta() {
  return generateMeta({ title: 'Games' });
}

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
        sectionName="Games"
        items={GameFeatures.internal}
        isMobile={isMobile}
        isExternal={false}
      />
      <CardPageSection
        sectionName="Other Games"
        items={GameFeatures.other}
        isMobile={isMobile}
        isExternal={true}
      />
    </div>
  );
}
