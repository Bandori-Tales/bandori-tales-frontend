import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE_URL = process.env.VITE_SITE_URL || 'http://localhost:3000';

const routes = [
  { path: '/', changefreq: 'daily', priority: 1.0 },
  { path: '/story-tracker', changefreq: 'weekly', priority: 0.9 },
  { path: '/tools/stamp-generator', changefreq: 'weekly', priority: 0.9 },
  { path: '/tools/yunogpt', changefreq: 'weekly', priority: 0.9 },
  { path: '/tools', changefreq: 'monthly', priority: 0.8 },
  { path: '/games', changefreq: 'monthly', priority: 0.8 },
  { path: '/about', changefreq: 'monthly', priority: 0.5 },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

const outputPath = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap generated at ${outputPath}`);