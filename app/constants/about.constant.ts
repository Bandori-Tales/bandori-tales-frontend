import { Form, Heart, Info, type LucideIcon, MessageSquareCode, Scale } from 'lucide-react';
import { FaGithub } from 'react-icons/fa6';
import type { IconType } from 'react-icons/lib';

export interface AboutMenuItem {
  label: string;
  icon: LucideIcon;
  to: string;
  isEnd?: boolean;
}

export interface Credit {
  name: string;
  url: string;
  note?: string;
}

export interface FeedbackOptionProps {
  title: string;
  buttonText: string;
  feedbackUrl: string;
  leftIcon?: IconType | LucideIcon;
}

export const AboutMenuItems = [
  {
    label: 'This Website',
    icon: Info,
    to: '/about',
    isEnd: true,
  },
  {
    label: 'Credits',
    icon: Heart,
    to: '/about/credits',
  },
  {
    label: 'Terms & Policies',
    icon: Scale,
    to: '/about/terms-and-policies',
  },
  {
    label: 'Feedback & Report',
    icon: MessageSquareCode,
    to: '/about/feedback',
  },
] satisfies AboutMenuItem[];

export const AboutCredits = {
  youtube_uploader: [
    {
      name: 'CORONATION Ch.',
      url: 'https://www.youtube.com/@CoroQuetzB',
      note: 'Most of story videos are uploaded from this channel',
    },
    {
      name: 'Homukami',
      url: 'https://www.youtube.com/@Homukami',
      note: 'Also archiving card stories',
    },
    {
      name: 'M【バンドリ・ガルパ ストーリー保管庫】',
      url: 'https://www.youtube.com/@Mガルパ保管庫',
      note: 'Another story videos uploader',
    },
    {
      name: 'かい',
      url: 'https://www.youtube.com/@kai_musicgame',
      note: 'Provide game-length music from the events',
    },
  ] satisfies Credit[],
  inspiration: [
    {
      name: 'Kornblume by windbow',
      url: 'https://windbow27.github.io/kornblume',
      note: 'The google drive sync was inspired by this site.',
    },
    {
      name: 'SchaleDB by lonqie',
      url: 'https://schaledb.com/home',
      note: 'Party hat for birthday character.',
    },
    {
      name: 'Story Tag inspired by cassandrametis',
      url: 'https://www.reddit.com/r/BanGDream/comments/1il4b27/comment/mbrqppw',
      note: 'The story tag was initially inspired from their docs, then it gets remake from bandori-tales developer to fit better in most of the stories.',
    },
    {
      name: 'PJSK Stickers Maker by Ayaka & More',
      url: 'https://prsk.erica.moe',
      note: 'Stamp Generator feature was inspired by this site.',
    },
  ] satisfies Credit[],
  assets: [
    {
      name: 'Hero image',
      url: 'https://bandori.miraheze.org/wiki/BanG_Dream!_Wiki',
      note: 'Picked from BanG Dream! Wiki',
    },
    {
      name: 'Website icon',
      url: 'https://www.flaticon.com/free-icon/book_5078755',
      note: 'by Victoruler on Flaticon',
    },
  ] satisfies Credit[],
};

export const AboutPrivacyPolicies: string[] = [
  'Bandori-Tales uses Cloudflare to collect statistics. This includes IP, country location and paths in order to improve the site quality and security reasons. The data used only for those purpose and will never be used for advertisement.',
  'Bandori-Tales uses Google Search Console (GSC) to monitor and improve the website. GSC provides information such as search queries, impressions, clicks, average position, indexing status, and technical issues affecting Bandori-Tales Website.',
  "No personal data is saved inside Bandori-Tales Database. Story Tracker and other personal data in this site is stored in your browser's local storage and session storage.",
  'By using Google Drive Sync, Bandori-Tales will have access to modify your drive data for reading and writing your site personal data inside and only inside bandori-tales folder.',
];

export const AboutFeedbackOptions = [
  {
    title: 'Open a Github Issue (Require Github Account)',
    buttonText: 'Github',
    feedbackUrl: 'https://github.com/Bandori-Tales/bandori-tales-frontend',
    leftIcon: FaGithub,
  },
  {
    title: 'Submit via Google Form',
    buttonText: 'Google Form',
    feedbackUrl: 'https://forms.gle/9iCWMrnGDXy9XNDh9',
    leftIcon: Form,
  },
] satisfies FeedbackOptionProps[];
