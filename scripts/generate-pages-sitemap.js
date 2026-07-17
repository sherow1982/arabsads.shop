// يولد pages-sitemap.xml بالـ slugs الصحيحة مع صور المنتجات
const fs = require('fs');
const path = require('path');

const SITE = 'https://arabsads.shop';
const today = new Date().toISOString().split('T')[0];

// استخدام vm لتنفيذ الملف وتحويل export إلى module.exports
const vm = require('vm');
const productsPath = path.join(__dirname, '../src/data/products.js');
let content = fs.readFileSync(productsPath, 'utf8');
// تحويل ES module export إلى CommonJS
content = content.replace('export const products =', 'module.exports.products =');
const mod = { exports: {} };
vm.runInNewContext(content, { module: mod, exports: mod.exports });
const products = mod.exports.products;

if (!products || !products.length) {
  console.error('Cannot parse products, count:', products && products.length);
  process.exit(1);
}

const escape = s => (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const urls = products
  .filter(p => p.slug)
  .map(p => `  <url>
    <loc>${SITE}/product/${encodeURIComponent(p.slug).replace(/%2F/g, '/')}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${p.image}</image:loc>
      <image:title>${escape(p.title)}</image:title>
    </image:image>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>`;

const outPath = path.join(__dirname, '../public/pages-sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✅ pages-sitemap.xml generated: ${products.length} products`);
