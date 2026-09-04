import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  layout('routes/layouts/public.tsx', [
    index('routes/home/index.tsx'),
    route('about', 'routes/about/index.tsx'),
    route('tools', 'routes/tools/home/index.tsx'),
    route('games', 'routes/games/home/index.tsx'),
    route('story-tracker', 'routes/story-tracker/index.tsx'),
  ]),

  // route('sandbox', 'routes/sandbox/index.tsx'), // Comment this line before push

  ...prefix('tools', [route('yunogpt', 'routes/tools/yunogpt/index.tsx')]),

  route('*', 'routes/not-found.tsx'),
  route('robots.txt', 'routes/robots.txt.ts'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
] satisfies RouteConfig;
