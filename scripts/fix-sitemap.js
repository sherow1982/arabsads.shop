const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../src/data/products-data.json');
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <url>
    <loc>https://omany.storesads.shop</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <url>
    <loc>https://omany.storesads.shop/shop</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
${productsData.map(product => `  <url>
    <loc>https://omany.storesads.shop/product/${product.id}</loc>
    <lastmod>2024-12-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(sitemapPath, sitemap, 'utf8');
console.log('✅ sitemap.xml تم إصلاحه بنجاح');
console.log(`📊 ${productsData.length} منتج + 2 صفحة ثابتة`);
