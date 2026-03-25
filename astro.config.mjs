import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://jorgepradoh.github.io',
  integrations: [
    mdx(),
    react(),
  ],
  markdown: {
    shikiConfig: {
      theme: 'one-dark-pro',   // dark theme matching the palette
      wrap: false,
    },
  },
});
