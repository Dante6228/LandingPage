// =============================================================================
// Contenido de alenjeynrod.com — fuente única.
// Migrado del sitio HTML anterior (textos, enlaces y orden); solo se corrigieron erratas de ortografía.
// Cambiar un texto del sitio = cambiarlo aquí. Las secciones ocultas tienen `visible: false`.
// =============================================================================

export const artist = {
  name: 'Alen Jeynrod',
  role: 'Pianist & Composer',
};

// --- Plataformas del bloque principal -----------------------------------------
export const platforms = {
  spotify: {
    label: 'Escuchar en Spotify',
    url: 'https://open.spotify.com/intl-es/album/5aWXFxLoQ2CCMoV4303uDw?si=62FUlM_oQxShfmc0n5B81A',
    icon: '/ico/Spotify_icon-icons.com_66783.svg',
  },
  // Íconos PNG en src/assets/ico (se optimizan al compilar); los SVG viven en public/ico.
  secondary: [
    { label: 'Apple Music', url: 'https://music.apple.com/mx/album/her-single/1789810904', icon: 'AppleMusic.png' },
    { label: 'YouTube Music', url: 'https://music.youtube.com/watch?v=hUezxoi7mAA', icon: 'youtubeMusic.png' },
  ],
  minor: [
    { label: 'Tidal', url: 'https://tidal.com/browse/album/410889469', icon: '/ico/tidalIcon.svg', alt: 'Tidal' },
    { label: 'Deezer', url: 'https://deezer.page.link/M2UrPAqm3VqarroAA', icon: '/ico/DeezerIcon.svg', alt: 'Deezer' },
    { label: 'Amazon', url: 'https://music.amazon.com.mx/', icon: '/ico/AmazonMusic.svg', alt: 'Amazon Music' },
  ],
};

// --- Dreaming (portada) --------------------------------------------------------
export const dreaming = {
  kicker: 'Próximamente',
  title: 'Dreaming',
  conceptTitle: 'El Concepto',
  concept:
    '"Dreaming" no es solo música; es una colección de memorias que temía olvidar. Cada tecla pulsada es un intento de congelar el tiempo, de volver a sentir lo que sentí en esos momentos de soledad y revelación.',
  memoriesTitle: 'Memorias del Álbum',
  tracks: [
    { n: '01', title: 'Her', memory: 'Esta pieza nació en una tarde de lluvia. Representa la figura femenina no como una persona, sino como una emoción: la calidez que se siente al ser comprendido sin palabras.' },
    { n: '02', title: 'A Reason More To Smile', memory: 'Esta pieza trata de retratar que incluso en los peores momentos siempre habrá algo que te ayude a encontrar la luz y la paz.' },
    { n: '03', title: 'Between Brothers', memory: 'Un pequeño homenaje hecho con mucha delicadeza a quien ya no está.' },
    { n: '04', title: 'Guiding Light', memory: 'Una pequeña dedicatoria a quien es mi inspiración día a día.' },
    { n: '05', title: 'Am I Dreaming?', memory: 'Siempre me causó mucha curiosidad la nostalgia que siento al recordar tantos sueños que he tenido; creo que esta pieza retrata a la perfección ese sonido.' },
    { n: '06', title: 'A Love Fool', memory: 'Un retrato del sentido de insuficiencia.' },
    { n: '07', title: 'A Pretty Love', memory: 'Qué hermoso es permitirse sentir de la forma más profunda y pura posible; tal vez esta pieza retrate a la perfección ese sentimiento.' },
    { n: '08', title: 'A Quiet Heart', memory: 'Una pieza que invita a encontrar calma y serenidad en medio del caos. Tal vez así puedas amar de una manera más profunda y consciente.' },
    { n: '09', title: 'The Moon is Beautiful Isn’t It?', memory: 'Una vez leí esta frase y me pareció tan hermoso que esta sea la forma de declarar tu amor, que decidí retratarla en una pieza musical.' },
    { n: '10', title: 'I’m In Love', memory: 'Así se siente amar.' },
  ],
};

