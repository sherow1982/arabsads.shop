const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://arabsads.shop';
const TODAY = '2025-07-17';
const PATTERNS = ['buy', 'price', 'kuwait', 'hawalli', 'offer'];

// قراءة products.js واستخراج slugs
const productsFile = fs.readFileSync(path.join(__dirname, 'src/data/products.js'), 'utf8');
const match = productsFile.match(/export const products = (\[[\s\S]*\]);/);
if (!match) { console.error('Cannot parse products'); process.exit(1); }
const products = JSON.parse(match[1]);

let urls = '';
for (const product of products) {
  const slug = product.slug;
  if (!slug) continue;
  for (const pattern of PATTERNS) {
    urls += `  <url>
    <loc>${BASE_URL}/seo/${pattern}-${slug}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  }
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}</urlset>`;

const outputPath = path.join(__dirname, 'public', 'mass-seo-sitemap.xml');
fs.writeFileSync(outputPath, xml, 'utf8');
console.log(`✅ Generated ${products.length * PATTERNS.length} URLs in mass-seo-sitemap.xml`);
