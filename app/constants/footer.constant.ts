export interface Credit {
  name: string;
  url: string;
  note?: string;
}

export const FooterCredits = {
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
      note: 'The story tag was initially inspired from their docs, then it gets remake from me to fit better in most of the stories.',
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

export const FooterPrivacyPolicies: string[] = [
  'Bandori-Tales uses Cloudflare to collect statistics. This includes IP, country location and paths in order to improve the site quality and security reasons. The data used only for those purpose and will never be used for advertisement.',
  "No personal data is saved inside Bandori-Tales Database. Story Tracker and other personal data in this site is stored in your browser's local storage and session storage.",
  'By using Google Drive Sync, Bandori-Tales will have access to modify your drive data to read and write your site personal data inside bandori-tales folder.',
];
