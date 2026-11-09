# Alen Jeynrod — alenjeynrod.com

Sitio oficial de **Alen Jeynrod**, pianista y compositor: enlaces para escuchar su música, *Dreaming*, Live Sessions, último lanzamiento, vinilo, la historia del artista, redes y conciertos. Incluye la galería "Dreaming | The Experience Hub" (`/gallery`).

## Desarrollo

```bash
npm install
npm run dev       # servidor local
npm run build     # build estático a dist/
npm run preview   # sirve dist/ (aquí se audita con Lighthouse)
```

- Contenido: `src/data/site.ts` (todos los textos y enlaces).
- SEO y datos estructurados: `src/data/seo.ts`.
- Imagen para redes: `node scripts/generate-social-images.mjs`.

## Tecnologías

Astro 5 (sitio estático) · Tailwind CSS 4 · TypeScript · Cloudflare Workers (recursos estáticos).

## Despliegue

Cloudflare Workers con `wrangler.jsonc`: cada push a `main` se publica en https://alenjeynrod.com.
Arquitectura gemela de https://bydan.art. Detalles en `CLAUDE.md` y `docs/REGISTRO.md`.

## Autor

Dante Alejandro Viveros Rodríguez — [bydan.art](https://bydan.art) · GitHub [@dante6228](https://www.github.com/dante6228)
