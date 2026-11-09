// Genera la imagen social 1200×630 (public/og/default.jpg) desde scripts/og-cover.html.
//   node scripts/generate-social-images.mjs
// Requiere Google Chrome instalado (CHROME_PATH para otra ruta) y sharp (dependencia de Astro).
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import sharp from 'sharp';

const root = resolve(import.meta.dirname, '..');
const chrome = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean).find((p) => existsSync(p));
if (!chrome) throw new Error('No encontré Chrome. Define CHROME_PATH.');

mkdirSync(resolve(root, 'public/og'), { recursive: true });
const tmp = resolve(root, 'scripts', '.og-tmp.png');
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  '--allow-file-access-from-files', '--window-size=1200,630', '--virtual-time-budget=4000', `--screenshot=${tmp}`,
  pathToFileURL(resolve(root, 'scripts', 'og-cover.html')).href,
], { stdio: 'ignore' });
await sharp(tmp).resize(1200, 630).jpeg({ quality: 86, mozjpeg: true }).toFile(resolve(root, 'public/og/default.jpg'));
rmSync(tmp);
console.log('Listo: public/og/default.jpg');
