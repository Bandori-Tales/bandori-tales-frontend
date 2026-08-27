import type { Dayjs } from 'dayjs';
import { BotMessageSquare, ExternalLink, Milestone } from 'lucide-react';
import { Link } from 'react-router';

import { useIsMobile } from '@/hooks/use-mobile';

import { Text } from '@/components/helper/text';
import { Button } from '@/components/ui/button';

import type { CharacterData } from '@/constants';

import { BirthdayCard } from '../components/birthday-card';

export function HeroContent({
  todayDate,
  birthdayData,
}: {
  todayDate: Dayjs;
  birthdayData: CharacterData[];
}) {
  const isMobile = useIsMobile();

  return (
    <section className="relative flex h-svh w-full items-center justify-center bg-[url(/images/bg_hero.webp)] bg-cover bg-position-[center_0px] bg-no-repeat lg:bg-position-[center_12px]">
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 bg-linear-to-b from-45% from-mauve-100/0 to-mauve-100 px-2 sm:px-8">
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <div className="drop-shadow-[0_10px_8px_rgba(0,0,0,1)]">
            <Text
              type={isMobile ? 'h2' : 'h1'}
              weight="extrabold"
              className="bg-[linear-gradient(30deg,#FFC562_0%,#BD4057_51%,#BD4057_66%,#3B8D9A_88%,#3B8D9A_100%)] bg-clip-text text-center font-racing-sans text-transparent [-webkit-text-stroke:3px_white] sm:[-webkit-text-stroke:4px_white]"
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
                className="w-60"
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
                className="w-60"
              >
                <Link to="/tools/yunogpt">Yuno GPT</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex h-fit w-full flex-col items-center justify-center gap-2.5 py-4">
          <div>
            <Text
              type="h6"
              weight="extrabold"
              lineHeight={9}
              className="text-primary text-shadow-black/50 text-shadow-lg [-webkit-text-stroke:1px_white]"
            >
              Upcoming Birthday
            </Text>
          </div>

          <div className="justify-baseline flex w-full flex-row items-center gap-2.5 overflow-scroll py-2 xl:justify-center">
            {birthdayData.map((data) => (
              <BirthdayCard
                key={Array.isArray(data.fullname[0]) ? data.fullname[0] : (data.fullname as string)}
                todayDate={todayDate}
                birthdayDateString={data.birthday_date}
                nickname={data.nickname}
                profile_picture={data.profile_picture}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
