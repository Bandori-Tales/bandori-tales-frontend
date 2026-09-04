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
      url: 'www.youtube.com/@Homukami',
      note: 'Also archiving card stories',
    },
    {
      name: 'M【バンドリ・ガルパ ストーリー保管庫】',
      url: ' 	www.youtube.com/@Mガルパ保管庫',
    },
  ] satisfies Credit[],
  assets: [
    {
      name: 'Hero image from BanG Dream! Wiki',
      url: 'https://bandori.miraheze.org/wiki/BanG_Dream!_Wiki',
    },
    {
      name: 'Website icon by Victoruler on Flaticon',
      url: 'https://www.flaticon.com/free-icon/book_5078755',
    },
  ] satisfies Credit[],
};
