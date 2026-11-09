import { getImage } from 'astro:assets';
import { SITE, absoluteUrl } from '../data/seo';
import { gallerySongs } from '../data/site';
import profileImg from '../assets/img/Profile.jpg';
import dreamingImg from '../assets/img/dreaming.jpg';

// Sitemap: solo páginas indexables, con sus imágenes (Google Imágenes). Toda página nueva se agrega aquí.
// lastmod = fecha de compilación solo cuando cambia el contenido; no se pone para no mentirle a Google.

const files = import.meta.glob<{ default: ImageMetadata }>('../assets/img/*.{jpg,png}', { eager: true });
const asset = (name: string) => files[Object.keys(files).find((k) => k.endsWith(`/${name}`))!].default;
const xml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function GET() {
  const img = async (src: ImageMetadata) => absoluteUrl((await getImage({ src, width: 1200, format: 'jpg' })).src);
  const entries = [
    {
      loc: `${SITE}/`,
      images: [
        { loc: await img(profileImg), title: 'Alen Jeynrod' },
        { loc: await img(dreamingImg), title: 'Dreaming — Alen Jeynrod' },
      ],
    },
    {
      loc: `${SITE}/gallery`,
      images: await Promise.all(gallerySongs.map(async (s) => ({ loc: await img(asset(s.img)), title: `${s.title} — Alen Jeynrod` }))),
    },
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (e) => `  <url>
    <loc>${xml(e.loc)}</loc>
${e.images.map((i) => `    <image:image><image:loc>${xml(i.loc)}</image:loc><image:title>${xml(i.title)}</image:title></image:image>`).join('\n')}
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
