import { generateRobotsTxt } from '@forge42/seo-tools/robots';

import type { Route } from './+types/robots.txt';

export async function loader({ request }: Route.LoaderArgs) {
  const { origin } = new URL(request.url);

  const robotsTxt = generateRobotsTxt([
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/dashboard/'],
      crawlDelay: 100,
      sitemap: [`${origin}/sitemap.xml`],
    },
    { userAgent: 'Googlebot', allow: ['/'] },
  ]);

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
