export interface BandData {
  id: number;
  name: string;
  catchphrase: string;
  description: string;
  background: string;
  icon: string;
  logo: string;
  color: string;
  colorDark: string;
  isMixed?: boolean;
  displayInTracker?: boolean;
  character_ids?: number[];
}

export const Bands: BandData[] = [
  {
    id: 1,
    name: "Poppin'Party",
    catchphrase: 'Sparkling and heart-pounding!',
    description: "The girls band from Hanasakigawa Girls' Academy!",
    background:
      "High-school girls who shine in the era of girls' bands. They perform often to deliver many heart-pounding melodies that are brimming with emotions.",
    icon: 'images/bands/poppin_party_icon.webp',
    logo: 'images/bands/poppin_party_logo.webp',
    color: '#FFDDEE',
    colorDark: '#FF3377',
    displayInTracker: true,
    character_ids: [4, 2, 1, 3, 5],
  },
  {
    id: 2,
    name: 'Afterglow',
    catchphrase: "Let's do this, the same as always.",
    description: 'Hard rock performance of 5 childhood friends!',
    background:
      'A band made of five childhood friends. While things continue to change around them, they use their music so that their days are spent the same as always.',
    icon: 'images/bands/afterglow_icon.webp',
    logo: 'images/bands/afterglow_logo.webp',
    color: '#FFDDDD',
    colorDark: '#EE3344',
    displayInTracker: true,
    character_ids: [8, 10, 6, 9, 7],
  },
  {
    id: 3,
    name: 'Hello, Happy World!',
    catchphrase: 'Happy! Lucky! Smile! Yay!!',
    description: 'Happy! Lucky! Smile! Yay!!',
    background:
      'A colorful band led by Kokoro Tsurumaki created to make the world smile. Their unique sound and unimaginably flashy performances define them.',
    icon: 'images/bands/hello_happy_world_icon.webp',
    logo: 'images/bands/hello_happy_world_logo.webp',
    color: '#FFFFDD',
    colorDark: '#FFDD00',
    displayInTracker: true,
    character_ids: [13, 15, 11, 12, 14],
  },
  {
    id: 4,
    name: 'Pastel＊Palettes',
    catchphrase: "Let's dream as idols!",
    description: 'An entirely agency-created idol band!?',
    background:
      'An agency-created idol band. They all take on solo jobs as well. They sparkle with the desire to achieve their dreams as a band and as idols.',
    icon: 'images/bands/pastel_palettes_icon.webp',
    logo: 'images/bands/pastel_palettes_logo.webp',
    color: '#DDFFEE',
    colorDark: '#33DDAA',
    displayInTracker: true,
    character_ids: [18, 20, 16, 19, 17],
  },
  {
    id: 5,
    name: 'Roselia',
    catchphrase: 'Are you prepared to fully devote yourselves to Roselia?',
    description: 'A highly talented band of pro-level musicians!',
    background:
      'They hold pride in their overwhelming presence backed by their individual skills. With it, Roselia continues to make efforts to reach even greater heights.',
    icon: 'images/bands/roselia_icon.webp',
    logo: 'images/bands/roselia_logo.webp',
    color: '#DDDDFF',
    colorDark: '#3344AA',
    displayInTracker: true,
    character_ids: [22, 24, 21, 25, 23],
  },
  {
    id: 6,
    name: 'Morfonica',
    catchphrase: 'Greetings, we are Morfonica.',
    description: 'A violin rock band whose music paints a fantastical worldview!',
    background:
      "A band formed by first-year students from the prestigious Tsukinomori Girls' Academy. They are working hard so that, one day, they will reach the sparkling world of the stage, a stage they will make their own.",
    icon: 'images/bands/morfonica_icon.webp',
    logo: 'images/bands/morfonica_logo.webp',
    color: '#33AAFF',
    colorDark: '#33AAFF',
    displayInTracker: true,
    character_ids: [30, 28, 26, 29, 27],
  },
  {
    id: 7,
    name: 'RAISE A SUILEN',
    catchphrase: "Let's do this our way. We are RAISE A SUILEN.",
    description: 'An intense rock band with extraordinary talent!!',
    background:
      'CHU²\'s "Greatest Band in the World with the Greatest Music in the World." Their music has a level of production quality appropriate for a band that boasts that they\'ll redefine what it means to be a girls band.',
    icon: 'images/bands/raise_a_suilen_icon.webp',
    logo: 'images/bands/raise_a_suilen_logo.webp',
    color: '#22CCCC',
    colorDark: '#39C9C5',
    displayInTracker: true,
    character_ids: [34, 33, 31, 35, 32],
  },
  {
    id: 8,
    name: 'MyGO!!!!!',
    catchphrase: 'Even if we lose our way, we keep on moving.',
    description: "It's okay to be lost, keep moving forward.",
    background:
      'Embracing unresolved feelings and unanswered doubts, they take the stage and continue moving forward. Their music is characterized by an emotional punk rock style centered on melodic hardcore, interwoven with elements of poetry reading, resonating deeply with listeners.',
    icon: 'images/bands/mygo_icon.webp',
    logo: 'images/bands/mygo_logo.webp',
    color: '#3388BB',
    colorDark: '#3388BB',
    displayInTracker: true,
    character_ids: [37, 39, 36, 40, 38],
  },
  {
    id: 9,
    name: 'Ave Mujica',
    catchphrase: 'Welcome... to the world of Ave Mujica.',
    description: "Welcome to Ave Mujica's masquerade.",
    background:
      'Their signature is gothic, decadent, and heavy songs. Their stage performances pursue a unique world crafted by Sakiko Togawa, captivating audiences through an overwhelming level of performance.',
    icon: 'images/bands/ave_mujica_icon.webp',
    logo: 'images/bands/ave_mujica_logo.webp',
    color: '#2596BE',
    colorDark: '#881144',
    displayInTracker: true,
    character_ids: [45, 43, 41, 44, 42],
  },
  {
    id: 10,
    name: 'Mugendai MewType',
    catchphrase: 'Dream big without limits!',
    description: 'Dream big without limits!',
    background:
      "Not limited to live performances, they are a virtual girls' band whose members shine across streaming, creative work, and beyond. Free from convention, their music propels them onward through an infinite universe of dreams.",
    icon: 'images/bands/mugendai_mewtype_icon.webp',
    logo: 'images/bands/mugendai_mewtype_logo.webp',
    color: '#FF7788',
    colorDark: '#2288DD',
    displayInTracker: true,
    character_ids: [48, 50, 46, 49, 47],
  },
  {
    id: 11,
    name: 'millsage',
    catchphrase: 'A handful of happiness, just for you.',
    description: 'A handful of happiness, just for you.',
    background:
      'Led by Hotaru Shiomi (Key. & Vo.), the band is built around her exceptional vocal and instrumental talent. In this one and only life, they pour their wish for happiness and blessings into their music, and continue to play on today as well.',
    icon: 'images/bands/millsage_icon.webp',
    logo: 'images/bands/millsage_logo.webp',
    color: '#D2D1EA',
    colorDark: '#AA22EE',
    displayInTracker: true,
    character_ids: [53, 54, 51, 55, 52],
  },
  {
    id: 12,
    name: 'Ikka Dumb Rock!',
    catchphrase: "Let's get started, my family!",
    description: "Let's get started, my family!",
    background:
      "Their explosive, groove-driven funk sound drowns out life's hardships. Featuring a twin-vocal lineup, the band brings together five members of vastly different backgrounds and personalities, performing live in pursuit of becoming a PEACE family.",
    icon: 'images/bands/ikka_dumb_rock_icon.webp',
    logo: 'images/bands/ikka_dumb_rock_logo.webp',
    color: '#FFF7D7',
    colorDark: '#FFAA33',
    displayInTracker: true,
    character_ids: [58, 59, 56, 60, 57],
  },
  {
    id: 99,
    name: 'Mixed',
    catchphrase: '',
    description: '',
    background: '',
    icon: 'images/bands/mixed_icon.webp',
    logo: 'images/bands/mixed_logo.webp',
    color: '#FFFFFF',
    colorDark: '#020618',
    isMixed: true,
    displayInTracker: true,
  },
];
