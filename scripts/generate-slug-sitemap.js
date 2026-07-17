// سكريبت لتوليد sitemap بالـ slugs بدلاً من الأرقام
const fs = require('fs');
const path = require('path');

const { products } = require('../src/data/products.js');

const SITE = 'https://arabsads.shop';
const today = new Date().toISOString().split('T')[0];

const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/shop', priority: '0.9', changefreq: 'weekly' },
  { url: '/about', priority: '0.6', changefreq: 'monthly' },
  { url: '/shipping-policy', priority: '0.7', changefreq: 'monthly' },
  { url: '/return-policy', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { url: '/terms', priority: '0.5', changefreq: 'monthly' },
];

const productUrls = products.map(p => ({
  url: `/product/${p.slug}`,
  priority: '0.8',
  changefreq: 'weekly',
}));

const allUrls = [...staticPages, ...productUrls];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls.map(({ url, priority, changefreq }) => `<url>
<loc>${SITE}${url}</loc>
<lastmod>${today}</lastmod>
<changefreq>${changefreq}</changefreq>
<priority>${priority}</priority>
</url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml, 'utf8');
console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
console.log(`📦 Products: ${productUrls.length}`);
