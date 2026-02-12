const fs = require('fs');
const path = require('path');

console.log('🔧 إصلاح خرائط الموقع النهائي...\n');

const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/products-data.json'), 'utf8'));
const products = Array.isArray(productsData) ? productsData : (productsData.products || []);

const baseUrl = 'https://omany.storesads.shop';
const lastmod = '2024-12-15';

// إنشاء sitemap.xml مع صور
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  
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
  
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/cart</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/checkout</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/privacy</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/terms</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/shipping-policy</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
  <url>
    <loc>${baseUrl}/return-policy</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  
`;

products.forEach(product => {
  sitemap += `  <url>
    <loc>${baseUrl}/product/${product.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${product.name}</image:title>
    </image:image>
  </url>
`;
});

sitemap += `</urlset>\n`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap, 'utf8');
console.log('✅ sitemap.xml تم إصلاحه بنجاح');
console.log(`   - ${9 + products.length} URL`);
console.log(`   - ${products.length} صورة منتج\n`);

// التحقق من mass-seo-sitemap.xml
const massSeoPath = path.join(__dirname, '../public/mass-seo-sitemap.xml');
if (fs.existsSync(massSeoPath)) {
  const content = fs.readFileSync(massSeoPath, 'utf8');
  const urlCount = (content.match(/<url>/g) || []).length;
  console.log(`✅ mass-seo-sitemap.xml موجود`);
  console.log(`   - ${urlCount} URL\n`);
}

// التحقق من robots.txt
const robotsPath = path.join(__dirname, '../public/robots.txt');
if (fs.existsSync(robotsPath)) {
  const content = fs.readFileSync(robotsPath, 'utf8');
  if (content.includes('omany.storesads.shop')) {
    console.log('✅ robots.txt صحيح\n');
  } else {
    console.log('⚠️  robots.txt يحتاج تحديث النطاق\n');
  }
}

console.log('🎉 تم إصلاح جميع خرائط الموقع بنجاح!');
