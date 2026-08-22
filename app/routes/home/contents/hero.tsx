import { BotMessageSquare, ExternalLink, Milestone } from 'lucide-react';
import { Link } from 'react-router';

import { useIsMobile } from '@/hooks/use-mobile';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

export function HeroContent() {
  const isMobile = useIsMobile();

  return (
    <section className="relative flex h-svh w-full items-center justify-center bg-[url(/images/bg_hero.webp)] bg-cover bg-position-[center_0px] bg-no-repeat lg:bg-position-[center_12px]">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-linear-to-b from-45% from-mauve-100/0 to-mauve-100 px-2 sm:px-8">
        <div className="drop-shadow-[0_10px_8px_rgba(0,0,0,1)]">
          <Text
            type={isMobile ? 'h2' : 'h1'}
            weight="extrabold"
            className="bg-[linear-gradient(30deg,#FFC562_0%,#BD4057_51%,#BD4057_66%,#3B8D9A_88%,#3B8D9A_100%)] bg-clip-text text-center font-racing-sans text-transparent [-webkit-text-stroke:4px_white] sm:[-webkit-text-stroke:6px_white]"
          >
            COMING SOON
          </Text>
        </div>
        <Text
          type={isMobile ? 'p' : 't'}
          lineHeight={isMobile ? 5 : 8}
          weight="semibold"
          className="text-center text-shadow-lg/50 text-white"
        >
          Story tracker, list, timeline, etc. A Portal for multiple BanG Dream! tools (and fan
          games).
        </Text>

        <div className="justify-baseline flex flex-col items-center gap-3 text-center">
          <Text type="t" weight="bold" className="text-shadow-lg/40 text-white">
            Quick Access
          </Text>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              variant="default"
              colors="default"
              leftIcon={<Milestone className="stroke-3 text-white" />}
              rightIcon={<ExternalLink className="stroke-3 text-white" />}
            >
              <Link
                to="https://docs.google.com/spreadsheets/d/1g4MsZ_U7CbwCK7TcW_9_d-Q7CSGtK0R2M1B10XrZGns/edit"
                target="_blank"
                rel="noopener noreferrer"
              >
                Story Tracker (Temp.)
              </Link>
            </Button>

            <Button
              asChild
              variant="default"
              colors="default"
              leftIcon={<BotMessageSquare className="stroke-3 text-white" />}
            >
              <Link to="/tools/yunogpt">Yuno GPT</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
