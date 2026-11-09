# Registro de alenjeynrod.com

Bitácora de la migración a la arquitectura de bydan.art y estado del sitio.

- **Fecha:** 9 de noviembre de 2026
- **Rama:** `migracion-astro` (sin commit; `main` conserva el sitio anterior en HTML)
- **Repo:** https://github.com/Dante6228/LandingPage

## 1. Qué se hizo

Migración del sitio en HTML estático + Tailwind 3 a **Astro 5 + Tailwind 4**, con la misma arquitectura, SEO, seguridad y despliegue que bydan.art. **Contenido y look sin cambios**: textos (con sus erratas), enlaces, pistas, videos, orden de secciones, colores, tipografías, tarjetas translúcidas, polvo y fondo de la luna.

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

1. Revisar la rama `migracion-astro`, y con orden de Dante: commit, merge a `main` y push.
2. Crear el Worker en Cloudflare (igual que bydan.art): repo `Dante6228/LandingPage`, rama `main`, build `npm run build`, deploy `npx wrangler deploy`, `NODE_VERSION=22`, dominio `alenjeynrod.com`.
3. Search Console y Bing: verificar (el TXT de Google ya existe) y enviar `https://alenjeynrod.com/sitemap.xml`.
4. Dar de baja o redirigir `alenjeynrod.netlify.app` para que no compita con el dominio (contenido duplicado).
5. Decidir el futuro de las secciones ocultas: newsletter, tienda de partituras y guestbook (este necesita un servicio nuevo: Formspree o un Worker con D1).
6. Opcional: `favicon.svg` pesa 5.8 MB y no se enlaza; se puede rehacer ligero.
