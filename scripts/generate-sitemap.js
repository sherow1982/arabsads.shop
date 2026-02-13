const fs = require('fs');
const data = require('../src/data/products-data.json');

const baseUrl = 'https://omany.storesads.shop';
const now = new Date().toISOString();

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
<loc>${baseUrl}</loc>
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>1.0</priority>
</url>
<url>
<loc>${baseUrl}/shop</loc>
<lastmod>${now}</lastmod>
<changefreq>weekly</changefreq>
<priority>0.9</priority>
</url>
<url>
<loc>${baseUrl}/contact-us</loc>
<lastmod>${now}</lastmod>
<changefreq>monthly</changefreq>
<priority>0.5</priority>
</url>
`;

data.forEach(p => {
  xml += `<url>
<loc>${baseUrl}/product/${p.id}</loc>
<lastmod>${now}</lastmod>
<changefreq>daily</changefreq>
<priority>0.8</priority>
</url>
`;
});

xml += `</urlset>`;

fs.writeFileSync('./public/sitemap.xml', xml, 'utf-8');
console.log(`✅ تم إنشاء sitemap بـ ${data.length + 3} صفحة`);
