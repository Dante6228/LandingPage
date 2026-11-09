# Registro de alenjeynrod.com

Bitácora de la migración a la arquitectura de bydan.art y estado del sitio.

- **Fecha:** 9 de noviembre de 2026
- **Estado:** todo en `main` (única rama); falta crear el Worker en Cloudflare
- **Repo:** https://github.com/Dante6228/LandingPage

## 1. Qué se hizo

Migración del sitio en HTML estático + Tailwind 3 a **Astro 5 + Tailwind 4**, con la misma arquitectura, SEO, seguridad y despliegue que bydan.art. **Contenido y look sin cambios**: textos (solo se corrigieron erratas de ortografía), enlaces, pistas, videos, orden de secciones, colores, tipografías, tarjetas translúcidas, polvo y fondo de la luna.

| Antes | Ahora |
|---|---|
| `index.html` y `gallery/index.html` escritos a mano | `src/pages/index.astro` y `gallery.astro`, con todo el contenido en `src/data/site.ts` |
| La galería se armaba con JavaScript: Google veía la página vacía | Las 11 piezas salen en el HTML |
| Tailwind 3 compilado a mano (`output.css`) | Tailwind 4 integrado al build; CSS inline |
| Google Fonts (Cormorant, Montserrat) | Fuentes auto-hospedadas en `public/fonts/` |
| AOS desde unpkg | Mismo efecto con CSS + 20 líneas de JS propio |
| 6 iframes de YouTube cargando de entrada | Miniatura WebP; el reproductor se crea al pulsar (youtube-nocookie) |
| Widget de Bandsintown al cargar | Se descarga al acercarse al pie |
| SDK de Shopify descargándose aunque la tienda estaba oculta | No se carga nada mientras la sección esté oculta |
| Imágenes de 6–12 MB | AVIF/WebP por tamaño de pantalla |
| Sin canonical, OG incompleto, sin datos estructurados, sin sitemap ni robots | SEO completo (ver abajo) |
| Netlify | Cloudflare Workers (`wrangler.jsonc`) |

## 2. Errores que se corrigieron

- **Imágenes rotas en producción**: el HTML pedía `img/profile.jpg`, `portrait.png`, `cover2.png`, `cover3.jpg`, `cover4.jpg` y `score_intro.png`, pero los archivos se llaman `Profile.jpg`, `Portrait.png`, etc. Funcionaba en Windows, no en un servidor Linux.
- **Guestbook** con Netlify Forms: no funcionaría en Cloudflare. Queda oculto (decisión de Dante).
- **Contraste** (accesibilidad): los números 01–10, el "© 2026" y la ficha técnica de la galería pasaron de 40 % a 60 % de opacidad (el © de 20 % a 50 %) para cumplir el mínimo legible. Es el único cambio visual.
- Encabezados de la galería: "Créditos" pasó de `h3` a `h2` (mismo estilo) para un orden de títulos correcto.

## 3. SEO y GEO

- Validación: `node scripts/validar-seo.mjs` (grafo resuelto, campos obligatorios de Google, canonical/OG, sitemap, robots). Las 6 Live Sessions llevan su fecha real de publicación y duración tomadas de YouTube (`uploadDate` es obligatorio para videos).
- Erratas corregidas: "batería", "Qué hermoso", ", mi primer álbum", "la luz y la paz" y puntuación en tres memorias y en la bio.
- El título de la galería incluye el nombre: "Dreaming | The Experience Hub · Alen Jeynrod".
- "Último lanzamiento" enlaza a la canción en Spotify (`track/24A9ja01prj5mEfEArazix`); el botón principal sigue en el disco.
- Netlify dado de baja por Dante: ya no hay copia que compita con el dominio.

- `<head>` completo: canonical, `hreflang es-MX`/`x-default`, robots con `max-image-preview:large`, Open Graph y X con imagen 1200×630 propia (`public/og/default.jpg`), `rel="me"` a bydan.art y a todos los perfiles oficiales.
- Datos estructurados en un solo `@graph` (ver `CLAUDE.md`). Alen Jeynrod (`https://alenjeynrod.com/#alenjeynrod`) queda ligado a Dante (`https://bydan.art/#dante`) como miembro y fundador, y a la entidad de bydan.art.
- `sitemap.xml` con imágenes, `llms.txt`, `robots.txt` con bots de IA.
- Títulos y descripciones: los del sitio anterior, sin cambios.

