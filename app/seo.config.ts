export const siteUrl = import.meta.env.VITE_SITE_URL || 'http://localhost:3000';

const config = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Bandori-Tales',
    template: '%s • Bandori-Tales',
  },
  description:
    'Story tracker, list, timeline, etc. A Portal for multiple BanG Dream! tools (and fan games).',
  openGraph: {
    url: siteUrl,
    title: 'Bandori-Tales',
    description:
      'Story tracker, list, timeline, etc. A Portal for multiple BanG Dream! tools (and fan games).',
    siteName: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 900,
        height: 900,
        alt: 'Bandori-Tales - Banner Open Graph',
      },
    ],
    type: 'website',
    locale: 'en_EN',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@BFancam84827',
    title: 'Bandori-Tales',
    description: 'Bandori-Tales',
    site: 'https://x.com/BFancam84827',
  },
  keywords: ['Bandori-Tales', 'Bandori Tales', 'BandoriTales'],
  robots: 'index, follow',
  themeColor: '#EC003F',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
      sizes: 'any',
    },
    {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      url: '/site.webmanifest',
    },
  ],
};

export default config;
