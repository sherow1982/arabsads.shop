const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://arabsads.shop';
const TODAY = new Date().toISOString().split('T')[0];

// قراءة المنتجات
const productsPath = path.join(__dirname, '../src/data/products.js');
const content = fs.readFileSync(productsPath, 'utf8');
const match = content.match(/export const products = (\[[\s\S]*\]);/);
if (!match) { console.error('Cannot parse products'); process.exit(1); }
const products = JSON.parse(match[1]);

// الصفحات الثابتة
const staticPages = [
  { url: '/',               priority: '1.0', changefreq: 'daily' },
  { url: '/shop',           priority: '0.9', changefreq: 'daily' },
  { url: '/about',          priority: '0.7', changefreq: 'monthly' },
  { url: '/cart',           priority: '0.5', changefreq: 'never' },
  { url: '/privacy',        priority: '0.4', changefreq: 'monthly' },
  { url: '/terms',          priority: '0.4', changefreq: 'monthly' },
  { url: '/shipping-policy',priority: '0.5', changefreq: 'monthly' },
  { url: '/return-policy',  priority: '0.5', changefreq: 'monthly' },
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// الصفحات الثابتة
staticPages.forEach(page => {
  xml += `  <url>
    <loc>${DOMAIN}${page.url}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`;
});

// صفحات المنتجات
products.forEach(product => {
  if (!product.slug) return;
  const imageTag = product.image ? `
    <image:image>
      <image:loc>${product.image}</image:loc>
      <image:title>${(product.title || '').replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]))}</image:title>
    </image:image>` : '';
  xml += `  <url>
    <loc>${DOMAIN}/product/${encodeURIComponent(product.slug)}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>${imageTag}
  </url>\n`;
});

xml += `</urlset>`;

// حفظ في public
const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf8');
console.log(`✅ تم توليد sitemap.xml`);
console.log(`📊 ${staticPages.length} صفحة ثابتة + ${products.length} منتج`);
console.log(`🌐 الدومين: ${DOMAIN}`);