## 4. Resultados (Lighthouse móvil, local con compresión)

| Página | Antes | Ahora |
|---|---|---|
| Portada | 0 / 90 / 93 / 100 · 19.3 MB | **99 / 100 / 100 / 100** · 407 KB · LCP 2.2 s |
| Galería | 71 / 92 / 100 / 100 · 38 MB · LCP 14 s | **99 / 100 / 100 / 100** · 376 KB · LCP 2.2 s |
| Portada (escritorio) | — | **100 / 100 / 100 / 100** |

Sin errores de consola ni bloqueos de la CSP (Bandsintown funcionando).

## 5. Cloudflare (zona alenjeynrod.com)

Ya configurada desde la sesión de bydan.art: HTTPS siempre, TLS 1.2, SSL estricto, Early Hints, HSTS, caché del navegador respetando cabeceras, Crawler Hints, bots de IA permitidos, `www` → raíz (301). **Falta el sitio**: no hay registro para la raíz.

## 6. Pendientes

1. Crear el Worker en Cloudflare (ver sección 8).
2. Search Console y Bing: verificar (el TXT de Google ya existe en el DNS) y enviar `https://alenjeynrod.com/sitemap.xml`.
3. Decidir el futuro de las secciones ocultas: newsletter, tienda de partituras y guestbook (este necesita un servicio nuevo: Formspree o un Worker con D1).
4. La descripción para Google de la portada menciona "adquiere partituras oficiales", pero la tienda está oculta: conviene ajustarla si no se abrirá pronto.
5. Opcional: `favicon.svg` pesa 5.8 MB y no se enlaza; se puede rehacer ligero.

## 7. Rediseño de la portada (9 de noviembre de 2026)

Propuesto por Claude y aprobado por Dante (puntos 1 a 7). Mismo contenido; cambia la presentación.

1. ~~Fragmentos de 30 s en el tracklist~~: se probó y Dante lo quitó; el botón flotante de atmósfera ya reproduce una de sus maquetas más personales. Descartado.
2. ~~La luna como portada~~: se probó y Dante prefirió la foto de perfil en círculo como estaba. Descartado.
3. **Invitación escrita a escuchar**: "Escuchar en Spotify · Apple Music · YouTube Music" en Cormorant cursiva; Tidal, Deezer y Amazon Music en una línea discreta con íconos en un solo tono.
4. **Notas del disco** (`LinerNotes.astro`): lista numerada con reglas finas; al abrir una pieza aparecen su ficha técnica en etiquetas pequeñas bajo el título (tonalidad, compás, tempo, de la galería) y su memoria. **Intro es la pista 01** (11 piezas).
5. ~~Partitura como divisor~~: se probó y no le gustó a Dante. Descartado.
6. **Oficio**: capitular real en la bio (`.drop-cap`), textos sin justificar, Bandsintown plegado si no hay fechas, vinilo con la paleta cálida del sitio (los colores de "Her" quedan como halo detrás del disco).
7. **Live Sessions** con duración y mes de publicación (datos reales de YouTube).

Orden oficial (confirmado por Dante): 01 Intro, 02 Her, 03 A Reason More To Smile, 04 Between Brothers, 05 Guiding Light, 06 Am I Dreaming?, 07 A Love Fool, 08 A Pretty Love, 09 A Quiet Heart, 10 The Moon is Beautiful Isn’t It?, 11 I’m In Love. Portada y galería siguen este orden.

## 8. Publicación en Cloudflare

Igual que bydan.art: Worker con recursos estáticos y Workers Builds conectado a GitHub.

| Campo | Valor |
|---|---|
| Repositorio | `Dante6228/LandingPage`, rama `main` |
| Project name | `alenjeynrod` (igual que `name` en `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Non-production branch deploy command | `npx wrangler versions upload` |
| Path | `/` |
| Variable de build | `NODE_VERSION = 22` |
| Dominio | Settings → Domains & Routes → Custom domain `alenjeynrod.com` (sin `www`: ya redirige con 301) |

Cada push a `main` se publica solo. Netlify ya fue dado de baja.
