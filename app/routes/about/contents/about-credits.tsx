import { ExternalLink, FileText, Lightbulb, type LucideIcon, TvMinimalPlay } from 'lucide-react';
import { Link } from 'react-router';

import { generateMeta } from '@/lib/generate-meta';

import { Text } from '@/components/helper/text';

import { AboutCredits, type Credit } from '@/constants';

function CreditsSection({
  title,
  icon,
  items,
}: {
  title: string;
  icon: LucideIcon;
  items: Credit[];
}) {
  const Icon = icon;

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex flex-row items-center gap-1">
        <Icon className="size-4 stroke-3 text-accent" />
        <Text type="st2" weight="semibold" className="text-nowrap text-accent">
          {title}
        </Text>
      </div>

      <div className="mr-2 flex flex-col gap-4 pl-5">
        {items.map((item) => (
          <div key={item.name} className="flex flex-col gap-1">
            <Link
              to={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit flex-row items-center gap-1 border-b border-b-transparent bg-transparent pb-0.5 text-foreground-lighter transition-colors hover:border-b-foreground-lighter hover:bg-transparent"
            >
              <Text type="p" weight="semibold" lineHeight={5} className="underline lg:no-underline">
                {item.name}
              </Text>
              <ExternalLink className="hidden size-3 stroke-3 lg:block" />
            </Link>
            {item.note && (
              <Text
                type="btn"
                weight="medium"
                lineHeight={4}
                className="text-slate-500 dark:text-foreground/90"
              >
                {item.note}
              </Text>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function meta() {
  return generateMeta({
    title: 'Credits',
  });
}

export default function AboutCreditOutlet() {
  return (
    <>
      <Text type="h6" weight="bold" className="w-full pb-3 text-center text-foreground">
        Credits
      </Text>
      <div className="flex h-full w-full flex-col gap-5">
        <CreditsSection
          title="Youtube Uploader"
          icon={TvMinimalPlay}
          items={AboutCredits.youtube_uploader}
        />
        <CreditsSection title="Inspiration" icon={Lightbulb} items={AboutCredits.inspiration} />
        <CreditsSection title="Assets" icon={FileText} items={AboutCredits.assets} />
      </div>
    </>
  );
}
