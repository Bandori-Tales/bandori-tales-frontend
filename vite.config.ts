import path from 'node:path';

import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import { config } from 'dotenv';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

config({
  path: path.resolve(__dirname, process.env.ENV ? `.env.${process.env.ENV as string}` : '.env'),
});

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    viteCompression({
      algorithm: 'gzip',
      threshold: 10240,
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240,
    }),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      webp: { lossless: false, quality: 80 },
      cache: true,
      cacheLocation: path.resolve(__dirname, 'node_modules/.cache/image-optimizer'),
    }),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_debugger: true,
        drop_console: true,
        pure_funcs: ['console.log', 'console.info', 'console.warn'],
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router', 'axios', 'clsx', 'tailwind-merge'],
  },
  server: {
    host: true,
    port: Number(process.env.PORT) || 3000,
  },
  preview: {
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
});
