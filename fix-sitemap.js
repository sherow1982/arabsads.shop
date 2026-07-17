const fs = require('fs');
const path = require('path');

const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');
let content = fs.readFileSync(sitemapPath, 'utf8');

// Fix homepage URL - add trailing slash
content = content.replace(
  '<loc>https://arabsads.shop</loc>',
  '<loc>https://arabsads.shop/</loc>'
);

fs.writeFileSync(sitemapPath, content, 'utf8');
console.log('✅ Sitemap fixed - homepage now has trailing slash');
