import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://alenjeynrod.com',
  // URLs sin barra final (/gallery). Con build.format 'file' cada ruta sale como /gallery.html,
  // que Cloudflare sirve en /gallery. Debe coincidir con canonicalUrl() en src/data/seo.ts y con el sitemap.
  trailingSlash: 'never',
  build: {
    format: 'file',
    // CSS inline en cada página: ninguna hoja de estilos bloquea el primer pintado.
    inlineStylesheets: 'always',
  },
  redirects: {
    // URLs del sitio anterior (HTML estático).
    '/index.html': '/',
    '/gallery/index.html': '/gallery',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
