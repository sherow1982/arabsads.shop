const fs = require('fs');
const path = require('path');

const products = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/products-data.json'), 'utf8'));

const baseUrl = 'https://arabsads.shop';
const lastmod = '2024-12-15';

// 1. إنشاء ملف pages-sitemap.xml (الصفحات الفعلية)
let pagesSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
  <!-- الصفحة الرئيسية -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- صفحة المتجر -->
  <url>
    <loc>${baseUrl}/shop</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  
  <!-- صفحات المنتجات -->
`;

products.forEach(product => {
  pagesSitemap += `  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${product.mainImage}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>
  </url>
`;
});

pagesSitemap += `</urlset>
`;

// 2. إنشاء ملف sitemap.xml (الفهرس الرئيسي)
const mainSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/pages-sitemap.xml</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>
</sitemapindex>
`;

// حفظ الملفات
fs.writeFileSync(path.join(__dirname, '../public/pages-sitemap.xml'), pagesSitemap, 'utf8');
fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), mainSitemap, 'utf8');

console.log('✅ تم إنشاء sitemap.xml (الفهرس الرئيسي)');
console.log('✅ تم إنشاء pages-sitemap.xml (ملف الصفحات)');
console.log('📌 قدم sitemap.xml فقط لجوجل');
