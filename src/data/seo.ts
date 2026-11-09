// =============================================================================
// SEO y datos estructurados de alenjeynrod.com — fuente única (mismo esquema que bydan.art).
// Regla: el JSON-LD solo dice lo que la página muestra o datos verificables (perfiles oficiales).
// Nada inventado: sin fechas de lanzamiento, géneros ni premios que no estén en el sitio.
// =============================================================================
import { artist, dreaming, latestRelease, liveSessions, socials, bandsintown, gallerySongs } from './site';

export const SITE = 'https://alenjeynrod.com';
export const SITE_NAME = 'Alen Jeynrod';
export const LOCALE = 'es-MX';

/** @id estables. No cambiarlos: Google y los buscadores con IA los usan para unir la entidad. */
export const IDS = {
  website: `${SITE}/#website`,
  artist: `${SITE}/#alenjeynrod`,
  album: `${SITE}/#dreaming`,
  // La persona detrás de Alen Jeynrod vive en bydan.art: se referencia, no se duplica.
  person: 'https://bydan.art/#dante',
  bydanArtist: 'https://bydan.art/#alenjeynrod',
};

export const DEFAULT_OG_IMAGE = {
  url: '/og/default.jpg',
  width: 1200,
  height: 630,
  alt: 'Alen Jeynrod, Pianist & Composer',
};

/** Perfiles oficiales del artista (mismos que en bydan.art) + redes del pie. Alimentan sameAs y rel="me". */
export const officialProfiles = [
  'https://open.spotify.com/artist/3kzgeiwDoZralvEkk78p5U',
  'https://music.apple.com/es/artist/alen-jeynrod/1789239974',
  'https://www.youtube.com/@AlenJeynrod',
  'https://music.youtube.com/@AlenJeynrod',
  'https://music.amazon.com.mx/artists/B0DSQB76ZC/alen-jeynrod',
  'https://tidal.com/artist/53190928',
  'https://www.deezer.com/mx/artist/297616401',
  'https://www.qobuz.com/es-es/label/alen-jeynrod/download-streaming-albums/7640200',
  'https://soundcloud.com/alenjey',
  ...socials.map((s) => s.url).filter((u) => !/youtube\.com\/@alenjeynrod$/i.test(u)),
  bandsintown.url,
];

export function canonicalUrl(pathname: string): string {
  let p = pathname.replace(/\.html$/, '').replace(/\/index$/, '/');
  if (p.length > 1) p = p.replace(/\/+$/, '');
  return `${SITE}${p === '' ? '/' : p}`;
}

export const absoluteUrl = (path: string) => (/^https?:\/\//.test(path) ? path : `${SITE}${path.startsWith('/') ? '' : '/'}${path}`);

/** JSON para <script type="application/ld+json">: escapa "<" para que ningún texto pueda cerrar la etiqueta. */
export function jsonLdString(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

export const graph = (nodes: object[]) => ({ '@context': 'https://schema.org', '@graph': nodes });

export function websiteNode() {
  return {
    '@type': 'WebSite',
    '@id': IDS.website,
    url: `${SITE}/`,
    name: SITE_NAME,
    inLanguage: LOCALE,
    publisher: { '@id': IDS.artist },
    about: { '@id': IDS.artist },
  };
}

export function personRef() {
  return { '@type': 'Person', '@id': IDS.person, name: 'Dante Alejandro Viveros Rodríguez', url: 'https://bydan.art' };
}

export function artistNode(imageUrl?: string) {
  return {
    '@type': 'MusicGroup',
    '@id': IDS.artist,
    name: artist.name,
    description: artist.role,
    url: `${SITE}/`,
    ...(imageUrl ? { image: imageUrl } : {}),
    // Proyecto de una sola persona: Dante Alejandro Viveros Rodríguez (bydan.art).
    member: { '@id': IDS.person },
    founder: { '@id': IDS.person },
    sameAs: ['https://bydan.art', ...officialProfiles],
  };
}

export function albumNode(imageUrl?: string) {
  return {
    '@type': 'MusicAlbum',
    '@id': IDS.album,
    name: dreaming.title,
    description: dreaming.concept,
    byArtist: { '@id': IDS.artist },
    ...(imageUrl ? { image: imageUrl } : {}),
    numTracks: dreaming.tracks.length,
    track: {
      '@type': 'ItemList',
      numberOfItems: dreaming.tracks.length,
      itemListElement: dreaming.tracks.map((t, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'MusicRecording', name: t.title, description: t.memory, byArtist: { '@id': IDS.artist } },
      })),
    },
  };
}

export function latestReleaseNode(imageUrl?: string) {
  return {
    '@type': 'MusicRecording',
    '@id': `${SITE}/#a-reason-more-to-smile`,
    name: latestRelease.title,
    description: latestRelease.text,
    byArtist: { '@id': IDS.artist },
    url: latestRelease.url,
    ...(imageUrl ? { image: imageUrl } : {}),
    // Enlace de la canción en Spotify, sin el parámetro de rastreo ?si=
    sameAs: [latestRelease.url.split('?')[0]],
  };
}

export function liveSessionNodes() {
  return liveSessions.map((v) => ({
    '@type': 'VideoObject',
    '@id': `${SITE}/#video-${v.id}`,
    name: `${v.title} — ${v.subtitle}`,
    description: `${v.title} (${v.subtitle}) — ${artist.name}`,
    thumbnailUrl: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`,
    uploadDate: v.uploadDate,
    duration: `PT${Math.floor(v.seconds / 60)}M${v.seconds % 60}S`,
    embedUrl: `https://www.youtube.com/embed/${v.id}`,
    contentUrl: `https://www.youtube.com/watch?v=${v.id}`,
    creator: { '@id': IDS.artist },
  }));
}

/** Piezas de la galería como composiciones (tonalidad tomada de la ficha visible). */
export function compositionNodes(images: Record<string, string>) {
  return gallerySongs.map((s) => {
    const key = s.meta.split('•')[0].trim();
    return {
      '@type': 'MusicComposition',
      '@id': `${SITE}/gallery#pieza-${s.id}`,
      name: s.title.replace(/\.\.\.$/, '') + (s.subtitle && s.id === '10' ? ' ' + s.subtitle.replace(/"/g, '') : ''),
      ...(/Major|Minor/.test(key) ? { musicalKey: key } : {}),
      description: s.desc.replace(/<br\s*\/?>/g, ' ').replace(/\s+/g, ' ').trim(),
      composer: { '@id': IDS.artist },
      ...(images[s.img] ? { image: images[s.img] } : {}),
    };
  });
}

export function breadcrumbNode(pageUrl: string, items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#migas`,
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: absoluteUrl(it.url) })),
  };
}
