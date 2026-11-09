import { SITE, officialProfiles } from '../data/seo';
import { artist, dreaming, latestRelease, liveSessions, vinyl } from '../data/site';

// /llms.txt — resumen en Markdown para buscadores con IA. Se genera de los mismos datos del sitio:
// nunca debe decir algo distinto de la página.

export async function GET() {
  const lines = [
    `# ${artist.name}`,
    '',
    `> ${artist.name}: ${artist.role}. Sitio oficial: ${SITE}/. Proyecto musical de Dante Alejandro Viveros Rodríguez (https://bydan.art).`,
    '',
    `## ${dreaming.title} (${dreaming.kicker.toLowerCase()})`,
    dreaming.concept,
    '',
    ...dreaming.tracks.map((t) => `- ${t.n}. ${t.title}: ${t.memory}`),
    '',
    `## ${latestRelease.kicker}`,
    `- [${latestRelease.title}](${latestRelease.url}): ${latestRelease.text}`,
    '',
    '## Live Sessions (YouTube)',
    ...liveSessions.map((v) => `- [${v.title} — ${v.subtitle}](https://www.youtube.com/watch?v=${v.id})`),
    '',
    '## Vinilo',
    `- [${vinyl.title}](${vinyl.url}): ${vinyl.text}`,
    '',
    '## Páginas',
    `- [Inicio](${SITE}/)`,
    `- [Dreaming | The Experience Hub](${SITE}/gallery): las piezas de Dreaming con su tonalidad, compás, tempo y la historia detrás de cada una.`,
    '',
    '## Perfiles oficiales',
    ...officialProfiles.map((u) => `- ${u}`),
    '- https://bydan.art',
    '',
    '## Optional',
    `- [Sitemap](${SITE}/sitemap.xml)`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
