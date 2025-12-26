import fs from 'fs';
import path from 'path';
const siteUrl = 'https://mreslam.vercel.app';
const routes = [
  '/',
  '/videos',
  '/questions',
  '/about',
  '/contact',
];

const now = new Date().toISOString();
const toUrl = (p) => (siteUrl ? new URL(p, siteUrl).href : p);
const xml =
  `<?xml version="1.0" encoding="UTF-8"?>` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
  routes
    .map(
      (r) =>
        `<url><loc>${toUrl(r)}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${
          r === '/' ? '1.0' : '0.7'
        }</priority></url>`
    )
    .join('') +
  `</urlset>`;

const outDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