// --- Live Sessions (YouTube) ---------------------------------------------------
// uploadDate y seconds: fecha de publicación y duración reales en YouTube (requeridas por Google para videos).
export const liveSessions = [
  { n: '01', id: '8qQ1ieL-y1M', uploadDate: '2025-09-18T22:59:46-07:00', seconds: 1109, title: 'Dreaming', subtitle: 'Silent Reflections (Piano Medley)', iframeTitle: 'Dreaming - Silent Reflections' },
  { n: '02', id: 'URHku2Ono4k', uploadDate: '2025-07-03T02:11:53-07:00', seconds: 249, title: 'Her', subtitle: 'Live Session', iframeTitle: 'Her' },
  { n: '03', id: 'sbj6IZnWirA', uploadDate: '2025-09-22T02:10:14-07:00', seconds: 247, title: 'A Reason More To Smile', subtitle: 'Live Session', iframeTitle: 'A Reason More To Smile' },
  { n: '04', id: '_03kCyVSwDk', uploadDate: '2025-08-28T06:14:06-07:00', seconds: 245, title: 'Between Brothers', subtitle: 'Live Session', iframeTitle: 'Between Brothers' },
  { n: '05', id: 'kl_LuonkX-Q', uploadDate: '2025-12-11T05:50:47-08:00', seconds: 198, title: 'Am I Dreaming?', subtitle: 'Live Session', iframeTitle: 'Am I Dreaming?' },
  { n: '06', id: 'RQBX_KtqUh0', uploadDate: '2025-12-12T02:06:46-08:00', seconds: 202, title: 'A Pretty Love', subtitle: 'Live Session', iframeTitle: 'A Pretty Love' },
];

// --- Último lanzamiento -----------------------------------------------------------
export const latestRelease = {
  kicker: 'Último Lanzamiento',
  title: 'A Reason More To Smile',
  text: 'Una composición dedicada a encontrar luz incluso en los peores momentos.',
  cta: 'Escuchar Ahora',
  url: 'https://open.spotify.com/intl-es/album/5aWXFxLoQ2CCMoV4303uDw?si=62FUlM_oQxShfmc0n5B81A',
  coverAlt: 'Portada del sencillo A Reason More To Smile',
};

// --- Vinilo ------------------------------------------------------------------------
export const vinyl = {
  kicker: 'Coleccionista',
  title: 'Tu Copia en Vinilo',
  text: 'Lleva a casa la experiencia completa. Un vinilo de edición limitada con la calidad que merece la música.',
  cta: 'Comprar Vinilo',
  url: 'https://elasticstage.com/alenjeynrod/releases/her-singleep',
  imageAlt: 'Vinilo oficial',
};

// --- Redes del pie -----------------------------------------------------------------
export const socials = [
  { label: 'Instagram', url: 'https://www.instagram.com/alenjeynrod', icon: '/ico/IGblanco.svg' },
  { label: 'TikTok', url: 'https://www.tiktok.com/@alenjeynrod', icon: '/ico/TikTokblanco.svg' },
  { label: 'YouTube', url: 'https://www.youtube.com/@alenjeynrod', icon: '/ico/YoutubeBlanco.svg' },
];

// Bandsintown (widget de conciertos en el pie)
export const bandsintown = { artistId: 'id_15612279', url: 'https://www.bandsintown.com/a/15612279' };

// --- Secciones ocultas en el sitio anterior (se conservan, no se muestran) -------------
export const newsletter = {
  visible: false,
  title: 'Cartas desde el Piano',
  text: 'De vez en cuando escribo sobre lo que hay detrás de las melodías. Sin ruido, directo a tu bandeja de entrada.',
  action: 'https://formspree.io/f/xaqnlaen',
  placeholder: 'tu@correo.com',
  button: 'Recibir',
};

export const shop = {
  visible: false,
  title: 'Partituras',
  storeUrl: 'https://alenjeynrod.myshopify.com/',
  storeLabel: 'Ver tienda',
  // Shopify Buy Button: solo se carga si la sección es visible.
  domain: '16pwff-9s.myshopify.com',
  storefrontAccessToken: '5ee9bd6b8f4b31138715d7aa8ae5bad1',
  products: [
    { id: '9853368074526', node: 'product-component-1757583594381' },
    { id: '9854203265310', node: 'product-component-1757584309754' },
    { id: '9854196908318', node: 'product-component-1757584526496' },
    { id: '9854240424222', node: 'product-component-1757585830532' },
  ],
};

