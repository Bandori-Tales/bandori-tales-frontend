export interface StampImageItem {
  id: string;
  label: string;
  url: string;
}

export interface StampFontItem {
  id: string;
  label: string;
  fontFamily: string;
  url: string;
  format: string;
  weight: string;
}

export const STAMP_GENERATOR_CONST = {
  LOGICAL_CANVAS_SIZE: 350,
  MAX_ELEMENTS: 10,
};

export const StampImages = [
  {
    id: 'ako_buffering',
    label: 'Ako Buffering',
    url: '/images/tools/stamp-generator/ako_buffering.webp',
  },
  {
    id: 'ako_god',
    label: 'Ako God!',
    url: '/images/tools/stamp-generator/ako_god.webp',
  },
  {
    id: 'ako_letsgo',
    label: "Ako Let's Go!",
    url: '/images/tools/stamp-generator/ako_letsgo.webp',
  },
  {
    id: 'ako_wink',
    label: 'Ako Wink',
    url: '/images/tools/stamp-generator/ako_wink.webp',
  },
  {
    id: 'anon_a',
    label: 'Anon A!',
    url: '/images/tools/stamp-generator/anon_a.webp',
  },
  {
    id: 'anon_perfect',
    label: 'Anon Perfect',
    url: '/images/tools/stamp-generator/anon_perfect.webp',
  },
  {
    id: 'anon_snowflakes',
    label: 'Anon Snowflakes',
    url: '/images/tools/stamp-generator/anon_snowflakes.webp',
  },
  {
    id: 'arisa_ahhh',
    label: 'Arisa Ahhh!',
    url: '/images/tools/stamp-generator/arisa_ahhh.webp',
  },
  {
    id: 'arisa_cold',
    label: 'Arisa Cold',
    url: '/images/tools/stamp-generator/arisa_cold.webp',
  },
  {
    id: 'aya_cheer',
    label: 'Aya Cheering',
    url: '/images/tools/stamp-generator/aya_cheer.webp',
  },
  {
    id: 'aya_omurice',
    label: 'Aya Omurice',
    url: '/images/tools/stamp-generator/aya_omurice.webp',
  },
  {
    id: 'aya_phone',
    label: 'Aya Phone',
    url: '/images/tools/stamp-generator/aya_phone.webp',
  },
  {
    id: 'aya_gamble',
    label: 'Aya Roll Dice',
    url: '/images/tools/stamp-generator/aya_gamble.webp',
  },
  {
    id: 'aya_spin',
    label: 'Aya Spin',
    url: '/images/tools/stamp-generator/aya_spin.webp',
  },
  {
    id: 'chisato_ksabar',
    label: 'Chisato Keep Smile',
    url: '/images/tools/stamp-generator/chisato_keep_smile.webp',
  },
  {
    id: 'chisato_no_need',
    label: 'Chisato No Need It',
    url: '/images/tools/stamp-generator/chisato_no_need.webp',
  },
  {
    id: 'chisato_thanks',
    label: 'Chisato Thank You',
    url: '/images/tools/stamp-generator/chisato_thanks.webp',
  },
  {
    id: 'chuchu_boom',
    label: 'CHU² Boom',
    url: '/images/tools/stamp-generator/chuchu_cn_new_year.webp',
  },
  {
    id: 'eve_smug',
    label: 'Eve Smug',
    url: '/images/tools/stamp-generator/eve_smug.webp',
  },
  {
    id: 'eve_whoa',
    label: 'Eve Whoa',
    url: '/images/tools/stamp-generator/eve_whoa.webp',
  },
  {
    id: 'hagumi_aiyo',
    label: 'Hagumi Aiyo',
    url: '/images/tools/stamp-generator/hagumi_aiyo.webp',
  },
  {
    id: 'hagumi_hmm',
    label: 'Hagumi Hmm',
    url: '/images/tools/stamp-generator/hagumi_hmm.webp',
  },
  {
    id: 'hagumi_kabaddi',
    label: 'Hagumi Kabaddi',
    url: '/images/tools/stamp-generator/hagumi_kabaddi.webp',
  },
  {
    id: 'himari_eekk',
    label: 'Himari Eekk!',
    url: '/images/tools/stamp-generator/himari_eekk.webp',
  },
  {
    id: 'himari_eieio',
    label: 'Himari (?) Ei Ei O!',
    url: '/images/tools/stamp-generator/himari_eieio.webp',
  },
  {
    id: 'hina_awawa',
    label: 'Hina Awawa',
    url: '/images/tools/stamp-generator/hina_awawa.webp',
  },
  {
    id: 'hina_hey',
    label: 'Hina Hey!',
    url: '/images/tools/stamp-generator/hina_hey.webp',
  },
  {
    id: 'kanon_fuee',
    label: 'Kanon Fuee...',
    url: '/images/tools/stamp-generator/kanon_fuee.webp',
  },
  {
    id: 'kanon_yahoo',
    label: 'Kanon (?) Yahoo',
    url: '/images/tools/stamp-generator/kanon_yahoo.webp',
  },
  {
    id: 'kaoru_hakanai_1',
    label: 'Kaoru Hakanai 1',
    url: '/images/tools/stamp-generator/kaoru_hakanai_1.webp',
  },
  {
    id: 'kaoru_hakanai_2',
    label: 'Kaoru Hakanai 2',
    url: '/images/tools/stamp-generator/kaoru_hakanai_2.webp',
  },
  {
    id: 'kaoru_hakanai_3',
    label: 'Kaoru Hakanai 3',
    url: '/images/tools/stamp-generator/kaoru_hakanai_3.webp',
  },
  {
    id: 'kaoru_wink',
    label: 'Kaoru Wink',
    url: '/images/tools/stamp-generator/kaoru_wink.webp',
  },
  {
    id: 'kasumi_cheer',
    label: 'Kasumi Cheering',
    url: '/images/tools/stamp-generator/kasumi_cheer.webp',
  },
  {
    id: 'kasumi_wonderland',
    label: 'Kasumi Wonder Night Land',
    url: '/images/tools/stamp-generator/kasumi_wonderland.webp',
  },
  {
    id: 'kasumi_yahoo',
    label: 'Kasumi Yahoo',
    url: '/images/tools/stamp-generator/kasumi_yahoo.webp',
  },
  {
    id: 'kokoro_cheer',
    label: 'Kokoro Cheering',
    url: '/images/tools/stamp-generator/kokoro_cheer.webp',
  },
  {
    id: 'kokoro_this_is_it',
    label: 'Kokoro This Is It!',
    url: '/images/tools/stamp-generator/kokoro_this_is_it.webp',
  },
  {
    id: 'kokoro_watermelon',
    label: 'Kokoro Summer',
    url: '/images/tools/stamp-generator/kokoro_watermelon.webp',
  },
  {
    id: 'layer_cheer',
    label: 'LAYER Cheering',
    url: '/images/tools/stamp-generator/layer_cheer.webp',
  },
  {
    id: 'layer_welcome_back',
    label: 'LAYER Welcome Back',
    url: '/images/tools/stamp-generator/layer_welcome_back.webp',
  },
  {
    id: 'lisa_nfo',
    label: 'Lisa NFO',
    url: '/images/tools/stamp-generator/lisa_nfo.webp',
  },
  {
    id: 'lock_too_good',
    label: 'LOCK Too Good!',
    url: '/images/tools/stamp-generator/lock_too_good.webp',
  },
  {
    id: 'lock_pointy',
    label: 'LOCK Pointy',
    url: '/images/tools/stamp-generator/lock_pointy.webp',
  },
  {
    id: 'mashiro_cheer',
    label: 'Mashiro Cheering',
    url: '/images/tools/stamp-generator/mashiro_cheer.webp',
  },
  {
    id: 'mashiro_doit',
    label: 'Mashiro Can Do It!',
    url: '/images/tools/stamp-generator/mashiro_do_it.webp',
  },
  {
    id: 'mashiro_chuuni',
    label: 'Mashiro Vie En Rose!',
    url: '/images/tools/stamp-generator/mashiro_chuuni.webp',
  },
  {
    id: 'masking_so_cute',
    label: 'MASKING So Cute..',
    url: '/images/tools/stamp-generator/masking_so_cute.webp',
  },
  {
    id: 'maya_delicious',
    label: 'Maya Delicious!',
    url: '/images/tools/stamp-generator/maya_delicious.webp',
  },
  {
    id: 'maya_miss',
    label: 'Maya Miss',
    url: '/images/tools/stamp-generator/maya_miss.webp',
  },
  {
    id: 'misaki_feel_the_sun',
    label: 'Misaki Feel The Sun',
    url: '/images/tools/stamp-generator/misaki_feel_the_sun.webp',
  },
  {
    id: 'moca_bread',
    label: 'Moca Bread',
    url: '/images/tools/stamp-generator/moca_bread.webp',
  },
  {
    id: 'moca_lets_do_it',
    label: "Moca Let's Do It~",
    url: '/images/tools/stamp-generator/moca_lets_do_it.webp',
  },
  {
    id: 'moca_nom',
    label: 'Moca Wonder Night Land',
    url: '/images/tools/stamp-generator/moca_wonderland.webp',
  },
  {
    id: 'nanami_oops',
    label: 'Nanami Oops',
    url: '/images/tools/stamp-generator/nanami_eh.webp',
  },
  {
    id: 'nanami_like_this',
    label: 'Nanami Like This Song',
    url: '/images/tools/stamp-generator/nanami_like_this_song.webp',
  },
  {
    id: 'nanami_wonderland',
    label: 'Nanami Wonder Night Land',
    url: '/images/tools/stamp-generator/nanami_wonderland.webp',
  },
  {
    id: 'pareo_podcast',
    label: 'PAREO Radio',
    url: '/images/tools/stamp-generator/pareo_radio.webp',
  },
  {
    id: 'ran_cheer',
    label: 'Ran Cheerin',
    url: '/images/tools/stamp-generator/ran_cheer.webp',
  },
  {
    id: 'ran_smug',
    label: 'Ran Cool',
    url: '/images/tools/stamp-generator/ran_smug.webp',
  },
  {
    id: 'rimi_bless',
    label: 'Rimi Bless',
    url: '/images/tools/stamp-generator/rimi_bless.webp',
  },
  {
    id: 'rimi_eee',
    label: 'Rimi Eeeh',
    url: '/images/tools/stamp-generator/rimi_eee.webp',
  },
  {
    id: 'rimi_guhh',
    label: 'Rimi Guhh',
    url: '/images/tools/stamp-generator/rimi_guhh.webp',
  },
  {
    id: 'rimi_snowflakes',
    label: 'Rimi Snowflakes',
    url: '/images/tools/stamp-generator/rimi_snowflakes.webp',
  },
  {
    id: 'rinko_smug',
    label: 'Rinko Smug',
    url: '/images/tools/stamp-generator/rinko_live_smug.webp',
  },
  {
    id: 'rinko_question',
    label: 'Rinko Question',
    url: '/images/tools/stamp-generator/rinko_question.webp',
  },
  {
    id: 'rinko_wonderland',
    label: 'Rinko Wonder Night Land',
    url: '/images/tools/stamp-generator/rinko_wonderland.webp',
  },
  {
    id: 'rui_witness',
    label: 'Rui Call The Witness',
    url: '/images/tools/stamp-generator/rui_witness.webp',
  },
  {
    id: 'saya_question',
    label: 'Saya Jennifer?',
    url: '/images/tools/stamp-generator/saya_question.webp',
  },
  {
    id: 'saya_what_happen',
    label: "Saya What's Happening?",
    url: '/images/tools/stamp-generator/saya_what_happen.webp',
  },
  {
    id: 'sayo_chomp',
    label: 'Sayo Chomp!',
    url: '/images/tools/stamp-generator/sayo_chomp.webp',
  },
  {
    id: 'sayo_float',
    label: 'Sayo Float',
    url: '/images/tools/stamp-generator/sayo_float.webp',
  },
  {
    id: 'tae_cheer',
    label: 'Tae Cheering',
    url: '/images/tools/stamp-generator/tae_cheer.webp',
  },
  {
    id: 'tae_press',
    label: 'Tae Press',
    url: '/images/tools/stamp-generator/tae_press.webp',
  },
  {
    id: 'tae_whee',
    label: 'Tae Wheee',
    url: '/images/tools/stamp-generator/tae_whee.webp',
  },
  {
    id: 'taki_wonderland',
    label: 'Taki Wonder Night Land',
    url: '/images/tools/stamp-generator/taki_wonderland.webp',
  },
  {
    id: 'taki_yessir',
    label: 'Taki Yessir!',
    url: '/images/tools/stamp-generator/taki_yessir.webp',
  },
  {
    id: 'toko_confidence',
    label: 'Toko Confidence!',
    url: '/images/tools/stamp-generator/toko_confidence.webp',
  },
  {
    id: 'toko_work',
    label: "Toko It's Working!",
    url: '/images/tools/stamp-generator/toko_its_working.webp',
  },
  {
    id: 'toko_pff',
    label: 'Toko Pff.. Pff..',
    url: '/images/tools/stamp-generator/toko_dududu.webp',
  },
  {
    id: 'tomoe_fine',
    label: "Tomoe It's Fine..",
    url: '/images/tools/stamp-generator/tomoe_its_fine.webp',
  },
  {
    id: 'tomori_cheer',
    label: 'Tomori Cheering',
    url: '/images/tools/stamp-generator/tomori_cheer.webp',
  },
  {
    id: 'tomori_sing',
    label: 'Tomori Singing',
    url: '/images/tools/stamp-generator/tomori_sing.webp',
  },
  {
    id: 'tsugumi_emoi',
    label: 'Tsugumi Emoi!',
    url: '/images/tools/stamp-generator/tsugumi_emoi.webp',
  },
  {
    id: 'tsugumi_snowflakes',
    label: 'Tsugumi Snowflakes',
    url: '/images/tools/stamp-generator/tsugumi_snowflakes.webp',
  },
  {
    id: 'tsukushi_snowflakes',
    label: 'Tsukushi Snowflakes',
    url: '/images/tools/stamp-generator/tsukushi_snowflakes.webp',
  },
  {
    id: 'yukina_cheer',
    label: 'Yukina Cheering',
    url: '/images/tools/stamp-generator/yukina_cheer.webp',
  },
  {
    id: 'yukina_drink',
    label: 'Yukina Drink',
    url: '/images/tools/stamp-generator/yukina_drink.webp',
  },
  {
    id: 'yukina_snowflakes',
    label: 'Yukina Snowflakes',
    url: '/images/tools/stamp-generator/yukina_snowflakes.webp',
  },
  {
    id: 'yukina_wink',
    label: 'Yukina Wink',
    url: '/images/tools/stamp-generator/yukina_wink.webp',
  },
] satisfies StampImageItem[];

export const StampFonts = [
  {
    id: 'angella',
    label: 'Angella',
    fontFamily: 'angella',
    url: '/fonts/angella-regular.otf',
    format: 'opentype',
    weight: 'normal',
  },
  {
    id: 'yuruka-std',
    label: 'Yuruka STD',
    fontFamily: 'yuruka-std',
    url: '/fonts/font-yuruka-std.ttf',
    format: 'truetype',
    weight: 'normal',
  },
  {
    id: 'poppins',
    label: 'Poppins',
    fontFamily: 'Poppins',
    url: '/fonts/Poppins-Bold.ttf',
    format: 'truetype',
    weight: 'bold',
  },
  {
    id: 'racing-sans',
    label: 'Racing Sans',
    fontFamily: 'racing-sans',
    url: '/fonts/RacingSansOne-Regular.ttf',
    format: 'truetype',
    weight: 'normal',
  },
] satisfies StampFontItem[];
