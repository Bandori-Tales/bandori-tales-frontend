import type { MetaDescriptor } from 'react-router';

import config, { siteUrl } from '@/seo.config';

type MetaOptions = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  noIndex?: boolean;
};

export function generateMeta(options: MetaOptions = {}): MetaDescriptor[] {
  const title = options.title
    ? config.title.template.replace('%s', options.title)
    : config.title.default;

  const robots = options.noIndex ? 'noindex, nofollow' : config.robots;

  return [
    { title },
    { name: 'description', content: options.description || config.description },
    { name: 'keywords', content: config.keywords.join(', ') },
    { name: 'robots', content: robots },
    { name: 'theme-color', content: config.themeColor },

    { property: 'og:title', content: options.ogTitle || title },
    {
      property: 'og:description',
      content: options.ogDescription || options.description || config.description,
    },
    { property: 'og:image', content: options.ogImage || config.openGraph.images[0].url },
    { property: 'og:url', content: options.ogUrl || siteUrl },
    { property: 'og:type', content: config.openGraph.type },
    { property: 'og:site_name', content: config.openGraph.siteName },

    { name: 'twitter:card', content: config.twitter.card },
    { name: 'twitter:title', content: options.title || config.twitter.title },
    { name: 'twitter:description', content: options.description || config.twitter.description },
    { name: 'twitter:creator', content: config.twitter.creator },

    ...config.icons.map((icon, index) => ({
      key: `favicon-${index}`,
      tagName: 'link',
      rel: icon.rel,
      href: icon.url,
      ...(icon.sizes && { sizes: icon.sizes }),
    })),
  ];
}
