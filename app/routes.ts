import { index, layout, prefix, type RouteConfig, route } from '@react-router/dev/routes';

export default [
  layout('routes/layouts/public.tsx', [index('routes/home/index.tsx')]),

  route('sandbox', 'routes/sandbox/index.tsx'),

  ...prefix('tools', [
    index('routes/tools/home/index.tsx'),
    route('yunogpt', 'routes/tools/yunogpt/index.tsx'),
  ]),

  ...prefix('games', [index('routes/games/home/index.tsx')]),

  route('*', 'routes/not-found.tsx'),
  route('robots.txt', 'routes/robots.txt.ts'),
  route('sitemap.xml', 'routes/sitemap.xml.ts'),
] satisfies RouteConfig;
