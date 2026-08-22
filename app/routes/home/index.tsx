import { generateMeta } from '@/lib/generate-meta';

import { HeroContent } from './contents/hero';

export function meta() {
  return generateMeta({
    description: 'A Portal for multiple BanG Dream! tools (and fan games).',
    ogTitle: 'Bandori-Tales',
    ogDescription: 'A Portal for multiple BanG Dream! tools (and fan games).',
  });
}

export async function clientLoader() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
}

export default function Home() {
  return <HeroContent />;
}
