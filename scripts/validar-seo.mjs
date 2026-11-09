// Validador SEO del build (dist/): lo que Google necesita para indexar y entender el sitio.
// Uso: npm run build && node scripts/validar-seo.mjs
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(import.meta.dirname, '..', 'dist');
const SITE = 'https://alenjeynrod.com';
const errors = [];
const ok = [];
const err = (m) => errors.push(m);

const fileFor = (url) => {
  const p = new URL(url, SITE).pathname;
  if (p === '/') return join(dist, 'index.html');
  const c = [join(dist, p.slice(1) + '.html'), join(dist, p.slice(1))];
  return c.find((f) => existsSync(f));
};
const attr = (html, re) => (html.match(re) || [])[1];

// Campos que Google exige (resultados enriquecidos) o que conviene que existan para entender la entidad.
const required = {
  VideoObject: ['name', 'thumbnailUrl', 'uploadDate', 'description'],
  BreadcrumbList: ['itemListElement'],
  ProfilePage: ['mainEntity'],
  MusicGroup: ['name', 'url', 'sameAs'],
  MusicAlbum: ['name', 'byArtist'],
  MusicRecording: ['name', 'byArtist'],
  MusicComposition: ['name', 'composer'],
  WebSite: ['name', 'url'],
  CollectionPage: ['name', 'url'],
  Person: ['name', 'url'],
};

for (const page of ['/', '/gallery']) {
  const f = fileFor(SITE + page);
  if (!f) { err(`${page}: no existe en dist`); continue; }
  const html = readFileSync(f, 'utf8');
  const title = attr(html, /<title>([^<]*)<\/title>/);
  const desc = attr(html, /<meta name="description" content="([^"]*)"/);
  const canonical = attr(html, /<link rel="canonical" href="([^"]*)"/);
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]*)"/);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]*)"/);
  const robots = attr(html, /<meta name="robots" content="([^"]*)"/);
  const h1s = (html.match(/<h1[\s>]/g) || []).length;

  if (!title || title.length > 65) err(`${page}: título ausente o largo (${title?.length})`);
  if (!desc || desc.length < 70 || desc.length > 165) err(`${page}: descripción fuera de rango (${desc?.length})`);
  if (canonical !== SITE + (page === '/' ? '/' : page)) err(`${page}: canonical incorrecto (${canonical})`);
  if (ogUrl !== canonical) err(`${page}: og:url distinto del canonical`);
  if (!/^index, follow/.test(robots || '')) err(`${page}: robots no indexable (${robots})`);
  if (h1s !== 1) err(`${page}: ${h1s} h1`);
  if (!/hreflang="es-MX"/.test(html)) err(`${page}: falta hreflang`);
  if (!/twitter:card/.test(html)) err(`${page}: falta twitter:card`);
  if (ogImage && ogImage.startsWith(SITE) && !fileFor(ogImage)) err(`${page}: og:image no existe en dist (${ogImage})`);

  // Contenido rastreable sin JavaScript
  const mustContain = page === '/' ? ['Alen Jeynrod', 'Dreaming', 'A Reason More To Smile', 'El Artista', 'Live Sessions'] : ['Intro', 'Guiding Light', 'I&#39;m In Love', 'Créditos'];
  for (const t of mustContain) if (!html.includes(t) && !html.includes(t.replace('&#39;', "'"))) err(`${page}: el HTML no contiene "${t}"`);

  // JSON-LD
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (blocks.length !== 1) err(`${page}: ${blocks.length} bloques JSON-LD (se espera uno con @graph)`);
  for (const b of blocks) {
    let data;
    try { data = JSON.parse(b[1]); } catch (e) { err(`${page}: JSON-LD inválido ${e.message}`); continue; }
    const nodes = data['@graph'] || [];
    const ids = new Map(nodes.filter((n) => n['@id']).map((n) => [n['@id'], n]));
    // Referencias {"@id": …} sin más propiedades deben resolverse dentro del mismo grafo
    const refs = [];
    const walk = (v) => {
      if (Array.isArray(v)) return v.forEach(walk);
      if (v && typeof v === 'object') {
        if (v['@id'] && Object.keys(v).length === 1) refs.push(v['@id']);
        Object.values(v).forEach(walk);
      }
    };
    walk(nodes);
    for (const r of new Set(refs)) if (!ids.has(r)) err(`${page}: referencia JSON-LD sin resolver ${r}`);
    for (const n of nodes) {
      const need = required[n['@type']] || [];
      for (const k of need) if (n[k] === undefined || n[k] === '' || (Array.isArray(n[k]) && !n[k].length)) err(`${page}: ${n['@type']} sin "${k}"`);
      if (n['@type'] === 'VideoObject' && !/^\d{4}-\d{2}-\d{2}T/.test(n.uploadDate || '')) err(`${page}: VideoObject con uploadDate inválido`);
      for (const k of ['image', 'thumbnailUrl']) {
        const u = n[k];
        if (typeof u === 'string' && u.startsWith(SITE) && !fileFor(u)) err(`${page}: ${n['@type']}.${k} no existe en dist (${u})`);
      }
    }
    const pm = nodes.find((n) => n['@type'] === 'ProfilePage');
    if (pm && !ids.get(pm.mainEntity?.['@id'])?.name) err(`${page}: ProfilePage.mainEntity sin nombre resoluble`);
    ok.push(`${page}: ${nodes.length} nodos JSON-LD (${[...new Set(nodes.map((n) => n['@type']))].join(', ')})`);
  }
}

// Sitemap
const sitemap = readFileSync(join(dist, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
for (const l of locs) if (!fileFor(l)) err(`sitemap: ${l} no existe`);
const imgs = [...sitemap.matchAll(/<image:loc>([^<]+)<\/image:loc>/g)].map((m) => m[1]);
for (const i of imgs) if (!fileFor(i)) err(`sitemap: imagen ${i} no existe`);
ok.push(`sitemap: ${locs.length} páginas, ${imgs.length} imágenes`);

// robots.txt
const robotsTxt = readFileSync(join(dist, 'robots.txt'), 'utf8');
if (!/Sitemap: https:\/\/alenjeynrod\.com\/sitemap\.xml/.test(robotsTxt)) err('robots.txt sin Sitemap');
if (/^\s*Disallow:\s*\/\s*$/m.test(robotsTxt)) err('robots.txt bloquea el sitio');
if (/^Content-Signal/m.test(robotsTxt)) err('robots.txt con Content-Signal sin comentar');
ok.push('robots.txt: permite todo y declara el sitemap');

console.log(ok.join('\n'));
console.log(errors.length ? `\n${errors.length} problema(s):\n` + errors.join('\n') : '\nSin problemas.');
process.exitCode = errors.length ? 1 : 0;