// =============================================================================
// Galería "Dreaming | The Experience Hub" (/gallery)
// =============================================================================
export const gallery = {
  kicker: 'La Exhibición',
  title: 'Dreaming',
  intro: '"Este trabajo ha sido, más que un proyecto, un refugio. Aquí yacen las memorias, los borradores y el silencio detrás de cada nota."',
  navBack: '← Alen Jeynrod',
  navTitle: 'Galería de arte',
  quote:
    'Si alguna de estas piezas logra que cierres los ojos y te pierdas en un instante de calma, entonces Dreaming habrá cumplido su propósito.',
  quoteAuthor: 'Alen Jeynrod',
  // La cita se inserta después de la pieza número 5 (índice 4), como en el sitio anterior.
  quoteAfterIndex: 4,
  creditsTitle: 'Créditos',
  guestbook: {
    visible: false, // usaba formularios de Netlify, que no funcionan en Cloudflare
    title: 'Guestbook',
    text: 'Deja una nota en este archivo antes de irte.',
  },
};

/** Imagen: nombre del archivo en src/assets/img. `score` = partitura (tratamiento sepia invertido); `album` = portada. */
export const gallerySongs: {
  id: string;
  title: string;
  subtitle?: string;
  meta: string;
  desc: string;
  img: string;
  type: 'score' | 'album';
  capsuleFile?: string;
}[] = [
  { id: '01', title: 'Intro', meta: 'Eb Major • 155 BPM • 3:49', desc: 'El inicio del sueño. Una entrada etérea que prepara los sentidos para el viaje a través de las notas.', img: 'score_Intro.png', type: 'score' },
  { id: '02', title: 'Her', subtitle: '"Nacida de la improvisación"', meta: 'F# Major • 6/8 • 90 BPM', desc: 'Recuerdo grabar un demo muy emocionado y mandárselo a ella, diciéndole: "Así suenas en mi cabeza". Dos acordes mágicos que se convirtieron en una identidad.', img: 'Portrait.png', type: 'album', capsuleFile: '/audio/ambience.mp3' },
  { id: '03', title: 'A Reason More To Smile', meta: 'Eb Major • 6/8 • 108 BPM', desc: 'Un abrazo musical para mi mamá en días difíciles. La sensación de paz imposible de poner en palabras.', img: 'Cover4.jpg', type: 'album' },
  { id: '04', title: 'Guiding Light', subtitle: '"Homenaje a mi papá"', meta: 'F Major • 6/8 • 98 BPM', desc: 'Cuando su fortaleza se quebró, sentí que mi mundo también lo hacía. Esta melodía busca recordar que su luz siempre será mi guía.', img: 'Guiding.png', type: 'score' },
  { id: '05', title: 'Between Brothers', meta: 'F Major • 6/8 • 100 BPM', desc: 'Recuerdo para mi tío al que nunca conocí del todo. Quise rendirle un homenaje y guardar entre notas su ser.', img: 'Cover2.png', type: 'album' },
  { id: '06', title: 'Am I Dreaming?', meta: 'G Major • 6/8 • 94 BPM', desc: 'Esto se siente como flotar en un sueño. Un viaje contemplativo, lento y meloso, sin un clímax claro.', img: 'ImDreaming.png', type: 'score' },
  { id: '07', title: 'A Love Fool', meta: 'G Major • 6/8 • 90 BPM', desc: 'El eco de un amor que nunca encontró su reflejo. Inspirada en Radiohead, retrata esa mezcla de ternura y resignación.', img: 'Cover3.jpg', type: 'album' },
  { id: '08', title: 'A Pretty Love', meta: 'F# Major • 4/4 • 138 BPM', desc: 'Una oda íntima a mi forma de amar. Nació como un preludio pero cobró vida propia con un motivo melódico que me encantó desde el inicio.', img: 'Pretty.png', type: 'score' },
  { id: '09', title: 'A Quiet Heart', meta: 'A Major • 132 BPM', desc: 'El acto de amar desde el silencio y la contemplación. Ese cariño que no necesita palabras para existir.', img: 'Quiet.png', type: 'score' },
  { id: '10', title: 'The Moon is Beautiful...', subtitle: '"Isn\'t It?"', meta: 'Db Major • 6/8 • 104 BPM', desc: 'Fui de viaje y no podía parar de contemplar la luna; poseía un magnetismo del que no podía apartar la vista.', img: 'Moon.png', type: 'score' },
  { id: '11', title: "I'm In Love", meta: 'C Major • 135 BPM', desc: '"Así se siente amar." <br> Una declaración nacida bajo la luz de la luna. Magnetismo puro del que no podía apartar la vista.', img: 'Love.png', type: 'score' },
];
