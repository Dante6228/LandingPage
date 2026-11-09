// Auditor estático de dist/: SEO on-page, enlaces internos, JSON-LD, accesibilidad básica y seguridad de enlaces.
// Uso: npm run build && node scripts/auditar-dist.mjs dist
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = process.argv[2];
const files = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(dist);

const urlFor = (p) => '/' + relative(dist, p).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '');
const exists = (path) => {
  path = decodeURIComponent(path.split('#')[0].split('?')[0]);
  if (path === '/' || path === '') return true;
  const clean = path.replace(/\/$/, '');
  return [join(dist, clean + '.html'), join(dist, clean, 'index.html'), join(dist, clean)].some((f) => existsSync(f) && statSync(f).isFile());
};
const attr = (tag, name) => (tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i')) || [])[1];

const issues = [];
const add = (page, msg) => issues.push(`${page}: ${msg}`);
const titles = new Map(), descs = new Map();

for (const f of files) {
  const html = readFileSync(f, 'utf8');
  const page = urlFor(f);
  if (/http-equiv="refresh"/.test(html)) continue; // páginas de redirección de Astro
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const desc = attr((html.match(/<meta name="description"[^>]*>/) || [''])[0], 'content');
  if (!title) add(page, 'sin <title>');
  else {
    if (title.length > 65) add(page, `title largo (${title.length}): ${title}`);
    if (title.length < 25) add(page, `title corto (${title.length}): ${title}`);
    if (!noindex) titles.set(title, [...(titles.get(title) || []), page]);
  }
  if (!desc) add(page, 'sin meta description');
  else {
    if (desc.length > 165) add(page, `description larga (${desc.length})`);
    if (desc.length < 70) add(page, `description corta (${desc.length})`);
    if (!noindex) descs.set(desc, [...(descs.get(desc) || []), page]);
  }
  const canon = attr((html.match(/<link rel="canonical"[^>]*>/) || [''])[0], 'href');
  if (!noindex && !canon) add(page, 'sin canonical');
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (!noindex && h1 !== 1) add(page, `${h1} <h1>`);
  if (!/<html lang="/.test(html)) add(page, 'sin lang');
  for (const k of ['og:title', 'og:description', 'og:image', 'og:url', 'twitter:card'])
    if (!html.includes(`"${k}"`)) add(page, `falta ${k}`);

  // ids duplicados
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  const dup = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dup.length) add(page, `ids duplicados: ${[...new Set(dup)].join(', ')}`);

  // imágenes
  for (const img of html.match(/<img\b[^>]*>/g) || []) {
    if (!/\salt="/.test(img)) add(page, `img sin alt: ${img.slice(0, 90)}`);
    if (!/\swidth="/.test(img) && !/id="modal-img"/.test(img)) add(page, `img sin width/height: ${img.slice(0, 90)}`);
  }
  // enlaces
  for (const a of html.match(/<a\b[^>]*>/g) || []) {
    const href = attr(a, 'href');
    if (href === undefined) { add(page, `<a> sin href: ${a.slice(0, 80)}`); continue; }
    if (/target="_blank"/.test(a) && !/rel="[^"]*noopener/.test(a)) add(page, `_blank sin noopener: ${href}`);
    if (href.startsWith('/') && !href.startsWith('//') && !exists(href)) add(page, `enlace interno roto: ${href}`);
    if (href.startsWith('http://')) add(page, `enlace http inseguro: ${href}`);
  }
  // botones sin nombre accesible
  for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/g)) {
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    if (!text && !/aria-label=/.test(m[1])) add(page, 'button sin nombre accesible');
  }
  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch (e) { add(page, `JSON-LD inválido: ${e.message}`); continue; }
    const nodes = data['@graph'] || (Array.isArray(data) ? data : [data]);
    const seen = new Map();
    for (const n of nodes) {
      if (!n['@type']) add(page, `nodo JSON-LD sin @type: ${JSON.stringify(n).slice(0, 80)}`);
      if (n['@id']) {
        if (seen.has(n['@id'])) add(page, `@id duplicado en el grafo: ${n['@id']}`);
        seen.set(n['@id'], n);
      }
    }
    const str = JSON.stringify(data);
    if (/\[(Título|Lugar|Fecha|Tu |Una frase|La historia)/.test(str)) add(page, 'JSON-LD con marcadores de plantilla');
  }
}
for (const [t, ps] of titles) if (ps.length > 1) issues.push(`title duplicado "${t}": ${ps.join(', ')}`);
for (const [d, ps] of descs) if (ps.length > 1) issues.push(`description duplicada en: ${ps.join(', ')}`);

console.log(`${files.length} páginas revisadas`);
console.log(issues.length ? issues.join('\n') : 'sin hallazgos');
