import type { Dayjs } from 'dayjs';

import { JapanTZ, JpDate } from '@/lib/jp-date';
import { cn } from '@/lib/utils';

import Image from '@/components/helper/image';
import { Text } from '@/components/helper/text';

export function BirthdayCard({
  todayDate,
  birthdayDateString,
  nickname,
  profile_picture,
}: {
  todayDate: Dayjs;
  birthdayDateString: string;
  nickname: string | string[];
  profile_picture: string | string[];
}) {
  const birthdayDate = JpDate(birthdayDateString).tz(JapanTZ).startOf('day');
  const isBirthday =
    todayDate.startOf('day') <= birthdayDate && birthdayDate <= todayDate.startOf('day');

  const birthdayString = isBirthday ? 'Today!' : `${birthdayDate.format('MMM, DD')}`;
  const nicknameString = Array.isArray(nickname) ? nickname[0] : (nickname as string);
  const profilePictureString = Array.isArray(profile_picture)
    ? profile_picture[0]
    : (profile_picture as string);

  return (
    <div
      className={cn(
        'flex h-fit w-fit shrink-0 flex-row items-center justify-start gap-2 rounded-lg px-4 py-2 drop-shadow-black/20 drop-shadow-lg',
        isBirthday ? 'border-2 border-cyan-500 bg-white' : 'border border-primary bg-slate-50'
      )}
    >
      <div className="relative flex h-14 w-14 rounded-full">
        {isBirthday && (
          <Image
            src="/images/party_hat.webp"
            alt="party hat"
            className="absolute -top-5 right-0.5 h-fit w-8 rotate-20"
          />
        )}
        <Image
          src={profilePictureString}
          alt={nicknameString}
          className="aspect-square h-fit w-full rounded-full"
        />
      </div>

      <div className="flex h-fit w-33.75 flex-col items-baseline justify-center gap-1">
        <Text
          type="st1"
          weight={isBirthday ? 'bold' : 'semibold'}
          lineHeight={7}
          className="text-primary"
        >
          {nicknameString}
        </Text>
        <Text
          type="st2"
          weight={isBirthday ? 'semibold' : 'medium'}
          className={cn(isBirthday ? 'text-cyan-400' : 'text-mauve-600')}
        >
          {birthdayString}
        </Text>
      </div>
    </div>
  );
}
