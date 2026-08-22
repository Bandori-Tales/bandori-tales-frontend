import config, { siteUrl } from '@/seo.config';

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  robots?: string;

  ogUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string | { url: string; width?: number; height?: number; alt?: string };

  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
};

export default function SEO(props: SEOProps) {
  const pageTitle = props.title
    ? config.title.template.replace('%s', props.title)
    : config.title.default;

  const ogImage =
    typeof props.ogImage === 'string'
      ? [{ url: props.ogImage }]
      : props.ogImage
        ? [props.ogImage]
        : config.openGraph.images;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  return (
    <>
      <title>{pageTitle}</title>
      <meta name="description" content={props.description || config.description} />
      <meta name="keywords" content={(props.keywords || config.keywords)?.join(', ')} />
      <meta name="robots" content={props.robots || config.robots} />

      <link rel="canonical" href={props.canonical || currentUrl} />

      <meta property="og:type" content={config.openGraph.type} />
      <meta property="og:url" content={props.ogUrl || currentUrl} />
      <meta property="og:title" content={props.ogTitle || pageTitle} />
      <meta
        property="og:description"
        content={props.ogDescription || props.description || config.openGraph.description}
      />
      <meta property="og:site_name" content={config.openGraph.siteName} />
      <meta property="og:locale" content={config.openGraph.locale} />
      {ogImage.map((img, index) => (
        <meta key={`og-image-${index}`} property="og:image" content={img.url} />
      ))}

      <meta name="twitter:card" content={config.twitter.card} />
      <meta name="twitter:creator" content={config.twitter.creator} />
      <meta
        name="twitter:title"
        content={props.twitterTitle || props.title || config.twitter.title}
      />
      <meta
        name="twitter:description"
        content={props.twitterDescription || props.description || config.twitter.description}
      />
      <meta name="twitter:site" content={config.twitter.site} />
      {(props.twitterImage || props.ogImage) && (
        <meta
          name="twitter:image"
          content={
            props.twitterImage ||
            (typeof props.ogImage === 'string' ? props.ogImage : props.ogImage?.url)
          }
        />
      )}

      {config.icons.map((icon) => (
        <link key={icon.url} rel={icon.rel} href={icon.url} />
      ))}
    </>
  );
}
