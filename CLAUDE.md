# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Comunícate con Dante **siempre en español**. Contenido, comentarios de código y mensajes en español (México).

## Reglas no negociables

1. **Nunca publicar a producción sin orden explícita.** Prohibido `git push`, merges a `main`, tags o comandos de deploy (wrangler, etc.) a menos que Dante lo pida textualmente en ese momento. Una autorización anterior no cuenta para la siguiente. Tampoco hacer commits si no los pidió.
2. **No cambiar el contenido.** Los textos, enlaces, canciones, videos, orden de secciones y el look del sitio son de Dante (incluidas sus erratas). Solo se cambia lo que él pida.
3. **Todo cambio se piensa para Lighthouse** (móvil: 99–100 en las cuatro categorías) y para el mejor SEO/GEO: que Alen Jeynrod exista como entidad bien definida en buscadores y buscadores con IA.
4. **Misma arquitectura que bydan.art** (`../personal`). Si algo se resuelve de cierta forma allá, se resuelve igual aquí.

## Qué es

`alenjeynrod.com`: sitio oficial de **Alen Jeynrod**, pianista y compositor (proyecto musical de Dante Alejandro Viveros Rodríguez, cuyo sitio personal es https://bydan.art). Dos páginas: la portada (plataformas, *Dreaming*, Live Sessions, último lanzamiento, vinilo, el artista, redes y conciertos) y `/gallery` ("Dreaming | The Experience Hub", las 11 piezas con su historia).

Stack: **Astro 5** (estático, sin adapter) + **Tailwind CSS v4** vía `@tailwindcss/vite` (tokens en `src/styles/global.css`, sin `tailwind.config`). TypeScript estricto. Sin frameworks de UI ni librerías externas en el navegador (AOS y Google Fonts se reemplazaron).

## Comandos

- `npm run dev` — servidor local
- `npm run build` — build estático a `dist/` (optimiza todas las imágenes; tarda ~1 min la primera vez)
- `npm run preview` — sirve `dist/`; **auditar Lighthouse siempre aquí**
- `node scripts/auditar-dist.mjs dist` — auditor estático (SEO, enlaces, JSON-LD, alt). Los "img sin alt" de los íconos de Apple Music/YouTube Music son falsos positivos (alt vacío a propósito); el "<a> sin href" es el marcador de Bandsintown.
- `node scripts/generate-social-images.mjs` — regenera `public/og/default.jpg` desde `scripts/og-cover.html` (Chrome headless)

## Arquitectura

- **`src/data/site.ts`**: TODO el contenido (textos, enlaces, pistas, videos, galería). Cambiar un texto = cambiarlo aquí. Secciones ocultas con `visible: false`: newsletter (Formspree), tienda de partituras (Shopify) y guestbook de la galería (usaba Netlify Forms, que no funciona en Cloudflare).
- **`src/data/seo.ts`**: fuente única de SEO. `SITE`, `canonicalUrl()`, `IDS` estables (`/#website`, `/#alenjeynrod`, `/#dreaming`; la persona es `https://bydan.art/#dante`, se referencia, no se duplica), `officialProfiles` (sameAs y `rel="me"`), constructores de nodos JSON-LD y `jsonLdString()` (escapa `<`).
  - Grafo: portada = `ProfilePage` + `MusicGroup` + `MusicAlbum` (Dreaming, 11 pistas con Intro) + `MusicRecording` (A Reason More To Smile) + 6 `VideoObject` (con `uploadDate` y `duration` reales de YouTube); galería = `CollectionPage` + 11 `MusicComposition` (tonalidad tomada de la ficha) + migas.
  - **No inventar datos**: sin fechas de lanzamiento, géneros ni premios que no estén en el sitio.
- **`src/layouts/BaseLayout.astro`**: todo el `<head>` (canonical, hreflang, robots, OG, Twitter, `rel="me"`, íconos, manifest, JSON-LD, fuentes precargadas) y el script de aparición.
- **Componentes**: `LinerNotes` (notas del disco: ficha técnica en etiquetas y memoria al abrir cada pieza), `Dust` (polvo flotante), `AudioToggle` (atmósfera, `preload="none"`), `YouTubeFacade` (miniatura WebP; el iframe de youtube-nocookie solo se crea al pulsar), `Bandsintown` (su script se descarga al acercarse al pie), `Newsletter` y `Shop` (no renderizan nada si están ocultos).
- **Animaciones**: atributos `data-aos="fade-up|fade-down|zoom-in"` (+ `data-aos-delay`, `data-aos-duration`) con el mismo efecto que AOS, implementados en `global.css` y el script del layout. Solo con `html.anim` (JS y sin "reducir movimiento").
- **Imágenes**: originales en `src/assets/img/` (se optimizan a AVIF/WebP con `<Picture>`); íconos PNG en `src/assets/ico/`; SVG en `public/ico/`. Los nombres de archivo distinguen mayúsculas (Cloudflare es Linux).
- **Endpoints**: `sitemap.xml.ts` (con imágenes), `llms.txt.ts` (generado de los datos), `public/robots.txt` (bots de IA explícitos; `Content-Signal` comentado).
- **Cloudflare**: `wrangler.jsonc` sirve `dist/` como recursos estáticos (Worker `alenjeynrod`). `public/_headers` (HSTS, CSP, COOP, caché) y `public/_redirects` (URLs del sitio viejo: `/index.html`, `/gallery/index.html`). **Un servicio externo nuevo debe agregarse a la CSP.**

## Rendimiento (referencia, móvil, local con compresión)

Portada 99/100/100/100 (antes 0/90/93/100; 431 KB, antes 19 MB). Galería 99/100/100/100 (antes 71, LCP 14 s, 38 MB). Escritorio 100 en las cuatro.

## Decisiones de Dante (no volver a proponer)

- Foto de perfil en círculo de 128 px (la "luna como portada" se probó y se descartó).
- Sin divisores de partitura entre secciones (probado y descartado).
- Sin fragmentos de audio en el tracklist: el único sonido es la maqueta del botón de atmósfera.
- Orden oficial de *Dreaming*: 01 Intro, 02 Her, 03 A Reason More To Smile, 04 Between Brothers, 05 Guiding Light, 06 Am I Dreaming?, 07 A Love Fool, 08 A Pretty Love, 09 A Quiet Heart, 10 The Moon is Beautiful Isn’t It?, 11 I’m In Love. *Dreaming* es "Próximamente", sin fecha.
- Secciones ocultas: newsletter, tienda de partituras y guestbook.

## Registro

Ver [`docs/REGISTRO.md`](docs/REGISTRO.md): migración, rediseño, decisiones y pendientes.
