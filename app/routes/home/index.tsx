import { generateMeta } from '@/lib/generate-meta';
import { japanDate } from '@/lib/jp-date';

import { type CharacterData, Characters } from '@/constants';

import type { Route } from './+types/';
import { HeroContent } from './contents/hero';

export function meta() {
  return generateMeta({
    description: 'A Portal for multiple BanG Dream! tools (and fan games).',
    ogTitle: 'Bandori-Tales',
    ogDescription: 'A Portal for multiple BanG Dream! tools (and fan games).',
  });
}

export async function loader() {
  const todayDate = japanDate();
  const todayMonthDay = `${todayDate.format('MM-DD')}`;
  const todayYear = todayDate.year();

  const birthdayArray = Characters.map((character) => {
    if (todayMonthDay <= character.birthday_date)
      return {
        id: character.id,
        birthday_date: `${todayYear}-${character.birthday_date}`,
      };

    return {
      id: character.id,
      birthday_date: `${todayYear + 1}-${character.birthday_date}`,
    };
  }).sort((a, b) => (a.birthday_date > b.birthday_date ? 1 : -1));

  const birthdayData: (CharacterData & { isBirthday: boolean })[] = [];

  for (let i = 0; i < 5; i++) {
    const character = Characters.find((item) => item.id === birthdayArray[i].id);
    if (!character) continue;

    birthdayData.push({
      ...character,
      birthday_date: birthdayArray[i].birthday_date,
      isBirthday:
        todayDate.startOf('day') <= japanDate(birthdayArray[i].birthday_date).startOf('day') &&
        japanDate(birthdayArray[i].birthday_date).startOf('day') <= todayDate.startOf('day'),
    });
  }

  return {
    birthdayData,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return <HeroContent birthdayData={loaderData.birthdayData} />;
}
