import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

import CardPageSection from '@/components/shared/card-page/card-section';

import { ToolFeatures } from '@/constants';

export default function ToolsPage() {
  const isMobile = useIsMobile();

  return (
    <div
      className={cn(
        'min-h-screen w-full bg-linear-to-t from-rose-100 to-background pb-6',
        isMobile ? 'px-4 pt-0' : 'px-6 pt-16'
      )}
    >
      <CardPageSection
        section_name="Tools"
        items={ToolFeatures.internal}
        isMobile={isMobile}
        isExternal={false}
      />
      <CardPageSection
        section_name="Other Tools"
        items={ToolFeatures.other}
        isMobile={isMobile}
        isExternal={true}
      />
    </div>
  );
}
