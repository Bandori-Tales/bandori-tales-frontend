import {
  Book,
  DiscAlbum,
  Info,
  Joystick,
  type LucideIcon,
  MessageCircle,
  Milestone,
  Music4,
  Wrench,
} from 'lucide-react';

export interface SiteFeature {
  title: string;
  description: string;
  href: string;
  author?: string;
  isDisabled?: boolean;
  icon?: LucideIcon;
  profilePicture?: string;
}

export interface NavbarItem {
  icon?: LucideIcon;
  title: string;
  href: string;
  isDisabled?: boolean;
  subNav?: {
    subTitle: string;
    items: NavbarItem[];
  };
}

export const MainFeatures = [
  {
    title: 'Story Tracker',
    description: 'Lorem Ipsum',
    href: 'story-tracker',
    icon: Milestone,
    isDisabled: true,
  },
  {
    title: 'Story Arc',
    description: 'Lorem Ipsum',
    href: 'story-arc',
    icon: Book,
    isDisabled: true,
  },
  {
    title: 'Songs',
    description: 'Lorem Ipsum',
    href: 'songs',
    icon: DiscAlbum,
    isDisabled: true,
  },
  {
    title: 'Interaction',
    description: 'Lorem Ipsum',
    href: 'interaction',
    icon: MessageCircle,
    isDisabled: true,
  },
] satisfies SiteFeature[];

export const ToolFeatures = {
  internal: [
    {
      title: 'Yuno GPT',
      description: 'Lorem Ipsum',
      href: 'tools/yunogpt',
      profilePicture: '/images/tools/yunogpt/yunogpt_icon.webp',
    },
    {
      title: 'Sticker Garage',
      description: 'Lorem Ipsum',
      href: 'tools/sticker-garage',
      profilePicture: '/images/tools/garage/sticker_garage.webp',
      isDisabled: true,
    },
  ] satisfies SiteFeature[],
  other: [
    {
      title: 'Bestdori',
      description: 'Lorem Ipsum',
      href: 'https://bestdori.com',
      profilePicture: '/images/tools/other/bestdori.webp',
    },
    {
      title: 'Bandori Party',
      description: 'Lorem Ipsum',
      href: 'https://bestdori.com',
      profilePicture: '/images/tools/other/bandoriparty.webp',
    },
    {
      title: 'Hina-is',
      description: 'Lorem Ipsum',
      href: 'https://hina-is.notsweet.workers.dev/',
      profilePicture: '/images/tools/other/bandoriparty.webp',
    },
  ] satisfies SiteFeature[],
};

export const GameFeatures = {
  internal: [] satisfies SiteFeature[],
  other: [
    {
      title: 'Garupa Tower Battle (Remake)',
      description:
        'A remake of the Garupa Tower Battle Minigame from BanG Dream! April Fools 2020 on the JP Server.',
      author: 'thebuddyadrian',
      href: 'https://thebuddyadrian.itch.io/garupa-tower-battle-remake',
      profilePicture: '/images/games/other/garupatower.webp',
    },
    {
      title: 'Puzzle Pico',
      description:
        'A BanG Dream! puzzle game inspired by Garupa Pico OHMORI. Feat. RAISE A SUILEN & Morfonica.',
      author: 'thebuddyadrian',
      href: 'https://thebuddyadrian.itch.io/garupa-tower-battle-remake',
      profilePicture: '/images/games/other/puzzlepico.webp',
    },
    {
      title: 'BanG Dream! ARENA',
      description:
        'A fan made platform fighting game featuring characters and stages from the BanG Dream! franchise.',
      author: 'thebuddyadrian',
      href: 'https://thebuddyadrian.itch.io/bang-dream-arena-godot-ver',
      profilePicture: '/images/games/other/bandoriarena.webp',
    },
    {
      title: 'Find Me!',
      description: 'Find all cards of a Garupa character from a list of 9 cards!',
      author: 'Bestdori',
      href: 'https://bestdori.com/game/findme',
      profilePicture: '/images/games/other/findme.webp',
    },
    {
      title: 'Guess Who?',
      description: 'Guess the Garupa character from a card of hers!',
      author: 'Bestdori',
      href: 'https://bestdori.com/game/guesswho',
      profilePicture: '/images/games/other/guesswho.webp',
    },
    {
      title: 'Chart Master',
      description: 'Identify Garupa song and time from its chart!',
      author: 'Bestdori',
      href: 'https://bestdori.com/game/chartmaster',
      profilePicture: '/images/games/other/chartmaster.webp',
    },
  ] satisfies SiteFeature[],
};

export const NavbarItems = [
  {
    icon: Music4,
    title: 'Bandori',
    href: '#',
    isDisabled: true,
    subNav: {
      subTitle: 'BanG Dream!',
      items: MainFeatures.map((feature) => ({
        title: feature.title,
        href: feature.href,
        icon: feature.icon,
      })),
    },
  },
  {
    icon: Wrench,
    title: 'Tools',
    href: '/tools',
    isDisabled: true,
  },
  {
    icon: Joystick,
    title: 'Games',
    href: '/games',
    isDisabled: true,
  },
  {
    icon: Info,
    title: 'About',
    href: '/about/us',
    isDisabled: true,
  },
] satisfies NavbarItem[];
