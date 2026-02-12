const fs = require('fs');
const path = require('path');

const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/products-data.json'), 'utf8'));
const products = productsData.products;

const baseUrl = 'https://omany.storesads.shop';
const lastmod = '2024-12-15';

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

products.forEach(product => {
  sitemap += `  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
});

sitemap += `</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml تم إنشاؤه بنجاح');
